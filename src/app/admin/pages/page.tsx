"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "@/firebase";
import {
  Plus,
  Loader2,
  Trash2,
  ExternalLink,
  Save,
  Code2,
  Globe,
  FileText,
  Eye,
  EyeOff,
  Copy,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

const auth = getAuth(app);

type CustomPage = {
  id: string;
  slug: string;
  title: string;
  html: string;
  createdAt: string;
  updatedAt: string;
};

export default function ManagePagesPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [loading, setLoading] = useState(true);

  // Editor state
  const [editorMode, setEditorMode] = useState<"create" | "edit" | null>(null);
  const [editingPage, setEditingPage] = useState<CustomPage | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [html, setHtml] = useState("");
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (
        !currentUser ||
        currentUser.email !== "somasekarnaidu79@gmail.com"
      ) {
        setCheckingAuth(false);
        router.replace("/admin/login");
        return;
      }
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (user) fetchPages();
  }, [user]);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pages", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setPages(data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch pages");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditorMode("create");
    setEditingPage(null);
    setTitle("");
    setSlug("");
    setHtml("");
    setShowPreview(false);
  };

  const handleEdit = (page: CustomPage) => {
    setEditorMode("edit");
    setEditingPage(page);
    setTitle(page.title);
    setSlug(page.slug);
    setHtml(page.html);
    setShowPreview(false);
  };

  const handleCancel = () => {
    setEditorMode(null);
    setEditingPage(null);
    setTitle("");
    setSlug("");
    setHtml("");
    setShowPreview(false);
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim() || !html.trim()) {
      toast.error("Title, endpoint, and HTML are all required");
      return;
    }

    setSaving(true);
    try {
      if (editorMode === "create") {
        const res = await fetch("/api/pages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, slug, html }),
        });
        if (res.ok) {
          toast.success("Page created successfully!");
          handleCancel();
          fetchPages();
        } else {
          const data = await res.json();
          toast.error(data.error || "Failed to create page");
        }
      } else if (editorMode === "edit" && editingPage) {
        const res = await fetch("/api/pages", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingPage.id, title, slug, html }),
        });
        if (res.ok) {
          toast.success("Page updated successfully!");
          handleCancel();
          fetchPages();
        } else {
          const data = await res.json();
          toast.error(data.error || "Failed to update page");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return;

    try {
      const res = await fetch(`/api/pages?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Page deleted");
        fetchPages();
      } else {
        toast.error("Failed to delete page");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleCopyUrl = (slug: string, id: string) => {
    const url = `${window.location.origin}/p/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("URL copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newVal = html.substring(0, start) + "  " + html.substring(end);
      setHtml(newVal);
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      });
    }
  };

  return (
    <div className="min-h-screen p-8 pt-20 relative bg-black text-white">
      {checkingAuth && (
        <div className="flex items-center justify-center h-[70vh]">
          <Loader2 className="animate-spin text-white" size={32} />
        </div>
      )}

      {!checkingAuth && user && (
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Manage Pages</h2>
              <p className="text-gray-500 text-sm mt-1">
                Create custom HTML pages with unique endpoints
              </p>
            </div>
            {!editorMode && (
              <button
                onClick={handleCreate}
                className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition-all hover:scale-[0.98]"
              >
                <Plus size={18} />
                New Page
              </button>
            )}
          </div>

          {/* Editor Panel */}
          {editorMode && (
            <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden mb-10 animate-in fade-in slide-in-from-top-4 duration-300">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-zinc-900/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                    <Code2 size={16} />
                  </div>
                  <h3 className="text-lg font-bold">
                    {editorMode === "create"
                      ? "Create New Page"
                      : "Edit Page"}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-zinc-800 border border-white/10 hover:bg-zinc-700 transition"
                  >
                    {showPreview ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                    {showPreview ? "Editor" : "Preview"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-1.5 rounded-lg text-sm font-medium bg-zinc-800 border border-white/10 hover:bg-zinc-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-bold bg-white text-black hover:bg-gray-200 transition disabled:opacity-50"
                  >
                    {saving ? (
                      <Loader2 className="animate-spin" size={14} />
                    ) : (
                      <Save size={14} />
                    )}
                    {editorMode === "create" ? "Publish" : "Update"}
                  </button>
                </div>
              </div>

              {/* Title and Slug inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 py-4 border-b border-white/5">
                <div>
                  <label className="text-[10px] text-gray-500 uppercase mb-1.5 block font-bold tracking-wider">
                    <FileText
                      size={10}
                      className="inline mr-1 -mt-0.5"
                    />
                    Page Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="My Custom Page"
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg p-2.5 text-sm outline-none focus:border-violet-500/50 transition placeholder:text-gray-600"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase mb-1.5 block font-bold tracking-wider">
                    <Globe
                      size={10}
                      className="inline mr-1 -mt-0.5"
                    />
                    Endpoint (slug)
                  </label>
                  <div className="flex items-center bg-zinc-800 border border-white/10 rounded-lg overflow-hidden focus-within:border-violet-500/50 transition">
                    <span className="text-xs text-gray-500 pl-3 font-mono select-none">
                      /p/
                    </span>
                    <input
                      value={slug}
                      onChange={(e) =>
                        setSlug(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-_]/g, "")
                        )
                      }
                      placeholder="my-custom-page"
                      className="flex-1 bg-transparent p-2.5 text-sm outline-none font-mono placeholder:text-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Code Editor / Preview */}
              <div className="relative">
                {showPreview ? (
                  <div className="p-6">
                    <div className="bg-white rounded-xl overflow-hidden min-h-[400px]">
                      <iframe
                        srcDoc={html}
                        className="w-full min-h-[400px] border-0"
                        sandbox="allow-scripts"
                        title="Page Preview"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    {/* Line number gutter + textarea */}
                    <div className="flex">
                      <div className="py-4 px-2 text-right text-[11px] text-gray-600 font-mono select-none leading-[1.6] border-r border-white/5 min-w-[48px] bg-zinc-950/50">
                        {html.split("\n").map((_, i) => (
                          <div key={i}>{i + 1}</div>
                        ))}
                        {!html && <div>1</div>}
                      </div>
                      <textarea
                        ref={textareaRef}
                        value={html}
                        onChange={(e) => setHtml(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Paste your HTML code here..."
                        spellCheck={false}
                        className="flex-1 bg-zinc-950/50 text-green-300 p-4 text-sm font-mono outline-none resize-none min-h-[400px] leading-[1.6] placeholder:text-gray-700 placeholder:font-sans"
                        style={{ tabSize: 2 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Pages List */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-gray-500" size={24} />
            </div>
          ) : pages.length === 0 && !editorMode ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <Code2 size={48} className="mb-4 opacity-30" />
              <p className="text-lg font-medium">No custom pages yet</p>
              <p className="text-sm mt-1">
                Create your first page to get started
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="group bg-zinc-900 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => handleEdit(page)}
                    >
                      <div className="flex items-center gap-3">
                        <h3 className="text-base font-semibold">
                          {page.title}
                        </h3>
                        <span className="text-[10px] text-gray-500 bg-zinc-800 px-2 py-0.5 rounded-full font-mono">
                          /p/{page.slug}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Updated{" "}
                        {new Date(page.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopyUrl(page.slug, page.id)}
                        className="p-2 rounded-lg hover:bg-zinc-800 transition text-gray-400 hover:text-white"
                        title="Copy URL"
                      >
                        {copiedId === page.id ? (
                          <Check size={15} className="text-green-400" />
                        ) : (
                          <Copy size={15} />
                        )}
                      </button>
                      <a
                        href={`/p/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-zinc-800 transition text-gray-400 hover:text-white"
                        title="Open page"
                      >
                        <ExternalLink size={15} />
                      </a>
                      <button
                        onClick={() => handleEdit(page)}
                        className="p-2 rounded-lg hover:bg-zinc-800 transition text-gray-400 hover:text-white"
                        title="Edit page"
                      >
                        <Code2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(page.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 transition text-gray-400 hover:text-red-400"
                        title="Delete page"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
