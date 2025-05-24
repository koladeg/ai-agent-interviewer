import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
    const { report_type, report_purpose, timeframe, key_metrics, urgency, extra_notes, userid } = await request.json();

    try {
        const { text: questions } = await generateText({
            model: google("gemini-2.0-flash-001"),
            prompt: `You are building a structured interview to gather all information needed for a report.
              
              1. ${report_type} - the kind of report, you are an expert in making this kind of report
              2. ${report_purpose} - is what the report is for 
              3. ${timeframe} - is the period the report covers like (e.g., Q1 2025, March 1–15, etc.)
              4. ${key_metrics} - are the key metrics, sections, or details that should be included in the report
              5. ${urgency} - is how soon the user needs the report (e.g., today, this week, etc.)
              6. ${extra_notes} - Are extra information the user wants to include for the report.
              
              Please generate **natural, user-friendly questions** to collect each of these parameters. 
              
              ### Requirements:
              1. The questions should be concise and conversational.
              2. Avoid technical jargon; make the questions easy to understand for a wide audience.
              3. Format the output as an array of questions.
              4. The response format should look like this:
                 \`\`\`json
                 [
                   "Question 1",
                   "Question 2",
                   "Question 3",
                   "Question 4",
                   "Question 5",
                   "Question 6"
                 ]
        

    `,
        });

        const report = {
            report_type: report_type,
            report_purpose: report_purpose,
            timeframe: timeframe,
            key_metrics: key_metrics,
            urgency: urgency,
            extra_notes: extra_notes,
            questions: JSON.parse(questions),
            userId: userid,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
        };

        await db.collection("reports").add(report);

        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ success: false, error: error }, { status: 500 });
    }
}

export async function GET() {
    return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}