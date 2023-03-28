import "./ThemeToggle.css";
import {
  MdDarkMode,
  MdLightMode,
  MdOutlineLightMode,
  MdOutlineDarkMode,
} from "react-icons/md";

function ThemeToggle({ isDarkMode, setIsDarkMode }) {
  return (
    <div className="theme-toggle">
      <div className={`left button-container${isDarkMode ? "" : " selected"}`}>
        <button
          onClick={() => setIsDarkMode(false)}
          aria-label="set light mode theme"
        >
          {isDarkMode ? <MdOutlineLightMode /> : <MdLightMode />}
        </button>
      </div>
      <div className={`right button-container${isDarkMode ? " selected" : ""}`}>
        <button
          onClick={() => setIsDarkMode(true)}
          aria-label="set dark mode theme"
        >
          {isDarkMode ? <MdDarkMode /> : <MdOutlineDarkMode />}
        </button>
      </div>
    </div>
  );
}

export default ThemeToggle;
