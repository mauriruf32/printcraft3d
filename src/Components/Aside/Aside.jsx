import React from "react";
import style from "./Aside.module.css";
import "./Aside.css";
import FiltersAccordion from "../FiltersAccordion/FiltersAccordion";
import { products } from "../../views/Home/Data.js";

const Aside = ({
  onMaterialChange,
  onCategoryChange,
  onSizeChange,
  resetAllFilters,
}) => { 
  const getAllProductsCounts = () => {
    let counts = {};
    counts["ABSCount"] = products.filter((e) => {
      return e.materialName === "ABS";
    }).length;
    counts["PLACount"] = products.filter((e) => {
      return e.materialName === "PLA";
    }).length;
    counts["TPUCount"] = products.filter((e) => {
      return e.materialName === "TPU";
    }).length;
    counts["accesorioCount"] = products.filter((e) => {
      return e.categoryName === "accesorio";
    }).length;
    counts["figuraCount"] = products.filter((e) => {
      return e.categoryName === "figura";
    }).length;
    counts["decoracionCount"] = products.filter((e) => {
      return e.categoryName === "decoracion";
    }).length;
    counts["sizeMCount"] = products.filter((e) => {
      return e.size === "m";
    }).length;
    counts["sizeLCount"] = products.filter((e) => {
      return e.size === "l";
    }).length;
    counts["sizeSCount"] = products.filter((e) => {
      return e.size === "s";
    }).length;
    return counts;
  };
  return (
    <div>
      <aside className={style.aside}>
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="filter-results">
              Filter results
              <span className="result-desc"> ({products.length})</span>
            </div>
            <button className="reset-button" onClick={resetAllFilters}>
              Reset All
            </button>
          </div>
          <FiltersAccordion
            onMaterialChange={onMaterialChange}
            onCategoryChange={onCategoryChange}
            onSizeChange={onSizeChange}
            getAllProductsCounts={getAllProductsCounts}
          />
        </div>
      </aside>
    </div>
  );
};

export default Aside;
