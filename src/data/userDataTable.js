export const userDataColumns = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => (
      <div className="cellWithImg">
        <img
          src={params.row.image.imageURL}
          alt="cellImg"
          className="cellImg"
        />
        {params.row.fullName}
      </div>
    ),
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "country",
    headerName: "Country",
    width: 120,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 120,
  },
  {
    field: "address",
    headerName: "Address",
    width: 220,
  },
];

export const productDataColumns = [
  { field: "id", headerName: "ID", width: 230 },
  {
    field: "title",
    headerName: "Title",
    width: 250,
    renderCell: (params) => (
      <div className="cellWithImg">
        <img
          src={params.row.image.imageURL}
          alt="cellImg"
          className="cellImg"
        />
        {params.row.title}
      </div>
    ),
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
    renderCell: (params) => `$ ${params.row.price}`,
  },
  {
    field: "status",
    headerName: "Status",
    width: 180,
    renderCell: (params) => (
      <span className={`status ${params.row.status}`}>{params.row.status}</span>
    ),
  },
];
