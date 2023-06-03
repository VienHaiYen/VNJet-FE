import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

function NormalLayout({ children }) {
  const [entryType, setEntryType] = React.useState(0);
  return (
    <>
      <Header setEntryType={setEntryType} />
      {React.cloneElement(children, { entryType: entryType })}
      <Footer />
    </>
  );
}

export default NormalLayout;
