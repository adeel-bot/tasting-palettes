import { React, useState, memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import "../index.css";
const PaletteCard = ({
  palettes,
  id,
  deleteManager,
  newCardId,
  setnewCardId,
  isDarkTheme,
}) => {
  const [navbarClicked, setNavbarClicked] = useState(false);
  const [bodyClicked, setBodyClicked] = useState(false);
  const [contentClicked, setcontentClicked] = useState(false);

  const cardRef = useRef(null);
  const isNew = id === newCardId;

  useEffect(() => {
    if (isNew && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

      const timeout = setTimeout(() => setnewCardId(null), 500);

      return () => clearTimeout(timeout);
    }
  }, [isNew]);

  const handleDelete = (targetId) => {
    deleteManager(targetId);
  };
  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="h-20 flex items-center justify-between text-center
         font-bold text-white text-lg pl-5 pr-5 "
        style={{
          backgroundColor: palettes.color1,
        }}
      >
        <span className="relative inline-block h-[30px] w-[30px]">
          <img
            src="./icons8-static.png"
            alt="close_static"
            className="absolute w-full inset-0 h-full hover:opacity-0 transition-opacity duration-200"
          />

          <img
            src="./icons8-close.gif"
            alt="close_gif"
            className="absolute w-full h-full hover:scale-[1.1] inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200"
            onClick={() => handleDelete(id)}
          />
        </span>
        <span
          className=" flex justify-center text-center"
          style={{
            cursor: 'url("./feather-30.png") 10 100 , auto',
            color: navbarClicked ? "black" : "white",
          }}
          onClick={() => setNavbarClicked(!navbarClicked)}
        >
          Navbar
        </span>

        <span className="">
          <Link
            to="/experience"
            state={{ id: id, palette: palettes, isDarkTheme: isDarkTheme }}
          >
            <img
              className="cursor-pointer transition-transform hover:scale-[1.20]"
              width="29px"
              height="29px"
              src="./external-link.png"
              alt="Experience_link"
            />
          </Link>
        </span>
      </div>
      <div
        className="h-32 flex pt-4.5 justify-center text-white font-medium text-md"
        style={{
          backgroundColor: palettes.color2,
          cursor: 'url("./feather-30.png") 10 100 , auto',
          color: bodyClicked ? "white" : "black",
        }}
        onClick={() => setBodyClicked(!bodyClicked)}
      >
        Body
      </div>
      <div
        className="h-28 truncate w-[80%] bg-[#FDF8F1] m-auto flex items-center justify-center font-medium rounded-2xl relative bottom-11"
        style={{
          backgroundColor: palettes.color3,
          cursor: 'url("./feather-30.png") 10 100 , auto',
          color: contentClicked ? "white" : "black",
        }}
        onClick={() => setcontentClicked(!contentClicked)}
      >
        Content
      </div>
    </motion.div>
  );
};

export default memo(PaletteCard);
