import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Custom styles for fancy title
const style = document.createElement('style');
style.innerHTML = `
  .fancy-title {
    font-family: 'Playfair Display', serif;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
