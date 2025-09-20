"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { IoChevronDownCircle, IoChevronForwardCircle, IoPlayCircle, IoArrowBack } from 'react-icons/io5';
import { LiaCertificateSolid } from 'react-icons/lia';
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from 'react-icons/tb';

// Types (JS only)
// section = { id, sectionName, subSections: [{ id, videoTitle, duration, videoUrl }] }

// Sample course data: 4 sections x 2 videos = 8 lectures
const sampleCourse = {
  id: 'course_py_001',
  title: 'The Complete Python Bootcamp From Zero to Hero in Python',
  sections: [
    {
      id: 'sec1',
      sectionName: 'Introduction & Basics',
      subSections: [
        { id: 'v11', videoTitle: 'Why Python', duration: '02:09', videoUrl: 'https://res.cloudinary.com/dl3kraaox/video/upload/v1755017924/pexels-tea-oebel-6804109_ovfljo.mp4' },
        { id: 'v12', videoTitle: 'Install Python & Editor', duration: '03:15', videoUrl: 'https://res.cloudinary.com/dl3kraaox/video/upload/v1755017924/pexels-tea-oebel-6804109_ovfljo.mp4' },
      ],
    },
    {
      id: 'sec2',
      sectionName: 'Conditional Statements and Loops',
      subSections: [
        { id: 'v21', videoTitle: 'If/Else Basics', duration: '05:01', videoUrl: 'https://res.cloudinary.com/dl3kraaox/video/upload/v1755017924/pexels-tea-oebel-6804109_ovfljo.mp4' },
        { id: 'v22', videoTitle: 'For vs While', duration: '04:42', videoUrl: 'https://res.cloudinary.com/dl3kraaox/video/upload/v1755017924/pexels-tea-oebel-6804109_ovfljo.mp4' },
      ],
    },
    {
      id: 'sec3',
      sectionName: 'Python Data Types',
      subSections: [
        { id: 'v31', videoTitle: 'Strings and Lists', duration: '06:24', videoUrl: 'https://res.cloudinary.com/dl3kraaox/video/upload/v1755017924/pexels-tea-oebel-6804109_ovfljo.mp4' },
        { id: 'v32', videoTitle: 'Tuples & Dicts', duration: '04:50', videoUrl: 'https://res.cloudinary.com/dl3kraaox/video/upload/v1755017924/pexels-tea-oebel-6804109_ovfljo.mp4' },
      ],
    },
    {
      id: 'sec4',
      sectionName: 'Functions',
      subSections: [
        { id: 'v41', videoTitle: 'Defining Functions', duration: '03:59', videoUrl: 'https://res.cloudinary.com/dl3kraaox/video/upload/v1755017924/pexels-tea-oebel-6804109_ovfljo.mp4' },
        { id: 'v42', videoTitle: 'Args & Kwargs', duration: '03:13', videoUrl: 'https://res.cloudinary.com/dl3kraaox/video/upload/v1755017924/pexels-tea-oebel-6804109_ovfljo.mp4' },
      ],
    },
    {
      id: 'sec5',
      sectionName: 'Modules and Packages',
      subSections: [
        { id: 'v51', videoTitle: 'Using Modules', duration: '04:30', videoUrl: 'https://res.cloudinary.com/dl3kraaox/video/upload/v1755017924/pexels-tea-oebel-6804109_ovfljo.mp4' },
        { id: 'v52', videoTitle: 'Creating Packages', duration: '05:20', videoUrl: 'https://res.cloudinary.com/dl3kraaox/video/upload/v1755017924/pexels-tea-oebel-6804109_ovfljo.mp4' },
      ],
    },
    {
      id: 'sec6',
      sectionName: 'File Handling',
      subSections: [
        { id: 'v61', videoTitle: 'Read/Write Files', duration: '03:44', videoUrl: 'https://res.cloudinary.com/dl3kraaox/video/upload/v1755017924/pexels-tea-oebel-6804109_ovfljo.mp4' },
        { id: 'v62', videoTitle: 'Working with JSON', duration: '04:05', videoUrl: 'https://res.cloudinary.com/dl3kraaox/video/upload/v1755017924/pexels-tea-oebel-6804109_ovfljo.mp4' },
      ],
    },
    {
      id: 'sec7',
      sectionName: 'Error Handling',
      subSections: [
        { id: 'v71', videoTitle: 'Try/Except', duration: '02:58', videoUrl: 'https://res.cloudinary.com/dl3kraaox/video/upload/v1755017924/pexels-tea-oebel-6804109_ovfljo.mp4' },
        { id: 'v72', videoTitle: 'Raising Exceptions', duration: '03:21', videoUrl: 'https://res.cloudinary.com/dl3kraaox/video/upload/v1755017924/pexels-tea-oebel-6804109_ovfljo.mp4' },
      ],
    },
    {
      id: 'sec8',
      sectionName: 'Standard Library Highlights',
      subSections: [
        { id: 'v81', videoTitle: 'Datetime & Random', duration: '04:15', videoUrl: 'https://res.cloudinary.com/dl3kraaox/video/upload/v1755017924/pexels-tea-oebel-6804109_ovfljo.mp4' },
        { id: 'v82', videoTitle: 'Collections', duration: '03:49', videoUrl: 'https://res.cloudinary.com/dl3kraaox/video/upload/v1755017924/pexels-tea-oebel-6804109_ovfljo.mp4' },
      ],
    },
  ],
};

function findVideo(course, lectureId) {
  for (const s of course.sections) {
    const v = s.subSections.find(x => x.id === lectureId);
    if (v) return v;
  }
  return null;
}

export default function Take() {
  const params = useParams();
  const router = useRouter();
  const courseId = Array.isArray(params?.courseId) ? params.courseId[0] : params?.courseId;
  const lectureId = Array.isArray(params?.lecturevideoId) ? params.lecturevideoId[0] : params?.lecturevideoId;

  // Active video
  const activeVideo = useMemo(() => findVideo(sampleCourse, lectureId) || findVideo(sampleCourse, sampleCourse.sections[0].subSections[0].id), [lectureId]);

  // Simple local comments state (placeholder UI)
  const [comments, setComments] = useState([
    { id: 'c1', author: 'Learner A', text: 'Great explanation!' },
  ]);
  const [newComment, setNewComment] = useState('');
  const addComment = (e) => {
    e.preventDefault();
    const text = newComment.trim();
    if (!text) return;
    setComments(prev => [...prev, { id: String(Date.now()), author: 'You', text }]);
    setNewComment('');
  };

  // Storage key for accordion state (per course)
  const storageKey = `take_openSections_${(Array.isArray(params?.courseId) ? params.courseId[0] : params?.courseId) || sampleCourse.id}`;

  // Sidebar visibility toggle
  const [showSidebar, setShowSidebar] = useState(true);

  // Accordion open state using Set of section IDs (stable across reordering)
  const [openSections, setOpenSections] = useState(new Set());

  // Load from localStorage whenever the key (course) changes
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) {
          // Expect an array of section IDs
          setOpenSections(new Set(arr.filter(Boolean)));
          return;
        }
      }
      // Fallback default: first section open (by id)
      const firstId = sampleCourse.sections?.[0]?.id;
      setOpenSections(firstId ? new Set([firstId]) : new Set());
    } catch {
      const firstId = sampleCourse.sections?.[0]?.id;
      setOpenSections(firstId ? new Set([firstId]) : new Set());
    }
  }, [storageKey]);

  // Persist openSections whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(Array.from(openSections)));
    } catch {}
  }, [openSections, storageKey]);

  // Toggle helper (updates and persists via effect)
  const toggleSection = (sectionId) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      next.has(sectionId) ? next.delete(sectionId) : next.add(sectionId);
      return next;
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#0b0f19] text-[#E5E7EB] flex overflow-hidden">
      {/* Sidebar */}
      {showSidebar && (
      <aside className="w-[320px] hidden h-screen lg:flex flex-col border-r border-[#1f2937]/60 bg-[#111827]/70">
        <div className="px-5 py-4 border-b border-[#1f2937]/60 bg-[#111827]/80">
          <div className="flex items-center justify-between">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-[#D1D5DB] hover:text-[#47A5C5] cursor-pointer">
              <IoArrowBack className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </button>
          </div>
          <h2 className="mt-2 font-semibold leading-6 text-[#E5E7EB]">{sampleCourse.title}</h2>
          <p className="text-sm text-[#D1D5DB]">08 Lectures</p>
        </div>
        <div className="flex-1 overflow-y-scroll custom-scroll">
          {sampleCourse.sections.map((sec) => {
            const isOpen = openSections.has(sec.id);
            return (
              <div key={sec.id} className="border-b border-[#1f2937]/50">
                <button
                  onClick={() => toggleSection(sec.id)}
                  className={`w-full text-left px-5 py-3 flex items-center justify-between hover:bg-[#1f2937]/30 ${isOpen ? 'bg-[#0b0f19]/20' : ''}`}
                >
                  <span className="text-sm font-medium text-[#F9FAFB]">{sec.sectionName}</span>
                  {isOpen ? (
                    <IoChevronDownCircle className="w-6 h-6 text-[#D1D5DB] cursor-pointer" />
                  ) : (
                    <IoChevronForwardCircle className="w-6 h-6 text-[#D1D5DB] cursor-pointer" />
                  )}
                </button>
                {isOpen && (
                  <ul className="px-3 pb-3 space-y-1">
                    {sec.subSections.map((sub) => (
                      <li key={sub.id} className={`flex items-center gap-2 rounded-md px-2 ${sub.id === lectureId ? 'bg-[#0b0f19]/30 border-l-2 border-l-[#47A5C5]' : ''}`}>
                        <IoPlayCircle className="w-5 h-5 text-[#D1D5DB]" />
                        <Link
                          className={`block py-2 text-sm hover:text-[#47A5C5] ${sub.id === lectureId ? 'text-[#47A5C5]' : 'text-[#D1D5DB]'}`}
                          href={`/dashboard/course/${sampleCourse.id}/${sub.id}`}
                        >
                          {sub.videoTitle}
                        </Link>
                        <span className="ml-auto text-xs text-[#9CA3AF]">{sub.duration}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
        {/* Certificate footer */}
        <div className="mt-auto border-t border-[#1f2937]/60 bg-[#111827]/60">
          <button
            onClick={() => alert('Certificate of Completion coming soon!')}
            className="group w-full flex items-center justify-center gap-2 py-3 text-[#D1D5DB] transition-colors cursor-pointer"
          >
            <LiaCertificateSolid className="w-6 h-6 text-[#D1D5DB] group-hover:text-[#47A5C5] group-hover:cursor-pointer transition-colors" />
            <span className="text-[#D1D5DB] group-hover:text-[#47A5C5] group-hover:cursor-pointer transition-colors">Certificate of Completion</span>
          </button>
        </div>
      </aside>
      )}

      {/* Main content */}
      <main className="flex-1 flex h-screen flex-col gap-4 p-4 lg:p-8 custom-scroll overflow-y-scroll">
        {/* Top bar with sidebar toggle */}
        <div className="w-full flex items-center justify-between">
          <button
            onClick={() => setShowSidebar(prev => !prev)}
            className="text-[#D1D5DB] hover:text-[#47A5C5] cursor-pointer flex items-center gap-2"
            aria-label="Toggle sidebar"
          >
            {showSidebar ? (
              <TbLayoutSidebarLeftCollapse className="w-6 h-6" />
            ) : (
              <TbLayoutSidebarRightCollapse className="w-6 h-6" />
            )}
            <span className="text-sm">{showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}</span>
          </button>
        </div>
        {/* Video */}
        <section className="w-full rounded-lg border border-[#1f2937]/60 bg-[#111827]/70 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
          <div className="w-full aspect-video bg-black">
            {activeVideo && (
              <video className="w-full h-full" controls playsInline preload="metadata">
                <source src={activeVideo.videoUrl} type="video/mp4" />
              </video>
            )}
          </div>
        </section>

        {/* Comments */}
        <section className="w-full min-h-[220px] rounded-lg border border-[#1f2937]/60 bg-[#111827]/60 p-4 overflow-y-scroll custom-scroll">
          <h4 className="font-semibold mb-3">Comments</h4>
          <ul className="space-y-3 mb-4">
            {comments.map(c => (
              <li key={c.id} className="rounded-md border border-[#1f2937]/60 bg-[#0b0f19]/30 p-3">
                <p className="text-sm"><span className="font-medium text-[#F9FAFB]">{c.author}:</span> <span className="text-[#E5E7EB]/70">{c.text}</span></p>
              </li>
            ))}
          </ul>
          <form onSubmit={addComment} className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 rounded-md bg-[#0b0f19]/30 border border-[#1f2937]/60 px-3 py-2 text-[#E5E7EB] placeholder:text-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <button type="submit" className="px-4 py-2 rounded-md bg-blue-500/90 hover:bg-blue-600 text-white cursor-pointer">Post</button>
          </form>
        </section>
      </main>
      {/* Global custom scrollbar styles for this page */}
      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.4); /* #111827 with transparency */
          border-radius: 8px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #47A5C5 0%, #3B82F6 100%);
          border-radius: 8px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #60b7d3 0%, #60a5fa 100%);
        }
        /* Firefox */
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #47A5C5 rgba(17, 24, 39, 0.4);
        }
      `}</style>
    </div>
  );
}