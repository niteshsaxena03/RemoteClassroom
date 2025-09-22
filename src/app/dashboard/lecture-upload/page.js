"use client";

import FileUpload from '../../../components/FileUpload.jsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function LectureUpload() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('course-information');
  // Course Information form state
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [category, setCategory] = useState('');
  const [benefits, setBenefits] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const categories = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'UI/UX',
    'Cloud Computing',
    'Cybersecurity',
  ];

  const [sections, setSections] = useState([
    {
      id: 'section-1',
      title: 'Section 01',
      lectures: [
        { id: 'lecture-1-1', title: 'Introduction to JavaScript', type: 'video' },
        { id: 'lecture-1-2', title: 'Variables and Data Types', type: 'video' },
        { id: 'lecture-1-3', title: 'Quiz: JavaScript Basics', type: 'quiz' },
        { id: 'lecture-1-4', title: 'Functions and Scope', type: 'video' },
      ]
    },
    {
      id: 'section-2',
      title: 'Section 02',
      lectures: [
        { id: 'lecture-2-1', title: 'Arrays and Objects', type: 'video' },
        { id: 'lecture-2-2', title: 'DOM Manipulation', type: 'video' },
        { id: 'lecture-2-3', title: 'Practice Exercise', type: 'assignment' },
        { id: 'lecture-2-4', title: 'Event Handling', type: 'video' },
      ]
    },
    // Add more sample sections here
  ]);

  // Lecture edit modal state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editCtx, setEditCtx] = useState({
    sectionId: '',
    lectureId: '',
    title: '',
    description: '',
    durationHH: '',
    durationMM: '',
    durationSS: '',
    videoUrl: '',
    // videoFile: null, // Placeholder if you later want to support upload
  });

  // Handle section creation
  const handleCreateSection = () => {
    const newSectionId = `section-${sections.length + 1}`;
    const newSection = {
      id: newSectionId,
      title: `Section ${String(sections.length + 1).padStart(2, '0')}`,
      lectures: []
    };
    setSections([...sections, newSection]);
  };

  // Open edit modal for a lecture
  const openEditModal = (sectionId, lecture) => {
    setEditCtx({
      sectionId,
      lectureId: lecture.id,
      title: lecture.title || '',
      description: lecture.description || '',
      durationHH: lecture.duration?.hh ?? '',
      durationMM: lecture.duration?.mm ?? '',
      durationSS: lecture.duration?.ss ?? '',
      videoUrl: lecture.videoUrl || '',
    });
    setIsEditOpen(true);
  };

  const closeEditModal = () => setIsEditOpen(false);

  const saveLectureEdits = (e) => {
    e?.preventDefault?.();
    const { sectionId, lectureId, title, description, durationHH, durationMM, durationSS } = editCtx;
    // Update the lecture within sections
    setSections(prev => prev.map(sec => {
      if (sec.id !== sectionId) return sec;
      return {
        ...sec,
        lectures: sec.lectures.map(lec => {
          if (lec.id !== lectureId) return lec;
          return {
            ...lec,
            title: title || lec.title,
            description: description,
            duration: {
              hh: durationHH,
              mm: durationMM,
              ss: durationSS,
            },
            videoUrl: editCtx.videoUrl || lec.videoUrl,
          };
        })
      };
    }));
    setIsEditOpen(false);
  };

  const updateEditField = (key, value) => {
    setEditCtx(prev => ({ ...prev, [key]: value }));
  };

  // Close modal on Escape key
  useEffect(() => {
    if (!isEditOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeEditModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isEditOpen]);

  // Handle lecture creation
  const handleAddLecture = (sectionId) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        const newLectureId = `lecture-${sectionId}-${section.lectures.length + 1}`;
        return {
          ...section,
          lectures: [...section.lectures, {
            id: newLectureId,
            title: `New Lecture ${section.lectures.length + 1}`,
            type: 'video'
          }]
        };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleTabChange = (tab) => {
    // Normalize the tab value
    const normalizedTab = tab.toLowerCase().replace(/\s+/g, '-');
    setActiveTab(normalizedTab);
  };

  // Handle information form submit
  const handleInformationSubmit = (e) => {
    e.preventDefault();
    // Minimal validation for required fields
    if (!title.trim() || !shortDescription.trim() || !category.trim() || !benefits.trim() || !requirements.trim()) {
      alert('Please fill in all required fields.');
      return;
    }
    // TODO: Integrate API to persist this data if needed.
    // Proceed to builder
    handleTabChange('course-builder');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'course-information':
      case 'information':
        return (
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm">
            <form onSubmit={handleInformationSubmit} className="space-y-6">
              {/* Course Title */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Course Title <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Course Title"
                  className="w-full rounded-lg bg-gray-800/60 border border-gray-700 text-gray-100 placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Course Short Description <span className="text-red-400">*</span></label>
                <textarea
                  rows={3}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Enter Description"
                  className="w-full rounded-lg bg-gray-800/60 border border-gray-700 text-gray-100 placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Category <span className="text-red-400">*</span></label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none rounded-lg bg-gray-800/60 border border-gray-700 text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="" disabled>Choose a Category</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Benefits of the course <span className="text-red-400">*</span></label>
                <textarea
                  rows={4}
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                  placeholder="Enter Benefits of the course"
                  className="w-full rounded-lg bg-gray-800/60 border border-gray-700 text-gray-100 placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              {/* Requirements / Instructions */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Requirements/instructions <span className="text-red-400">*</span></label>
                <textarea
                  rows={4}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Enter Requirements of the course"
                  className="w-full rounded-lg bg-gray-800/60 border border-gray-700 text-gray-100 placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        );
      case 'course-builder':
      case 'builder':
        return (
          <div className="space-y-4">
            {sections.map((section) => (
              <div key={section.id} className="bg-gray-800/50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">{section.title}</h3>
                </div>

                {/* Lectures */}
                <div className="space-y-2">
                  {section.lectures.map((lecture) => (
                    <div key={lecture.id} 
                         className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-400">
                          {lecture.type === 'video' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          )}
                        </span>
                        <span className="text-white">{lecture.title}</span>
                      </div>
                      {/* Lecture actions */}
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-gray-400 hover:text-gray-300"
                          onClick={() => openEditModal(section.id, lecture)}
                          aria-label="Edit lecture"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-gray-300">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handleAddLecture(section.id)}
                  className="mt-4 text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Lecture</span>
                </button>
              </div>
            ))}
            <button 
              onClick={handleCreateSection}
              className="w-full mt-6 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-xl py-4 border border-blue-500/30 transition-colors"
            >
              Create Section
            </button>
          </div>
        );
      case 'publish':
        return (
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6">Publish Course</h2>
            <div className="space-y-6">
              {/* Review Card */}
              <div className="bg-gray-700/30 p-6 rounded-lg">
                <h3 className="text-white font-medium mb-4">Course Review</h3>
                <p className="text-gray-300">Review your course before publishing</p>
              </div>

              {/* Publish Settings */}
              <div className="bg-gray-700/30 p-6 rounded-lg">
                <h3 className="text-white font-medium mb-4">Publish Settings</h3>
                <label className="flex items-center space-x-3 text-gray-300">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-600 bg-gray-800"
                  />
                  <span>Make this Course Public</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    // TODO: integrate draft save API
                    alert('Course saved as draft');
                  }}
                  className="px-5 py-2 rounded-lg bg-gray-700/70 text-gray-200 hover:bg-gray-700 border border-gray-700"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
                >
                  Publish Course
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Timeline */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-[50px] right-[10px] top-[16px] h-0.5 bg-gray-700 -z-10"></div>
            {[{
              title: 'Course Information',
              value: 'course-information'
            },
            {
              title: 'Course Builder',
              value: 'course-builder'
            },
            {
              title: 'Publish',
              value: 'publish'
            }
            ].map((step, index) => (
                <div 
                  key={step.title} 
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => handleTabChange(step.value)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeTab === step.value 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {index + 1}
                </div>
                <span className={`mt-2 text-sm ${
                  activeTab === step.value
                    ? 'text-blue-500' 
                    : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Header */}
        <header className="flex justify-between items-center py-6 border-b border-gray-700 mb-10">
          <div>
            <h1 className="text-3xl font-bold gradient-text">
              {(activeTab === 'information' || activeTab === 'course-information')
                ? 'Course Information'
                : (activeTab === 'builder' || activeTab === 'course-builder')
                  ? 'Course Builder'
                  : 'Publish Course'}
            </h1>
            <p className="text-gray-400 mt-1">
              {(activeTab === 'information' || activeTab === 'course-information')
                ? 'Add basic information about your course'
                : (activeTab === 'builder' || activeTab === 'course-builder')
                  ? 'Create and organize your course content'
                  : 'Review and publish your course'}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </header>

        {/* Main Content */}
        {renderTabContent()}
        {/* Edit Lecture Modal */}
        {isEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" onClick={closeEditModal} />
            {/* Dialog */}
            <div className="relative w-full max-w-2xl mx-4 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden h-[98%] flex flex-col">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between bg-gray-800/90">
                <h3 className="text-lg font-semibold text-gray-100">Editing Lecture</h3>
                <button className="text-gray-400 hover:text-gray-200" onClick={closeEditModal} aria-label="Close">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <form onSubmit={saveLectureEdits} className="px-6 py-5 space-y-5 bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden flex-1">
                {/* Video Upload */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Lecture Video <span className="text-red-400">*</span></label>
                  <FileUpload
                    fileType="video"
                    onProgress={() => { /* progress handled inside component visually */ }}
                    onSuccess={(resp) => {
                      // ImageKit response includes url
                      const url = resp?.url || resp?.data?.url;
                      setEditCtx(prev => ({ ...prev, videoUrl: url || prev.videoUrl }));
                    }}
                  />
                  {editCtx.videoUrl && (
                    <p className="text-xs text-gray-400 mt-2 truncate">Selected video URL: <span className="text-blue-400">{editCtx.videoUrl}</span></p>
                  )}
                </div>

                {/* Lecture Title */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Lecture Title <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={editCtx.title}
                    onChange={(e) => updateEditField('title', e.target.value)}
                    placeholder="Enter Lecture Title"
                    className="w-full rounded-lg bg-gray-800/60 border border-gray-700 text-gray-100 placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                {/* Video Playback Time */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Video Playback Time <span className="text-red-400">*</span></label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="\\d*"
                        maxLength={2}
                        value={editCtx.durationHH}
                        onChange={(e) => updateEditField('durationHH', e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="HH"
                        className="w-full rounded-lg bg-gray-800/60 border border-gray-700 text-gray-100 placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                      <p className="mt-1 text-xs text-gray-500">HH</p>
                    </div>
                    <div>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="\\d*"
                        maxLength={2}
                        value={editCtx.durationMM}
                        onChange={(e) => updateEditField('durationMM', e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="MM"
                        className="w-full rounded-lg bg-gray-800/60 border border-gray-700 text-gray-100 placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                      <p className="mt-1 text-xs text-gray-500">MM</p>
                    </div>
                    <div>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="\\d*"
                        maxLength={2}
                        value={editCtx.durationSS}
                        onChange={(e) => updateEditField('durationSS', e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="SS"
                        className="w-full rounded-lg bg-gray-800/60 border border-gray-700 text-gray-100 placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                      <p className="mt-1 text-xs text-gray-500">SS</p>
                    </div>
                  </div>
                </div>

                {/* Lecture Description */}
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Lecture Description</label>
                  <textarea
                    rows={4}
                    value={editCtx.description}
                    onChange={(e) => updateEditField('description', e.target.value)}
                    placeholder="Describe the lecture..."
                    className="w-full rounded-lg bg-gray-800/60 border border-gray-700 text-gray-100 placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-700 bg-transparent sticky bottom-0">
                  <button type="button" onClick={closeEditModal} className="px-4 py-2 rounded-lg bg-gray-700/70 text-gray-200 hover:bg-gray-700">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-yellow-500 text-gray-900 font-medium hover:bg-yellow-400">Save Edits</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}