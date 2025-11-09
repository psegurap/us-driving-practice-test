"use server"
import { promises as fs } from 'fs';
import path from "path";

export default async function getQuestions(file) {
    const questions = await fs.readFile(
        path.join(process.cwd(), `/src/jsons/questions/${file}`),
        "utf-8"
    );
    return questions
}