import React from "react";
import "./Paginado.css";

const Paginado = ({
  getCurrentPage,
  getTotalPages,
  handleLimitChange,
  loadPage,
}) => {
  return (
    <div>
      <button
        className="anterior-button Pbtn"
        onClick={() => loadPage(getCurrentPage() - 1)}
        disabled={getCurrentPage() === 1}
      >
        Anterior
      </button>
      <span>
        {getCurrentPage()} de {getTotalPages()}
      </span>
      <button
        className="siguiente-button Pbtn"
        onClick={() => loadPage(getCurrentPage() + 1)}
        disabled={getCurrentPage() === getTotalPages()}
      >
        Siguiente
      </button>
      <hr></hr>

      <p>Items por pagina: </p>
      <select onChange={handleLimitChange} id="limit" defaultValue={12}>
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="12">12</option>
        <option value="24">24</option>
        <option value="48">48</option>
      </select>
    </div>
  );
};

export default Paginado;
