"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";

const topics = [
  {
    id: "programming-languages",
    title: "Programming Languages",
    description: "Test your knowledge of various programming languages including Python, JavaScript, Java, C++, and more.",
    icon: "💻",
    color: "from-blue-500 to-indigo-600",
    borderColor: "border-blue-500/50"
  },
  {
    id: "data-structures-algorithms",
    title: "Data Structures & Algorithms", 
    description: "Challenge yourself with questions on arrays, linked lists, trees, graphs, sorting, and search algorithms.",
    icon: "🧮",
    color: "from-green-500 to-emerald-600",
    borderColor: "border-green-500/50"
  },
  {
    id: "system-design",
    title: "System Design",
    description: "Explore concepts of scalability, databases, microservices, load balancing, and distributed systems.",
    icon: "🏗️",
    color: "from-purple-500 to-violet-600", 
    borderColor: "border-purple-500/50"
  },
  {
    id: "web-development",
    title: "Web Development",
    description: "Test your understanding of HTML, CSS, React, Node.js, APIs, and modern web development practices.",
    icon: "🌐",
    color: "from-orange-500 to-red-600",
    borderColor: "border-orange-500/50"
  },
  {
    id: "database-management",
    title: "Database Management",
    description: "Questions covering SQL, NoSQL, database design, optimization, transactions, and data modeling.",
    icon: "🗄️",
    color: "from-cyan-500 to-blue-600",
    borderColor: "border-cyan-500/50"
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    description: "Dive into ML concepts, algorithms, neural networks, deep learning, and AI fundamentals.",
    icon: "🤖",
    color: "from-pink-500 to-rose-600",
    borderColor: "border-pink-500/50"
  }
];

export default function AIQuizTopics() {
  const router = useRouter();
  const { user, currentUser, loading } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const handleTopicSelect = async (topic) => {
    setSelectedTopic(topic.id);
    setIsLoading(true);
    
    try {
      // Navigate to the quiz page for the selected topic
      router.push(`/ai-quiz/${topic.id}`);
    } catch (error) {
      console.error("Error navigating to quiz:", error);
      setIsLoading(false);
    }
  };

  const handleBackToMode = () => {
    router.push("/mode");
  };

  const authUser = user || currentUser;

  // Handle authentication check
  useEffect(() => {
    if (!loading) {
      console.log('AI Quiz - Auth Check:', { user, currentUser, authUser, loading });
      
      // Add a small delay to prevent race conditions
      const timer = setTimeout(() => {
        if (!authUser) {
          console.log('AI Quiz - No auth user after delay, redirecting to login');
          router.push("/login");
        } else {
          console.log('AI Quiz - Auth user found:', authUser.email || 'No email');
          setAuthChecked(true);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [user, currentUser, authUser, loading, router]);

  // Show loading while auth is initializing or being checked
  if (loading || !authChecked) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
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
            onClick={handleBackToMode}
            className="inline-flex items-center text-gray-400 hover:text-gray-300 mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Mode Selection
          </button>
          
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Choose Your Quiz Topic
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Select a topic to start your AI-generated quiz. Each quiz contains 10 challenging questions with detailed explanations.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`bg-gray-800/50 border ${topic.borderColor} rounded-2xl p-6 space-y-4 hover:bg-gray-800/70 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedTopic === topic.id ? 'ring-2 ring-blue-500' : ''
              } ${isLoading && selectedTopic === topic.id ? 'opacity-75' : ''}`}
              onClick={() => !isLoading && handleTopicSelect(topic)}
            >
              {/* Topic Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${topic.color} rounded-xl flex items-center justify-center mx-auto text-2xl`}>
                {topic.icon}
              </div>

              {/* Topic Content */}
              <div className="space-y-3 text-center">
                <h3 className="text-xl font-bold text-white">
                  {topic.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {topic.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                    isLoading && selectedTopic === topic.id
                      ? 'bg-gray-600 cursor-not-allowed'
                      : `bg-gradient-to-r ${topic.color} hover:shadow-lg hover:shadow-blue-500/25`
                  }`}
                >
                  {isLoading && selectedTopic === topic.id ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Starting Quiz...</span>
                    </div>
                  ) : (
                    'Start Quiz'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gray-800/30 rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-white mb-3">How it works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto text-white font-bold">1</div>
              <p>Select your preferred topic from the options above</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto text-white font-bold">2</div>
              <p>Answer 10 AI-generated multiple choice questions</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto text-white font-bold">3</div>
              <p>Get instant results with detailed explanations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}