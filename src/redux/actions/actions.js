import { products } from "../../views/Home/Data.js";

import {
  ADD_PRODUCTS_INFO,
  LOGIN_USER,
  SET_SEARCH_RESULTS,
  SET_FILTERED_PRODUCTS_LIST,
} from "./actions_types.js";

// export const addProductInfo = (addProductInfo) => {
//   return {
//     type: ADD_PRODUCTS_INFO,
//     payload: addProductInfo,
//   };
// };

export function addProductInfo(){
  return async function (dispatch) {
    dispatch({
      type: ADD_PRODUCTS_INFO,
      payload: products,
    })

  };
};

export const LoginUser = (LoginUser) => {
  return {
    type: LOGIN_USER,
    payload: LoginUser,
  };
};

export const updateSearchValue = (value) => {
  return {
    type: SET_SEARCH_RESULTS,
    payload: value,
  };
};
