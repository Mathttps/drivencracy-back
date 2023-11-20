import dataBase from "../database/dataBase.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export async function createPoll(req, res) {
    const survey = req.body;

    if(!survey.title) {
        res.status(422).send("Title não pode ser uma string vazia");
        return;
    }
    try {
        const expireAt = survey.expireAt || dayjs().add(1, "month").format("YYYY/MM/DD HH:mm");
        await dataBase.collection("polls").insertOne({ ...survey, expireAt });
        res.status(201).send("OK");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function collectPoll(req, res) {
    const surveys = await dataBase.collection("polls").find().toArray();
    res.send(surveys);
}

// //  const mostVotedChoice = votes.reduce((max, vote) => max.votes > vote.votes ? max : vote, { title: "", votes: -1 });
// res.send({
//     ...survey,
//     result: mostVotedChoice,
// });
// } catch (err) {
// res.status(500).send(err.message);

export async function choiceIdPoll(req, res) {
    
    // const choice = res.locals.choice
    // const poll = await pollCollection.findOne({ _id: ObjectId(res.locals.choice.pollId) })
    // const isNewChoice = await choiceCollection.findOne({ title: choice.title })
    // const now = dayjs()

    const pollId = req.params.id;
    try {
        const survey = await dataBase.collection("polls").findOne({ _id: ObjectId(pollId) });
        if (!survey) return res.status(404).send("Enquete não existe");
        const choices = await dataBase.collection("choices").find({ pollId: ObjectId(pollId) }).toArray();
        res.send(choices);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function resultIdPoll(req, res) {
    const pollId = req.params.id;
    try {
        const survey = await dataBase.collection("polls").findOne({ _id: ObjectId(pollId) });
        if (!survey) return res.status(404).send("");
        const choices = await dataBase.collection("choices").find({ pollId: ObjectId(pollId) }).toArray();
        const votes = await Promise.all(choices.map(async (choice) => {
            const votesCount = await dataBase.collection("createChoices").countDocuments({ choiceId: choice._id });
            return { title: choice.title, votes: votesCount };
        }));
        const mostVotedChoice = votes.reduce((max, vote) => max.votes > vote.votes ? max : vote, { title: "", votes: -1 });
        res.send({
            ...survey,
            result: mostVotedChoice,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
}
