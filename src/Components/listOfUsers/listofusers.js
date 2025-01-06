import React, { useState, useEffect } from "react";

function FetchUser() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user data from an API
        fetch("http://localhost:5000/getAll")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched data:", data);


                if (Array.isArray(data.users)) {
                    setUsers(data.users);
                } else {
                    console.error("Fetched data.users is not an array:", data);
                    setUsers([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                setUsers([]);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{setError(error)}</div>;
    }

    return (
        <div className="App max-w-6xl m-auto">
            <thead>
                <tr>
                    <th scope="col">Name:</th>
                    <th scope="col">Email:</th>
                    <th scope="col">Car:</th>
                    <th scope="col">Date:</th>
                </tr>
            </thead>
          

           
       
                {users.map((users) => (
                      <tbody key={users._id}>
                    
                        <td>{users.name}</td>
                        <td>{users.email}</td>
                        <td>{users.car.join(", ")}</td>
                        <td>{users.date}</td>
                       
                   
                    </tbody>
                ))}
           
           
        </div>
    );
}

export default FetchUser;
