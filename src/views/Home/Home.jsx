import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Components/Footer/Footer";
import Aside from "../../Components/Aside/Aside.jsx";
import style from "./Home.module.css";
import Card from "../../Components/Card/Card.jsx";
import CarouselHome from "../../Components/CarouselHome/CarouselHome.jsx";
import Paginado from "../../Components/Paginado/Paginado.jsx";
import { addProductInfo } from "../../redux/actions/actions.js";
import Swal from "sweetalert2";
import axios from "axios";
import { products } from "./Data.js";

function Home() {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.searchValue);
  const userData = useSelector((state) => state.userData);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //estados para el paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(Math.ceil(products.length / limit));
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "true";
  });

  //estados para los filtros
  const [selectedMaterials, setSelectedMaterials] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // funciones manejo de filtros
  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
    setCurrentPage(1);
    setTotalPages(Math.ceil(products.length / newLimit));
  };

  const handleMaterialChange = (materialName) => {
    setSelectedMaterials(materialName);
  };

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const resetAllFilters = () => {
    setSelectedMaterials(null);
    setSelectedCategory(null);
    setSelectedSize(null);
  };

  // funcion cambio de pagina - paginado
  const loadPage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  };

  // funcion que devuelve el valor de current page
  // lo usa el componente paginado
  const getCurrentPage = () => {
    return currentPage;
  };
  // funcion que devuelve el valor de totalPages
  // lo usa el componente paginado
  const getTotalPages = () => {
    return totalPages;
  };

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      return (
        (!selectedMaterials || product.materialName === selectedMaterials) &&
        (!selectedCategory || product.categoryName === selectedCategory) &&
        (!selectedSize || product.size === selectedSize) &&
        (!searchValue || product.name.toLowerCase().includes(searchValue.toLowerCase()))
      );
    });

    dispatch(addProductInfo(filteredProducts));
    setTotalPages(Math.ceil(filteredProducts.length / limit));
  }, [selectedMaterials, selectedCategory, selectedSize, searchValue, dispatch, limit]);

  // funciones relacionadas con el carrito
  const addToCart = async (userId, productId) => {
    try {
      const response = await axios.post(`${URL}addOneToCart`, {
        userId,
        productId,
      });
      const { message } = response.data;
      if (response.status === 201) {
        let cart = JSON.parse(localStorage.getItem("cart"));

        let index = cart.findIndex((product) => product.id === productId);

        if (cart[index].cantidad - 1 === 0) {
          cart.splice(index, 1);
        } else {
          cart[index].cantidad -= 1;
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        Swal.fire({
          position: "center",
          icon: "error",
          title: "No permitido",
          text: `${message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Lo siento!",
        text: "Ha ocurrido un error: " + error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleProductAddToCart = (productId) => {
    if (userData?.userId) {
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
      //Busca si existe el id del producto en el carrito
      const existingProductIndex = currentCart.findIndex(
        (product) => product.id === productId
      );
      //Si no existe en el carrito lo busca en el Estado global
      if (existingProductIndex === -1) {
        const productToAdd = products.find(
          (product) => product.id === productId
        );
        if (productToAdd) {
          //Una vez que lo encuentra en el Estado lo agrega al carrito
          const updatedCart = [
            ...currentCart,
            { ...productToAdd, cantidad: 1 },
          ];
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
      } else {
        // Si ya está en el carrito, actualiza el contador
        const updatedCart = [...currentCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          cantidad: updatedCart[existingProductIndex].cantidad + 1,
        };
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      addToCart(userData.userId, productId);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Lo siento!",
        text: "Debes iniciar sesión",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => {
      const newDarkMode = !prevDarkMode;
      localStorage.setItem("darkMode", newDarkMode.toString()); // Guarda en localStorage
      return newDarkMode;
    });
  };

  const allProducts = useSelector((state) => state.allProducts);

  // Calcular los productos a mostrar basado en la página actual y el límite
  const indexOfLastProduct = currentPage * limit;
  const indexOfFirstProduct = indexOfLastProduct - limit;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <main className={`${style.main} ${darkMode ? style.darkMode : ""}`}>
      <div className={style.ContainerCarusel}>
        <CarouselHome />
      </div>
      <div className={`${style.ContainerAsaider} ${darkMode ? style.darkMode : ""}`}>
        <Aside
          onMaterialChange={handleMaterialChange}
          onCategoryChange={handleCategoryChange}
          onSizeChange={handleSizeChange}
          allProducts={allProducts}
          resetAllFilters={resetAllFilters}
          darkMode={darkMode}
        />
      </div>

      <div className={style.ContainerHome}>
        <button className={style.BTNDarkMode} onClick={toggleDarkMode}>
          {darkMode ? "Modo Claro" : "Modo Oscuro"}
        </button>
        <div className={style.ContainerCards}>
          {loading ? (
            <p>Cargando productos...</p>
          ) : error ? (
            <p>{error}</p>
          ) : currentProducts && currentProducts.length > 0 ? (
            <div className={style.ContainerCards}>
              {currentProducts.map((e) => (
                <Card
                  key={e.id}
                  id={e.id}
                  name={e.name}
                  image={e.image}
                  description={e.description}
                  size={e.size}
                  price={e.price}
                  material={e.materialName}
                  category={e.categoryName}
                  addToCart={() => handleProductAddToCart(e.id)}
                />
              ))}
            </div>
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>
      </div>
      <div className={style.paginationWrapper}>
        <div>
          <Paginado
            getCurrentPage={getCurrentPage}
            getTotalPages={getTotalPages}
            handleLimitChange={handleLimitChange}
            loadPage={loadPage}
          />
        </div>
      </div>

      <div className={style.ContainerFooter}>
        <Footer />
      </div>
    </main>
  );
}

export default Home;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { URL } from "../../config.js";
// import Footer from "../../Components/Footer/Footer";
// import Aside from "../../Components/Aside/Aside.jsx";
// import style from "./Home.module.css";
// import Card from "../../Components/Card/Card.jsx";
// import CarouselHome from "../../Components/CarouselHome/CarouselHome.jsx";
// import Paginado from "../../Components/Paginado/Paginado.jsx";
// import { addProductInfo } from "../../redux/actions/actions.js";
// import Swal from "sweetalert2";
// import { products } from "./Data.js"

// function Home() {
//   const dispatch = useDispatch();
//   const allProducts = useSelector((state) => state.allProducts);
//   const searchValue = useSelector((state) => state.searchValue);
//   const userData = useSelector((state) => state.userData);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   //estados para el paginado
//   const [currentPage, setCurrentPage] = useState(1);
//   const [count, setCount] = useState(1);
//   const [limit, setLimit] = useState(12);
//   const [totalPages, setTotalPages] = useState(0);
//   const [darkMode, setDarkMode] = useState(() => {
//     const savedDarkMode = localStorage.getItem("darkMode");
//     return savedDarkMode === "true";
//   });

//   //estados para los filtros
//   const [selectedMaterials, setSelectedMaterials] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);

//   // funciones manejo de filtros
//   const handleLimitChange = (event) => {
//     const newLimit = parseInt(event.target.value, 10);
//     setLimit(newLimit);
//     setCurrentPage(1);
//   };

//   const handleMaterialChange = (material) => {
//     setSelectedMaterials(material);
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };

//   const handleSizeChange = (size) => {
//     setSelectedSize(size);
//   };

//   const resetAllFilters = () => {
//     setSelectedMaterials(null);
//     setSelectedCategory(null);
//     setSelectedSize(null);
//   };

//   // funcion cambio de pagina - paginado
//   const loadPage = (page) => {
//     if (page < 1 || page > totalPages) {
//       return;
//     }
//     setCurrentPage(page);
//     console.log("home current page: ", currentPage);
//   };

//   // funcion que devuelve el valor de current page
//   // lo usa el componente paginado
//   const getCurrentPage = () => {
//     return currentPage;
//   };
//   // funcion que devuelve el valor de totalPages
//   // lo usa el componente paginado
//   const getTotalPages = () => {
//     return totalPages;
//   };

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       const fetchData = async () => {
//         try {
//           const response = await axios.get(
//             `${URL}Inventario?page=${currentPage}&limit=${limit}`,
//             {
//               params: {
//                 material: selectedMaterials,
//                 category: selectedCategory,
//                 tamaño: selectedSize,
//                 search: searchValue,
//               },
//             }
//           );

//           if (response.status === 200) {
//             const { data } = response;
//             dispatch(addProductInfo(data.results));
//             setCount(data.count);
//             setLimit(data.limit);
//             setTotalPages(Math.floor(data.count / data.limit));
//             setLoading(false);
//           } else {
//             setError("No se pudieron cargar los productos.");
//             setLoading(false);
//             console.error("Error en la solicitud:", response.status);
//             alert(
//               "Hubo un error al cargar los productos. Por favor, inténtelo de nuevo."
//             );
//           }
//         } catch (error) {
//           if (axios.isCancel(error)) {
//             // Manejar cancelación de la solicitud (si es necesario)
//           } else if (error.response && error.response.status === 404) {
//             // Si es un error 404, cambiar currentPage a 1
//             setCurrentPage(1);
//           } else {
//             setError("Hubo un error al recuperar los productos.");
//             setLoading(false);
//             console.error("Error en la solicitud:", error.message);
//             alert(
//               "Hubo un error al cargar los productos. Por favor, inténtelo de nuevo."
//             );
//           }
//         }
//       };

//       fetchData();
//     }, 300);

//     return () => clearTimeout(delayDebounceFn);
//   }, [
//     currentPage,
//     selectedMaterials,
//     selectedCategory,
//     selectedSize,
//     searchValue,
//     limit,
//     dispatch,
//   ]);

//   // funcion de gestion - (por el momento innecesario)
//   const handleProductDelete = async (idProduct) => {
//     const shouldDelete = window.confirm(
//       "¿Seguro que quieres eliminar este producto?"
//     );

//     if (!shouldDelete) {
//       return;
//     }

//     try {
//       const response = await axios.delete(`${URL}DeleteProdut/${idProduct}`);

//       if (response.status === 200) {
//         const updatedProducts = response.data.products;
//         dispatch(addProductInfo(updatedProducts));
//         alert("Producto eliminado exitosamente");
//       } else {
//         alert("Error al eliminar el producto. Por favor, inténtelo de nuevo.");
//       }
//     } catch (error) {
//       console.error("Error al eliminar el producto:", error.message);
//       alert("Error al eliminar el producto. Por favor, inténtelo de nuevo.");
//     }
//   };

//   // funciones relacionadas con el carrito
//   const addToCart = async (userId, productId) => {
//     try {
//       const response = await axios.post(`${URL}addOneToCart`, {
//         userId,
//         productId,
//       });
//       const { message } = response.data;
//       if (response.status === 201) {
//         let cart = JSON.parse(localStorage.getItem("cart"));

//         let index = cart.findIndex((product) => product.id === productId);

//         if (cart[index].cantidad - 1 === 0) {
//           cart.splice(index, 1);
//         } else {
//           cart[index].cantidad -= 1;
//         }

//         localStorage.setItem("cart", JSON.stringify(cart));

//         Swal.fire({
//           position: "center",
//           icon: "error",
//           title: "No permitido",
//           text: `${message}`,
//           showConfirmButton: false,
//           timer: 2000,
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         position: "center",
//         icon: "error",
//         title: "Lo siento!",
//         text: "Ha ocurrido un error: " + error.message,
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//   };

//   const handleProductAddToCart = (productId) => {
//     if (userData?.userId) {
//       const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
//       //Busca si existe el id del producto en el carrito
//       const existingProductIndex = currentCart.findIndex(
//         (product) => product.id === productId
//       );
//       //Si no existe en el carrito lo busca en el Estado global
//       if (existingProductIndex === -1) {
//         const productToAdd = allProducts.find(
//           (product) => product.id === productId
//         );
//         if (productToAdd) {
//           //Una vez que lo encuentra en el Estado lo agrega al carrito
//           const updatedCart = [
//             ...currentCart,
//             { ...productToAdd, cantidad: 1 },
//           ];
//           localStorage.setItem("cart", JSON.stringify(updatedCart));
//         }
//       } else {
//         // Si ya está en el carrito, actualiza el contador
//         const updatedCart = [...currentCart];
//         updatedCart[existingProductIndex] = {
//           ...updatedCart[existingProductIndex],
//           cantidad: updatedCart[existingProductIndex].cantidad + 1,
//         };
//         localStorage.setItem("cart", JSON.stringify(updatedCart));
//       }
//       //console.log(`User ID: ${userData.userId}`);
//       //console.log(`Product ID: ${productId}`);
//       addToCart(userData.userId, productId);
//     } else {
//       Swal.fire({
//         position: "center",
//         icon: "error",
//         title: "Lo siento!",
//         text: "Debes iniciar sesión",
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     }
//    };
//   const toggleDarkMode = () => {
//     setDarkMode((prevDarkMode) => {
//       const newDarkMode = !prevDarkMode;
//       localStorage.setItem("darkMode", newDarkMode.toString()); // Guarda en localStorage
//       return newDarkMode;
//     });
//   };

//   return (
//     <main className={`${style.main} ${darkMode ? style.darkMode : ""}`}>
//       <div className={style.ContainerCarusel}>
//         <CarouselHome />
//       </div>
//       <div
//         className={`${style.ContainerAsaider} ${
//           darkMode ? style.darkMode : ""
//         }`}
//       >
//         <Aside
//           onMaterialChange={handleMaterialChange}
//           onCategoryChange={handleCategoryChange}
//           onSizeChange={handleSizeChange}
//           allProducts={allProducts}
//           resetAllFilters={resetAllFilters}
//           darkMode={darkMode}
//         />
//       </div>

//       <div className={style.ContainerHome}>
//         <button className={style.BTNDarkMode} onClick={toggleDarkMode}>
//           {darkMode ? "Modo Claro" : "Modo Oscuro"}
//         </button>
//         <div className={style.ContainerCards}>
//           {loading ? (
//             <p>Cargando productos...</p>
//           ) : error ? (
//             <p>{error}</p>
//           ) : allProducts && allProducts.length > 0 ? (
//             <div className={style.ContainerCards}>
//               {allProducts.map((e) => (
//                 <Card
//                   key={e.id}
//                   id={e.id}
//                   name={e.name}
//                   image={e.image}
//                   description={e.description}
//                   size={e.size}
//                   price={e.price}
//                   material={e.material}
//                   category={e.category}
//                   onDelete={handleProductDelete}
//                   addToCart={() => handleProductAddToCart(e.id)}
//                 />
//               ))}
//             </div>
//           ) : (
//             <p>No se encontraron productos.</p>
//           )}
//         </div>
//       </div>
//       <div className={style.paginationWrapper}>
//         <div>
//           <Paginado
//             getCurrentPage={getCurrentPage}
//             getTotalPages={getTotalPages}
//             handleLimitChange={handleLimitChange}
//             loadPage={loadPage}
//           />
//         </div>
//       </div>

//       <div className={style.ContainerFooter}>
//         <Footer />
//       </div>
//     </main>
//   );
// }

// export default Home;
