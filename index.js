import { GoogleGenerativeAI } from "@google/generative-ai";

var genAI, model, prev_key;

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const api_key_form = document.getElementById("api-key-form");

const output = document.getElementById("output");

api_key_form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  let key = formProps["api-key"];
  if (key) {
    if (prev_key != key) {
      genAI = new GoogleGenerativeAI(key);
      model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      prev_key = key;
    }
    gen_idea();
  }
});

async function gen_idea() {
  output.innerHTML = null;

  let text = await generate(`
    NAME MUST CONTAIN THE LETTERS ${random_char()}, ${random_char()}, AND ${random_char()}.
    YOU MUST PROVIDE A NEW IDEA.
    MENTION ONE NAME.

    Describe a unique aircraft design in detail, describe: wing structure/configuration, 
    engine placement, engine types, control surfaces, seating, and capabilities.

    Make the description short and sweet, max length should be two paragraphs.
    
    Focus on giving a engineers perspective on the aircraft design, target this 
    descriptive message to Aerospace engineers.

    Please give the design a name.

    Please do this with tags like <h3> for the design name and <p> for the text.
    `);

  output.insertAdjacentHTML("beforeend", text);
}

async function generate(prompt) {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

function random_char() {
  return chars.charAt(Math.floor(Math.random() * chars.length));
}
