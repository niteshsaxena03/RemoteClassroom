"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";

export default function AnalysisPage() {
  const router = useRouter();
  const { user, currentUser, loading } = useAuth();
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authUser = user || currentUser;

  useEffect(() => {
    // Don't redirect if still loading auth state
    if (loading) return;
    
    if (!authUser) {
      router.push('/login');
      return;
    }

    // Get results from sessionStorage
    const storedResults = sessionStorage.getItem('quizResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      router.push('/ai-quiz');
    }
    setIsLoading(false);
  }, [authUser, router, loading]);

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'Excellent': return 'text-green-400';
      case 'Very Good': return 'text-blue-400';
      case 'Good': return 'text-yellow-400';
      case 'Average': return 'text-orange-400';
      default: return 'text-red-400';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'from-green-500 to-emerald-600';
    if (score >= 80) return 'from-blue-500 to-indigo-600';
    if (score >= 70) return 'from-yellow-500 to-orange-600';
    if (score >= 60) return 'from-orange-500 to-red-600';
    return 'from-red-500 to-pink-600';
  };

  const handleRetakeQuiz = () => {
    sessionStorage.removeItem('quizResults');
    router.push('/ai-quiz');
  };

  const handleBackToTopics = () => {
    sessionStorage.removeItem('quizResults');
    router.push('/ai-quiz');
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading analysis...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-white mb-4">No Results Found</h2>
          <p className="text-gray-400 mb-6">Please take a quiz first to see your analysis.</p>
          <button
            onClick={() => router.push('/ai-quiz')}
            className="py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white transition-colors"
          >
            Take a Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">Quiz Analysis</h1>
          <p className="text-gray-400 text-lg">{results.topic} • Completed on {new Date(results.completedAt).toLocaleDateString()}</p>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Score Circle */}
          <div className="bg-gray-800/50 rounded-2xl p-8 text-center col-span-1">
            <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${getScoreColor(results.score)} flex items-center justify-center mx-auto mb-4`}>
              <div className="text-3xl font-bold text-white">{results.percentage}%</div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Your Score</h3>
            <p className={`text-lg font-semibold ${getPerformanceColor(results.performance)}`}>
              {results.performance}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{results.correctAnswers}</div>
              <p className="text-gray-300">Correct Answers</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">{results.totalQuestions - results.correctAnswers}</div>
              <p className="text-gray-300">Incorrect Answers</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{results.totalQuestions}</div>
              <p className="text-gray-300">Total Questions</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 text-center">
              <div className={`text-3xl font-bold mb-2 ${results.passStatus === 'Passed' ? 'text-green-400' : 'text-red-400'}`}>
                {results.passStatus === 'Passed' ? '✓' : '✗'}
              </div>
              <p className="text-gray-300">{results.passStatus}</p>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-gray-800/50 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Question-by-Question Analysis</h2>
          <div className="space-y-6">
            {results.results.map((result, index) => (
              <div key={result.questionId} className={`border-l-4 pl-6 py-4 ${result.isCorrect ? 'border-green-500 bg-green-900/10' : 'border-red-500 bg-red-900/10'}`}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white pr-4">
                    Question {index + 1}: {result.question}
                  </h3>
                  <div className={`flex items-center space-x-2 ${result.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {result.isCorrect ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-300">Options:</h4>
                    <div className="space-y-1">
                      {result.options.map((option, optionIndex) => (
                        <div key={optionIndex} className={`p-2 rounded text-sm ${
                          optionIndex === result.correctAnswer 
                            ? 'bg-green-700/30 text-green-300 border border-green-500/30' 
                            : optionIndex === result.userAnswer && !result.isCorrect
                            ? 'bg-red-700/30 text-red-300 border border-red-500/30'
                            : 'bg-gray-700/30 text-gray-400'
                        }`}>
                          <span className="font-semibold mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                          {option}
                          {optionIndex === result.correctAnswer && <span className="ml-2 text-green-400">✓ Correct</span>}
                          {optionIndex === result.userAnswer && !result.isCorrect && <span className="ml-2 text-red-400">✗ Your answer</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-300">Explanation:</h4>
                    <p className="text-gray-400 text-sm leading-relaxed bg-gray-700/30 p-3 rounded">
                      {result.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRetakeQuiz}
            className="py-3 px-8 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Retake Quiz</span>
          </button>
          
          <button
            onClick={handleBackToTopics}
            className="py-3 px-8 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold text-white transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span>Try Different Topic</span>
          </button>

          <button
            onClick={() => router.push('/dashboard')}
            className="py-3 px-8 bg-green-600 hover:bg-green-700 rounded-xl font-semibold text-white transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}