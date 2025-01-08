import React, { useState, useEffect } from "react";

function FetchUser() {
    const [users, setUsers] = useState([]);  // State to store users
    const [loading, setLoading] = useState(true);  // State to handle loading state
    const [error, setError] = useState(null);  // State to handle error

    useEffect(() => {
        // Fetch data from API when component mounts
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/getAll');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
        
                const usersData = await response.json();
                console.log('Fetched data:', usersData);  // Log the response for inspection
        
                // Check if it's an array
                if (Array.isArray(usersData)) {
                    setUsers(usersData);  // If it's an array, update the state
                } else if (usersData && usersData.users && Array.isArray(usersData.users)) {
                    setUsers(usersData.users);  // If it's an object with a "users" array, set the state accordingly
                } else {
                    throw new Error('Expected an array of users');
                }
            } catch (err) {
                setError(err.message);  // Handle error
            } finally {
                setLoading(false);  // Stop loading
            }
        };
        
        
        fetchData();  // Call the fetchData function
    }, []);  // Empty dependency array means this effect runs only once when the component mounts

    // Render loading state if data is still being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render error message if there's an error
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Render users in a table
    return (
        <div className="App max-w-6xl m-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Car</th>
                        <th className="border border-gray-300 px-4 py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.car.join(", ")}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FetchUser;
