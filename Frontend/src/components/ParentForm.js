/*import React, { useState } from "react";
import ChildForm from "./LebanonGuide"; 

const ParentForm = () => {
 
  const [userData, setUserData] = useState(null);

  
  const handleFormSubmit = (data) => {
    setUserData(data); 
  };

  return (
    <div className="parentForm" >
      <h2>Your Plan</h2>

      {}
      <ChildForm onSubmitData={handleFormSubmit} />

      {}
      {userData && (
        <div
          className="result"
          
        >
          <h3>Data received from Child:</h3>
         <table>
            <tr>
            <td><strong>breakfast:</strong> {userData.name}</td>
          
            <td><strong>lunch:</strong> {userData.email}</td>

            <td><strong>dinner:</strong> {userData.email}</td>

            <td><strong>tourism:</strong> {userData.email}</td>
            </tr>
          </table>
        </div>
      )}
    </div>
  );
};

export default ParentForm;*/