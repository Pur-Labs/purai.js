# PurAI.js

PurAI.js is a simple JavaScript/TypeScript library that allows you to interact with the PurAI API.

## Installation

```bash
npm install purai.js
```

## Usage

### Setup

```js
const { PurAi, ApiStyle } = require('purai.js');

const purAi = new PurAi('your-api-key', {
    // apiStyle: ApiStyle.OpenAi // Allows you to interact with the PurAI API using the OpenAI style
});
```

### See the available models

```js
await purAi.models();
```

#### Example Response

```json
[
  {
    "type": "chatcompletion",
    "id": "claude-3-opus",
    "totalProviders": 2,
    "avaiableProviders": 2
  },
  {
    "type": "chatcompletion",
    "id": "claude-3-haiku",
    "totalProviders": 2,
    "avaiableProviders": 2
  },
  // ...
]
```

### Chat with a model

```js
await purAi.chat('Hello, how are you?');

await purAi.chat({
    role: 'user',
    content: 'Hello, how are you?'
});

await purAi.chat([
    {
        role: 'system',
        content: 'You are a helpful assistant.'
    },
    'Hello, how are you?'
]);
```

#### 1. PurAI Style Response

```json
{
    "provider": "c17ce511557f23e904e5dbaa8635651bec158d5ad512cce106b33a45a2be2cd2",
    "responseTime": 7229,
    "message": {
        "role": "assistant",
        "content": "Hello! As an AI language model, I don't have feelings, but I'm here and ready to help you with any questions or tasks you have. How can I assist you today?"
    },
    "history": [
        {
            "role": "user",
            "content": "Hello, how are you?"
        },
        {
            "role": "assistant",
            "content": "Hello! As an AI language model, I don't have feelings, but I'm here and ready to help you with any questions or tasks you have. How can I assist you today?"
        }
    ]
}
```

#### 2. OpenAI Style Response

```json
{
    "provider": "69f6d52b30f0ad4ef863d8fa1d4a8188baf1fcaa662209a27c7c05457c4a2374",
    "responseTime": 3665,
    "choices": [
        {
            "finishReason": "stop",
            "index": 0,
            "message": {
                "content": "Hello! I'm just a computer program, so I don't have feelings, but I'm here and ready to help you. What can I do for you today?",      
                "role": "assistant"
            }
        }
    ],
    "created": 1718905882921,
    "id": "chatcmpl-1718905882921-5wiun8dgp",
    "model": "gpt-4o",
    "object": "chat.completion",
    "usage": {
        "completionTokens": 1,
        "promptTokens": 1,
        "totalTokens": 2
    }
}
```

### Chat with a model using the special Chat class

```js
const { PurAi, Chat } = require('purai.js');

const purAi = new PurAi('your-api-key');
const chat = new Chat(purAi, 'gpt-4o');

await chat.send('Hello, how are you?');

chat.resetHistory();

await chat.send({
    role: 'user',
    content: 'Hello, how are you?'
});

chat.resetHistory();

await chat.send([
    {
        role: 'system',
        content: 'You are a helpful assistant.'
    },
    'Hello, how are you?'
]);

chat.resetHistory();

chat.addMessages({
    role: 'system',
    content: 'You are a helpful assistant.'
});

await chat.send('Hello, how are you?');
```

The responses are the same as the examples provided [here](#chat-with-a-model).

### Generate an image

> [!WARNING]
> Generally the images are expired after 5 minutes, depending on the provider.

```js
await purAi.generateImage('dalle-3', "Imagine a fluffy, ginger tabby cat lounging lazily in a patch of sunlight filtering through a window. Its fur glows with a warm, golden hue, accentuating the soft stripes that run along its back. The cat's eyes are a deep, amber color, reflecting the tranquility of its surroundings. It's curled up elegantly, with its tail neatly wrapped around its paws, exuding a sense of contentment and peace.");
```

#### 1. PurAI Style Response

```json
{
    "provider": "c17ce511557f23e904e5dbaa8635651bec158d5ad512cce106b33a45a2be2cd2",
    "responseTime": 7229,
    "image": "https://..."
}
```

#### 2. OpenAI Style Response

Image generation for OpenAI style is not supported yet.
