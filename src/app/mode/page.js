"use client";

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Mode() {
  const { setSessionMode, logout, currentUser } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleModeSelection = (mode) => {
    console.log('Mode selection:', mode, 'User:', currentUser?.email);
    
    // Check if user is authenticated before proceeding
    if (!currentUser) {
      alert("Please log in first");
      router.push("/login");
      return;
    }
    
    setIsLoading(true);
    try {
      setSessionMode(mode);

      if (mode === "self-pace") {
        router.push("/dashboard");
      } else if (mode === "ai-tutor") {
        console.log('Navigating to AI Quiz with user:', currentUser.email);
        // Use setTimeout to ensure state is set
        setTimeout(() => {
          router.push("/ai-quiz");
        }, 100);
      } else {
        alert("Invalid mode selection. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error selecting mode:", error);
      alert("Error selecting mode. Please try again.");
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Header */}
        <div className="space-y-6">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 via-teal-400 to-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Choose Your Learning Mode
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Select how you'd like to learn. You can always change this later.
            </p>
          </div>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 pt-8">
          {/* Self-Pace Mode */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-6 hover:border-green-500/50 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-green-400">
                Self-Pace Course Mode
              </h3>
              <p className="text-gray-300">
                Learn at your own speed with structured courses. Access all
                course materials, track your progress, and learn on your
                schedule.
              </p>
            </div>

            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Structured course curriculum</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Learn at your own pace</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Progress tracking</span>
              </li>
            </ul>

            <button
              onClick={() => handleModeSelection("self-pace")}
              disabled={isLoading}
              className="w-full py-3 px-6 text-white font-semibold rounded-xl btn-primary text-lg disabled:opacity-50"
            >
              {isLoading ? "Setting up..." : "Choose Self-Pace"}
            </button>
          </div>

          {/* AI Tutor Mode */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-6 hover:border-blue-500/50 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-blue-400">AI Quiz Mode</h3>
              <p className="text-gray-300">
                Take AI-generated quizzes on various topics. Test your knowledge with personalized questions and get instant feedback with detailed analysis.
              </p>
            </div>

            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>AI-generated questions</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Instant feedback & analysis</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Multiple topics available</span>
              </li>
            </ul>

            <button
              onClick={() => handleModeSelection("ai-tutor")}
              disabled={isLoading}
              className="w-full py-3 px-6 text-white font-semibold rounded-xl btn-primary text-lg disabled:opacity-50"
            >
              {isLoading ? "Setting up..." : "Start AI Quiz"}
            </button>
          </div>
        </div>

        {/* Logout option */}
        <div className="pt-8">
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            Not you? Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
