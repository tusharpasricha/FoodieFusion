import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="header-contents">
        <h2>A Culinary Adventure</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to provide seamless and satisfying dining experience using the power of technology.
          A revolutionary concept that brings together a diverse range of culinary delights under one virtual roof.
        </p>
        <a href="#explore-menu">
          <button>View Menu</button>
        </a>
      </div>
    </header>
  );
};

export default Header;
