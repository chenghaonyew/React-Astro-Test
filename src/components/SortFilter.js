import React from "react";
import "./SortFilter.css";

function SortFilter({ cssClass, sortBy, title }) {
  return (
    <button className={cssClass} onClick={sortBy}>
      {title}
    </button>
  );
}

export default SortFilter;
