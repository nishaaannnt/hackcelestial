import React, { useState, useEffect } from 'react';

const AnnouncementForm = ({ selectedAnnouncement, onSubmit, loading }) => {
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');

  useEffect(() => {
    if (selectedAnnouncement) {
      setTitle(selectedAnnouncement.title);
      setPost(selectedAnnouncement.post);
    } else {
      setTitle('');
      setPost('');
    }
  }, [selectedAnnouncement]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, post });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8">
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter announcement title"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Post</label>
        <textarea
          value={post}
          onChange={(e) => setPost(e.target.value)}
          className="w-full p-2 border rounded"
          rows="5"
          placeholder="Enter the announcement content"
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-[#ffb374] my-4  text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Saving..." : selectedAnnouncement ? "Update Announcement" : "Create Announcement"}
      </button>
    </form>
  );
};

export default AnnouncementForm;
