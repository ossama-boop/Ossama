import React, { useState } from 'react';
import "../Style/LebanonGuide.css";
function StarRating({ rating, setRating, id }) {
  return (
    <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(id, star)}
          style={{
            cursor: 'pointer',
            fontSize: '30px',
            color: star <= rating ? 'gold' : 'gray',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function LebanonGuide() {
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      image: 'BayRock.jpeg',
      name: 'Bay Rock Cafe',
      location: 'General De Gaulle, Beirut, Lebanon',
      rating: 0, 
    },
    {
      id: 2,
      image: 'ZaatarWZeit.jpeg',
      name: 'Zaatar w Zeit',
      location: 'Many palces',
      rating: 0,
    },
    {
      id: 3,
      image: 'Tartine.jpeg',
      name: 'Bar Tartine',
      location: 'Armenia Strret, Mar mikhael',
      rating: 0,
    },
     {
      id: 4,
      image: 'Akra.jpeg',
      name: 'Akra',
      location: 'Many places at Tripoli',
      rating: 0,
    },
    {
      id: 5,
      image: 'Mazar.jpeg',
      name: 'Khaymet Al Mazar',
      location: 'Beit Meri, Mount Lebanon',
      rating: 0,
    },
    {
      id: 6,
      image: 'Rawand.jpeg',
      name: 'Rawand',
      location: 'Dam wl Farez, Trioli',
      rating: 0,
    },
    {
      id: 7,
      image: 'Liza.jpeg',
      name: 'Liza Beirut',
      location: 'Doumani Street, Beirut',
      rating: 0,
    },
    {
      id: 8,
      image: 'LeJardin.jpeg',
      name: 'Le Jardin du Royal',
      location: 'Dbayeh, Lebanon',
      rating: 0,
    },
    {
      id: 9,
      image: 'Rawsheh2.jpeg',
      name: 'Rawsheh',
      location: 'Beirut, Lebanon',
      rating: 0,
    },
 {
      id: 10,
      image: 'Baalbeck2.jpeg',
      name: 'Baalbeck Castle',
      location: 'Baalbeck, Lebanon',
      rating: 0,
    },
    {
      id: 11,
      image: 'Jeita.jpeg',
      name: 'Jeita Grotto',
      location: 'Jbeil, Lebanon',
      rating: 0,
    },
     {
      id: 12,
      image: 'Tao.jpeg',
      name: 'Tao Bar',
      location: 'kaslik, Lebanon',
      rating: 0,
    },
     {
      id: 13,
      image: 'ZaytoonaBay.jpeg',
      name: 'Zaytuna Bay',
      location: 'Beirut, Lebanon',
      rating: 0,
    },
     {
      id: 14,
      image: 'Falamanki.jpeg',
      name: 'Falamanki',
      location: 'Beirut, Lebanon',
      rating: 0,
    },
     {
      id: 15,
      image: 'DarAlAmar.jpeg',
      name: 'Dar al Amar',
      location: 'Trioli, Lebanon',
      rating: 0,
    },
     {
      id: 16,
      image: 'Sursock.jpeg',
      name: 'Sursock',
      location: 'Beirut, Lebanon',
      rating: 0,
    },
  ]);

  const [formData, setFormData] = useState({
    breakfast: '',
    lunch: '',
    touristPlaces: '',
    dinner: '',
    eveningOut: '',
  });

  const [showTable, setShowTable] = useState(false);

  const handleRatingChange = (id, newRating) => {
    setRestaurants((prevRestaurants) =>
      prevRestaurants.map((restaurant) =>
        restaurant.id === id ? { ...restaurant, rating: newRating } : restaurant
      )
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowTable(true);
  };

  return (
    <div>
      <h1>Plan Your Day</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '40px', justifyContent: 'center' }}>
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              width: '300px',
              textAlign: 'center',
              padding: '10px',
            }}
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <h3>{restaurant.name}</h3>
            <p>Location: {restaurant.location}</p>
            <p>Rate this place:</p>
            <StarRating
              rating={restaurant.rating}
              setRating={handleRatingChange}
              id={restaurant.id}
            />
            {restaurant.rating > 0 && <p>Your Rating: {restaurant.rating} ⭐</p>}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit} >
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

        <button type="submit" style={{ marginTop: '15px' }}>
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
                <td>{formData.breakfast || 'Not specified'}</td>
              </tr>

              <tr>
                <td>Lunch</td>
                <td>{formData.lunch || 'Not specified'}</td>
              </tr>

              <tr>
                <td>Tourist Places</td>
                <td>{formData.touristPlaces || 'Not specified'}</td>
              </tr>

              <tr>
                <td>Dinner</td>
                <td>{formData.dinner || 'Not specified'}</td>
              </tr>

              <tr>
                <td>Evening Out</td>
                <td>{formData.eveningOut || 'Not specified'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LebanonGuide;