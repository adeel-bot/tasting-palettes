import { useEffect, useLayoutEffect, useState } from "react";
import Theme_btn from "../components/Theme_btn";
import "../index.css";
import { v4 as uuidv4 } from "uuid";
import PaletteCard from "../components/PaletteCard";
import { motion, AnimatePresence } from "framer-motion";
import RandomPalette from "../components/RandomPalette";
import {animateScroll as scroll } from 'react-scroll';

function Home() {
  const [colors, setColors] = useState({
    color1: "#D9A490",
    color2: "#EBD4B9",
    color3: "#EEEEEE",
  });
  const [palette, setPalette] = useState([]);
  const [error, setError] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const [defaultCard, setDefaultPalette] = useState({
      color_1: '',
      color_2:'',
      color_3:'',
  });

  const [newCardId, setnewCardId] = useState(null);

  const [navbarClicked, setNavbarClicked] = useState(false);
  const [bodyClicked, setBodyClicked] = useState(false);
  const [contentClicked, setContentClicked] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteID, setdeleteID] = useState(null);

  useLayoutEffect(() => {
    const saveTheme = JSON.parse(localStorage.getItem("theme"));
    if (saveTheme !== false) {
      setIsDarkTheme(saveTheme);
    }
    const palette = RandomPalette();
    setDefaultPalette(palette);
  }, []);

  useEffect(() => {
    const storedPalettes = JSON.parse(localStorage.getItem("palettes"));
    if (storedPalettes && Array.isArray(storedPalettes)) {
      setPalette(storedPalettes);
    }
  }, []);

  const saveToLocal = (newPaletteList) => {
    localStorage.setItem("palettes", JSON.stringify(newPaletteList));
  };

  const isValidColor = (color) => {
    const s = new Option().style;
    s.color = "";
    s.color = color;
    return s.color !== "";
  };

  const handleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  const paletteSetter = () => {
    const { color1, color2, color3 } = colors;

    if (!color1 || !color2 || !color3) {
      setError(
        "Please fill in all three color fields before adding the palette."
      );
      return;
    }
    if (![color1, color2, color3].every(isValidColor)) {
      setError("Please enter valid CSS color values.");
      return;
    }
    let newPaletteList;
    let newCard = {
      id: uuidv4(),
      text: {
        color1: colors.color1,
        color2: colors.color2,
        color3: colors.color3,
      },
    };
    newPaletteList = [...palette, newCard];
    setPalette(newPaletteList);
    saveToLocal(newPaletteList);
    setnewCardId(newCard.id);
    setColors({ color1: "", color2: "", color3: "" });
    setError("");
  };

  const handleDelete = (targetId) => {
    try {
      if (targetId === "deleteAll") {
        localStorage.setItem("palettes", JSON.stringify([]));
        setPalette([]);
        setdeleteID(null);
        return;
      }
      const storedCards = JSON.parse(localStorage.getItem("palettes"));
      if (!storedCards || !Array.isArray(storedCards)) {
        console.warn("No palettes found or invalid format in localStorage.");
        console.warn("Deletion Error!");
        return;
      }
      setTimeout(() => {
        const updatedCards = storedCards.filter(
          (cards) => cards.id !== targetId
        );
        setPalette(updatedCards);
        saveToLocal(updatedCards);
        setdeleteID(null);
      }, 200);
    } catch (err) {
      console.error("Error Deleting palette:", err);
    } finally {
      setShowDelete(false);
    }
  };

  const deleteManager = (del_Id) => {
    setdeleteID(del_Id);
    setShowDelete(true);
  };

  const deleteAllHandler = () => {
    if (palette.length === 0) {
      setError("No palettes available to delete.");
      return;
    }
    deleteManager("deleteAll");
  };

 
  return (
    <div
      className={`myhome min-h-screen p-6 ${isDarkTheme ? "dark-theme" : ""}  `}
    >
      {showDelete && (
        <div className="fixed inset-0 flex justify-center items-center text-center z-50 h-full w-full bg-black/50 backdrop-blur-xs animate-fadeInScale ">
          <div className="w-full confirmation-box max-w-md sm:w-[25%] bg-[#FCF9F4] rounded-2xl shadow-2xl border border-[#E5E1DA] p-6 space-y-6 text-gray-800">
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold tracking-tight">
                Are you sure?
              </h1>
              <p className="text-base  leading-relaxed opacity-85">
                This will permanently delete the palette card(s). This action
                cannot be undone.
              </p>
            </div>
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={() => setShowDelete(false)}
                className="flex-1 p-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 hover:scale-105 transition-all duration-200 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteID)}
                className="flex-1 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:scale-105 transition-all duration-200 ease-in-out"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <Theme_btn onClick={handleTheme} isDarkTheme={isDarkTheme} />
      <div className="footer-icons fixed bottom-2 right-1.5 z-80 flex 
      justify-center items-center gap-3 flex-col">

      <div className="to-top pb-1">
        <button onClick={() => scroll.scrollToTop({ duration: 700, smooth: 'easeOutCubic' })}>
          <img width="45px" height="45px" src="./back-to-top.png" alt="back_to_top" />
          </button>
      </div>
           <div >
        <a  href="https://www.instagram.com/adeel_bot/" target="_blank" rel="noopener noreferrer">
        <img width='25px' height='25px' src="./instagram-2016-5.svg" alt="Insta_Link" />
        </a>
      </div>
      <div>
        <a  href="https://www.linkedin.com/in/adeel-bot" target="_blank" rel="noopener noreferrer">
        <img width='25px' height='25px' src="./linkedin-icon-2.svg" alt="Insta_Link" />
        </a>
      </div>
      </div>
      <div className="max-w-4xl mx-auto bg-[#FAF0E6] shadow-md rounded-xl p-6 mb-10">
        <h1 className="head-top text-4xl font-bold text-center gap-3 mb-6 text-gray-800 flex justify-center items-center dancing-script">
          <span>🎨</span>
          <span>Taste Your Color Palette </span>
        </h1>

                                    {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 ">
                                       {/* Navbar Color */}

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-semibold text-center label">
              Navbar
            </label>
            <input
              type="text"
              placeholder="e.g., #7657B1"
              value={colors.color1}
              onChange={(e) =>
                setColors((prev) => ({ ...prev, color1: e.target.value }))
              }
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#eadbcc]"
            />
          </div>

                                      {/* Body Color */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-semibold text-center label">
              Body
            </label>
            <input
              type="text"
              placeholder="e.g., #B393F2"
              value={colors.color2}
              onChange={(e) =>
                setColors((prev) => ({ ...prev, color2: e.target.value }))
              }
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#eadbcc]"
            />
          </div>

                                       {/* Content Color */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-semibold text-center label">
              Content
            </label>
            <input
              type="text"
              placeholder="e.g., #F3F4F6"
              value={colors.color3}
              onChange={(e) =>
                setColors((prev) => ({ ...prev, color3: e.target.value }))
              }
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#eadbcc] "
            />
          </div>

                                {/* Add Palette & Delete All Buttons Row */}
          <div className="flex flex-col md:flex-row col-span-1 md:col-span-2 lg:col-span-3 gap-4">
                                    {/* Add Palette Button */}
            <button
              onClick={paletteSetter}
              className="bg-[#A98467] add-btn text-white border font-semibold p-3 rounded-md hover:bg-[#9a775d] transition cursor-pointer w-full"
            >
              + Add Palette
            </button>

                                   {/* Delete All Button */}
            <button
              onClick={() => deleteAllHandler()}
              className="bg-[#de5252] text-[#fff] border font-semibold p-3 rounded-md hover:bg-[#d72b2b] transition cursor-pointer w-full"
            >
              🗑️ Delete All
            </button>
          </div>
        </div>

                                     {/* Error Message */}
        {error && (
          <div className="text-red-500 font-medium text-center">{error}</div>
        )}
      </div>

                                {/* Default Card + Palette Cards */}

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[80px]">
                                 {/* Default Sample Card */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-300 transition-transform hover:scale-[1.02] text-center"
          style={{ backgroundColor: defaultCard.color_2 }}
        >
          <div
            className=" h-20 flex items-center text-center justify-center font-bold text-white text-lg pl-5 pr-5"
            style={{
              backgroundColor: defaultCard.color_1
            }}
          >
            <span
              className="flex justify-center text-center"
              style={{
                cursor: 'url("./feather-30.png") 10 100 , auto',
                color: navbarClicked ? "black" : "white",
              }}
              onClick={() => setNavbarClicked(!navbarClicked)}
            >
              Navbar
            </span>
          </div>
          <div
            className="h-32 flex pt-4.5 justify-center text-white font-medium text-md "
            style={{
              backgroundColor: defaultCard.color_2,
              cursor: 'url("./feather-30.png") 10 100 , auto',
              color: bodyClicked ? "white" : "black",
            }}
            onClick={() => setBodyClicked(!bodyClicked)}
          >
            <span>Body</span>
          </div>
          <div
            className="h-28 w-[80%] p-3 text-center m-auto flex items-center justify-center font-medium rounded-2xl relative bottom-11"
            style={{
             cursor: 'url("./feather-30.png") 10 100 , auto',
              color: contentClicked ? "white" : "black",
              backgroundColor: defaultCard.color_3,
            }}
            onClick={() => setContentClicked(!contentClicked)}
          >
            <span>[click to change text color]</span>
          </div>
        </div>
                                   {/* Dynamic Palette Cards */}
        <AnimatePresence>
          {palette.map((item) => (
            <motion.div
              key={item.id}
              className="rounded-2xl overflow-hidden shadow-lg border border-gray-300 transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: item.text.color2 }}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <PaletteCard
                palettes={item.text}
                id={item.id}
                deleteManager={deleteManager}
                newCardId={newCardId}
                setnewCardId={setnewCardId}
                isDarkTheme={isDarkTheme}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
    
  );
}

export default Home;
