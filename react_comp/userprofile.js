import React, { useState, useEffect } from 'react';
import { User, Book, Edit } from 'lucide-react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    fetchUserData();
    fetchUserBooks();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3000/user', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchUserBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/books', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching user books:', error);
    }
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch('http://localhost:3000/upload-avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      const data = await response.json();
      setAvatar(data.avatar);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  if (!user) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex items-center mb-4">
          {avatar ? (
            <img src={avatar} alt="User Avatar" className="w-12 h-12 rounded-full mr-4" />
          ) : (
            <User className="w-12 h-12 text-blue-500 mr-4" />
          )}
          <h2 className="text-2xl font-bold">{user.username}</h2>
        </div>
        <p className="mb-4">Email: {user.email}</p>
        <div className="mb-4">
          <label htmlFor="avatar-upload" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center cursor-pointer">
            <Edit className="w-4 h-4 mr-2" />
            Upload Avatar
          </label>
          <input id="avatar-upload" type="file" className="hidden" onChange={handleAvatarUpload} accept="image/*" />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">My Books</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {books.map(book => (
            <div key={book._id} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
              <Book className="w-8 h-8 text-blue-500 mb-2" />
              <h4 className="font-bold">{book.title}</h4>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>Rental Price: ${book.rentalPrice}/week</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;