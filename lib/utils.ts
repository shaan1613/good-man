import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};

export const configureAssistant = (voice: string, style: string) => {
  const voiceId = voices[voice as keyof typeof voices][
          style as keyof (typeof voices)[keyof typeof voices]
          ] || "sarah";

  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    firstMessage:
        "Hello, let's start the session. Today we'll be talking about {{topic}}.",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.

                    Tutor Guidelines:
                    Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
                    Keep the conversation flowing smoothly while maintaining control.
                    From time to time make sure that the student is following you and understands you.
                    Break down the topic into smaller parts and teach the student one part at a time.
                    Keep your style of conversation {{ style }}.
                    Keep your responses short, like in a real voice conversation.
                    Do not include any special characters in your responses - this is a voice conversation.
              `,
        },
      ],
    },
    clientMessages: [] satisfies string[],
    serverMessages: [] satisfies string[],
  };
  return vapiAssistant;
};

export function calculateDailyStreak(dates: string[]): number {
  if (!dates.length) return 0;

  // Convert to Date objects and get only the date part (YYYY-MM-DD)
  const uniqueDays = Array.from(
    new Set(dates.map(dateStr => new Date(dateStr).toISOString().slice(0, 10)))
  ).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  let streak = 0;
  const current = new Date();

  for (const day of uniqueDays) {
    const dayDate = new Date(day);
    // If the day matches the current date, increment streak
    if (
      dayDate.getFullYear() === current.getFullYear() &&
      dayDate.getMonth() === current.getMonth() &&
      dayDate.getDate() === current.getDate()
    ) {
      streak++;
      // Move to previous day
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}