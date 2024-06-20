import { ApiRequest, ApiRequestMethod, ApiRequestOptions, ApiRequestPath } from '../types/api.js';
import PurAiApiError from './PurAiApiError.js';

export class Http {
    key: string;
    baseUrl: string;

    constructor(key: string, baseUrl: string) {
        this.key = key;
        this.baseUrl = baseUrl;
    };

    async check(response: Response): Promise<any> {
        const body = await response.json().catch(() => null) as any;

        if (!response.ok) {
            switch (response.status) {
                case 400: {
                    throw new PurAiApiError(response, body, 'Invalid request');
                };
                case 500: {
                    throw new PurAiApiError(response, body, 'An internal server error occurred while processing the request, try again later');
                };
                default: {
                    throw new PurAiApiError(response, body, 'Unknown error');
                };
            };
        };
        if (!body || body.error) throw new PurAiApiError(response, body, 'Unknown error');

        return body;
    };

    request(method: ApiRequestMethod, path: ApiRequestPath, options?: ApiRequestOptions): Promise<Response> {
        return fetch(`${this.baseUrl}/${path}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.key}`
            },
            body: typeof options?.body === 'object' ? JSON.stringify(options.body) : undefined
        });
    };

    async get(path: ApiRequestPath) {
        const response = await this.request(ApiRequestMethod.Get, path);

        return this.check(response);
    };

    async post(path: ApiRequestPath, body: ApiRequest) {
        const response = await this.request(ApiRequestMethod.Post, path, { body });

        return this.check(response);
    };
};
