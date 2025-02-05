import axios from "axios"; 
import React, { useEffect, useState } from "react";

function Creator() {
  const [admin, setAdmin] = useState([]);
  
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/users/admins",
          {
            withCredentials: true,
          }
        );
        setAdmin(data); // Corrected here
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Popular Creators</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-5">
        {admin.length > 0 ? (
          admin.slice(0, 4).map((element) => (
            <div key={element._id}>
              <div className="flex flex-col items-center">
                <img
                
                  src={element.photo?.url || "/default-avatar.png"}
                  alt="Creator"
                  className="w-56 h-56 object-cover border border-black rounded-full"
                />
                <div className="text-center">
                  <p className="text-lg font-semibold">{element.name}</p>
                  <p className="text-gray-600 text-xs">{element.role}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No creators found.</p>
        )}
      </div>
    </div>
  );
}

export default Creator;
