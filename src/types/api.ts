import { ChatMessage } from './purAi.js';

export type ApiVersion = `v${number}`;

export enum ApiRequestPath {
    Models = 'models',
    ChatCompletions = 'chat/completions',
    OpenAiChatCompletions = 'openai/chat/completions',
    ImageGenerate = 'image/generate'
};

export enum ApiRequestMethod {
    Get = 'GET',
    Post = 'POST'
};

export interface ApiChatCompletionsPostRequest {
    model: string;
    messages: ChatMessage[];
};

export interface ApiOpenAiChatCompletionsPostRequest extends ApiChatCompletionsPostRequest {
    filtered: boolean;
};

export interface ApiImageGeneratePostRequest {
    model: string;
    prompt: string;
};

export type ApiRequest = ApiChatCompletionsPostRequest | ApiOpenAiChatCompletionsPostRequest | ApiImageGeneratePostRequest;

export interface ApiRequestOptions {
    body?: ApiRequest;
};

export interface ApiChatCompletionsPostResponseResponse {
    messages: ChatMessage[];
};

export type ApiTook = `${number} ms`;

export interface BaseApiResponse {
    provider: string;
    took: ApiTook;
};

export interface ApiChatCompletionsPostResponse extends BaseApiResponse {
    response: ApiChatCompletionsPostResponseResponse;
};

export interface ApiOpenAiChatCompletionsPostResponseChoice {
    finish_reason: string;
    index: number;
    message: ChatMessage;
    logprops?: null;
};

export interface ApiOpenAiChatCompletionsPostResponseUsage {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
};

export interface ApiOpenAiChatCompletionsPostResponse extends BaseApiResponse {
    choices: ApiOpenAiChatCompletionsPostResponseChoice[];
    created: number;
    id: string;
    model: string;
    object: string;
    usage: ApiOpenAiChatCompletionsPostResponseUsage;
};

export interface ApiImageGeneratePostResponse extends BaseApiResponse {
    response: string;
};

export type ApiResponse = ApiChatCompletionsPostResponse | ApiOpenAiChatCompletionsPostResponse | ApiImageGeneratePostResponse;
