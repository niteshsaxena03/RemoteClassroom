"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import DoubtSolvingComponent from "../../components/DoubtSolvingComponent";

export default function DoubtSolvingPage() {
  const router = useRouter();
  const { user, currentUser, loading } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentContext, setCurrentContext] = useState("");
  const [showVoiceInterface, setShowVoiceInterface] = useState(false);
  const [savedDoubts, setSavedDoubts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const authUser = user || currentUser;

  // Load saved doubts from localStorage
  useEffect(() => {
    if (authUser) {
      const saved = localStorage.getItem(`doubts_${authUser.uid}`);
      if (saved) {
        setSavedDoubts(JSON.parse(saved));
      }
    }
  }, [authUser]);

  // Show loading while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    router.push('/login');
    return null;
  }

  const handleStartDoubtSolving = () => {
    if (!currentQuestion.trim()) {
      alert("Please enter your question first");
      return;
    }

    // Save the doubt to history
    const newDoubt = {
      id: Date.now(),
      question: currentQuestion,
      context: currentContext,
      timestamp: new Date().toISOString()
    };

    const updatedDoubts = [newDoubt, ...savedDoubts.slice(0, 9)]; // Keep last 10
    setSavedDoubts(updatedDoubts);
    localStorage.setItem(`doubts_${authUser.uid}`, JSON.stringify(updatedDoubts));

    setShowVoiceInterface(true);
  };

  const handleSessionEnd = () => {
    setShowVoiceInterface(false);
  };

  const handleQuickQuestion = (question) => {
    setCurrentQuestion(question);
  };

  const handlePreviousDoubt = (doubt) => {
    setCurrentQuestion(doubt.question);
    setCurrentContext(doubt.context);
  };

  const quickQuestions = [
    "Explain the difference between var, let, and const in JavaScript",
    "How does React state management work?",
    "What are the time complexities of different sorting algorithms?",
    "Explain the concept of closures in programming",
    "How do I implement authentication in web applications?",
    "What is the difference between SQL and NoSQL databases?"
  ];

  if (showVoiceInterface) {
    return (
      <div className="min-h-screen bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => setShowVoiceInterface(false)}
              className="flex items-center text-gray-400 hover:text-gray-300 mb-4"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Doubt Solving
            </button>
          </div>
          
          <DoubtSolvingComponent
            question={currentQuestion}
            context={currentContext}
            onSessionEnd={handleSessionEnd}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center text-gray-400 hover:text-gray-300 mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            AI Doubt Solving
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Get instant help with your programming and technical questions through our AI-powered voice assistant.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Question Input Section */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-2xl p-6 space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">Ask Your Question</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Question *
                  </label>
                  <textarea
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    placeholder="What would you like to know? Be as specific as possible..."
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows="4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Additional Context (Optional)
                  </label>
                  <textarea
                    value={currentContext}
                    onChange={(e) => setCurrentContext(e.target.value)}
                    placeholder="Provide any additional context, code snippets, or specific scenarios..."
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows="3"
                  />
                </div>

                <button
                  onClick={handleStartDoubtSolving}
                  disabled={!currentQuestion.trim() || isLoading}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <span>Start Voice Session</span>
                </button>
              </div>
            </div>

            {/* Quick Questions */}
            <div className="bg-gray-800/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Questions</h3>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* History and Info Section */}
          <div className="space-y-6">
            {/* Previous Doubts */}
            <div className="bg-gray-800/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Questions</h3>
              {savedDoubts.length > 0 ? (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {savedDoubts.map((doubt) => (
                    <div
                      key={doubt.id}
                      className="p-3 bg-gray-700/30 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors"
                      onClick={() => handlePreviousDoubt(doubt)}
                    >
                      <p className="text-gray-300 text-sm line-clamp-2">{doubt.question}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {new Date(doubt.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No previous questions yet. Ask your first doubt!</p>
              )}
            </div>

            {/* How it Works */}
            <div className="bg-gray-800/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <p className="text-gray-300 text-sm">Type your question and any additional context</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <p className="text-gray-300 text-sm">Start the voice session to connect with AI tutor</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <p className="text-gray-300 text-sm">Speak naturally and get real-time voice responses</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                  <div>
                    <p className="text-gray-300 text-sm">Ask follow-up questions for deeper understanding</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-800/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm">Real-time voice conversation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm">Programming & technical expertise</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm">Conversation history</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm">24/7 availability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}