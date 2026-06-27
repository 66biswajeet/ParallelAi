import { api } from "./api";
import type { CreateProjectResponse } from "../types";

export const projectService = {
  async createProject(name: string, initialPrompt: string): Promise<CreateProjectResponse> {
    const response = await api.post<CreateProjectResponse>("/api/project/create-project", {
      name,
      initialPrompt,
    });
    return response.data;
  },
};
