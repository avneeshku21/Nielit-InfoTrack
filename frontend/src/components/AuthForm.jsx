import React, { useState } from "react";
import { TextField, Button, Box, Typography, Link, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const AuthForm = ({ isLogin, onSubmit, togglePage }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student", // Default to student login
    name: "",
    phone: "",
    education: "",
  });
  const [photo, setPhoto] = useState(null); // State for photo file

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setPhoto(e.target.files[0]); // Set photo file
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create FormData to include the photo as well
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    if (photo) {
      data.append("photo", photo); // Append photo to FormData
    }

    onSubmit(data); // Pass FormData to onSubmit
  };

  return (
    <Box
      sx={{
        width: 400,
        margin: "auto",
        marginTop: 8, // Adds space from the top
        padding: 3,
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        {isLogin ? "Login" : "Register"}
      </Typography>
      {!isLogin && (
        <>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            label="Phone"
            name="phone"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            label="Education"
            name="education"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            accept="image/*"
          />
        </>
      )}
      <TextField
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          id="role-select"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        {isLogin ? "Login" : "Register"}
      </Button>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link
          href="#"
          underline="hover"
          sx={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={togglePage}
        >
          {isLogin ? "Register" : "Login"}
        </Link>
      </Typography>
    </Box>
  );
};

export default AuthForm;
