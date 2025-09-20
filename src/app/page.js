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
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-green-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 lg:px-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-teal-400 to-green-500 rounded-xl flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
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
          <span className="text-xl font-bold gradient-text">
            Remote Classroom
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/login"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-full px-6 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
              <span className="text-green-400 text-sm font-medium">
                Now Available - AI-Powered Learning
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="gradient-text">Learn.</span>{" "}
              <span className="gradient-text">Grow.</span>{" "}
              <span className="gradient-text">Excel.</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transform your skills with our comprehensive online courses and
              AI-powered tutoring. Join thousands of learners achieving their
              goals.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/signup"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">Start Learning Today</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>

            <Link
              href="/login"
              className="group px-8 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600 text-white font-semibold rounded-2xl hover:bg-gray-700/50 transition-all duration-300"
            >
              <span className="flex items-center space-x-2">
                <span>Login to Continue</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                50+
              </div>
              <div className="text-gray-400 text-sm">Expert Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                10K+
              </div>
              <div className="text-gray-400 text-sm">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                95%
              </div>
              <div className="text-gray-400 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Remote Classroom?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the future of online learning with our innovative
              platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
              <h3 className="text-xl font-bold text-white mb-4">
                Self-Paced Learning
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Learn at your own speed with flexible scheduling. Access course
                materials 24/7 and progress at your comfort.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
              <h3 className="text-xl font-bold text-white mb-4">
                AI-Powered Tutoring
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Get personalized assistance with our advanced AI tutor. Instant
                feedback and adaptive learning paths.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Certification Ready
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Earn industry-recognized certificates upon completion. Boost
                your career with verified credentials.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of students already learning with Remote Classroom
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 text-gray-300 hover:text-white transition-colors"
              >
                Already have an account? →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
