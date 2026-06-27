import { create } from "zustand";
import type { Project } from "../types";
import { projectService } from "../services/project.service";

interface GenerationStatus {
  status: "idle" | "refining_prompt" | "streaming_code" | "completed" | "failed";
  message: string;
}

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  generationStatus: GenerationStatus;
  streamedCode: string;
  isLoading: boolean;
  error: string | null;
  loadProjects: (userId: string) => void;
  createProject: (name: string, initialPrompt: string, userId: string) => Promise<Project>;
  setCurrentProject: (project: Project | null) => void;
  setGenerationStatus: (status: GenerationStatus["status"], message: string) => void;
  appendCodeChunk: (chunk: string) => void;
  clearGenerationState: () => void;
  saveCompletedProject: (projectId: string, finalCode: string, userId: string) => void;
}

const getDummyProjects = (userId: string): Project[] => [
  {
    id: "dummy-1",
    name: "Portfolio Site Template",
    initialPrompt: "Create a modern clean portfolio for a software designer with yellow accents and responsive details.",
    currentCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <title>Creative Portfolio</title>
</head>
<body class="bg-white text-slate-800">
  <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
    <div class="font-extrabold text-xl tracking-tight text-slate-900">CREATIVE<span class="text-amber-500">.</span></div>
    <div class="flex gap-6 text-sm font-semibold">
      <a href="#" class="text-amber-500">Work</a>
      <a href="#" class="hover:text-amber-500 transition-colors">About</a>
      <a href="#" class="hover:text-amber-500 transition-colors">Contact</a>
    </div>
  </nav>
  <header class="max-w-4xl mx-auto py-20 px-6 text-center">
    <span class="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Available for work</span>
    <h1 class="text-5xl font-black text-slate-900 tracking-tight mt-6 mb-8 leading-tight">Designing digital interfaces that look simple & feel premium.</h1>
    <p class="text-lg text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">I'm a digital product designer crafting responsive websites and design systems using sleek white workspaces with energetic yellow actions.</p>
    <div class="flex justify-center gap-4">
      <button class="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-6 py-3 rounded-lg shadow-yellowGlow transition-all hover:scale-105">View Projects</button>
      <button class="border border-slate-200 hover:border-slate-300 font-bold px-6 py-3 rounded-lg transition-colors">Get in touch</button>
    </div>
  </header>
  <section class="bg-slate-50 py-16 border-t border-slate-100">
    <div class="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8">
      <div class="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
        <div class="text-amber-500 text-2xl mb-4 font-bold">01</div>
        <h3 class="font-bold text-slate-900 mb-2">Web Design</h3>
        <p class="text-sm text-slate-500 leading-relaxed">Crafting bespoke web layouts tailored to tell product stories in clean layouts.</p>
      </div>
      <div class="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
        <div class="text-amber-500 text-2xl mb-4 font-bold">02</div>
        <h3 class="font-bold text-slate-900 mb-2">Design Systems</h3>
        <p class="text-sm text-slate-500 leading-relaxed">Standardizing tokens, margins, components, and templates across brand experiences.</p>
      </div>
      <div class="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
        <div class="text-amber-500 text-2xl mb-4 font-bold">03</div>
        <h3 class="font-bold text-slate-900 mb-2">Frontend Build</h3>
        <p class="text-sm text-slate-500 leading-relaxed">Streaming Tailwind builds directly to client rendering sandboxes seamlessly.</p>
      </div>
    </div>
  </section>
</body>
</html>`,
    userId,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  }
];

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,
  generationStatus: { status: "idle", message: "Ready to launch generation." },
  streamedCode: "",
  isLoading: false,
  error: null,

  loadProjects: (userId) => {
    try {
      const storageKey = `pyarelal_projects_${userId}`;
      const savedProjects = localStorage.getItem(storageKey);
      if (savedProjects) {
        set({ projects: JSON.parse(savedProjects) });
      } else {
        // Hydrate with beautiful dummy project so dashboard doesn't look empty and sad
        const initialDummy = getDummyProjects(userId);
        localStorage.setItem(storageKey, JSON.stringify(initialDummy));
        set({ projects: initialDummy });
      }
    } catch {
      set({ projects: [] });
    }
  },

  createProject: async (name, initialPrompt, userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await projectService.createProject(name, initialPrompt);
      if (response.success && response.project) {
        const newProject = response.project;
        
        // Append to storage
        const storageKey = `pyarelal_projects_${userId}`;
        const currentProjects = get().projects;
        const updatedProjects = [newProject, ...currentProjects];
        localStorage.setItem(storageKey, JSON.stringify(updatedProjects));
        
        set({
          projects: updatedProjects,
          currentProject: newProject,
          streamedCode: newProject.currentCode || "",
          generationStatus: { status: "idle", message: "Successfully queued in Redis pipeline." },
          error: null
        });
        
        return newProject;
      } else {
        throw new Error(response.message || "Failed to establish project");
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Failed to create project.";
      set({ error: errMsg });
      throw new Error(errMsg);
    } finally {
      set({ isLoading: false });
    }
  },

  setCurrentProject: (project) => {
    set({
      currentProject: project,
      streamedCode: project ? project.currentCode : "",
      generationStatus: project
        ? { status: "completed", message: "Loaded completed project structure." }
        : { status: "idle", message: "No active project." }
    });
  },

  setGenerationStatus: (status, message) => {
    set({ generationStatus: { status, message } });
  },

  appendCodeChunk: (chunk) => {
    set((state) => {
      const newCode = state.streamedCode + chunk;
      
      // Keep active project code in-sync
      const updatedProject = state.currentProject
        ? { ...state.currentProject, currentCode: newCode }
        : null;

      return {
        streamedCode: newCode,
        currentProject: updatedProject
      };
    });
  },

  clearGenerationState: () => {
    set({
      streamedCode: "",
      generationStatus: { status: "idle", message: "Ready to launch." }
    });
  },

  saveCompletedProject: (projectId, finalCode, userId) => {
    const storageKey = `pyarelal_projects_${userId}`;
    const updatedProjects = get().projects.map((p) => {
      if (p.id === projectId) {
        return { ...p, currentCode: finalCode, updatedAt: new Date().toISOString() };
      }
      return p;
    });
    
    localStorage.setItem(storageKey, JSON.stringify(updatedProjects));
    
    set((state) => {
      const currentUpdated = state.currentProject?.id === projectId
        ? { ...state.currentProject, currentCode: finalCode, updatedAt: new Date().toISOString() }
        : state.currentProject;

      return {
        projects: updatedProjects,
        currentProject: currentUpdated
      };
    });
  }
}));
