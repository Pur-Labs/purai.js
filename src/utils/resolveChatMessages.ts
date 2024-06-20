import { ChatMessage, ChatMessageResolvable } from '../types/purAi.js';
import { resolveChatMessage } from './resolveChatMessage.js';

export function resolveChatMessages(messages: ChatMessageResolvable | ChatMessageResolvable[]): ChatMessage[] {
    return Array.isArray(messages) ? messages.map(resolveChatMessage) : [resolveChatMessage(messages)];
};
