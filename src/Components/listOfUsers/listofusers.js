import React, { useState, useEffect } from "react";

function FetchUser() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await fetch('http://localhost:5000/getAll');
                
                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user data');
                }
        
                const usersData = await userResponse.json();
        
                console.log(usersData); // Check what the structure of the response is
        
                // Ensure usersData is an array before updating the state
                if (Array.isArray(usersData)) {
                    setUsers(usersData);
                } else {
                    throw new Error('Expected an array of users');
                }
        
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        
        // Fetch user data from an API
        fetchData();
    }, []);

    // Function to handle user deletion
    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/delete/${userId}`, {
                method: 'DELETE',
            });

            // Check if the delete was successful
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            // Remove the deleted user from the state
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="App max-w-6xl m-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Name:</th>
                        <th className="border border-gray-300 px-4 py-2">Email:</th>
                        <th className="border border-gray-300 px-4 py-2">Car:</th>
                        <th className="border border-gray-300 px-4 py-2">Date:</th>
                        <th className="border border-gray-300 px-4 py-2">Add:</th>
                        <th className="border border-gray-300 px-4 py-2">Update:</th>
                        <th className="border border-gray-300 px-4 py-2">Delete:</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.car.join(", ")}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.date}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button className="bg-red-800 text-white py-2 px-4 rounded-3xl hover:bg-slate-900">Add</button>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button className="bg-red-800 text-white py-2 px-4 rounded-3xl hover:bg-slate-900">Update</button>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="bg-red-800 text-white py-2 px-4 rounded-3xl hover:bg-slate-900"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FetchUser;
