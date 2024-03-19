import * as React from "react";
import "./index.css";
import Main from "./Main/Main.Component";

const Popup: React.FC = () => {
  return (
    <section id="popup">
      <div className="bg-gray-200 min-h-screen flex justify-center items-center">
        <Main />
      </div>
    </section>
  );
};

export default Popup;
