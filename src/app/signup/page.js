"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup, currentUser, userProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is already authenticated - always go to mode selection
    if (currentUser) {
      router.push("/mode");
    }
  }, [currentUser, router]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!fullName || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, fullName);
      // Navigation will be handled by useEffect
    } catch (error) {
      setError("Failed to create account: " + error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => router.push("/")}
          className="group flex items-center space-x-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl text-gray-300 hover:text-white hover:border-gray-500 transition-all cursor-pointer"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Back to Home</span>
        </button>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block group">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 via-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-xl shadow-green-500/25">
                <svg
                  className="w-10 h-10 text-white"
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
            </Link>

            <h2 className="text-4xl font-bold gradient-text mb-3">
              Create Account
            </h2>
            <p className="text-gray-400 text-lg">
              Start your learning adventure
            </p>
          </div>

          {/* Signup Form */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-gray-400 transition-all backdrop-blur-sm"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-gray-400 transition-all backdrop-blur-sm"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-gray-400 transition-all backdrop-blur-sm"
                      placeholder="Create a password (min 6 characters)"
                      required
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Password must be at least 6 characters long
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
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
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-300 hover:to-emerald-300 font-medium transition-all"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-gray-500 text-sm">
              Join thousands of learners worldwide
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
              <span className="flex items-center space-x-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Secure</span>
              </span>
              <span className="flex items-center space-x-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Free</span>
              </span>
              <span className="flex items-center space-x-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Instant Access</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
