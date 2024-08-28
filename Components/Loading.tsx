import React from "react";
import '@/app/globals.css'

const Loading = () => {
  return (
    <div className="w-100 h-screen relative">
      <div className="absolute translate-spinner">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
