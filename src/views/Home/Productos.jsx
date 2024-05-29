import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../config.js";

function useFetchInventory(page, limit) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${URL}Inventario?page=${page}&limit=${limit}`
        );

        if (response.status === 200) {
          setData(response.data.results);
          setLoading(false);
        } else {
          setError("No se pudieron cargar los productos.");
          setLoading(false);
        }
      } catch (error) {
        setError("Hubo un error al recuperar los productos.");
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  return { loading, error, data };
}

export default useFetchInventory;
