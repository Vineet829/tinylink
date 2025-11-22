export interface Link {
    code: string;
    targetUrl: string;
    totalClicks: number;
    lastClickedAt: string | null;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateLinkRequest {
    targetUrl: string;
    code?: string;
  }
  
  export interface HealthResponse {
    ok: boolean;
    version: string;
    uptime?: number;
    timestamp?: string;
  }
  