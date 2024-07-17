'use server';

import axios from "axios";
import {Resend} from 'resend';

export async function convertUD(data) {
    data.feature = await getUDGraph(data.feature)
    return data
}

export async function getResult(formData) {
    try {
        const text = formData.get('text')

        const response = await axios.post(`http://plural.iiit.ac.in/api/tamilparser/server/get_trankit_graph_data`, {
            data: text,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        let result = []
        let treeView;
        for (const jsonObject of response.data) {
            treeView = jsonObject.feature.trim().split("\n")
            const newObj = await convertUD(jsonObject)
            newObj.treeView = treeView;
            result.push(newObj);
        }
        return result;
    } catch (error) {
        console.log(error)
        return [];
    }
}

export async function getUDGraph(data) {
    try {
        let response = await axios.post('http://localhost:8090/visualizeGraph',
            {data: data}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        return `${response.data}`;
    } catch (error) {
        console.log(error)
        return "";
    }
}

export async function sendEmail(formData) {
    try {
        const name = formData.get("name");
        const email = formData.get("email");
        const feedback_text = formData.get("feedback_text");
        const sentence = formData.get("sentence");
        const treebank = formData.get("treebank");

        const resend = new Resend('re_EBQCNL9Z_KYyTm3nzpHFJ9q3muvMhsjgG');

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'ltrcplural@gmail.com',
            subject: 'Tamil Parser Feedback',
            html: `
                <h2>From: </h2>
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <br/>
                <h2>Feedback</h2>
                <p>${feedback_text}</p>
                <br/>
                <h2>Sentence</h2>
                <p>${sentence}</p>
                <br/>
                <h2>Treebank</h2>
                <table style="border-collapse: collapse; width: 100%;">
                    <tr>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">ID</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">FORM</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">LEMMA</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">UPOSTAG</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">XPOSTAG</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">FEATS</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">HEAD</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">DEPREL</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">DEPS</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">MISC</th>
                    </tr>
                        ${treebank}
                </table>
            `
        });
        return "mail_sent"
    } catch (error) {
        console.log(error)
        return "mail_sent_error"
    }
}