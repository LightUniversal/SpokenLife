import React, { useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style

const App = () => {
  const [isToolsVisible, setIsToolsVisible] = useState(false);


  const toggleTools = () => {
    setIsToolsVisible(prevState => !prevState);
  };
  return (
    <>
      <Header toggleTools={toggleTools} />
      <main className="body mt-24 relative" style={{zIndex:"10"}}>
        <Outlet isToolsVisible={isToolsVisible} />
      </main>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
