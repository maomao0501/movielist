import React from "react";

const Header = props => {
  return (
    <div className="herder">
      <button className="toggle-butten" onClick={props.handleOpen}>
      <div className="toggle-butten-line">Menu</div>
      </button>
      <h1 className="herde">Movies List</h1>
    </div>
  );
};

export default Header;
