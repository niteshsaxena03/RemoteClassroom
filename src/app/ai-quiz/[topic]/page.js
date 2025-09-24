"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";

const topicDisplayNames = {
  "programming-languages": "Programming Languages",
  "data-structures-algorithms": "Data Structures & Algorithms",
  "system-design": "System Design", 
  "web-development": "Web Development",
  "database-management": "Database Management",
  "machine-learning": "Machine Learning"
};

export default function QuizPage({ params }) {
  const router = useRouter();
  const { user, currentUser, loading } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const topic = resolvedParams.topic;
  const displayName = topicDisplayNames[topic] || topic.replace('-', ' ');
  const authUser = user || currentUser;

  // Timer effect
  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmitQuiz();
    }
  }, [timeLeft, quizStarted]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate quiz questions
  const generateQuestions = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: displayName })
      });

      if (!response.ok) {
        throw new Error('Failed to generate quiz questions');
      }

      const data = await response.json();
      
      if (data.success && data.questions) {
        setQuestions(data.questions);
        setQuizStarted(true);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Start quiz
  useEffect(() => {
    if (authUser) {
      generateQuestions();
    }
  }, [authUser, topic]);

  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answerIndex
    });
  };

  // Navigate between questions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  // Submit quiz
  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    
    try {
      const answers = questions.map((_, index) => selectedAnswers[index] ?? -1);
      
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, questions })
      });

      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }

      const data = await response.json();
      
      if (data.success) {
        // Store results in sessionStorage for the analysis page
        sessionStorage.setItem('quizResults', JSON.stringify({
          ...data.analysis,
          topic: displayName
        }));
        
        router.push('/analysis');
      } else {
        throw new Error('Failed to process submission');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    router.push('/login');
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-red-900/30 border border-red-500 rounded-xl p-8 max-w-md w-full text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-400 mb-4">Quiz Error</h2>
          <p className="text-red-300 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={generateQuestions}
              className="w-full py-3 px-6 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/ai-quiz')}
              className="w-full py-3 px-6 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold transition-colors"
            >
              Back to Topics
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Generating Quiz...</h2>
          <p className="text-gray-400">AI is creating personalized questions for {displayName}</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const answeredQuestions = Object.keys(selectedAnswers).length;

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">{displayName} Quiz</h1>
              <p className="text-gray-400">Question {currentQuestionIndex + 1} of {questions.length}</p>
            </div>
            <div className="text-right">
              <div className={`text-lg font-bold ${timeLeft < 60 ? 'text-red-400' : 'text-blue-400'}`}>
                ⏱️ {formatTime(timeLeft)}
              </div>
              <p className="text-gray-400 text-sm">Time remaining</p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                  index === currentQuestionIndex
                    ? 'bg-blue-500 text-white'
                    : selectedAnswers[index] !== undefined
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-2">
            {answeredQuestions} of {questions.length} questions answered
          </p>
        </div>

        {/* Current Question */}
        <div className="bg-gray-800/50 rounded-xl p-8 mb-6">
          <h2 className="text-xl font-semibold text-white mb-6 leading-relaxed">
            {currentQuestion?.question}
          </h2>
          
          <div className="space-y-3">
            {currentQuestion?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-4 text-sm font-semibold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center space-x-2 py-3 px-6 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous</span>
          </button>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={isSubmitting}
              className="flex items-center space-x-2 py-3 px-8 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-xl font-semibold text-white transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Quiz</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={goToNextQuestion}
              className="flex items-center space-x-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white transition-colors"
            >
              <span>Next</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Submit Early Button */}
        {answeredQuestions === questions.length && (
          <div className="mt-6 text-center">
            <button
              onClick={handleSubmitQuiz}
              disabled={isSubmitting}
              className="py-3 px-8 bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded-xl font-semibold text-white transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quiz Early'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}