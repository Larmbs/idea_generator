# Prompt Engineering

Artificial Intelligence (AI) is one of the most significant advancements of our time. It has transformed how we interact with the web, offering a wide array of services. Generative AIs like ChatGPT, Gemini, and Llama have played a pivotal role in this expansion. However, the field of deep learning is incredibly costly, demanding vast amounts of computing power, time, and energy. For the average person, AI can feel out of reach.

Despite this, these large generative AIs are versatile and can be configured to perform a variety of tasks. With some clever prompting, you can "program" the AI by setting boundaries and applying specific formatting.

## Project

Here I will be attempting to create an AI idea generator, that will spit out some interesting aircraft designs along with their names.

[Try it here](https://larmbs.github.io/idea_generator/)

## Setup

The first step in configuring an AI is to choose the right one. I have personally decided to use Google’s Gemini, but feel free to use the AI of your choice.

Following Google’s Gemini API Quick-Start, I quickly got a simple example running.

```JS
import { GoogleGenerativeAI } from "@google/generative-ai";

var genAI, model;

genAI = new GoogleGenerativeAI("My-API-Key");
model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function which send prompt and returns a response
async function generate(prompt) {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

console.log(await generate("Hello there Gemini"))
```

> Note: If you are using a different AI, simply recreate this "generate" function. It takes a string as input and returns a string as output.

## Prompting

Now that everything is set up, it’s essential to understand how to prompt effectively. To be a prompt engineer, you must first understand your model. Every model is trained differently, meaning each will respond differently to various prompting styles. For example, you might use ALL CAPS, natural language, or special characters. This means you need to do some research on your specific AI of choice.

I found that using ALL CAPS for constraints and natural language for conveying the goal works well, but you should experiment to find what works best for you.

#### Example Prompt:

```JS
`
YOU MUST PROVIDE A NEW IDEA.
MENTION ONE NAME.

Describe a unique aircraft design in detail, describe: wing structure/configuration, engine placement, engine types, control surfaces, seating, and capabilities.
`
```

## Styling

You may have noticed that the AI’s response can be messy and disorganized. Fortunately, there’s an easy fix: HTML! This works well with other languages too, but using a markup language like XML or HTML can greatly improve readability.

```JS
`
Please do this with tags like <h3> for the design name and <p> for the text.
OUTPUT SHOULD BE IN HTML FORM.
`
```

By specifying how we’d like our data presented, it becomes much more useful.

## Repetition

Currently, I’m using Gemini’s API free plan, which means I have a limited token amount (memory). Frustratingly, I found myself in a loop where my model kept generating the same aircraft names repeatedly. To solve this, I introduced a bit of entropy into the prompts, forcing the AI to be more creative.

I came up with a simple fix by directly instructing the AI:

```JS
`
NAME MUST CONTAIN THE LETTERS ${random_char()}, ${random_char()}, AND ${random_char()}.
`
function random_char() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return chars.charAt(Math.floor(Math.random() * chars.length));
}
```

I simply force the AI to use 3 random letters. I believe this helps with the AI having some more creative names and descriptions than before as its being broken out of a loop with a random number generator

---

> Note: I used Gemini in the making of this, you may find it easier or harder to get useful responses.

#### Sources:

- [Medium | Prompts Masterclass Output Formatting Custom Output 6 2](https://pub.aimind.so/prompts-masterclass-output-formatting-custom-output-6-256bb3b0d14e)
- [Google's Gemini API Quickstart](https://ai.google.dev/gemini-api/docs/quickstart?lang=web)
