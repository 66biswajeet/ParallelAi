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
  loadProjects: (userId: string) => Promise<void>;
  createProject: (name: string, initialPrompt: string, userId: string) => Promise<Project>;
  setCurrentProject: (project: Project | null) => void;
  loadProjectById: (projectId: string) => Promise<Project>;
  setGenerationStatus: (status: GenerationStatus["status"], message: string) => void;
  appendCodeChunk: (chunk: string) => void;
  clearGenerationState: () => void;
  saveCompletedProject: (projectId: string, finalCode: string, userId: string) => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,
  generationStatus: { status: "idle", message: "Ready to launch generation." },
  streamedCode: "",
  isLoading: false,
  error: null,

  loadProjects: async (_userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await projectService.getProjects();
      if (response.success && response.projects) {
        set({ projects: response.projects, error: null });
      } else {
        throw new Error(response.message || "Failed to load projects.");
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Failed to load projects.";
      set({ error: errMsg, projects: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  createProject: async (name, initialPrompt, _userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await projectService.createProject(name, initialPrompt);
      if (response.success && response.project) {
        const newProject = response.project;
        
        const currentProjects = get().projects;
        const updatedProjects = [newProject, ...currentProjects];
        
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

  loadProjectById: async (projectId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await projectService.getProjectById(projectId);
      if (response.success && response.project) {
        const project = response.project;
        set({
          currentProject: project,
          streamedCode: project.currentCode || "",
          generationStatus: project.currentCode
            ? { status: "completed", message: "Loaded project code sandbox from database." }
            : { status: "idle", message: "Awaiting generation..." },
          error: null
        });
        return project;
      } else {
        throw new Error("Project not found");
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Failed to load project details.";
      set({ error: errMsg });
      throw new Error(errMsg);
    } finally {
      set({ isLoading: false });
    }
  },

  setGenerationStatus: (status, message) => {
    const nextState: Partial<ProjectState> = {
      generationStatus: { status, message }
    };
    if (status === "streaming_code" || status === "refining_prompt") {
      nextState.streamedCode = "";
    }
    set(nextState);
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

  saveCompletedProject: (projectId, finalCode, _userId) => {
    set((state) => {
      const updatedProjects = state.projects.map((p) => {
        if (p.id === projectId) {
          return { ...p, currentCode: finalCode, updatedAt: new Date().toISOString() };
        }
        return p;
      });

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
