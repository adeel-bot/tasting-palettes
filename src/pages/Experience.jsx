import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./experience.css";
import { useLocation } from "react-router-dom";


const Experience = () => {
  const [navbarColor, setNavbarColor] = useState("#5E936C");
  const [backgroundColor, setBackgroundColor] = useState("#93DA97");
  const [cardsContainerColor, setCardsContainerColor] = useState("#E8FFD7");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const location = useLocation();

  const { id, palette, isDarkTheme } = location.state;

  const [navbarClicked, setNavbarClicked] = useState(false);
  const [bodyClicked, setBodyClicked] = useState(false);
  const [contentClicked, setcontentClicked] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("palettes"));

      if (!stored || !Array.isArray(stored)) {
        console.warn("No palettes found or invalid format in localStorage.");
        return;
      }
 
      const match = stored.find((item) => item?.id === id);

      if (!match) {
        console.warn(`No palette found with ID: ${id}`);
        return;
      }

      setNavbarColor(match.text?.color1 || "#5E936C");
      setBackgroundColor(match.text?.color2 || "#93DA97");
      setCardsContainerColor(match.text?.color3 || "#E8FFD7");
    } catch (error) {
      console.error("Failed to load palettes from localStorage:", error);
    }
  }, [id]);

  const updatePaletteColors = (updatepalette) => {
    try {
      const stored = JSON.parse(localStorage.getItem("palettes"));

      if (!stored || !Array.isArray(stored)) {
        console.warn("No palettes found or invalid format.");
        return;
      }

      const index = stored.findIndex((item) => item?.id === id);

      if (index === -1) {
        console.warn(`No Palette found with the ID; ${id}`);
        return;
      }

      stored[index].text = {
        color1: updatepalette.color1,
        color2: updatepalette.color2,
        color3: updatepalette.color3,
      };

      localStorage.setItem("palettes", JSON.stringify(stored));
  
    } catch (err) {
      console.error("Error replacing palette:", err);
    }
  };

  const updateLocalStorage = (color1, color2, color3) => {
    const updatepalette = { color1: color1, color2: color2, color3: color3 };
    updatePaletteColors(updatepalette);
  };

  return (
   
   <div className={`experience min-h-screen flex flex-col ${isDarkTheme?'dark-theme':''}`} style={{ backgroundColor }}>
   
      {/* Navbar */}
     <div
  className="w-full h-20 flex items-center justify-between px-14 shadow-md"
  style={{ backgroundColor: navbarColor }}
>
  {/* Left-aligned Home link */}
  <span className="text-base text-white font-semibold hover:scale-[1.05] hover:font-bold hover:underline">
    <Link to="/">Home</Link>
  </span>

  {/* Centered Navbar text */}
  <nav className="flex-1 flex items-center justify-center text-md font-semibold ">
    <span
      style={{
        cursor: 'url("./feather-30.png") 10 100 , auto',
        color: navbarClicked ? "black" : "white",
      }}
      onClick={() => setNavbarClicked(!navbarClicked)}
    >
      Navbar
    </span>
  </nav>
</div>


      {/* Color Picker Panel */}

      {showColorPicker && (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl shadow-2xl space-y-4 w-[90%] max-w-md confirmation-box">
            <h2 className="text-lg font-semibold text-gray-800">
              Customize Theme Colors
            </h2>

            <div className="flex justify-between items-center">
              <label>Navbar Color:</label>
              <input
                type="color"
                value={navbarColor}
                onChange={(e) => {
                  const value = e.target.value;
                  setNavbarColor(value);
                  updateLocalStorage(
                    value,
                    backgroundColor,
                    cardsContainerColor
                  );
                }}
              />
            </div>

            <div className="flex justify-between items-center">
              <label>Page Background:</label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => {
                  const value = e.target.value;
                  setBackgroundColor(value);
                  updateLocalStorage(navbarColor, value, cardsContainerColor);
                }}
              />
            </div>

            <div className="flex justify-between items-center">
              <label>Cards Container Background:</label>
              <input
                type="color"
                value={cardsContainerColor}
                onChange={(e) => {
                  const value = e.target.value;
                  setCardsContainerColor(value);
                  updateLocalStorage(navbarColor, backgroundColor, value);
                }}
              />
            </div>

            <div className="flex justify-between pt-4 space-x-2">
              <button
                onClick={() => {
        
                    const defaultColors = {
                      navbar: palette.color1,
                      background: palette.color2,
                      cards: palette.color3,
                    };
                    setNavbarColor(defaultColors.navbar);
                    setBackgroundColor(defaultColors.background);
                    setCardsContainerColor(defaultColors.cards);
                    updateLocalStorage(
                      defaultColors.navbar,
                      defaultColors.background,
                      defaultColors.cards
                    );
                  }
                }
                className="reset-btn px-4 py-2 bg-[#f0e7dd] text-[#333] border border-[#d6c6b8] rounded-lg hover:bg-[#e3d3c5] transition"
              >
                Reset
              </button>
              <button
                onClick={() => setShowColorPicker(false)}
                className="close-btn px-4 py-2 bg-[#c2a38b] text-white rounded-lg cursor-pointer hover:bg-[#aa7f5e] transition"
              >
               Save & Close
              </button> 
            </div>
          </div>
        </div>
      )}

      {/* Cards Section */}

      <div className="flex justify-center items-center flex-grow p-10">
        <div
          className="card-section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-[1400px] rounded-2xl pt-16 pb-16 pl-14 pr-14"
          style={{ backgroundColor: cardsContainerColor
            }}
          
          
        >
          {[1, 2, 3, 4].map((_, i) => (
  <div
    key={i}
    className="w-[95%] h-60 bg-white rounded-2xl shadow-lg overflow-hidden 
               hover:scale-105 hover:shadow-2xl 
               transition-transform duration-500 ease-in-out m-auto"
  >
    <div
      className="h-[28%] bg-black/20 flex items-center justify-center text-base font-semibold text-white"
      style={{
        backgroundColor: backgroundColor,
        cursor: 'url("./feather-30.png") 10 100, auto',
        color: bodyClicked ? "black" : "white",
      }}
      onClick={() => setBodyClicked(!bodyClicked)}
    >
      Section {i + 1}
    </div>
    <div
      className="h-2/3 card-content text-sm p-4 flex items-center justify-center text-center"
      style={{
        cursor: 'url("./feather-30.png") 10 100, auto',
        color: contentClicked ? "white" : "black",
      }}
      onClick={() => setcontentClicked(!contentClicked)}
    >
      Content goes here
    </div>
  </div>
))}

        </div>
      </div>

      {/*Customization Button */}

      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setShowColorPicker(true)}
          className="bg-[#e0ddd7] cursor-grab text-[#1f1f1f] px-3 py-3 text-base rounded-lg shadow-lg hover:bg-[#f1eee9] custm-btn transition"
        >
          Customize Colors
        </button>
      </div>
    </div>
  );
};

export default Experience;
