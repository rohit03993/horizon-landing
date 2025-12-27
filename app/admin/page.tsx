"use client";

import { useState, useEffect } from "react";

interface Submission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string;
  created_at: string;
}

interface ContentItem {
  id?: number;
  section_key: string;
  content_type: string;
  content_data?: any;
  contentData?: any; // Parsed content_data
}

type Tab = "submissions" | "content";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("submissions");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
      fetchSubmissions(token);
      fetchContent(token);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("admin_token", data.token);
        setIsAuthenticated(true);
        fetchSubmissions(data.token);
        fetchContent(data.token);
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async (token: string) => {
    try {
      const response = await fetch("/api/admin/submissions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setSubmissions(data.submissions);
      } else if (response.status === 401) {
        localStorage.removeItem("admin_token");
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Error fetching submissions:", err);
    }
  };

  const fetchContent = async (token: string) => {
    try {
      const response = await fetch("/api/admin/content", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        const parsedContent = data.content.map((item: any) => ({
          ...item,
          contentData: item.content_data ? JSON.parse(item.content_data) : {}
        }));
        setContent(parsedContent);
      }
    } catch (err) {
      console.error("Error fetching content:", err);
    }
  };

  const saveContent = async (sectionKey: string, contentType: string, contentData: any) => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setError("Not authenticated. Please login again.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sectionKey,
          contentType,
          contentData,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(`Saved: ${sectionKey}`);
        setTimeout(() => setSuccess(""), 2000);
      } else {
        console.error("Save error:", data);
        setError(data.error || `Failed to save ${sectionKey}. Check console for details.`);
        setTimeout(() => setError(""), 5000);
      }
    } catch (err: any) {
      console.error("Save exception:", err);
      setError(`Network error: ${err.message || "Failed to save content"}`);
      setTimeout(() => setError(""), 5000);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setSubmissions([]);
    setContent([]);
  };

  // Default values matching frontend components
  const defaultContent: Record<string, any> = {
    hero: {
      badge: "Agra's Premier Educational Institution",
      heading: "",
      baseText: "Education Beyond",
      rotatingWords: "Classrooms,Boundaries,Limits,Expectations,Convention,Tradition",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    section1: {
      heading: "Not Just a School.",
      subheading: "A Future-Building Institution.",
      description: "We combine strong academics with practical learning, discipline, and real-world exposure.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      videoTitle: "Classroom & Practical Learning"
    },
    section2: {
      heading: "Learning by Doing,",
      subheading: "Not Memorizing",
      description: "Students understand concepts through practical application, activities, and guided experiences.",
      video1Url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      video1Title: "Science Labs & Experiments",
      video2Url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      video2Title: "Interactive Classroom Learning"
    },
    section3: {
      heading: "Government Job Preparation",
      subheading: "Built Into School Life",
      description: "The only school in North India where competitive exam foundations are part of the regular curriculum.",
      video1Url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      video1Title: "NDA Foundation Training",
      video2Url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      video2Title: "Reasoning & Aptitude",
      video3Url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      video3Title: "Discipline & Values"
    },
    section4: {
      heading: "Agra's Best GTO Ground",
      subheading: "For Defence Aspirants",
      description: "Real training. Real obstacles. Real confidence for future officers.",
      video1Url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreet.mp4",
      video1Title: "GTO Ground Training",
      video2Url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      video2Title: "Teamwork & Command Tasks"
    },
    section5: {
      heading: "Strong Mind. Sharp Focus.",
      subheading: "Confident Students.",
      description: "Expert teachers, regular guidance, and mental relaxation practices shape balanced individuals.",
      video1Url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
      video1Title: "Expert Teachers & Guidance",
      video2Url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
      video2Title: "Meditation & Mental Wellness"
    },
    section6: {
      heading: "Academics, Sports & Leadership",
      subheading: "All Together",
      description: "We encourage students to grow in classrooms, playgrounds, and competitive environments.",
      video1Url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      video1Title: "Science Exhibitions",
      video2Url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      video2Title: "Boxing & Sports",
      video3Url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      video3Title: "Competitive Activities"
    },
    section7: {
      heading: "A Message from",
      subheading: "the Director",
      description: "Our vision is to prepare disciplined, confident, and capable citizens for the nation.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      videoTitle: "Director's Message"
    }
  };

  const getContentItem = (sectionKey: string) => {
    const savedContent = content.find((item) => item.section_key === sectionKey)?.contentData || {};
    // Merge with defaults so users can see current values
    return { ...defaultContent[sectionKey], ...savedContent };
  };

  const updateContentItem = (sectionKey: string, contentType: string, updates: any) => {
    const existing = getContentItem(sectionKey);
    const newContent = { ...existing, ...updates };
    
    // Update local state immediately for instant UI feedback
    setContent(prev => {
      const existingItem = prev.find(item => item.section_key === sectionKey);
      if (existingItem) {
        return prev.map(item => 
          item.section_key === sectionKey 
            ? { ...item, contentData: newContent }
            : item
        );
      } else {
        return [...prev, {
          section_key: sectionKey,
          content_type: contentType,
          contentData: newContent
        }];
      }
    });
    
    // Debounce the save to avoid too many API calls
    clearTimeout((window as any)[`saveTimeout_${sectionKey}`]);
    (window as any)[`saveTimeout_${sectionKey}`] = setTimeout(() => {
      saveContent(sectionKey, contentType, newContent);
    }, 1000); // Save after 1 second of no typing
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <div className="max-w-md w-full bg-white border-2 border-yellow-400 rounded-lg p-8">
          <h1 className="text-2xl font-black mb-6 text-center text-black">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-bold text-black">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-bold text-black">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
              />
            </div>
            {error && (
              <div className="p-3 bg-red-100 border-2 border-red-500 rounded-md text-sm text-red-800">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md font-black transition-colors disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-yellow-400">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-bold"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b-2 border-yellow-400">
          <button
            onClick={() => setActiveTab("submissions")}
            className={`px-6 py-3 font-black transition-colors ${
              activeTab === "submissions"
                ? "bg-yellow-400 text-black"
                : "text-white hover:text-yellow-400"
            }`}
          >
            Form Submissions
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`px-6 py-3 font-black transition-colors ${
              activeTab === "content"
                ? "bg-yellow-400 text-black"
                : "text-white hover:text-yellow-400"
            }`}
          >
            Content Editor
          </button>
        </div>

        {success && (
          <div className="mb-4 p-4 bg-green-100 border-2 border-green-500 rounded-lg text-green-800 font-bold">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border-2 border-red-500 rounded-lg text-red-800 font-bold">
            {error}
          </div>
        )}

        {/* Submissions Tab */}
        {activeTab === "submissions" && (
          <div className="bg-white rounded-lg overflow-hidden">
            {submissions.length === 0 ? (
              <div className="p-8 text-center text-gray-600">
                No submissions yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-yellow-400">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-black text-black">ID</th>
                      <th className="px-4 py-3 text-left text-sm font-black text-black">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-black text-black">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-black text-black">Phone</th>
                      <th className="px-4 py-3 text-left text-sm font-black text-black">Message</th>
                      <th className="px-4 py-3 text-left text-sm font-black text-black">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission) => (
                      <tr key={submission.id} className="border-t border-gray-200">
                        <td className="px-4 py-3 text-sm">{submission.id}</td>
                        <td className="px-4 py-3 text-sm font-bold">{submission.name}</td>
                        <td className="px-4 py-3 text-sm">
                          <a href={`mailto:${submission.email}`} className="text-blue-600 hover:underline">
                            {submission.email}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {submission.phone ? (
                            <a href={`tel:${submission.phone}`} className="text-blue-600 hover:underline">
                              {submission.phone}
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm max-w-xs truncate">
                          {submission.message || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(submission.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Content Editor Tab */}
        {activeTab === "content" && (
          <ContentEditor
            content={content}
            getContentItem={getContentItem}
            updateContentItem={updateContentItem}
            saving={saving}
            defaultContent={defaultContent}
          />
        )}
      </div>
    </div>
  );
}

// Content Editor Component
function ContentEditor({
  content,
  getContentItem,
  updateContentItem,
  saving,
  defaultContent,
}: {
  content: ContentItem[];
  getContentItem: (key: string) => any;
  updateContentItem: (key: string, type: string, updates: any) => void;
  saving: boolean;
  defaultContent: Record<string, any>;
}) {
  const sections = [
    {
      key: "hero",
      title: "Hero Section",
      fields: [
        { key: "heading", label: "Main Heading (Custom - overrides rotating text)", type: "text" },
        { key: "baseText", label: "Base Text (e.g., 'Education Beyond')", type: "text" },
        { key: "rotatingWords", label: "Rotating Words (comma-separated, e.g., 'Classrooms,Boundaries,Limits')", type: "text" },
        { key: "badge", label: "Badge Text", type: "text" },
        { key: "videoUrl", label: "Hero Video URL", type: "url" },
      ],
    },
    {
      key: "section1",
      title: "Section 1 - What Makes Us Different",
      fields: [
        { key: "heading", label: "Heading", type: "text" },
        { key: "subheading", label: "Subheading", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "videoUrl", label: "Video URL", type: "url" },
        { key: "videoTitle", label: "Video Title", type: "text" },
      ],
    },
    {
      key: "section2",
      title: "Section 2 - Learning by Doing",
      fields: [
        { key: "heading", label: "Heading", type: "text" },
        { key: "subheading", label: "Subheading", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "video1Url", label: "Video 1 URL", type: "url" },
        { key: "video1Title", label: "Video 1 Title", type: "text" },
        { key: "video2Url", label: "Video 2 URL", type: "url" },
        { key: "video2Title", label: "Video 2 Title", type: "text" },
      ],
    },
    {
      key: "section3",
      title: "Section 3 - Government Job Preparation",
      fields: [
        { key: "heading", label: "Heading", type: "text" },
        { key: "subheading", label: "Subheading", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "video1Url", label: "Video 1 URL", type: "url" },
        { key: "video1Title", label: "Video 1 Title", type: "text" },
        { key: "video2Url", label: "Video 2 URL", type: "url" },
        { key: "video2Title", label: "Video 2 Title", type: "text" },
        { key: "video3Url", label: "Video 3 URL", type: "url" },
        { key: "video3Title", label: "Video 3 Title", type: "text" },
      ],
    },
    {
      key: "section4",
      title: "Section 4 - GTO Ground",
      fields: [
        { key: "heading", label: "Heading", type: "text" },
        { key: "subheading", label: "Subheading", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "video1Url", label: "Video 1 URL", type: "url" },
        { key: "video1Title", label: "Video 1 Title", type: "text" },
        { key: "video2Url", label: "Video 2 URL", type: "url" },
        { key: "video2Title", label: "Video 2 Title", type: "text" },
      ],
    },
    {
      key: "section5",
      title: "Section 5 - Strong Mind",
      fields: [
        { key: "heading", label: "Heading", type: "text" },
        { key: "subheading", label: "Subheading", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "video1Url", label: "Video 1 URL", type: "url" },
        { key: "video1Title", label: "Video 1 Title", type: "text" },
        { key: "video2Url", label: "Video 2 URL", type: "url" },
        { key: "video2Title", label: "Video 2 Title", type: "text" },
      ],
    },
    {
      key: "section6",
      title: "Section 6 - Academics & Sports",
      fields: [
        { key: "heading", label: "Heading", type: "text" },
        { key: "subheading", label: "Subheading", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "video1Url", label: "Video 1 URL", type: "url" },
        { key: "video1Title", label: "Video 1 Title", type: "text" },
        { key: "video2Url", label: "Video 2 URL", type: "url" },
        { key: "video2Title", label: "Video 2 Title", type: "text" },
        { key: "video3Url", label: "Video 3 URL", type: "url" },
        { key: "video3Title", label: "Video 3 Title", type: "text" },
      ],
    },
    {
      key: "section7",
      title: "Section 7 - Director's Message",
      fields: [
        { key: "heading", label: "Heading", type: "text" },
        { key: "subheading", label: "Subheading", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "videoUrl", label: "Video URL", type: "url" },
        { key: "videoTitle", label: "Video Title", type: "text" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => {
        const sectionData = getContentItem(section.key);
        return (
          <div key={section.key} className="bg-white rounded-lg p-6 border-2 border-yellow-400">
            <h2 className="text-2xl font-black text-black mb-4">{section.title}</h2>
            <div className="space-y-4">
              {section.fields.map((field) => (
                <div key={field.key}>
                  <label className="block mb-2 text-sm font-bold text-black">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={sectionData[field.key] || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        updateContentItem(section.key, "section", {
                          [field.key]: value,
                        });
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const value = e.clipboardData.getData('text');
                        updateContentItem(section.key, "section", {
                          [field.key]: value,
                        });
                      }}
                      className="w-full px-4 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
                      rows={3}
                      placeholder={sectionData[field.key] ? undefined : `Current: ${defaultContent[section.key]?.[field.key] || 'Not set'}`}
                    />
                  ) : (
                    <input
                      type={field.type === "url" ? "text" : field.type}
                      value={sectionData[field.key] || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        updateContentItem(section.key, "section", {
                          [field.key]: value,
                        });
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const value = e.clipboardData.getData('text');
                        updateContentItem(section.key, "section", {
                          [field.key]: value,
                        });
                      }}
                      className="w-full px-4 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
                      placeholder={sectionData[field.key] ? undefined : `Current: ${defaultContent[section.key]?.[field.key] || 'Not set'}`}
                    />
                  )}
                  {/* Show current value indicator */}
                  {sectionData[field.key] && (
                    <p className="mt-1 text-xs text-gray-600">
                      ✓ Current value shown above
                    </p>
                  )}
                  {!sectionData[field.key] && defaultContent[section.key]?.[field.key] && (
                    <p className="mt-1 text-xs text-yellow-600 italic">
                      💡 Default value: {String(defaultContent[section.key][field.key]).substring(0, 60)}{String(defaultContent[section.key][field.key]).length > 60 ? '...' : ''}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {saving && (
              <div className="mt-4 text-yellow-600 font-bold">Saving...</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
