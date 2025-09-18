"use client";

import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { currentUser, userProfile, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!currentUser) {
      router.push("/login");
      return;
    }

    // Redirect to mode selection if mode not selected
    if (userProfile && !userProfile.mode) {
      router.push("/mode");
      return;
    }
  }, [currentUser, userProfile, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!currentUser || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center py-6 border-b border-gray-700">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
            <p className="text-gray-400 mt-1">
              Welcome back, {userProfile?.fullName || currentUser.displayName}!
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">
              Mode:{" "}
              <span className="text-green-400 font-medium">Self-Pace</span>
            </span>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* All Courses Section */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">All Courses</h2>
            <p className="text-gray-400 mb-6">
              Explore our comprehensive course catalog
            </p>

            <div className="space-y-4">
              <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 hover:border-blue-500/50 transition-colors">
                <h3 className="font-semibold text-white">Sample Course 1</h3>
                <p className="text-sm text-gray-400 mt-1">
                  This is a placeholder course. Real courses will be loaded from
                  Firestore.
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-green-400 font-medium">Free</span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    View Details
                  </button>
                </div>
              </div>

              <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 hover:border-blue-500/50 transition-colors">
                <h3 className="font-semibold text-white">Sample Course 2</h3>
                <p className="text-sm text-gray-400 mt-1">
                  This is another placeholder course.
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-yellow-400 font-medium">$29</span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* My Courses Section */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">My Courses</h2>
            <p className="text-gray-400 mb-6">Courses you've enrolled in</p>

            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-gray-500 mx-auto mb-4"
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
              <h3 className="text-lg font-medium text-gray-300 mb-2">
                No courses yet
              </h3>
              <p className="text-gray-400">
                Start by exploring our course catalog
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
