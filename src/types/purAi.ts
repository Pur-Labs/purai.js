import { ApiVersion } from './api.js';

/**
 * PurAI API Styles
 */
export enum ApiStyle {
    /**
     * Requests and responses are in the default format
     */
    Default,
    /**
     * Requests and responses are in the OpenAI format
     */
    OpenAi
};

/**
 * PurAI API Options
 */
export interface PurAiOptions {
    /**
     * The base URL of the API
     * @default 'https://indev.alpha.api.purlabs.xyz/api'
     */
    baseUrl: string;
    /**
     * The version of the API
     * @default 'v1'
     */
    version: ApiVersion;
    /**
     * The API style will be used for requests and responses
     * @default ApiStyle.Default
     */
    apiStyle: ApiStyle;
};

/**
 * Model Types
 */
export enum ModelType {
    /**
     * Chat completion models are used for generating chat responses
     */
    ChatCompletion = 'chatcompletion',
    /**
     * Image generation models are used for generating images
     */
    ImageGeneration = 'imagegeneration'
};

/**
 * Model
 */
export interface Model {
    /**
     * The type of the model
     */
    type: ModelType;
    /**
     * The ID of the model
     */
    id: string;
    /**
     * The amount of providers of the model
     */
    totalProviders: number;
    /**
     * The amount of available providers of the model
     */
    availableProviders: number;
};

/**
 * Chat Message
 */
export interface ChatMessage {
    /**
     * The role of the message author
     */
    role: string;
    /**
     * The content of the message
     */
    content: string;
};

/**
 * Base Response
 */
export interface BaseResponse {
    /**
     * The used provider to process the request
     */
    provider: string;
    /**
     * The response time in milliseconds
     */
    responseTime: number;
};

/**
 * Chat Response
 */
export interface ChatResponse extends BaseResponse {
    /**
     * The message that was generated by the model
     */
    message: ChatMessage;
    /**
     * All the messages used to generate the response including the generated message
     */
    history: ChatMessage[];
};

/**
 * Resolvable Chat Message
 */
export type ChatMessageResolvable = ChatMessage | string;

/**
 * One of the generated choices by the model
 */
export interface OpenAiChatResponseChoice {
    /**
     * The reason why the model finished generating the response
     */
    finishReason: string;
    /**
     * The index of the choice
     */
    index: number;
    /**
     * The generated message
     */
    message: ChatMessage;
    /**
     * The log properties of the choice
     */
    logprops?: null;
};

/**
 * The amount of tokens used by the model
 */
export interface OpenAiChatResponseUsage {
    /**
     * The amount of tokens used for generating the response
     */
    completionTokens: number;
    /**
     * The amount of tokens used for the prompt
     */
    promptTokens: number;
    /**
     * The total amount of tokens used for the request
     */
    totalTokens: number;
};

/**
 * Chat Response in OpenAI format
 */
export interface OpenAiChatResponse extends BaseResponse {
    /**
     * The generated choices by the model
     */
    choices: OpenAiChatResponseChoice[];
    /**
     * The timestamp when the response was created
     */
    created: number;
    /**
     * The ID of the response
     */
    id: string;
    /**
     * The ID of the model that generated the response
     */
    model: string;
    /**
     * The object type of the response
     */
    object: string;
    /**
     * The amount of tokens used by the model
     */
    usage: OpenAiChatResponseUsage;
};

/**
 * Image Generation Response
 */
export interface GenerateImageResponse extends BaseResponse {
    /**
     * The generated image URL. Generally expires in 5 minutes
     */
    image: string;
};