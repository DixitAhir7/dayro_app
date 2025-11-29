const asyncHandler = require('express-async-handler');
const openAi = require('openai');
const { OpenAI } = openAi;
const { playAudio, recordAudio } = require("openai/helpers/audio");
const { run, Agent } = require('@openai/agents');
const aiModel = require('./aiModel');


const openai = new OpenAI({
    apiKey: process.env.OPENAI_APIKEY
});

const createquerry = asyncHandler(async (req, res) => {
    const { querry } = req.body;
    const userid = req.user.id;

    const openaiRes = await openai.embeddings.create({
        model: "text-embedding-3-large",
        encoding_format: "float",
        input: querry
    });

    const airesponse = openaiRes.data[0].embedding;

    const askaiData = aiModel.create({
        user: userid,
        querry: querry,
        response: airesponse,
        createdAt: Date.now()
    });

    return res.success(askaiData, "ai querry created", 201);
});



const texttospeech = asyncHandler(async (req, res) => {

    const { querry } = req.body;

    const texttospeechres = await openai.audio.speech.create({
        model: "gpt-4o-mini-tts",
        input: querry,
        voice: "alloy",
        instructions: "Speak in a cheerful and positive tone",
        response_format: "pcm"
    });

    await playAudio(texttospeechres);

    return res.success("audio played sucefully", 200);
});

const getquerry = asyncHandler(async (req, res) => {
    const user = req.user.id;
    const { querryid } = req.params;

    const getone = await aiModel.findOne({ user: user });

    return res.success(getone, "fetched querry sucefully", 200);
});



module.exports = {
    createquerry,
    texttospeech,
    getquerry
};