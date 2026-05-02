import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

const requestSchema = z.object({
  message: z.string().min(1, 'Message is required').max(1000, 'Message is too long'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = requestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ 
        error: 'Invalid request data', 
        details: result.error.format() 
      }, { status: 400 });
    }

    const { message } = result.data;
    const lowerMsg = message.toLowerCase();
    
    // Comprehensive Election Knowledge Base (Mock AI)
    let responseText = "Namaste! I am your Indian Election Assistant. I can help you understand voter registration, EVMs, the Model Code of Conduct, and more. What would you like to know?";

    if (lowerMsg.includes('evm') || lowerMsg.includes('vvpat') || lowerMsg.includes('machine')) {
      responseText = "### Electronic Voting Machines (EVM) & VVPAT\n\nAn **EVM** consists of two units: a **Control Unit** (with the polling officer) and a **Balloting Unit** (in the voting compartment). \n\nSince 2019, all EVMs are paired with a **VVPAT** (Voter Verifiable Paper Audit Trail). When you cast your vote, the VVPAT shows a paper slip for 7 seconds showing the candidate's serial number, name, and symbol, allowing you to verify your vote before it drops into a sealed box.";
    } else if (lowerMsg.includes('register') || lowerMsg.includes('voter id') || lowerMsg.includes('form 6')) {
      responseText = "### Voter Registration\n\nTo vote in Indian elections, you must be a citizen of India and at least **18 years old** on the qualifying date (usually Jan 1st, April 1st, July 1st, or Oct 1st).\n\n**How to register:**\n1. Use **Form 6** for new registration.\n2. Apply online via the [Voter Service Portal](https://voters.eci.gov.in/).\n3. Use the **Voter Helpline App** on your smartphone.\n4. Visit your local **Booth Level Officer (BLO)**.";
    } else if (lowerMsg.includes('conduct') || lowerMsg.includes('mcc') || lowerMsg.includes('code')) {
      responseText = "### Model Code of Conduct (MCC)\n\nThe **MCC** is a set of guidelines issued by the Election Commission of India. It comes into effect the moment the election schedule is announced.\n\n**Key Rules:**\n*   **No new projects:** Governments cannot announce new projects or financial grants.\n*   **Publicity:** Official machinery (like government vehicles) cannot be used for campaigning.\n*   **Speeches:** Parties must avoid making appeals based on caste or communal feelings.";
    } else if (lowerMsg.includes('ink') || lowerMsg.includes('finger')) {
      responseText = "### Indelible Ink\n\nThe purple ink applied to your left forefinger is **Indelible Ink**. It is made of Silver Nitrate, which reacts with the skin to leave a mark that cannot be washed off for several weeks. This prevents 'duplicate voting' and ensures the 'One Person, One Vote' principle.";
    } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('help')) {
      responseText = "Hello! I am here to help you learn about the world's largest democracy. You can ask me about:\n\n*   **How to get a Voter ID**\n*   **How EVMs work**\n*   **Election rules (MCC)**\n*   **The meaning of the purple ink**\n*   **Who can vote in India**";
    } else if (lowerMsg.includes('who') && (lowerMsg.includes('vote') || lowerMsg.includes('eligible'))) {
      responseText = "### Eligibility to Vote\n\nAny Indian citizen who is:\n1.  **18 years of age** or older on the qualifying date.\n2.  An **ordinary resident** in the constituency.\n3.  **Not disqualified** (e.g., of unsound mind or convicted of certain electoral offenses).\n\nNote: You must be registered in the **Electoral Roll** of your constituency to cast a vote.";
    }

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ 
      error: 'An unexpected error occurred while processing your request.' 
    }, { status: 500 });
  }
}
