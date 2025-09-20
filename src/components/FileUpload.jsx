"use client";

import { useState } from "react";
import { upload } from "@imagekit/next";
// If you have a typed apiClient, keep the import; otherwise you can remove it.
// eslint-disable-next-line import/no-unresolved
// import { apiClient } from "@/lib/api-client";

/**
 * @param {{
 *  onSuccess: (resp: unknown) => void,
 *  onProgress?: (progress: number) => void,
 *  fileType: 'image' | 'video'
 * }} props
 */
export default function FileUpload({ onSuccess, onProgress, fileType }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const validFile = (file) => {
    if (fileType === "video") {
      if (!file.type?.startsWith("video/")) {
        setError("Please upload a valid video file");
        return false;
      }
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size exceeds 100MB");
      return false;
    }
    setError(null);
    return true;
  };

  /** @param {React.ChangeEvent<HTMLInputElement>} e */
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !validFile(file)) return;

    let authParams;
    try {
      const res = await fetch("/api/auth/imagekit-auth");
      authParams = await res.json();
      if (!res.ok || !authParams?.imagekitAuthParams) {
        throw new Error(authParams?.error || "Auth response invalid");
      }
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      setError("Upload auth failed. Check server logs and env variables.");
      return;
    }

    try {
      setUploading(true);
      const uploadResponse = await upload({
        expire: authParams.imagekitAuthParams.expire,
        token: authParams.imagekitAuthParams.token,
        signature: authParams.imagekitAuthParams.signature,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
        file,
        fileName: file.name,
        onProgress: (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
            onProgress?.(percent);
          }
        },
      });

      onSuccess?.(uploadResponse);

      // Optional: save a record via your API client if present
      try {
        if (apiClient?.createVideo) {
          await apiClient.createVideo({
            title: file.name,
            description: "Uploaded via FileUpload component",
            url: uploadResponse?.url,
            thumbnailUrl: uploadResponse?.thumbnailUrl || uploadResponse?.url,
          });
        }
      } catch (e2) {
        console.warn("apiClient.createVideo failed (non-blocking):", e2);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Styled dropzone-like control matching the lecture edit dialog */}
      <div className="rounded-lg border-2 border-dashed border-gray-600 bg-gray-800/50 p-6 text-center">
        <div className="flex flex-col items-center justify-center text-gray-400">
          <div className="w-10 h-10 mb-2 rounded-full bg-gray-700/70 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a4 4 0 010 8H7z" />
            </svg>
          </div>
          <p className="text-sm">
            Drag and drop a {fileType} file, or
            <label className="text-blue-400 cursor-pointer ml-1">
              Browse
              <input
                type="file"
                accept={fileType === 'video' ? 'video/*' : 'image/*'}
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </p>
          <div className="mt-2 text-xs text-gray-500 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1">
            <span>Max 100MB</span>
            <span className="hidden sm:inline">•</span>
            {fileType === 'video' ? (
              <>
                <span>Aspect 9:16</span>
                <span className="hidden sm:inline">•</span>
                <span>Recommended 1080x1920</span>
              </>
            ) : (
              <span>PNG/JPG/WebP</span>
            )}
          </div>
        </div>
        {uploading && (
          <div className="mt-4">
            <p className="text-xs text-gray-300">Uploading… {progress}%</p>
            <div className="w-full h-2 bg-gray-700 rounded overflow-hidden mt-1">
              <div className="h-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
      </div>
    </div>
  );
}
