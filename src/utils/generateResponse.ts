import { ApiResponse } from '../types/api.js';

export function generateResponse<Response>(response: ApiResponse, data: Partial<Response>): Response {
    return {
        provider: response.provider,
        responseTime: parseInt(response.took.replace('ms', '').trim()),
        ...data
    } as Response;
};
