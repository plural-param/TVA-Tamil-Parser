'use server';

import {Buffer} from "buffer";
import {getUDGraph} from "@/app/actions/actions";

export async function ProcessConllu(formData) {
    const file = formData.get('conlluFile');
    let dataArray = [];
    await file.arrayBuffer()
        .then((data) => {
            const fileBuffer = Buffer.from(data);
            const conllu_text = fileBuffer.toString();
            dataArray = conllu_text.trim().split("\n\n")
        })

    let result = []
    for (const jsonObject of dataArray) {
        result.push(await getUDGraph(jsonObject + "\n\n"));
    }
    return result;
}

export async function processConlluText(formData) {
    const text = formData.get('text');
    const dataArray = text.trim().split("\n\n");
    let result = []
    for (const jsonObject of dataArray) {
        result.push(await getUDGraph(jsonObject + "\n\n"));
    }
    return result;
}