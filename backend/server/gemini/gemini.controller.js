const gemini = require('../helpers/geminiService')

async function getGeminiResponse(req, res, next) {
    try {
        const body = req.file;
        // const pdfBuffer = fs.readFileSync(body);
        console.log(body);
        // if (!body.hasOwnProperty("img")) {
        //     return res.status(400).send({ message: "input is required" });
        // }
        let result = await gemini.geminiResponse(body);
        // console.log(result);
        res.send({ result: result });
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getGeminiResponse: getGeminiResponse
}