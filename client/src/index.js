import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // Assuming App.js is in the same folder

// Render the App component into the 'root' div in index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // This corresponds to <div id="root"></div> in index.html
);
