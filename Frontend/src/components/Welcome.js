import React, { useState, useEffect } from "react";
const images = ["image1.jpeg", "image2.jpeg", "image3.jpeg", "image4.jpeg"];

export default function Welcome() {
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(1);
  const [index3, setIndex3] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex1((prev) => (prev + 1) % images.length);
      setIndex2((prev) => (prev + 1) % images.length);
      setIndex3((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="welcome-container">
      <div className="welcoming">
      <h1>Welcome To Our Website!</h1>
      <h2>To make a perfect and unforgettable trip</h2>
      <h2>Small in size, Big in beauty</h2>
      
    </div>
      <div className="image-box">
        <img src={images[index1]}  />
      </div>

      <div className="image-box">
        <img src={images[index2]}  />
      </div>

      <div className="image-box">
        <img src={images[index3]}  />
      </div>
    </div>
  );
}