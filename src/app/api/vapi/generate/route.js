import { NextResponse } from "next/server";

const VAPI_API_KEY = process.env.VAPI_API_KEY;
const ASSISTANT_ID = "6ae6dbdf-dfb8-4598-8cc9-eb534d67c47f";

export async function POST(request) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!VAPI_API_KEY) {
      return NextResponse.json(
        { error: "VAPI API key not configured" },
        { status: 500 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Call VAPI API to create a call with your assistant
    const response = await fetch("https://api.vapi.ai/call", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${VAPI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assistant: {
          id: ASSISTANT_ID
        },
        customer: {
          number: "+1234567890" // Placeholder - you can make this dynamic
        },
        // Additional context from conversation history if needed
        assistantOverrides: {
          firstMessage: `User question: ${message}${conversationHistory ? `\n\nConversation history: ${JSON.stringify(conversationHistory)}` : ''}`
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("VAPI API error:", errorData);
      return NextResponse.json(
        { error: "Failed to create VAPI call" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      callId: data.id,
      status: data.status,
      message: "Doubt solving session initiated"
    });

  } catch (error) {
    console.error("Doubt solving error:", error);
    return NextResponse.json(
      { error: "Failed to process doubt solving request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "VAPI Doubt Solving API is ready",
    assistantId: ASSISTANT_ID
  });
}