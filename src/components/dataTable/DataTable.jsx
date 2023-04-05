/* eslint-disable react-hooks/exhaustive-deps */
import "./dataTable.scss";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { productDataColumns, userDataColumns } from "../../data/userDataTable";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ReactLoader from "../reactLoader/ReactLoader";
import Error from "../error/Error";
import { userCollectionRef } from "../../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const DataTable = ({ tag }) => {
  const [rowData, setRowData] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const {
    userCredentials: { user, userData, isLoading, error },
    setUserError,
  } = useAuth();

  const handleDelete = async (id) => {
    const docRef = doc(userCollectionRef, user.id);

    const document = await getDoc(docRef);
    if (tag === "user") {
      const users = document.data().users;

      updateDoc(docRef, {
        users: users.filter((user) => user.id !== id),
      })
        .then(() => {
          console.log("code has been deleted successfully");
        })
        .catch((err) => {
          setUserError(err.message, "Failed to delete");
        });
    } else if (tag === "product") {
      const products = document.data().products;

      updateDoc(docRef, {
        products: products.filter((product) => product.id !== id),
      })
        .then(() => {
          console.log("code has been deleted successfully");
        })
        .catch((err) => {
          setUserError(err.message, "Failed to delete");
        });
    }
  };

  useEffect(() => {
    if (userData === null) return;

    if (tag === "user") {
      setRowData(userData.users);
      setColumnData(userDataColumns);
    } else if (tag === "product") {
      setRowData(userData.products);
      setColumnData(productDataColumns);
    }
  }, [tag, userData]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={ tag === "user"
                ? `/users/${params.row.id}`
                : `/products/${params.row.id}`
            }
            className="viewButton">View</Link>
          <div className="deleteButton"
            onClick={() => handleDelete(params.row.id)}>
            Delete
          </div>
        </div>
      ),
    },
  ];

  return (
    <article className="dataTable">
      <div className="dataTableTitle">
        {tag === "user" ? "Add New User" : "Add New Product"}
        <Link
          to={tag === "user" ? "/users/new" : "/products/new"}
          className="link">
          Add New
        </Link>
      </div>
      {isLoading ? (
        <>
          <ReactLoader />
          <Error error={error} />
        </>
      ) : (
        <DataGrid
          rows={rowData}
          columns={columnData.concat(actionColumn)}
          pageSize={7}
          rowsPerPageOptions={[7]}
          checkboxSelection
          rowHeight={70}
          className="datagrid"
        />
      )}
      <Error error={error} />
    </article>
  );
};

export default DataTable;
