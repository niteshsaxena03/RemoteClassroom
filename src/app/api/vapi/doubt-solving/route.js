import { NextResponse } from "next/server";

const ASSISTANT_ID = "6ae6dbdf-dfb8-4598-8cc9-eb534d67c47f";
const VAPI_WEB_TOKEN = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;

export async function POST(request) {
  try {
    const { question, context } = await request.json();

    if (!VAPI_WEB_TOKEN) {
      return NextResponse.json(
        { error: "VAPI web token not configured" },
        { status: 500 }
      );
    }

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    // Return configuration for web client
    const config = {
      assistantId: ASSISTANT_ID,
      webToken: VAPI_WEB_TOKEN,
      assistantOverrides: {
        firstMessage: context 
          ? `I'm here to help you with your doubt: "${question}". Based on the context: ${context}`
          : `I'm here to help you with your doubt: "${question}". Please ask me anything about this topic.`,
        variableValues: {
          question: question,
          context: context || ""
        }
      }
    };

    return NextResponse.json({
      success: true,
      config
    });

  } catch (error) {
    console.error("Error creating doubt solving session:", error);
    return NextResponse.json(
      { error: "Failed to create doubt solving session" },
      { status: 500 }
    );
  }
}