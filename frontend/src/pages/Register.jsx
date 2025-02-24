import axios from "axios";


import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const changedPhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPhotoPreview(reader.result);
        setPhoto(file);
      };
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);
    formData.append('photoPreview', photoPreview);

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/users/register",formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      console.log(data);
      alert("User Registered Successfully");
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto(null);
      setPhotoPreview("");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-lg">
          <form onSubmit={handleRegister}>
            <div className="font-semibold text-xl text-center mb-6">
              Nielit<span className="text-blue-600">Track</span>
            </div>
            <h1 className="text-xl font-semibold mb-6">Register</h1>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option value="">Select Role</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option value="">Select Your Education</option>
              <option value="BA">BA</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="BTECH">BTECH</option>
              <option value="O-Level">O-Level</option>
              <option value="A-Level">A-Level</option>
            </select>
            <div className="flex items-center mb-4">
              <div className="photo w-20 h-20 mr-4">
                {photoPreview && (
                  <img
                    src={photoPreview?`${photoPreview}`:"photo"}
                    alt="Preview"
                    className="w-full h-full rounded-md object-cover"
                  />
                )}
              </div>
              <input
                type="file"
                onChange={changedPhotoHandler}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <p className="text-center mb-4">
              Already registered?{" "}
              <Link to="/login" className="text-blue-600">
                Login Now
              </Link>
            </p>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
