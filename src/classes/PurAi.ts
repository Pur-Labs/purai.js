import { ApiChatCompletionsPostRequest, ApiChatCompletionsPostResponse, ApiImageGeneratePostRequest, ApiImageGeneratePostResponse, ApiOpenAiChatCompletionsPostRequest, ApiOpenAiChatCompletionsPostResponse, ApiRequestPath } from '../types/api.js';
import { ApiStyle, ChatMessageResolvable, ChatResponse, GenerateImageResponse, Model, OpenAiChatResponse, PurAiOptions } from '../types/purAi.js';
import { generateResponse } from '../utils/generateResponse.js';
import { resolveChatMessages } from '../utils/resolveChatMessages.js';
import { Http } from './Http.js';
import PurAiError from './PurAiError.js';

/**
 * The PurAI class that allows you to interact with the PurAI API
 */
export class PurAi {
    #key: string;
    #http: Http;
    /**
     * The options used for the PurAI instance
     */
    options: PurAiOptions;

    /**
     * Create a new PurAI instance
     * @param key The API key to use
     * @param options The options to use for the PurAI instance
     */
    constructor(key: string, options: Partial<PurAiOptions> = {}) {
        this.#key = key;
        this.options = Object.assign({
            baseUrl: 'https://indev.alpha.api.purlabs.xyz/api',
            version: 'v1',
            apiStyle: ApiStyle.Default
        } as PurAiOptions, options);
        this.#http = new Http(this.#key, `${this.options.baseUrl}/${this.options.version}`);
    };

    /**
     * Get all the models are in the API
     * @returns A list of models
     */
    async models(): Promise<Model[]> {
        return await this.#http.get(ApiRequestPath.Models);
    };

    /**
     * Send one or more messages to a model and get a response
     * @param model The ID of the model to chat with
     * @param messages The messages to send
     * @param unfiltered **[OpenAI Style Only]** When enabled, only the unfiltered prompt will be used. Default is `false`
     * @returns The response from the model
     */
    async chat(model: string, messages: ChatMessageResolvable | ChatMessageResolvable[], unfiltered: boolean = false): Promise<ChatResponse | OpenAiChatResponse> {
        switch (this.options.apiStyle) {
            case ApiStyle.Default: {
                const response: ApiChatCompletionsPostResponse = await this.#http.post(ApiRequestPath.ChatCompletions, {
                    model,
                    messages: resolveChatMessages(messages)
                } as ApiChatCompletionsPostRequest);

                return generateResponse<ChatResponse>(response, {
                    message: response.response.messages[response.response.messages.length - 1],
                    history: response.response.messages
                });
            };
            case ApiStyle.OpenAi: {
                const response: ApiOpenAiChatCompletionsPostResponse = await this.#http.post(ApiRequestPath.OpenAiChatCompletions, {
                    model,
                    filtered: !unfiltered,
                    messages: resolveChatMessages(messages)
                } as ApiOpenAiChatCompletionsPostRequest);

                return generateResponse<OpenAiChatResponse>(response, {
                    choices: response.choices.map(choice => ({
                        finishReason: choice.finish_reason,
                        index: choice.index,
                        message: choice.message,
                        ...(choice.logprops ? { logProps: choice.logprops } : {})
                    })),
                    created: response.created,
                    id: response.id,
                    model: response.model,
                    object: response.object,
                    usage: {
                        completionTokens: response.usage.completion_tokens,
                        promptTokens: response.usage.prompt_tokens,
                        totalTokens: response.usage.total_tokens
                    }
                });
            };
        };
    };

    /**
     * Generate an image based on a prompt
     * @param model The ID of the model to use
     * @param prompt The prompt to generate the image from
     * @returns The generated image
     */
    async generateImage(model: string, prompt: string): Promise<GenerateImageResponse> {
        switch (this.options.apiStyle) {
            case ApiStyle.Default: {
                const response: ApiImageGeneratePostResponse = await this.#http.post(ApiRequestPath.ImageGenerate, {
                    model,
                    prompt
                } as ApiImageGeneratePostRequest);

                return generateResponse<GenerateImageResponse>(response, {
                    image: response.response
                });
            };
            case ApiStyle.OpenAi: {
                throw new PurAiError('OpenAI style is not supported for image generation yet');
            };
        };
    };
};
