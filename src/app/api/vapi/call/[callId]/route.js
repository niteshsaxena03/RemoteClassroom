import { NextResponse } from "next/server";

const VAPI_API_KEY = process.env.VAPI_API_KEY;

export async function GET(request, { params }) {
  try {
    if (!VAPI_API_KEY) {
      return NextResponse.json(
        { error: "VAPI API key not configured" },
        { status: 500 }
      );
    }

    // In Next.js 15, params is now a Promise
    const resolvedParams = await params;
    const callId = resolvedParams.callId;

    const response = await fetch(`https://api.vapi.ai/call/${callId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${VAPI_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to get call status" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      call: data
    });

  } catch (error) {
    console.error("Error getting call status:", error);
    return NextResponse.json(
      { error: "Failed to get call status" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!VAPI_API_KEY) {
      return NextResponse.json(
        { error: "VAPI API key not configured" },
        { status: 500 }
      );
    }

    // In Next.js 15, params is now a Promise
    const resolvedParams = await params;
    const callId = resolvedParams.callId;

    const response = await fetch(`https://api.vapi.ai/call/${callId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${VAPI_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to end call" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Call ended successfully"
    });

  } catch (error) {
    console.error("Error ending call:", error);
    return NextResponse.json(
      { error: "Failed to end call" },
      { status: 500 }
    );
  }
}