import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
      }}
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        style={{ marginBottom: "24px", animation: "spin 1.2s linear infinite" }}
      >
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="#FF5A5F"
          strokeWidth="8"
          strokeDasharray="44 88"
          strokeLinecap="round"
        />
        <style>
          {`
                                            @keyframes spin {
                                                    100% { transform: rotate(360deg); }
                                            }
                                            svg {
                                                    display: block;
                                            }
                                    `}
        </style>
      </svg>
      <div
        style={{
          fontSize: "1.5rem",
          color: "#FF5A5F",
          fontWeight: "bold",
          letterSpacing: "1px",
          fontFamily: "",
        }}
      >
        Loading your stay...
      </div>
    </div>
  );
};

export default Loading;
