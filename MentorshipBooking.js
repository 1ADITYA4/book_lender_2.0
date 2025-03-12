import React, { useState, useEffect } from 'react';

const MentorshipBooking = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await fetch('http://localhost:3000/mentors');
      const data = await response.json();
      setMentors(data);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingDetails = {
      mentorId: selectedMentor,
      date,
      time,
      message,
    };

    try {
      const response = await fetch('http://localhost:3000/book-mentorship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(bookingDetails),
      });

      if (response.ok) {
        setBookingStatus('Booking successful!');
        setSelectedMentor('');
        setDate('');
        setTime('');
        setMessage('');
      } else {
        setBookingStatus('Error booking mentorship.');
      }
    } catch (error) {
      console.error('Error booking mentorship:', error);
      setBookingStatus('Error booking mentorship.');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Book a Mentorship Session</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="mentor-select" className="block text-sm font-medium mb-2">
              Select Mentor
            </label>
            <select
              id="mentor-select"
              value={selectedMentor}
              onChange={(e) => setSelectedMentor(e.target.value)}
              className="border p-2 w-full"
              required
            >
              <option value="">Select a mentor</option>
              {mentors.map(mentor => (
                <option key={mentor._id} value={mentor._id}>
                  {mentor.name} - {mentor.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-medium mb-2">
              Time
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border p-2 w-full"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Book Now
          </button>
        </form>

        {bookingStatus && (
          <div className={`mt-4 ${bookingStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {bookingStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorshipBooking;
