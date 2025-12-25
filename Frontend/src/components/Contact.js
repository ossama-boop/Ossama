import React from "react";
import "../Style/Contact.css";


 function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-text">
        We’d love to hear from you! Whether you have questions about our tours,
        destinations, or experiences in Lebanon — feel free to reach out anytime.
      </p>

      <div className="contact-info">
        <div className="info-item">
          <h3>📍 Address</h3>
          <p>Beirut, Lebanon</p>
        </div>

        <div className="info-item">
          <h3>📞 Phone</h3>
          <p>+961 81 330 304</p>
        </div>

        <div className="info-item">
          <h3>✉️ Email</h3>
          <p>ossama2004.alloush@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
export default Contact;