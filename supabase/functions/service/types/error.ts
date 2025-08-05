export interface ErrorResponse {
  error: {
    code: number;
    status: string;
    message: string;
    reason?: string;
    details?: Record<string, unknown>;
    timestamp: string;
    path: string;
  };
  success: false;
}
