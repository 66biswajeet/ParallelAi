import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { useProjectStore } from "../store/project.store";
import { socket } from "../services/socket.service";
import { Navbar } from "../components/Navbar";
import { PreviewPanel } from "../components/PreviewPanel";
import { ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";
import confetti from "canvas-confetti";

export const ProjectCanvasPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, fetchCredits } = useAuthStore();
  const {
    currentProject,
    generationStatus,
    streamedCode,
    loadProjectById,
    setGenerationStatus,
    appendCodeChunk,
    saveCompletedProject,
  } = useProjectStore();
  
  const navigate = useNavigate();
  const [connectionError, setConnectionError] = useState(false);
  const [isFetchingProject, setIsFetchingProject] = useState(true);

  // Sync active project state from URL parameter
  useEffect(() => {
    let active = true;
    if (id && user?.id) {
      setIsFetchingProject(true);
      loadProjectById(id)
        .then(() => {
          if (active) {
            setIsFetchingProject(false);
          }
        })
        .catch((err) => {
          console.error("Failed to load project:", err);
          if (active) {
            setIsFetchingProject(false);
            navigate("/dashboard");
          }
        });
    }
    return () => {
      active = false;
    };
  }, [id, user?.id]);

  // Handle WebSocket bindings
  useEffect(() => {
    if (!id || !user?.id || !currentProject) return;

    // Ensure socket is active and establish room
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join_project_canvas", id);
    setConnectionError(false);

    // Initial status check
    socket.on("connect_error", () => {
      setConnectionError(true);
    });

    socket.on("generation_status", (data: { status: any; message: string }) => {
      console.log("[Socket Event] generation_status: ", data);
      
      // Map incoming status transitions
      setGenerationStatus(data.status, data.message);

      if (data.status === "completed") {
        // Sync final code to database local mock
        const finalCode = useProjectStore.getState().streamedCode;
        saveCompletedProject(id, finalCode, user.id);
        fetchCredits(); // sync credits metric

        // Success victory animation
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.7 },
          colors: ["#F5C542", "#FFD54F", "#1F2937"],
        });
      }
    });

    socket.on("code_stream_chunk", (data: { chunk: string }) => {
      // Append characters into state
      appendCodeChunk(data.chunk);
    });

    // Cleanup listeners
    return () => {
      socket.off("connect_error");
      socket.off("generation_status");
      socket.off("code_stream_chunk");
    };
  }, [id, currentProject?.id, user?.id]);

  if (isFetchingProject || !currentProject) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="text-center p-6 bg-white border border-gray-200 rounded-xl shadow-premium">
          <p className="text-sm font-semibold text-slate-500">Loading Canvas Workspace...</p>
        </div>
      </div>
    );
  }

  // Helper selectors for tracking active steps
  const isRefining = generationStatus.status === "refining_prompt";
  const isStreaming = generationStatus.status === "streaming_code";
  const isDone = generationStatus.status === "completed" || currentProject.id === "dummy-1";
  const isFailed = generationStatus.status === "failed";
  const isIdle = generationStatus.status === "idle";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-6 w-full flex flex-col min-h-0">
        
        {/* Navigation Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 shrink-0">
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="p-2 border border-gray-200 rounded-lg bg-white text-slate-500 hover:text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-200"
              title="Return to Dashboard"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  {currentProject.name}
                </h1>
                {isDone && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 size={10} className="fill-emerald-800 text-emerald-100" />
                    Completed
                  </span>
                )}
                {isStreaming && (
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                    Streaming
                  </span>
                )}
                {isRefining && (
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
                    Refining Prompt
                  </span>
                )}
                {isFailed && (
                  <span className="bg-red-100 text-red-800 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <AlertTriangle size={10} />
                    Failed
                  </span>
                )}
                {isIdle && !isDone && (
                  <span className="bg-gray-100 text-gray-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    Queued
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Prompt: "{currentProject.initialPrompt}"
              </p>
            </div>
          </div>
        </div>

        {connectionError && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs font-semibold text-amber-800 flex items-center gap-2">
            <AlertTriangle size={15} />
            <span>Connection Warning: Socket server is offline. Pre-generated codes or cached streams will render.</span>
          </div>
        )}

        {/* Workspace Canvas Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1 min-h-0">
          
          {/* Stepper Status Sidebar Panel */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-premium">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">
                Build Status Steps
              </h3>
              
              <div className="flex flex-col gap-5">
                {/* Step 1: Queued */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={18} className="text-amber-500 fill-primary-soft" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Project Initialized</h4>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Allocations validated and queued.</p>
                  </div>
                </div>

                {/* Step 2: Refining Prompt */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center justify-center shrink-0">
                    {isRefining ? (
                      <span className="relative flex h-4.5 w-4.5 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500"></span>
                      </span>
                    ) : (isStreaming || isDone) ? (
                      <CheckCircle2 size={18} className="text-amber-500 fill-primary-soft" />
                    ) : (
                      <div className="w-4.5 h-4.5 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center"></div>
                    )}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isRefining ? "text-blue-600" : (isStreaming || isDone) ? "text-slate-900" : "text-slate-400"}`}>
                      Analysing UI Layout
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Gemini structures sections.</p>
                  </div>
                </div>

                {/* Step 3: Streaming Code */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center justify-center shrink-0">
                    {isStreaming ? (
                      <span className="relative flex h-4.5 w-4.5 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary-yellow"></span>
                      </span>
                    ) : isDone ? (
                      <CheckCircle2 size={18} className="text-amber-500 fill-primary-soft" />
                    ) : (
                      <div className="w-4.5 h-4.5 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center"></div>
                    )}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isStreaming ? "text-amber-600" : isDone ? "text-slate-900" : "text-slate-400"}`}>
                      Code Streaming
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Tailwind structures rendering.</p>
                  </div>
                </div>

                {/* Step 4: Finished */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center justify-center shrink-0">
                    {isDone ? (
                      <CheckCircle2 size={18} className="text-amber-500 fill-primary-soft" />
                    ) : (
                      <div className="w-4.5 h-4.5 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center"></div>
                    )}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isDone ? "text-slate-900" : "text-slate-400"}`}>
                      Finalized sandbox
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Committed successfully.</p>
                  </div>
                </div>
              </div>

              {/* Status Descriptions log box */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                  System Logs
                </span>
                <div className="bg-gray-50 border border-gray-150 rounded-lg p-3 text-[10px] text-slate-500 font-mono leading-relaxed h-[100px] overflow-auto">
                  {generationStatus.message || "Awaiting task signals..."}
                </div>
              </div>
            </div>
          </div>

          {/* Core Interactive Sandbox View (left pane) */}
          <div className="lg:col-span-9 flex flex-col">
            <PreviewPanel
              htmlCode={streamedCode || currentProject.currentCode || ""}
              projectName={currentProject.name}
              isStreaming={isStreaming}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
