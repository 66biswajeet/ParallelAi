import { api } from "./api";
import type { CreateProjectResponse, Project } from "../types";

export const projectService = {
  async createProject(name: string, initialPrompt: string): Promise<CreateProjectResponse> {
    const response = await api.post<CreateProjectResponse>("/api/project/create-project", {
      name,
      initialPrompt,
    });
    return response.data;
  },

  async getProjects(): Promise<{ success: boolean; message?: string; projects: Project[] }> {
    const response = await api.get<{ success: boolean; message?: string; projects: Project[] }>("/api/project/get-projects");
    return response.data;
  },

  async getProjectById(projectId: string): Promise<{ success: boolean; project: Project }> {
    const response = await api.get<{ success: boolean; project: Project }>(`/api/project/${projectId}`);
    return response.data;
  },
};

