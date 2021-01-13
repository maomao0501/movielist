import React from "react";
import "../styles.css";

const Menu = props => {
  return props.menuOpen === true ? (
    <div className="meunBar">
      <button className="button" onClick={props.handleClose}>
        close
      </button>
      <button className="HomePage" onClick={props.handleHome}>
        homepage
      </button>
      <button className="movieList" onClick={props.handleMovie}>
        movielist
      </button>
      <button className="MLoflike" onClick={props.handleLikelist}>
        like list
      </button>
      <button className="MLofblock" onClick={props.handleBlocklist}>
        block list
      </button>
    </div>
  ) : (
    <div />
  );
};

export default Menu;
