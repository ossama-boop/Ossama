import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddRestaurant() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !name || !location) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("location", location);

    try {
      await axios.post("http://localhost:5000/restaurants", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Restaurant added successfully!");
      navigate("/LebanonGuide"); // العودة لصفحة العرض
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Add New Restaurant</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          width: "350px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {/* Upload Image */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* Restaurant Name */}
        <input
          type="text"
          placeholder="Restaurant Name"
          onChange={(e) => setName(e.target.value)}
        />

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddRestaurant;