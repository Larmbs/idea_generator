# Configuring AI

AI is the most notable recent advancement of our time. It has reshaped the way interact with the web, giving us a plethora of services. Generative AIs like ChatGPT, Gemini, and Llama have played a pivotal role in this expansion. The field of deep learning is extremely costly though, demanding unbelievable amounts of compute, time, and energy. For the common man, AI is out of reach.

But, these large generative AIs have versatility, and can be configured to do a number of tasks. With a little clever prompting you can "program" the AI by setting boundaries and applying formatting.

## Project

Here I will be attempting to create an AI idea generator, that will spit out some interesting aircraft designs along with their names.

## Setup

The first step in configuring an AI is to get an AI. I have personally decided to use Google`s Gemini but feel free to use what you wish.

Following Google`s Gemini API Quick-Start, I quickly got a simple example going.

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

> To follow along if you are using a different AI, all you need to do is recreate this "generate function". It takes in a string and returns a string.

## Prompting

Now that everything is ready we need to understand how to prompt, to be a prompt engineer we must first understand our model. Every model is trained differently, meaning each respond differently to different prompting styles. For example, you could use ALL CAPS or use natural language or make use of special characters. This mean you need to do some research on your specific AI of choice.

I found that using ALL CAPS for constraints and using natural language for conveying the goal worked fine, but you should play around with it and maybe you'll find a better setup.

Example Prompt

```JS
`
YOU MUST PROVIDE A NEW IDEA.
MENTION ONE NAME.

Describe a unique aircraft design in detail, describe: wing structure/configuration, engine placement, engine types, control surfaces, seating, and capabilities.
`
```

## Styling

You may have noticed that your AIs response is messy an disorganized. Well there is a easy fix, HTML! this works with other languages to be frank but using a markup language like XML or HTML works great.

```JS
`
Please do this with tags like <h3> for the design name and <p> for the text.
`
```

By just specifying how we would like our data it has become way more useful.

## Repetition

Currently im just using Gemini`s API free plan, meaning I have a limited token amount (memory). Frustratingly I was finding myself in a loop where my model would keep giving the exact same name for aircraft over and over. To solve this you need to add a little entropy to the prompts forcing the AI to be a little more creative.

I came up with a simple fix where I just tell the AI straight up.

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
