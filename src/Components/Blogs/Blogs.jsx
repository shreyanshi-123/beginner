import React, { useState, useEffect } from "react";

function FetchUser() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    
    fetch("http://localhost:5000/getAll")  
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
       
        setUsers(data.users || []);  
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUsers([]);  
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
    <div className="App max-w-6xl m-auto">
      <a href="/UsersList">USER LIST</a><br />
      <a href="/blogslist">Blog List</a><br />
     <a href="/BlogsCorner">BLOGS CORNER</a><br /><br />
  
      <span>Type the name of the user</span>
      <input
        type="text"
        name="Name"
        placeholder="Username"
        className="border border-gray-300 px-4 py-2"
        value={username}
        onChange={handleSearchChange}
      />
      
      {/* Displaying filtered users */}
      <div className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user._id} className="user-item">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              {/* You can add more details like user address, etc., if available */}
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
}

export default FetchUser;
