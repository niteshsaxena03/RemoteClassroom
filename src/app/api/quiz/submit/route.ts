import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { answers, questions } = await request.json();

    if (!answers || !questions || !Array.isArray(answers) || !Array.isArray(questions)) {
      return NextResponse.json(
        { error: 'Invalid submission data' },
        { status: 400 }
      );
    }

    if (answers.length !== questions.length) {
      return NextResponse.json(
        { error: 'Answers and questions length mismatch' },
        { status: 400 }
      );
    }

    let correctCount = 0;
    const results = questions.map((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        correctCount++;
      }

      return {
        questionId: question.id,
        question: question.question,
        options: question.options,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation
      };
    });

    const score = (correctCount / questions.length) * 100;
    const totalQuestions = questions.length;

    // Performance analysis
    let performance = 'Needs Improvement';
    if (score >= 90) performance = 'Excellent';
    else if (score >= 80) performance = 'Very Good';
    else if (score >= 70) performance = 'Good';
    else if (score >= 60) performance = 'Average';

    const analysis = {
      score: Math.round(score * 100) / 100,
      correctAnswers: correctCount,
      totalQuestions,
      percentage: Math.round(score),
      performance,
      passStatus: score >= 70 ? 'Passed' : 'Failed',
      results,
      completedAt: new Date().toISOString(),
      topic: questions[0]?.topic || 'Unknown' // If topic is passed in questions
    };

    return NextResponse.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error('Quiz submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process quiz submission' },
      { status: 500 }
    );
  }
}
