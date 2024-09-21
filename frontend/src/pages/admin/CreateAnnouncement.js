import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnnouncementForm from '../../components/announcement/AnnouncementForm';
import AnnouncementsList from '../../components/announcement/AnnouncementList';
let server = process.env.REACT_APP_SERVER_API;
const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${server}/announcements`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAnnouncements(response.data.data);
    } catch (err) {
      setError('Error fetching announcements');
    }
  };

  const handleCreateOrUpdate = async (announcementData) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (selectedAnnouncement) {
        // Update
        console.log(selectedAnnouncement);
        await axios.put(`${server}/announcements/${selectedAnnouncement._id}`,
          announcementData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );
        setSuccess("Announcement updated successfully!");
      } else {
        // Create
        await axios.post('${server}/announcements',
          announcementData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );
        setSuccess("Announcement created successfully!");
      }

      setSelectedAnnouncement(null);
      fetchAnnouncements();
    } catch (err) {
      setError("Error saving announcement");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server}/announcements/${id}`);
      setAnnouncements(announcements.filter((a) => a.id !== id));
      setSuccess("Announcement deleted successfully!");
    } catch (err) {
      setError("Error deleting announcement");
    }
  };

  return (
    <div className="max-w-5xl my-10 mx-auto p-6 shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6"> Announcements</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      {/* Announcement form */}
      <AnnouncementForm
        selectedAnnouncement={selectedAnnouncement}
        onSubmit={handleCreateOrUpdate}
        loading={loading}
      />
      <hr />
      {/* Announcements list */}
      <AnnouncementsList
        announcements={announcements}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AnnouncementsPage;
