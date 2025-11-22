import type {Link, CreateLinkRequest, HealthResponse} from "../types/index"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const createLink = async (data: CreateLinkRequest): Promise<Link> => {
  const response = await fetch(`${API_URL}/api/links`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create link');
  }
  
  return response.json();
};

export const getAllLinks = async (): Promise<Link[]> => {
  const response = await fetch(`${API_URL}/api/links`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch links');
  }
  
  return response.json();
};

export const getLinkStats = async (code: string): Promise<Link> => {
  const response = await fetch(`${API_URL}/api/links/${code}`);
  
  if (!response.ok) {
    throw new Error('Link not found');
  }
  
  return response.json();
};

export const deleteLink = async (code: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/links/${code}`, {
    method: 'DELETE',
  });
  
  if (!response.ok && response.status !== 204) {
    throw new Error('Failed to delete link');
  }
};

export const healthCheck = async (): Promise<HealthResponse> => {
  const response = await fetch(`${API_URL}/healthz`);
  
  if (!response.ok) {
    throw new Error('Health check failed');
  }
  
  return response.json();
};
