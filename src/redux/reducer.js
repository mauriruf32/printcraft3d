import {
  ADD_PRODUCTS_INFO,
  LOGIN_USER,
  SET_SEARCH_RESULTS,
  SET_FILTERED_PRODUCTS_LIST,
} from "./actions/actions_types.js";

const initialState = {
  allProducts: [],
  searchValue: "",
  userData: null,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCTS_INFO:
      return { ...state, allProducts: payload };
    case LOGIN_USER:
      return { ...state, userData: payload };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchValue: payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
