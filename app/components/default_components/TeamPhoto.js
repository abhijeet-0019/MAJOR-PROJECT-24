// components/TeamPhoto.js
import React from "react";
import Image from "next/image";

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "16px",
  textAlign: "center",
  margin: "16px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "calc(25% - 40px)", // Default for larger screens
};

const cardHoverStyle = {
  transform: "translateY(-5px)",
};

const highlightNameStyle = {
  fontWeight: "bold",
  color: "#0070f3",
};

const TeamPhoto = ({ name, photo, phone, branch, designation }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      className="card"
      style={{ ...cardStyle, ...(hover ? cardHoverStyle : {})    }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <Image
        src={photo}
        alt={name}
        width={150}
        height={150}
        style={{ borderRadius: "50%" }}
      />
      <h3 style={highlightNameStyle}>{name}</h3>
      {branch && (
        <p>
          <strong>Branch:</strong> {branch}
        </p>
      )}
      {designation && (
        <p>
          <strong>Designation:</strong> {designation}
        </p>
      )}
      <p>
        <strong>Phone:</strong> {phone}
      </p>
    </div>
  );
};

export default TeamPhoto;
