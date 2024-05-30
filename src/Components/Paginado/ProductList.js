import React, { useState, useEffect } from "react";
import Paginado from "./Paginado";
import { products } from "../../views/Home/Data.js"; // Importa los productos de Data.js

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [paginatedProducts, setPaginatedProducts] = useState([]);

  useEffect(() => {
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    setPaginatedProducts(products.slice(indexOfFirstProduct, indexOfLastProduct));
  }, [currentPage, itemsPerPage]);

  const getCurrentPage = () => currentPage;
  const getTotalPages = () => Math.ceil(products.length / itemsPerPage);

  const handleLimitChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page when items per page change
  };

  const loadPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= getTotalPages()) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <Paginado
        getCurrentPage={getCurrentPage}
        getTotalPages={getTotalPages}
        handleLimitChange={handleLimitChange}
        loadPage={loadPage}
      />
      <div className="product-list">
        {paginatedProducts.map((product, index) => (
          <div key={index} className="product-item">
            {/* Renderiza los detalles del producto aquí */}
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            {/* Otros detalles del producto */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
