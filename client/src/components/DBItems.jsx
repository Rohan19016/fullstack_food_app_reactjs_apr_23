import React from "react";
import { DataTable } from "../components";
import { HiCurrencyRupee } from "../assets/icons";
import { useSelector } from "react-redux";

export const DBItems = () => {
  const products = useSelector((state) => state.products);
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
        data={(query) =>
          new Promise((resolve, reject) => {
            let url =
              "http://localhost:5001/full-stack-order/us-central1/app/api/products/all?";
            url += "per_page=" + query.pageSize;
            url += "&pages=" + (query.page + 1);

            fetch(url)
              .then((response) => response.json())
              .then((result) => {
                resolve({
                  data: result.data,
                  page: result.pageSize - 1,
                  totalCount: result.total,
                });
                console.log();
              });
          })
        }
        title="List of Products"
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Data",
            onClick: (event, rowData) =>
              alert("You saved " + rowData.productId),
          },
          {
            icon: "delete",
            tooltip: "Delete Data",
            onCLick: (event, rowData) => {
              let isExecuted = window.confirm(
                "Are you sure, you want to perform this aciton"
              );
              console.log(isExecuted);
            },
          },
        ]}
      />
    </div>
  );
};

export default DBItems;
