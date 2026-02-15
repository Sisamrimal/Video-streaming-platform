"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return alert("Select video");

    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);
    formData.append("description", description);

    const res = await fetch("/api/upload-video", {
      method: "POST",
      body: formData,
    });

    if (res.ok) alert("Uploaded!");
    else alert("Upload failed");
  };

  return (
    <form
      onSubmit={handleUpload}
      className="max-w-xl space-y-4"
    >
      <h1 className="text-2xl font-bold">Upload Video</h1>

      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="file"
        accept="video/*" required
        onChange={(e) =>
          setFile(e.target.files?.[0] || null)
        }
      />

      <button className="bg-red-500 text-white px-4 py-2 rounded">
        Upload
      </button>
    </form>
  );
}
