export default class PurAiApiError extends Error {
    response: any;

    constructor(message: string) {
        super(message);

        this.name = '[PurAI.js Error]';
    };
};
