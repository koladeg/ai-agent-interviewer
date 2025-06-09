import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
    const {
        report_type,
        report_purpose,
        timeframe,
        key_metrics,
        urgency,
        extra_notes,
        userid
    } = await request.json();

    try {
        const { text: questions } = await generateText({
            model: google("gemini-2.0-flash-001"),
            prompt: `You are building a structured interview to gather all information needed for a report.

            Type: ${report_type}
            Purpose: ${report_purpose}
            Timeframe: ${timeframe}
            Key Metrics/Sections: ${key_metrics}
            Urgency: ${urgency}
            Additional Notes: ${extra_notes}
            
            Goals:
            1. Cover every section or metric listed under Key Metrics/Sections with at least one dedicated question.
            2. Drill into any dates, figures, or names mentioned—e.g., “Could you specify the exact budget figures for X?”
            3. Surface any missing context needed for a professional report (stakeholders, assumptions, risks).
            
            Generate concise questions to collect the necessary details for this report. Format the questions as an array:
            ["Question 1", "Question 2", "Question 3"].

            The questions will be used by a voice assistant that will be talking primarily to an educated lagos nigerian based audience, 
            so avoid special characters or formatting that might break the flow and align question more to that audience .
                    
    `,
        });

        const report = {
            report_type: report_type,
            report_purpose: report_purpose,
            timeframe: timeframe,
            key_metrics: key_metrics,
            urgency: urgency,
            extra_notes: extra_notes,
            questions: questions,
            userId: userid,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
        };

        console.log("report", report)

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