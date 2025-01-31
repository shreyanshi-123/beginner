import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

function FetchUser() {

    const [users, setUsers] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        user_id: '',
        user_name: '',
        tags: ''
    });
    const [editingBlog, setEditingBlog] = useState(null);

    // Fetch users from server
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/getAll/');
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setUsers(data.users || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch blogs from server
    const fetchBlogs = async () => {
        try {
            const response = await fetch('http://localhost:5000/getBlogs');
            if (!response.ok) throw new Error('Failed to fetch blogs');
            const data = await response.json();
            setBlogs(data);
        } catch (err) {
            setError(err.message);
        }
    };

    // Fetch data on initial render
    useEffect(() => {
        fetchUsers();
        fetchBlogs();
    }, []);

    
    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    // Start editing a blog
    const startEditing = (blog) => {
        setFormData({
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            tags: blog.tags ? blog.tags.join(", ") : "",
            user_id: blog.user_id
        });
        setEditingBlog(blog);
    };

    // Handle user selection (store both user_id and user_name)
    const handleUserChange = (e) => {
        const selectedUserId = e.target.value;
        const selectedUser = users.find(user => user._id === selectedUserId);
        setFormData(prevData => ({
            ...prevData,
            user_id: selectedUserId,
            user_name: selectedUser ? selectedUser.name : ''
        }));
    };

    console.log(formData.user_name);

    // Add a new blog
    const addBlog = async () => {
        if (!formData.title || !formData.excerpt || !formData.content || !formData.tags || !formData.user_id) {
            alert('Please fill out all fields');
            return;
        }

        const tagsArray = formData.tags.split(',').map(item => item.trim());
        const newBlogData = { ...formData, tags: tagsArray };

        try {
            const response = await fetch(`http://localhost:5000/AddBlogs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBlogData),
            });

            if (!response.ok) throw new Error('Failed to add blog');
            const newBlog = await response.json();
            setBlogs(prevBlogs => [...prevBlogs, newBlog]);
            fetchBlogs();
        } catch (err) {
            setError(err.message);
        }
    };
// Update an existing blog
    const updateBlog = async () => {
        if (!editingBlog) {
            alert("No blog is being edited.");
            return;
        }

        const tagsArray = formData.tags.split(',').map(item => item.trim());
        const updatedBlogData = { ...formData, tags: tagsArray, _id: editingBlog._id };

        try {
            const response = await fetch(`http://localhost:5000/updateBlog/${editingBlog._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedBlogData),
            });

            if (!response.ok) throw new Error('Failed to update blog');
            const updatedBlog = await response.json();
            setBlogs(prevBlogs => prevBlogs.map(blog => blog._id === updatedBlog._id ? updatedBlog : blog));

            resetForm();
        } catch (err) {
            setError(err.message);
        }
    };

    // Delete a blog
    const deleteBlog = async (blogId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog ?");
        
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5000/deleteBlog/${blogId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete blog');
            setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
            // fetchBlogs()
        } catch (err) {
            setError(err.message);
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({ title: '', excerpt: '', content: '', tags: '', user_id: '' });
        setEditingBlog(null);
    };
    // Loading and Error handling UI
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="App max-w-6xl m-auto">
            <h2>{editingBlog ? 'Edit Blog' : 'Add Blog'}</h2>
            <form onSubmit={(e) => e.preventDefault()} id='Add-or-edit'>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="border px-4 py-2"
                />
                <input
                    type="text"
                    name="excerpt"
                    placeholder="Excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    className="border px-4 py-2"
                />

                <select name="user_id" onChange={handleUserChange} value={formData.user_id}>
                    <option value="">Select a user</option>
                    {users.map(user => (
                        <option key={user._id} value={user._id}>
                            {user.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    name="tags"
                    placeholder="Tags (comma separated)"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="border px-4 py-2"
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    value={formData.content}
                    onChange={handleInputChange}
                    className="border px-4 py-2"
                />
                <button
                    type="button"
                    onClick={editingBlog ? updateBlog : addBlog}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                >
                    {editingBlog ? 'Update Blog' : 'Add Blog'}
                </button>
            </form>

            <div className="App max-w-6xl m-auto mt-6">
                <h2 className="text-xl font-bold mb-4">Blog List</h2>
                <div className="overflow-x-auto sm:overflow-x-visible">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Title</th>
                                <th className="border border-gray-300 px-4 py-2">Content</th>
                                <th className="border border-gray-300 px-4 py-2">Tags</th>
                                <th className="border border-gray-300 px-4 py-2">Date</th>
                                <th className="border border-gray-300 px-4 py-2">Excerpt</th>
                                <th className="border border-gray-300 px-4 py-2">Author's Name</th> {/* Display author's name */}
                                <th className="border border-gray-300 px-4 py-2">User Id</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => {
                                return (
                                    <tr key={blog._id} id={blog._id}>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {blog.title}<br />
                                            Blogs ID: {blog._id}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{blog.content}</td>
                                        <td className="border border-gray-300 px-4 py-2">{blog.tags && Array.isArray(blog.tags) ? blog.tags.join(", ") : "No tags listed"}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {blog.date}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{blog.excerpt}</td>
                                        <td className="border border-gray-300 px-4 py-2">{blog.userDetails?.['name']}</td> {/* Display the author's username */}
                                        <td className="border border-gray-300 px-4 py-2">{blog.user_id}</td>
                                        <td className="border border-gray-300 px-4 py-2 flex justify-center">
                                            <button
                                                className="bg-blue-600 text-white py-2 px-4 rounded"
                                                onClick={() => startEditing(blog)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-800 text-white py-2 px-4 rounded ml-2"
                                                onClick={() => deleteBlog(blog._id)}
                                            >
                                                Delete
                                            </button>
                                          
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default FetchUser;
