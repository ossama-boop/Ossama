import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Style/LebanonGuide.css";

function StarRating({ rating, setRating, id }) {
  return (
    <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(id, star)}
          style={{
            cursor: "pointer",
            fontSize: "30px",
            color: star <= rating ? "gold" : "gray",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function LebanonGuide() {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    breakfast: "",
    lunch: "",
    touristPlaces: "",
    dinner: "",
    eveningOut: "",
  });
  const [showTable, setShowTable] = useState(false);

  // === جلب المطاعم من السيرفر ===
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get("https://ossama-backend-75tp.onrender.com/restaurants");
        console.log("GET /restaurants:", res.data);
        const data = res.data || [];

        const withImages = data.map((r) => ({
          ...r,
          image: r.image ? `data:image/jpeg;base64,${r.image}` : null,
          rating: r.rating || 0,
        }));

        setRestaurants(withImages);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
      }
    };

    fetchRestaurants();
  }, []);

  // === تغيير الريتنغ (محلي فقط) ===
  const handleRatingChange = (id, newRating) => {
    setRestaurants((prev) =>
      prev.map((r) => (r.id === id ? { ...r, rating: newRating } : r))
    );
  };

  // === حذف من الـ DB + من الواجهة ===
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?"))
      return;

    try {
      console.log("Sending DELETE for id:", id);
      const res = await axios.delete(
        `https://ossama-backend-75tp.onrender.com/restaurants/${id}`
      );
      console.log("DELETE response:", res.data);

      // امسحه من الـ state بعد نجاح الـ delete
      setRestaurants((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Error deleting restaurant. Check backend console.");
    }
  };

  // === الفورم تبع Plan Your Day ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowTable(true);
  };

  return (
    <div>
      <h1>Plan Your Day</h1>

      {/* كروت المطاعم + كرت Add */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "40px",
          justifyContent: "center",
        }}
      >
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              overflow: "hidden",
              width: "300px",
              textAlign: "center",
              padding: "10px",
            }}
          >
            {restaurant.image && (
              <img
                src={restaurant.image}
                alt={restaurant.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
            )}

            <h3>{restaurant.name}</h3>
            <p>Location: {restaurant.location}</p>

            <p>Rate this place:</p>
            <StarRating
              rating={restaurant.rating}
              setRating={handleRatingChange}
              id={restaurant.id}
            />
            {restaurant.rating > 0 && (
              <p>Your Rating: {restaurant.rating} ⭐</p>
            )}

            {/* زر الحذف */}
            <button
              style={{
                marginTop: "10px",
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#dc3545",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => handleDelete(restaurant.id)}
            >
              Delete
            </button>
          </div>
        ))}

        {/* كرت Add Restaurant */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            border: "2px dashed #999",
            width: "300px",
            height: "260px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/add-restaurant")}
        >
          <button
            style={{
              padding: "10px 20px",
              fontSize: "18px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
          >
            + Add Restaurant
          </button>
        </div>
      </div>

      {/* باقي الفورم تبع Plan Your Day */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Breakfast Restaurant:</label>
          <input
            type="text"
            name="breakfast"
            value={formData.breakfast}
            onChange={handleChange}
            placeholder="Enter restaurant name"
          />
        </div>

        <div className="form-group">
          <label>Lunch Restaurant:</label>
          <input
            type="text"
            name="lunch"
            value={formData.lunch}
            onChange={handleChange}
            placeholder="Enter restaurant name"
          />
        </div>

        <div className="form-group">
          <label>Tourist Places:</label>
          <input
            type="text"
            name="touristPlaces"
            value={formData.touristPlaces}
            onChange={handleChange}
            placeholder="Enter tourist places"
          />
        </div>

        <div className="form-group">
          <label>Dinner Place:</label>
          <input
            type="text"
            name="dinner"
            value={formData.dinner}
            onChange={handleChange}
            placeholder="Enter place name"
          />
        </div>

        <div className="form-group">
          <label>Evening Out Place:</label>
          <input
            type="text"
            name="eveningOut"
            value={formData.eveningOut}
            onChange={handleChange}
            placeholder="Enter place name"
          />
        </div>

        <button type="submit" style={{ marginTop: "15px" }}>
          Confirm
        </button>
      </form>

      {showTable && (
        <div className="table-container">
          <h2>Your Day Schedule</h2>

          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Category</th>
                <th>Your Choice</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Breakfast</td>
                <td>{formData.breakfast || "Not specified"}</td>
              </tr>

              <tr>
                <td>Lunch</td>
                <td>{formData.lunch || "Not specified"}</td>
              </tr>

              <tr>
                <td>Tourist Places</td>
                <td>{formData.touristPlaces || "Not specified"}</td>
              </tr>

              <tr>
                <td>Dinner</td>
                <td>{formData.dinner || "Not specified"}</td>
              </tr>

              <tr>
                <td>Evening Out</td>
                <td>{formData.eveningOut || "Not specified"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LebanonGuide;