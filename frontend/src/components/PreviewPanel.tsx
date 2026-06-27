import React, { useState, useEffect, useRef } from "react";
import { Eye, Code, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "./Button";

interface PreviewPanelProps {
  htmlCode: string;
  projectName: string;
  isStreaming?: boolean;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  htmlCode,
  projectName,
  isStreaming = false,
}) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Synchronize dynamic code state with the iframe doc
  useEffect(() => {
    if (iframeRef.current && activeTab === "preview") {
      try {
        const iframe = iframeRef.current;
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
          doc.open();
          doc.write(htmlCode);
          doc.close();
        }
      } catch (error) {
        console.error("Preview iframe update failed:", error);
      }
    }
  }, [htmlCode, activeTab]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy source HTML: ", err);
    }
  };

  const handleOpenNewWindow = () => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.open();
      newWindow.document.write(htmlCode);
      newWindow.document.close();
    }
  };

  return (
    <div className="w-full bg-white border border-gray-200/80 rounded-xl shadow-premium overflow-hidden flex flex-col h-[580px]">
      {/* Control Toolbar */}
      <div className="bg-gray-50 border-b border-gray-150 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5 bg-white border border-gray-250 p-1.2 rounded-lg">
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold transition-all focus:outline-none
              ${
                activeTab === "preview"
                  ? "bg-primary-yellow text-dark-text shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
          >
            <Eye size={13} />
            Live Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold transition-all focus:outline-none
              ${
                activeTab === "code"
                  ? "bg-primary-yellow text-dark-text shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
          >
            <Code size={13} />
            HTML Source
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* External window trigger */}
          {htmlCode && (
            <button
              onClick={handleOpenNewWindow}
              className="p-2 border border-gray-200 hover:border-gray-300 rounded-lg bg-white text-slate-500 hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-200"
              title="Open full page preview"
            >
              <ExternalLink size={14} />
            </button>
          )}

          {/* Copy Trigger */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="flex items-center gap-1"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-500" />
                <span className="text-emerald-600 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy Code</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Display Pane */}
      <div className="flex-1 bg-slate-50 min-h-0 relative">
        {activeTab === "preview" ? (
          <iframe
            ref={iframeRef}
            title={projectName}
            className="w-full h-full border-none bg-white"
            sandbox="allow-scripts allow-modals allow-same-origin"
          />
        ) : (
          <pre className="w-full h-full p-4 overflow-auto font-mono text-xs text-slate-700 bg-slate-900 text-slate-200 selection:bg-slate-700 leading-relaxed">
            {htmlCode || "No build code generated yet."}
          </pre>
        )}

        {isStreaming && (
          <div className="absolute bottom-4 right-4 bg-slate-900/90 text-primary-yellow text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-sm border border-primary-yellow/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-yellow animate-ping"></span>
            Streaming live code compilation...
          </div>
        )}
      </div>
    </div>
  );
};
