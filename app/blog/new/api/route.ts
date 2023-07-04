import { NextResponse } from "next/server";
import { Configuration, CreateCompletionResponse, OpenAIApi } from "openai";

const OAIConfiguration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
let openai = new OpenAIApi(OAIConfiguration);
// request to generate ai improvements
export async function POST(request:Request) {
    let data = await request.json();
    let aiRes = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "improve SEO by malforming the content with the following keywords: " + data.keywords + "\n\ncontent: " + data.content,
        max_tokens: 50,
        n: 1,
        stop: undefined,
        temperature: .2,
    
    }).then(r=>r.data,f=>console.log(f.data)) as CreateCompletionResponse;
    return NextResponse.json({content:aiRes.choices[0].text});
}