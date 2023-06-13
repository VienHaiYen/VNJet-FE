import React from "react";
import Header from "./components/Header";
function DefaultLayout({ children }) {
  return (
    <div className="p-5 mt-5">
      <Header />
      {React.cloneElement(children)}
    </div>
  );
}

export default DefaultLayout;
