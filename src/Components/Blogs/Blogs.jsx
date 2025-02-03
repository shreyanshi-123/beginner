import React, { useState, useEffect } from "react";

function FetchUser() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);  // Added loading state
  const [error, setError] = useState(null);     // Added error state

  useEffect(() => {
    fetch("http://localhost:5000/getAll")  
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
        setLoading(false);  // Set loading to false if there's an error
      });
  }, []);

  const handleSearchChange = (event) => {
    setUsername(event.target.value);
  };

  // Filter users based on input
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(username.toLowerCase())
  );

  return (
    <div className="App max-w-6xl mx-auto p-6 bg-gray-50">
      {/* Navigation Links */}
      <div className="flex space-x-4 mb-6">
        <a href="/UsersList" className="text-blue-500 hover:text-blue-700">USER LIST</a>
        <a href="/blogslist" className="text-blue-500 hover:text-blue-700">Blog List</a>
        <a href="/BlogsCorner" className="text-blue-500 hover:text-blue-700">BLOGS CORNER</a>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <span className="text-lg font-medium text-gray-700">Type the name of the user</span>
        <input
          type="text"
          name="Name"
          placeholder="Search by Username"
          className="mt-2 p-3 w-full max-w-md border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={handleSearchChange}
        />
      </div>

      {/* Loading State */}
      {loading && <div className="text-gray-600">Loading users...</div>}

      {/* Error Handling */}
      {error && <div className="text-red-600">{error}</div>}

      {/* Displaying Filtered Users */}
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <p><strong className="text-blue-600">Name:</strong> {user.name}</p>
              <p><strong className="text-blue-600">Role:</strong> {user.role}</p>
              <p><strong className="text-blue-600">Email:</strong> {user.email}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No users found</p>
        )}
      </div>
    </div>
  );
}

export default FetchUser;
