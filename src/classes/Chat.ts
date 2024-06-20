import { ChatMessage, ChatMessageResolvable, ChatResponse, OpenAiChatResponse } from '../types/purAi.js';
import { resolveChatMessages } from '../utils/resolveChatMessages.js';
import { PurAi } from './PurAi.js';

/**
 * A Chat instance that allows you to chat with the model and keep track of the history
 */
export class Chat {
    #purAi: PurAi;
    /**
     * The model that the chat instance is using
     */
    model: string;
    /**
     * The history of the chat
     */
    history: ChatMessage[] = [];
    /**
     * **[OpenAI Style Only]** When enabled, only the unfiltered prompt will be used. Default is `false`
     */
    unfiltered: boolean;

    /**
     * Create a new Chat instance
     * @param purAi The PurAI instance to use
     * @param model The ID of the model to chat with
     * @param unfiltered **[OpenAI Style Only]** When enabled, only the unfiltered prompt will be used. Default is `false`
     */
    constructor(purAi: PurAi, model: string, unfiltered?: boolean) {
        this.#purAi = purAi;
        this.model = model;
        this.unfiltered = unfiltered;
    };

    /**
     * Add one or more messages to the chat history
     * @param messages The messages to add
     */
    addMessages(messages: ChatMessageResolvable | ChatMessageResolvable[]): void {
        this.history.push(...resolveChatMessages(messages));
    };

    /**
     * Reset the chat history
     */
    resetHistory(): void {
        this.history = [];
    };

    /**
     * Send one or more messages to the model and get a response
     * @param messages The messages to send
     * @returns The response from the model
     */
    async send(messages?: ChatMessageResolvable | ChatMessageResolvable[]): Promise<ChatResponse | OpenAiChatResponse> {
        if (messages) this.addMessages(messages);

        const response = await this.#purAi.chat(this.model, this.history, this.unfiltered);

        return response;
    };
};
