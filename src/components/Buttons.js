import React from "react";

const Buttons = (handleUp, handleDown) => {
  return (
    <div>
      <button className="btn btn-primary" onClick={handleUp}>
        <i class="fa fa-plus">+</i>
      </button>
      <button className="btn btn-primary ml-2" onClick={handleDown}>
        <i class="fa fa-minus">-</i>
      </button>
    </div>
  );
};

export default Buttons;
