import React, { useState, useEffect } from "react";

function FetchUser() {
    const [users, setUsers] = useState([]);  // State to store users
    const [loading, setLoading] = useState(true);  // State to handle loading state
    const [error, setError] = useState(null);  // State to handle error
    const [formData, setFormData] = useState({  // State to manage form data
        name: '',
        email: '',
        car: '',
        date: '',
    });
    const [editingUser, setEditingUser] = useState(null);  // State to track the user being edited

    // Fetch users data from the server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/getAll');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const usersData = await response.json();

                const usersArray = Array.isArray(usersData) ? usersData : usersData?.users || [];
                setUsers(usersArray);  // Set the users state
            } catch (err) {
                setError(err.message);  // Handle error
            } finally {
                setLoading(false);  // Stop loading
            }
        };

        fetchData();  // Call the fetchData function
    }, []);  // Empty dependency array means this effect runs only once when the component mounts

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Function to add a new user
    const addUser = async () => {
        try {
            const response = await fetch('http://localhost:5000/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add user');
            }

            const newUser = await response.json();

            // Add the new user to the state
            setUsers((prevUsers) => [...prevUsers, newUser]);

            // Clear the form
            setFormData({
                name: '',
                email: '',
                car: '',
                date: '',
            });
        } catch (err) {
            setError(err.message);  // Handle error
        }
    };

    // Function to handle user deletion
    const deleteUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/delete/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            // Remove the user from the state
            setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
        } catch (err) {
            setError(err.message);  // Handle error
        }
    };

    // Function to handle user update
    const updateUser = async () => {
        if (!editingUser) return;  // If no user is being edited, return

        try {
            const response = await fetch(`http://localhost:5000/update/${editingUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            const updatedUser = await response.json();

            // Update the user in the state
            setUsers((prevUsers) => prevUsers.map(user =>
                user._id === updatedUser._id ? updatedUser : user
            ));

            // Clear the form and stop editing
            setFormData({
                name: '',
                email: '',
                car: '',
                date: '',
            });
            setEditingUser(null);
        } catch (err) {
            setError(err.message);  // Handle error
        }
    };

    const startEditing = (user) => {
        setFormData({
            name: user.name,
            email: user.email,
            car: user.car.join(", "),
            date: user.date,
        });
        setEditingUser(user);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="App max-w-6xl m-auto">
            <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border px-4 py-2"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border px-4 py-2"
                />
                <input
                    type="text"
                    name="car"
                    placeholder="Car (comma separated)"
                    value={formData.car}
                    onChange={handleInputChange}
                    className="border px-4 py-2"
                />
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="border px-4 py-2"
                />
                <button
                    type="button"
                    onClick={editingUser ? updateUser : addUser}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                >
                    {editingUser ? 'Update User' : 'Add User'}
                </button>
            </form>

            <table className="min-w-full table-auto border-collapse border border-gray-300 mt-6">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Car</th>
                        <th className="border border-gray-300 px-4 py-2">Date</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
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
                                <button
                                    className="bg-blue-600 text-white py-2 px-4 rounded"
                                    onClick={() => startEditing(user)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-800 text-white py-2 px-4 rounded ml-2"
                                    onClick={() => deleteUser(user._id)}
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
