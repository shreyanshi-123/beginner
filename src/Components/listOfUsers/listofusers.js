import React, { useState, useEffect } from "react";

function FetchUser() {
    const [users, setUsers] = useState([]);  // State to store users
    const [loading, setLoading] = useState(true);  // State to handle loading state
    const [error, setError] = useState(null);  // State to handle error
    const [formData, setFormData] = useState({  // State to manage form data
        name: '',
        email: '',
        car: '',
        password: ''
    });
    const [editingUser, setEditingUser] = useState(null);  // State to track the user being edited

    // Function to fetch users data from the server
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

    // Fetch users data on initial render
    useEffect(() => {
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
    const startEditing = (user) => {
        setFormData({
            name: user.name,
            email: user.email,
            car: user.car ? user.car.join(", ") : "", // Ensure car is in comma-separated string
            password: user.password

        });
        // alert(user)
        setEditingUser(user);  // Set the user to edit
    };
    // Function to add a new user
    const addUser = async () => {
        try {
            // Check if formData is valid (optional validation)
            if (!formData.name || !formData.email || !formData.car || !formData.password) {
                alert('Please fill out all fields');
                return;
            }

            // Convert the car input (comma separated string) to an array
            const carArray = formData.car.split(',').map(item => item.trim());

            // Prepare the data to send to the backend
            const userData = {
                ...formData,
                car: carArray  // Convert the "car" field to an array
            };

            // Send the POST request to create a new user
            const response = await fetch('http://localhost:5000/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),  // Send the updated user data in the request body
            });

            // Log the response for debugging
            const responseBody = await response.json();
            console.log('Response Body:', responseBody);

            if (!response.ok) {
                throw new Error(`Failed to add user. Status: ${response.status}`);
            }

            const newUser = responseBody;

            // Add the new user to the state
            setUsers((prevUsers) => [...prevUsers, newUser]);

            // Clear the form
            setFormData({
                name: '',
                email: '',
                car: '',
                password: '',
            });

            // Fetch updated list of users after adding a new one
            fetchData(); // This will refresh the list of users

        } catch (err) {
            console.error('Error:', err);
            setError(err.message);  // Handle error
        }
    };

    // Function to handle user deletion
    const deleteUser = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

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
        if (!editingUser) {
            alert("No user is being edited.");
            return;
        }
    
        try {
            const carArray = formData.car.split(',').map(item => item.trim());  // Ensure car is an array
    
            const userData = {
                _id: editingUser._id,  // Ensure that _id is included in the request body
                name: formData.name,
                email: formData.email,
                car: carArray,
                password: formData.password,
            };
    
            console.log("Updating user with data:", userData);
    
            const response = await fetch(`http://localhost:5000/update/${editingUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData), // Send the data to the server
            });
    
            const responseBody = await response.json();
    
            // Log the response for debugging
            console.log('Response Status:', response.status);
            console.log('Response Body:', responseBody);
    
            if (!response.ok) {
                throw new Error(`Failed to update user. Status: ${response.status}`);
            }
    
            const updatedUser = responseBody;
    
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
            );
    
            setFormData({ name: '', email: '', car: '', password: '' });
            setEditingUser(null);
    
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);  // Handle error
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
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
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

                            <td className="border border-gray-300 px-4 py-2">{user.name}<br/>USER ID: {user._id}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.car && Array.isArray(user.car) ? user.car.join(", ") : "No cars listed"}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.date}
                              <br/>  {user.password}</td>
                            <td className="border border-gray-300 px-4 py-2 flex justify-center">
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
