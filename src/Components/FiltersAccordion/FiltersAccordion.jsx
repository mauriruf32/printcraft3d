import React, { useState, useEffect, useLayoutEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useSelector } from "react-redux";
import { products } from "../../views/Home/Data.js"; // Importa los productos de Data.js

import "./FiltersAccordion.css";

const FiltersAccordion = ({
  onMaterialChange,
  onCategoryChange,
  onSizeChange,
}) => {
  const [fMateriales, setFmateriales] = useState(null);
  const [fCategoria, setFcategoria] = useState(null);
  const [fTamano, setFtamano] = useState(null);

  // Calcula los conteos de los productos
  const getAllProductsCounts = () => {
    const counts = {
      ABSCount: 0,
      PLACount: 0,
      TPUCount: 0,
      accesorioCount: 0,
      figuraCount: 0,
      decoracionCount: 0,
      sizeMCount: 0,
      sizeSCount: 0,
      sizeLCount: 0,
    };

    products.forEach((product) => {
      if (product.materialName === "ABS") counts.ABSCount += 1;
      if (product.materialName === "PLA") counts.PLACount += 1;
      if (product.materialName === "TPU") counts.TPUCount += 1;
      if (product.categoryName === "accesorio") counts.accesorioCount += 1;
      if (product.categoryName === "figura") counts.figuraCount += 1;
      if (product.categoryName === "decoracion") counts.decoracionCount += 1;
      if (product.size === "m") counts.sizeMCount += 1;
      if (product.size === "s") counts.sizeSCount += 1;
      if (product.size === "l") counts.sizeLCount += 1;
    });

    return counts;
  };

  const counts = getAllProductsCounts();

  const productsList = useSelector((state) => state.allProducts);
  const [productCount, setProductCount] = useState(0);
  useLayoutEffect(() => {
    if (productsList.length > 0) {
      setProductCount(productsList.length);
    }
  }, []);

  // funciones para activar los filtros
  const materialClickHandler = (value) => {
    setFmateriales(value);
    onMaterialChange(value);
  };
  const categoriaClickHandler = (value) => {
    setFcategoria(value);
    onCategoryChange(value);
  };
  const tamanoClickHandler = (value) => {
    setFtamano(value);
    onSizeChange(value);
  };

  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen className="title2">
      <Accordion.Item  eventKey="0">
        <Accordion.Header >
          <div className="title">
            <strong>Materiales</strong>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="popup">
            <div
              className="list-item false"
              onClick={() => materialClickHandler("ABS")}
            >
              <div className="value">
                {fMateriales === "ABS" ? (
                  <strong style={{ color: "#3767a2" }}>ABS</strong>
                ) : (
                  "ABS"
                )}
              </div>
              <div className="count">
                {fMateriales === "ABS" ? (
                  <strong style={{ color: "#3767a2" }}>
                    {counts["ABSCount"]}
                  </strong>
                ) : (
                  counts["ABSCount"]
                )}
              </div>
            </div>
            <div
              className="list-item false"
              onClick={() => materialClickHandler("PLA")}
            >
              <div className="value">
                {fMateriales === "PLA" ? (
                  <strong style={{ color: "#3767a2" }}>PLA</strong>
                ) : (
                  "PLA"
                )}
              </div>
              <div className="count">
                {fMateriales === "PLA" ? (
                  <strong style={{ color: "#3767a2" }}>
                    {counts["PLACount"]}
                  </strong>
                ) : (
                  counts["PLACount"]
                )}
              </div>
            </div>
            <div
              className="list-item false"
              onClick={() => materialClickHandler("TPU")}
            >
              <div className="value">
                {fMateriales === "TPU" ? (
                  <strong style={{ color: "#3767a2" }}>TPU</strong>
                ) : (
                  "TPU"
                )}
              </div>
              <div className="count">
                {fMateriales === "TPU" ? (
                  <strong style={{ color: "#3767a2" }}>
                    {counts["TPUCount"]}
                  </strong>
                ) : (
                  counts["TPUCount"]
                )}
              </div>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <div className="title">
            <strong>Categoria</strong>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="popup">
            <div
              className="list-item active"
              onClick={() => categoriaClickHandler("accesorio")}
            >
              <div className="value">
                {fCategoria === "accesorio" ? (
                  <strong style={{ color: "#3767a2" }}>Accesorio</strong>
                ) : (
                  "Accesorios"
                )}
              </div>
              <div className="count">
                {fCategoria === "accesorio" ? (
                  <strong style={{ color: "#3767a2" }}>
                    {counts["accesorioCount"]}
                  </strong>
                ) : (
                  counts["accesorioCount"]
                )}
              </div>
            </div>
            <div
              className="list-item false"
              onClick={() => categoriaClickHandler("figura")}
            >
              <div className="value">
                {fCategoria === "figura" ? (
                  <strong style={{ color: "#3767a2" }}>Figura</strong>
                ) : (
                  "Figura"
                )}
              </div>
              <div className="count">
                {fCategoria === "figura" ? (
                  <strong style={{ color: "#3767a2" }}>
                    {counts["figuraCount"]}
                  </strong>
                ) : (
                  counts["figuraCount"]
                )}
              </div>
            </div>
            <div
              className="list-item false"
              onClick={() => categoriaClickHandler("decoracion")}
            >
              <div className="value">
                {fCategoria === "decoracion" ? (
                  <strong style={{ color: "#3767a2" }}>Decoracion</strong>
                ) : (
                  "Decoracion"
                )}
              </div>
              <div className="count">
                {fCategoria === "decoracion" ? (
                  <strong style={{ color: "#3767a2" }}>
                    {counts["decoracionCount"]}
                  </strong>
                ) : (
                  counts["decoracionCount"]
                )}
              </div>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>
          <div className="title">
            <strong>Tamaño</strong>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="popup">
            <div
              className="list-item active"
              onClick={() => tamanoClickHandler("m")}
            >
              <div className="value">
                {fTamano === "m" ? (
                  <strong style={{ color: "#3767a2" }}>Size M</strong>
                ) : (
                  "Size M"
                )}
              </div>
              <div className="count">
                {fTamano === "m" ? (
                  <strong style={{ color: "#3767a2" }}>
                    {counts["sizeMCount"]}
                  </strong>
                ) : (
                  counts["sizeMCount"]
                )}
              </div>
            </div>
            <div
              className="list-item false"
              onClick={() => tamanoClickHandler("s")}
            >
              <div className="value">
                {fTamano === "s" ? (
                  <strong style={{ color: "#3767a2" }}>Size S</strong>
                ) : (
                  "Size S"
                )}
              </div>
              <div className="count">
                {fTamano === "s" ? (
                  <strong style={{ color: "#3767a2" }}>
                    {counts["sizeSCount"]}
                  </strong>
                ) : (
                  counts["sizeSCount"]
                )}
              </div>
            </div>
            <div
              className="list-item false"
              onClick={() => tamanoClickHandler("L")}
            >
              <div className="value">
                {fTamano === "L" ? (
                  <strong style={{ color: "#3767a2" }}>Size L</strong>
                ) : (
                  "Size L"
                )}
              </div>
              <div className="count">
                {fTamano === "L" ? (
                  <strong style={{ color: "#3767a2" }}>
                    {counts["sizeLCount"]}
                  </strong>
                ) : (
                  counts["sizeLCount"]
                )}
              </div>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default FiltersAccordion;


// import React from "react";
// import Accordion from "react-bootstrap/Accordion";
// import { useState, useEffect, useLayoutEffect } from "react";
// import { useSelector } from "react-redux";
// import "./FiltersAccordion.css";

// const FiltersAccordion = ({
//   onMaterialChange,
//   onCategoryChange,
//   onSizeChange,
//   getAllProductsCounts,
// }) => {
//   const counts = getAllProductsCounts();
//   const [fMateriales, setFmateriales] = useState(null);
//   const [fCategoria, setFcategoria] = useState(null);
//   const [fTamano, setFtamano] = useState(null);

//   // state para los contadores del filtro
//   const productsList = useSelector((state) => state.allProducts);
//   const [productCount, setProductCount] = useState(0);
//   useLayoutEffect(() => {
//     if (productsList.length > 0) {
//       setProductCount(productsList.length);
//     }
//   }, []);

//   // funciones para activar los filtros
//   const materialClickHandler = (value) => {
//     setFmateriales(value);
//     onMaterialChange(value);
//   };
//   const categoriaClickHandler = (value) => {
//     setFcategoria(value);
//     onCategoryChange(value);
//   };
//   const tamanoClickHandler = (value) => {
//     setFtamano(value);
//     onSizeChange(value);
//   };

//   return (
//     <Accordion defaultActiveKey={["0"]} alwaysOpen>
//       <Accordion.Item eventKey="0">
//         <Accordion.Header>
//           <div className="title">
//             <strong>Materiales</strong>
//           </div>
//         </Accordion.Header>
//         <Accordion.Body>
//           <div className="popup">
//             <div
//               className="list-item false"
//               onClick={() => materialClickHandler("ABS")}
//             >
//               <div className="value">
//                 {fMateriales === "ABS" ? (
//                   <strong style={{ color: "#3767a2" }}>ABS</strong>
//                 ) : (
//                   "ABS"
//                 )}
//               </div>
//               <div className="count">
//                 {fMateriales === "ABS" ? (
//                   <strong style={{ color: "#3767a2" }}>
//                     {counts["ABSCount"]}
//                   </strong>
//                 ) : (
//                   counts["ABSCount"]
//                 )}
//               </div>
//             </div>
//             <div
//               className="list-item false"
//               onClick={() => materialClickHandler("PLA")}
//             >
//               <div className="value">
//                 {fMateriales === "PLA" ? (
//                   <strong style={{ color: "#3767a2" }}>PLA</strong>
//                 ) : (
//                   "PLA"
//                 )}
//               </div>
//               <div className="count">
//                 {fMateriales === "PLA" ? (
//                   <strong style={{ color: "#3767a2" }}>
//                     {counts["PLACount"]}
//                   </strong>
//                 ) : (
//                   counts["PLACount"]
//                 )}
//               </div>
//             </div>
//             <div
//               className="list-item false"
//               onClick={() => materialClickHandler("TPU")}
//             >
//               <div className="value">
//                 {fMateriales === "TPU" ? (
//                   <strong style={{ color: "#3767a2" }}>TPU</strong>
//                 ) : (
//                   "TPU"
//                 )}
//               </div>
//               <div className="count">
//                 {fMateriales === "TPU" ? (
//                   <strong style={{ color: "#3767a2" }}>
//                     {counts["TPUCount"]}
//                   </strong>
//                 ) : (
//                   counts["TPUCount"]
//                 )}
//               </div>
//             </div>
//           </div>
//         </Accordion.Body>
//       </Accordion.Item>
//       <Accordion.Item eventKey="1">
//         <Accordion.Header>
//           <div className="title">
//             <strong>Categoria</strong>
//           </div>
//         </Accordion.Header>
//         <Accordion.Body>
//           <div className="popup">
//             <div
//               className="list-item active"
//               onClick={() => categoriaClickHandler("accesorio")}
//             >
//               <div className="value">
//                 {fCategoria === "accesorio" ? (
//                   <strong style={{ color: "#3767a2" }}>Accesorio</strong>
//                 ) : (
//                   "Accesorio"
//                 )}
//               </div>
//               <div className="count">
//                 {fCategoria === "accesorio" ? (
//                   <strong style={{ color: "#3767a2" }}>
//                     {counts["accesorioCount"]}
//                   </strong>
//                 ) : (
//                   counts["accesorioCount"]
//                 )}
//               </div>
//             </div>
//             <div
//               className="list-item false"
//               onClick={() => categoriaClickHandler("figura")}
//             >
//               <div className="value">
//                 {fCategoria === "figura" ? (
//                   <strong style={{ color: "#3767a2" }}>Figura</strong>
//                 ) : (
//                   "Figura"
//                 )}
//               </div>
//               <div className="count">
//                 {fCategoria === "figura" ? (
//                   <strong style={{ color: "#3767a2" }}>
//                     {counts["figuraCount"]}
//                   </strong>
//                 ) : (
//                   counts["figuraCount"]
//                 )}
//               </div>
//             </div>
//             <div
//               className="list-item false"
//               onClick={() => categoriaClickHandler("decoracion")}
//             >
//               <div className="value">
//                 {fCategoria === "decoracion" ? (
//                   <strong style={{ color: "#3767a2" }}>Decoracion</strong>
//                 ) : (
//                   "Decoracion"
//                 )}
//               </div>
//               <div className="count">
//                 {fCategoria === "decoracion" ? (
//                   <strong style={{ color: "#3767a2" }}>
//                     {counts["decoracionCount"]}
//                   </strong>
//                 ) : (
//                   counts["decoracionCount"]
//                 )}
//               </div>
//             </div>
//           </div>
//         </Accordion.Body>
//       </Accordion.Item>
//       <Accordion.Item eventKey="2">
//         <Accordion.Header>
//           <div className="title">
//             <strong>Tamaño</strong>
//           </div>
//         </Accordion.Header>
//         <Accordion.Body>
//           <div className="popup">
//             <div
//               className="list-item active"
//               onClick={() => tamanoClickHandler("M")}
//             >
//               <div className="value">
//                 {fTamano === "M" ? (
//                   <strong style={{ color: "#3767a2" }}>Size M</strong>
//                 ) : (
//                   "Size M"
//                 )}
//               </div>
//               <div className="count">
//                 {fTamano === "M" ? (
//                   <strong style={{ color: "#3767a2" }}>
//                     {counts["sizeMCount"]}
//                   </strong>
//                 ) : (
//                   counts["sizeMCount"]
//                 )}
//               </div>
//             </div>
//             <div
//               className="list-item false"
//               onClick={() => tamanoClickHandler("S")}
//             >
//               <div className="value">
//                 {fTamano === "S" ? (
//                   <strong style={{ color: "#3767a2" }}>Size S</strong>
//                 ) : (
//                   "Size S"
//                 )}
//               </div>
//               <div className="count">
//                 {fTamano === "S" ? (
//                   <strong style={{ color: "#3767a2" }}>
//                     {counts["sizeSCount"]}
//                   </strong>
//                 ) : (
//                   counts["sizeSCount"]
//                 )}
//               </div>
//             </div>
//             <div
//               className="list-item false"
//               onClick={() => tamanoClickHandler("L")}
//             >
//               <div className="value">
//                 {fTamano === "L" ? (
//                   <strong style={{ color: "#3767a2" }}>Size L</strong>
//                 ) : (
//                   "Size L"
//                 )}
//               </div>
//               <div className="count">
//                 {fTamano === "L" ? (
//                   <strong style={{ color: "#3767a2" }}>
//                     {counts["sizeLCount"]}
//                   </strong>
//                 ) : (
//                   counts["sizeLCount"]
//                 )}
//               </div>
//             </div>
//           </div>
//         </Accordion.Body>
//       </Accordion.Item>
//     </Accordion>
//   );
// };

// export default FiltersAccordion;
