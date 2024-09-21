const { GoogleGenerativeAI } = require("@google/generative-ai");
const env = process.env;
const fs = require("fs");

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType,
      },
    };
  }

async function geminiResponse(body) {
    console.log(env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log(body);
    const imagePart = fileToGenerativePart(
        body.path,
        "image/png",
      );
    let prompt = "You will act as a resume reviewer. I will provide you an image. Rate it out of 10. give Positives, Negatives and Feedbacks. Directly provide - score (bold, big and should be out of 10, like - 1/10, 10/10 etc), positive (max 5 points), negatives(max 5 points) and feedback (4 lines), that's it. Respond in english only."
    const result = await model.generateContent([prompt, imagePart]);
    const response = result.response;
    const text = response.text();
    return text;
}

module.exports = {
    geminiResponse: geminiResponse
}