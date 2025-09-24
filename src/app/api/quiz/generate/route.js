import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Generate exactly 10 multiple choice questions about ${topic} for educational purposes. 
    Format your response as a valid JSON array with this exact structure:
    [
      {
        "id": 1,
        "question": "Question text here?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": 0,
        "explanation": "Brief explanation of why this is correct"
      }
    ]
    
    Requirements:
    - Each question should be educational and appropriate for intermediate level
    - Options should be plausible but only one correct
    - correctAnswer should be the index (0-3) of the correct option
    - Include brief explanations for learning
    - Make questions diverse within the ${topic} topic
    - Return ONLY the JSON array, no additional text or formatting`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response to extract JSON
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/```\n?/, '').replace(/\n?```$/, '');
    }

    try {
      const questions = JSON.parse(cleanText);
      
      // Validate the structure
      if (!Array.isArray(questions) || questions.length !== 10) {
        throw new Error('Invalid response format');
      }

      // Validate each question
      questions.forEach((q, index) => {
        if (!q.id || !q.question || !Array.isArray(q.options) || 
            q.options.length !== 4 || typeof q.correctAnswer !== 'number' ||
            q.correctAnswer < 0 || q.correctAnswer > 3 || !q.explanation) {
          throw new Error(`Invalid question format at index ${index}`);
        }
      });

      return NextResponse.json({
        success: true,
        questions,
        topic
      });

    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      return NextResponse.json(
        { error: 'Failed to generate valid quiz format' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Quiz generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz' },
      { status: 500 }
    );
  }
}