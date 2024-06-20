export default class PurAiApiError extends Error {
    response: any;

    constructor(response: Response, body: any, message: string) {
        super(`${message} (${response.status} ${response.statusText})`);

        this.name = '[PurAI API Error]';
        this.response = body ?? 'No response body';
    };
};
