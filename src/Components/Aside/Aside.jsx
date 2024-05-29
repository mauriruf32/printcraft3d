import React from "react";
import style from "./Aside.module.css";
import "./Aside.css";
import FiltersAccordion from "../FiltersAccordion/FiltersAccordion";

const Aside = ({
  onMaterialChange,
  onCategoryChange,
  onSizeChange,
  allProducts,
  resetAllFilters,
}) => {
  const getAllProductsCounts = () => {
    let counts = {};
    counts["ABSCount"] = allProducts.filter((e) => {
      return e.material === "ABS";
    }).length;
    counts["PLACount"] = allProducts.filter((e) => {
      return e.material === "PLA";
    }).length;
    counts["TPUCount"] = allProducts.filter((e) => {
      return e.material === "TPU";
    }).length;
    counts["accesorioCount"] = allProducts.filter((e) => {
      return e.category === "accesorio";
    }).length;
    counts["figuraCount"] = allProducts.filter((e) => {
      return e.category === "figura";
    }).length;
    counts["decoracionCount"] = allProducts.filter((e) => {
      return e.category === "decoracion";
    }).length;
    counts["sizeMCount"] = allProducts.filter((e) => {
      return e.size === "M";
    }).length;
    counts["sizeLCount"] = allProducts.filter((e) => {
      return e.size === "L";
    }).length;
    counts["sizeSCount"] = allProducts.filter((e) => {
      return e.size === "S";
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
              <span className="result-desc"> ({allProducts.length})</span>
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
//X
