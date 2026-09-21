import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

// Flag that JS is available — gates scroll-reveal styles in styles.css
// so content is never hidden when scripts don't run.
document.documentElement.classList.add("js");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
