import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { useProjectStore } from "../store/project.store";
import { Navbar } from "../components/Navbar";
import { CreditsCard } from "../components/CreditsCard";
import { Button } from "../components/Button";
import { InputField } from "../components/InputField";
import { Plus, Search, Sparkles, FolderOpen, ArrowRight, X, MessageSquare, AlertCircle } from "lucide-react";

export const DashboardPage: React.FC = () => {
  const { user, fetchCredits } = useAuthStore();
  const { projects, createProject, loadProjects, setCurrentProject, clearGenerationState } = useProjectStore();
  const navigate = useNavigate();

  // Search filter query
  const [searchQuery, setSearchQuery] = useState("");

  // Modal display toggles
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectPrompt, setProjectPrompt] = useState("");
  
  const [modalError, setModalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync user credits and load projects list on mount
  useEffect(() => {
    if (user?.id) {
      fetchCredits();
      loadProjects(user.id);
    }
  }, [user?.id]);

  const handleOpenModal = () => {
    setModalError(null);
    setProjectName("");
    setProjectPrompt("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);

    if (!projectName.trim()) {
      setModalError("Project name is required.");
      return;
    }
    if (!projectPrompt.trim()) {
      setModalError("Initial design prompt is required.");
      return;
    }

    if (user && user.credits < 5) {
      setModalError("Insufficient Credits: You need at least 5 credits to launch a new design generation.");
      return;
    }

    setIsSubmitting(true);
    try {
      clearGenerationState();
      const newProj = await createProject(projectName, projectPrompt, user!.id);
      setIsModalOpen(false);
      // Immediately fetch credits to reflect deduction of 5 credits
      fetchCredits();
      // Navigate to live editor canvas
      navigate(`/projects/${newProj.id}`);
    } catch (err: any) {
      setModalError(err.message || "Failed to initiate canvas generation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenProject = (project: any) => {
    setCurrentProject(project);
    navigate(`/projects/${project.id}`);
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.initialPrompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Welcome, {user?.name || "Developer"}
            </h1>
            <p className="text-sm font-semibold text-slate-500 mt-1">
              Create and manage your AI-generated single-page layouts.
            </p>
          </div>
          
          <Button
            variant="primary"
            onClick={handleOpenModal}
            className="flex items-center gap-1.5 self-start md:self-auto"
          >
            <Plus size={16} />
            Create New Project
          </Button>
        </div>

        {/* Dashboard Grid split into History & Balance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main workspace (left pane) */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Glowing Interactive Welcome Banner */}
            <div className="bg-gradient-to-r from-primary-yellow to-primary-accent rounded-2xl p-6 shadow-yellowGlow relative overflow-hidden text-dark-text border border-amber-300/35">
              {/* Background geometric glass design bubbles */}
              <div className="absolute right-0 bottom-0 w-48 h-48 bg-white/10 rounded-full blur-xl translate-x-10 translate-y-10"></div>
              <div className="absolute left-1/3 top-0 w-32 h-32 bg-white/5 rounded-full blur-lg -translate-y-6"></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="bg-slate-900/10 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    ⚡ Parallel Canvas Active
                  </span>
                  <h2 className="text-2xl font-black mt-3 text-slate-950 leading-tight">
                    Bring your web ideas to life.
                  </h2>
                  <p className="text-xs text-slate-900/80 font-bold mt-1.5 max-w-md">
                    Input a description prompt, watch Gemini stream structure layouts, and copy ready-to-use HTML code.
                  </p>
                </div>
                <button
                  onClick={handleOpenModal}
                  className="bg-slate-900 hover:bg-slate-950 text-white text-xs font-black px-5 py-3 rounded-xl transition-all hover:scale-[1.03] active:scale-95 shadow-md shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  Create Canvas Workspace
                </button>
              </div>
            </div>
            
            {/* Search filter banner */}
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search projects by title or prompt details..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none transition-all focus:border-primary-yellow focus:ring-4 focus:ring-primary-soft shadow-sm"
              />
            </div>

            {/* Projects Container list */}
            <div className="bg-white border border-gray-200/80 rounded-xl shadow-premium p-6">
              <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary-soft border border-amber-200/40 flex items-center justify-center text-amber-600 shrink-0">
                  <FolderOpen size={15} />
                </div>
                Project Generation History
              </h2>

              {filteredProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 bg-primary-soft rounded-full flex items-center justify-center text-amber-500 mb-4 animate-bounce">
                    ⚡
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">No Projects Discovered</h3>
                  <p className="text-xs text-slate-400 font-semibold max-w-xs mt-1">
                    {searchQuery
                      ? "No results matching your query search parameters."
                      : "Create your first AI-generated canvas to populate history."}
                  </p>
                  {!searchQuery && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleOpenModal}
                      className="mt-4"
                    >
                      Build First Canvas
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => handleOpenProject(project)}
                      className="group border border-gray-150 rounded-xl p-4 hover:border-primary-yellow/70 hover:shadow-yellowGlow hover:bg-primary-soft/10 transition-all duration-200 cursor-pointer flex justify-between items-center gap-4 relative overflow-hidden"
                    >
                      {/* Left border subtle accent color slide-in */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:w-1.5 group-hover:bg-primary-yellow transition-all"></div>

                      <div className="min-w-0 flex-1 pl-1 flex items-start gap-3">
                        {/* Folder icon indicator */}
                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-gray-150 flex items-center justify-center text-slate-400 group-hover:bg-primary-soft group-hover:border-amber-205 group-hover:text-amber-550 transition-colors shrink-0 mt-0.5">
                          📂
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-600 transition-colors truncate">
                              {project.name}
                            </h3>
                            {project.id === "dummy-1" && (
                              <span className="bg-amber-105 text-amber-800 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wide shrink-0 border border-amber-200/50">
                                Demo
                              </span>
                            )}
                          </div>
                          
                          <p className="text-xs text-slate-500 font-semibold line-clamp-1 mb-2 flex items-center gap-1">
                            <MessageSquare size={12} className="text-slate-400 shrink-0" />
                            <span>{project.initialPrompt}</span>
                          </p>
                          
                          <span className="text-[10px] text-slate-400 font-medium">
                            Created on {formatDate(project.createdAt)}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 border border-gray-200/60 text-slate-400 group-hover:bg-primary-yellow group-hover:text-dark-text group-hover:border-transparent transition-all">
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Credits Sidebar Pane (right pane) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <CreditsCard credits={user?.credits || 0} />
          </div>
        </div>
      </main>

      {/* Floating Project Creation Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gray-50 border-b border-gray-150 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-yellow flex items-center justify-center text-dark-text shadow-sm text-sm">
                  🚀
                </div>
                <h3 className="font-black text-slate-900 text-base">New Canvas Workspace</h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-gray-100 hover:text-slate-700 transition-colors focus:outline-none"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleCreateProject} className="p-6">
              {modalError && (
                <div className="mb-5 p-3.5 bg-red-50 border border-red-150 rounded-lg text-xs font-semibold text-red-700 flex items-start gap-2">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{modalError}</span>
                </div>
              )}

              <InputField
                label="Workspace Project Name"
                placeholder="e.g. Acme Landing Page"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                disabled={isSubmitting}
                required
              />

              <div className="mb-6">
                <label className="block text-sm font-semibold text-dark-text mb-1.5">
                  Initial Design Prompt
                </label>
                <textarea
                  placeholder="Describe your design. E.g., A clean modern landing page for a coffee shop with dynamic hover transitions, custom yellow badges, grids detailing coffee items, testimonials, and a simple lead collection input box."
                  value={projectPrompt}
                  onChange={(e) => setProjectPrompt(e.target.value)}
                  disabled={isSubmitting}
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-dark-text outline-none transition-all focus:border-primary-yellow focus:ring-4 focus:ring-primary-soft resize-none"
                />
                <span className="block mt-1.5 text-[10px] text-slate-400 font-medium">
                  Explain layout structures, styles, sections, or items to guide the generator.
                </span>
              </div>

              <div className="flex gap-2.5 bg-primary-soft/50 border border-amber-200/30 rounded-lg p-3.5 mb-6">
                <Sparkles size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed font-semibold">
                  Note: Generating will query Google Gemini 2.5 Flash and deducts 5 credits from your profile.
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                >
                  Build Workspace Canvas
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
