import React, { useState, useEffect } from "react";

function FetchBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [users, setUsers] = useState([]);  // Store all users
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch blogs and users from the API
        const fetchData = async () => {
            try {
                const [blogsResponse, usersResponse] = await Promise.all([
                    fetch('http://localhost:5000/getBlogs'),
                    fetch('http://localhost:5000/getAll'),
                ]);
                console.log ('sfsfsfs');
                // Check if the responses are ok
                if (!blogsResponse.ok || !usersResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                // Parse the JSON data from both responses
                const blogsData = await blogsResponse.json();
                const usersData = await usersResponse.json();

                // Update state with the fetched data
                setBlogs(blogsData);
                setUsers(usersData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // If still loading, show loading message
    if (loading) {
        return <div>Loading...</div>;
    }

    // If there's an error, show error message
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="App max-w-6xl m-auto">
            <h2 className="text-xl font-bold mb-4">Blog List</h2>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Title</th>
                        <th className="border border-gray-300 px-4 py-2">Content</th>
                        <th className="border border-gray-300 px-4 py-2">Tags</th>
                        <th className="border border-gray-300 px-4 py-2">Date</th>
                        <th className="border border-gray-300 px-4 py-2">Excerpt</th>
                        <th className="border border-gray-300 px-4 py-2">User Name</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Render Blog details using map */}


                    {blogs.map((blog) => {
                        // Find the user associated with the blog using the user_id
                        const blogUser = users.find((user) => user._id === blog.user_id);
                        return (
                            <tr key={blog._id}>
                                <td className="border border-gray-300 px-4 py-2">{blog.title}</td>
                                <td className="border border-gray-300 px-4 py-2">{blog.content}</td>
                                <td className="border border-gray-300 px-4 py-2">{blog.tags.join(", ")}</td>
                                <td className="border border-gray-300 px-4 py-2">{new Date(blog.date).toLocaleDateString()}</td>
                                <td className="border border-gray-300 px-4 py-2">{blog.excerpt}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {/* Render the user's name, if available */}
                                    {blogUser ? blogUser.name : "Unknown User"}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default FetchBlogs;
