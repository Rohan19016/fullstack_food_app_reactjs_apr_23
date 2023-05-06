import React, { useEffect } from "react";
import { DataTable, MainLoader } from "../components";
import { HiCurrencyRupee } from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllProducts,
  deleteProduct,
} from "../context/actions/productActions";
import { deleteAProduct, getAllProducts } from "../api";
import { alertNULL, alertSuccess } from "../context/actions/alertActions";

export const DBItems = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
    // console.log(products);
  }, [products]);

  if (!products) {
    return (
      <div className="flex items-center justify-center  col pt-6 w-full h-full">
        <MainLoader />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-full">
      <DataTable
        columns={[
          {
            title: "Product Image",
            field: "imageURL",
            render: (rowData) => (
              <img
                src={rowData.imageURL}
                className="w-32 h-16 object-contain rounded-md"
              />
            ),
          },
          {
            title: "Name",
            field: "product_name",
          },
          {
            title: "Category",
            field: "product_category",
          },
          {
            title: "Price",
            field: "product_price",
            render: (rowData) => (
              <p className="text-2xl font-semibold text-textColor flex items-center justify-center">
                <HiCurrencyRupee className="text-red-400" />
                {parseFloat(rowData.product_price).toFixed(2)}
              </p>
            ),
          },
        ]}
       


        data={products}
        title="List of Products"
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Item",
            onClick: (event, rowData) =>
              alert("You clicked edit!" + rowData.productId),
          },
          {
            icon: "delete",
            tooltip: "Delete Item",
            onClick: (event, rowData) => {
              if (
                window.confirm("Are you sure you want to delete this item?")
              ) {
                deleteAProduct(rowData.productId).then((res) => {
                  dispatch(alertSuccess("Product Deleted"));
                  setInterval(() => {
                    dispatch(alertNULL());
                  }, 3000);
                  getAllProducts().then((data) => {
                    dispatch(setAllProducts(data));
                  });
                });
              }
            },
          },
        ]}
      />
    </div>
  );
};

export default DBItems;
