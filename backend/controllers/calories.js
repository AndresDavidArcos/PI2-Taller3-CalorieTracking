const GoogleGenerativeAI = require("@google/generative-ai");

module.exports = {
    async showCalories(req, res) {
        try {
            // const genAI = new GoogleGenerativeAI("AIzaSyD_3UsseiVPzZAQlC0khCb1YRPmCfa_5C4");

            // const model = genAI.getGenerativeModel({ model: "gemini-pro" });

            // const prompt = "I want you to analyze this prompt, and generate the ingredients and calories of the food in" + "a plate of pasta" + ". Answer with the following format: Ingredient1 : Calories1, Ingredient2 : Calories2, ...";

            // const result = await model.generateContent([prompt, image]);
            // console.log(result.response.text());
            console.log(req.body.text)

            res.status(200).json({ message: result.response.text() });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
