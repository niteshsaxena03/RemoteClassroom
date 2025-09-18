"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const { currentUser, userProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users - always go to mode selection
    if (currentUser) {
      router.push("/mode");
    }
  }, [currentUser, router]);
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Logo/Brand */}
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
              Remote Classroom
            </h1>
            <p className="text-gray-300 text-lg max-w-sm mx-auto">
              Learn at your own pace with our comprehensive online courses and
              AI-powered tutoring
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-8">
          <Link
            href="/login"
            className="w-full py-4 px-6 text-white font-semibold rounded-xl btn-primary block text-center text-lg"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="w-full py-4 px-6 text-white font-semibold rounded-xl btn-secondary block text-center text-lg"
          >
            Sign Up
          </Link>
        </div>

        {/* Feature highlights */}
        <div className="pt-12 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="w-5 h-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Self-Paced Learning</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>AI Tutoring</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
