import { NextRequest, NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: NextRequest) {
  const { messages } = (await request.json()) as { messages: ChatMessage[] };

  const lastUserMessage = [...messages]
    .reverse()
    .find((m) => m.role === "user")?.content;

  const replyText =
    "This is a demo AI response. In production, this endpoint would call a real AI model. " +
    (lastUserMessage ? `You asked: "${lastUserMessage}".` : "");

  const reply: ChatMessage = {
    role: "assistant",
    content: replyText
  };

  return NextResponse.json({ reply });
}
