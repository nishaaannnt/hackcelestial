import React from 'react';

const AnnouncementsList = ({ announcements, onEdit, onDelete }) => {
  console.log(announcements);
  return (
    <div className="mt-8">
      <h3 className="text-3xl font-bold mb-4">Manage Announcements</h3>
      <ul>
        {announcements.length >0  && announcements.map((announcement) => (
          <li key={announcement.id} className="mb-4 p-4 flex justify-between bg-gray-50 rounded-lg">
            <div>
            <p className='text-xs text-gray-500'>{new Date(announcement.dateOfAnnouncement).toLocaleString()}</p>
            <h3 className="text-2xl font-bold">{announcement.title}</h3>
            <p>{announcement.post}</p>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => onEdit(announcement)}
                className="w-16 bg-[#ffbd87] text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(announcement.id)}
                className="bg-red-500 w-16 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnouncementsList;
