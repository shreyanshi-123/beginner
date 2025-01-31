import React, { useState, useEffect } from "react";

function FetchBlogs() {
    const [blogs, setBlogs] = useState([]);  
    // const [Users, setUsers] = useState([]);// Store the blogs as an array
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state

    // Fetch blogs from the API
    const fetchBlogs = async () => {
        try {
            const response = await fetch('http://localhost:5000/getBlogs');
            console.log(response);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();  // Parse the response as JSON
            setBlogs(data);  // Set the blogs state with the fetched data
            
        } catch (err) {
            setError(err.message);  // Set error message if an error occurs
        } finally {
            setLoading(false);  // Set loading to false after fetching data
        }
    };

    // const fetchUser = async () => {
    //     try {
    //         const getUser = await fetch('http://localhost:5000/getAll');
    //         console.log(getUser);

    //         if (!getUser.ok) {
    //             throw new Error('Failed to fetch data');
    //         }

    //         const allUsers = await getUser.json();  // Parse the response as JSON
    //         setUsers(allUsers);  // Set the blogs state with the fetched data
            
    //     } catch (err) {
    //         setError(err.message);  // Set error message if an error occurs
    //     } finally {
    //         setLoading(false);  // Set loading to false after fetching data
    //     }
    // }

    useEffect(() => {
        fetchBlogs(); 
        // fetchUser(Users.name) ;// Fetch blogs and user when the component mounts
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
                        <th className="border border-gray-300 px-4 py-2">User Id</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Render Blog details using map */}
                    {blogs.map((blog) => {
                        return (
                            <tr key={blog._id}>
                                <td className="border border-gray-300 px-4 py-2">{blog.title}<br/>
                                Blogs ID: {blog._id}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{blog.content}</td>
                                <td className="border border-gray-300 px-4 py-2">{blog.tags && Array.isArray(blog.tags) ? blog.tags.join(", ") : "No tags listed"}</td>
                                <td className="border border-gray-300 px-4 py-2">{blog.date}</td>
                                <td className="border border-gray-300 px-4 py-2">{blog.excerpt}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {blog.user_id},{
                                      <>{ blog.userDetails.name}</> 
                                    }

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
