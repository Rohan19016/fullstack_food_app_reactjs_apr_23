import productReducer from "../reducers/productReducers";

export const setAllProducts = (products) => {
  return {
    type: "SET_ALL_PRODUCTS",
    products: products,
  };
};

export const getAllProducts = (products) => {
  return {
    type: "GET_ALL_PRODUCTS",
  };
};

export default productReducer;
