import { ChatMessage, ChatMessageResolvable } from '../types/purAi.js';
import { chatMessage } from './chatMessage.js';

export function resolveChatMessage(message: ChatMessageResolvable): ChatMessage {
    return typeof message === 'string' ? chatMessage('user', message) : message;
};
