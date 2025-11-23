import type { Link, CreateLinkRequest, HealthResponse } from "../types/index";
import { API_URL, ENDPOINTS, HTTP_METHODS, ERROR_MESSAGES } from "../constants";

export const createLink = async (data: CreateLinkRequest): Promise<Link> => {
  const response = await fetch(`${API_URL}${ENDPOINTS.LINKS}`, {
    method: HTTP_METHODS.POST,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || ERROR_MESSAGES.CREATE_LINK);
  }

  return response.json();
};

export const getAllLinks = async (): Promise<Link[]> => {
  const response = await fetch(`${API_URL}${ENDPOINTS.LINKS}`);

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_LINKS);
  }

  return response.json();
};

export const getLinkStats = async (code: string): Promise<Link> => {
  const response = await fetch(`${API_URL}${ENDPOINTS.LINKS}/${code}`);

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.LINK_NOT_FOUND);
  }

  return response.json();
};

export const deleteLink = async (code: string): Promise<void> => {
  const response = await fetch(`${API_URL}${ENDPOINTS.LINKS}/${code}`, {
    method: HTTP_METHODS.DELETE,
  });

  if (!response.ok && response.status !== 204) {
    throw new Error(ERROR_MESSAGES.DELETE_LINK);
  }
};

export const healthCheck = async (): Promise<HealthResponse> => {
  const response = await fetch(`${API_URL}${ENDPOINTS.HEALTH}`);

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.HEALTH_CHECK);
  }

  return response.json();
};
