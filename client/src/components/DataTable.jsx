import React from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";

const DataTable = ({ columns, data, title, actions }) => {
  const defaultMaterialTheme = createTheme();
  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable
        columns={columns}
        data={data}
        title={title}
        actions={actions}
      />
    </ThemeProvider>
  );
};

export default DataTable;

// <ThemeProvider theme={defaultMaterialTheme}>
//         <MaterialTable
//           title="Simple Action Preview"
//           columns={[
//             { title: "Name", field: "name" },
//             { title: "Surname", field: "surname" },
//             { title: "Birth Year", field: "birthYear", type: "numeric" },
//             {
//               title: "Birth Place",
//               field: "birthCity",
//               lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
//             },
//           ]}
//           data={[
//             {
//               name: "Mehmet",
//               surname: "Baran",
//               birthYear: 1987,
//               birthCity: 63,
//             },
//             {
//               name: "Zerya Betül",
//               surname: "Baran",
//               birthYear: 2017,
//               birthCity: 34,
//             },
//           ]}
//           actions={[
//             {
//               icon: "save",
//               tooltip: "Save User",
//               onClick: (event, rowData) => alert("You saved " + rowData.name),
//             },
//           ]}
//         />
//       </ThemeProvider>
