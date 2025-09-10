import React from "react";
import "../style/CategoryBar.css";

function CategoryBar({ categories, active, onChange }) {
  return (
    <div className="categories">
      <h2>Category</h2>
      <div className="category-bar">
        {categories.map((cat) => (
        <button
          key={cat}
          className={active === cat ? "active" : ""}
          onClick={() => onChange(cat)}
        >
          {cat.toUpperCase()}
        </button>
      ))}
      </div>
    </div>
  );
}

export default CategoryBar;
