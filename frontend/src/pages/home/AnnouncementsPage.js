import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('https://hackcelestial.onrender.com//announcements', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAnnouncements(response.data.data);
      } catch (err) {
        setError('Failed to fetch announcements');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const openModal = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const closeModal = () => {
    setSelectedAnnouncement(null);
  };

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6 gap-8 flex">
        <div className=''>
          <img src='announce.png' className='rounded-3xl h-56'/>
        </div>
        <div className='w-[70%]'>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Announcements</h1>
        <hr className='border mb-6'/>
        {announcements.length === 0 ? (
          <p className="text-center text-gray-700">No announcements available.</p>
        ) : (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white hover:shadow-lg shadow-md rounded-lg p-4 mb-6 cursor-pointer"
              onClick={() => openModal(announcement)}
            >
              <div className='w-full justify-between flex'>
                <div>
                  <h2 className="text-md text-gray-500 font-semibold">{announcement.userId.name}</h2>
                  <h2 className="text-2xl font-semibold text-gray-800">{announcement.title}</h2>
                </div>
                <p className="text-gray-500 text-sm mt-4">{new Date(announcement.dateOfAnnouncement).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
        </div>
        {/* Modal for showing announcement details */}
        {selectedAnnouncement && (
          <AnnouncementModal
            announcement={selectedAnnouncement}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

// Modal Component defined here (you can also import it from a separate file)
const AnnouncementModal = ({ announcement, onClose }) => {
  if (!announcement) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">{announcement.title}</h2>
          <button onClick={onClose} className="text-gray-600 text-2xl">&times;</button>
        </div>
        <p className="text-gray-700 mt-4 p-1 bg-slate-50 rounded-md ">{announcement.post}</p>
        <p className="text-sm text-gray-500 mt-4">Posted by: {announcement.userId.name}</p>
        <p className="text-sm text-gray-500">{new Date(announcement.dateOfAnnouncement).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
