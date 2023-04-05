import "./table.scss";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAuth } from "../../context/AuthContext";

const TableSection = () => {
  const {userCredentials : {userData : {users}}} = useAuth();

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 1000 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">User</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Country</TableCell>
            <TableCell className="tableCell">Phone</TableCell>
            <TableCell className="tableCell">Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user?.id}>
              <TableCell className="tableCell">{user?.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={user?.image.imageURL} alt="images" className="image"/>
                  {user?.fullName}
                </div>
              </TableCell>
              <TableCell className="tableCell">{user?.email}</TableCell>
              <TableCell className="tableCell">{user?.country}</TableCell>
              <TableCell className="tableCell">{user?.phone}</TableCell>
              <TableCell className="tableCell">{user?.address}</TableCell>
            </TableRow>
          ))}
          {/* <TableCell className="tableCell">{users?.id}</TableCell>
            
            
            <TableCell className="tableCell">
              <span className={`status ${users?.status}`}>{users?.status}</span>
            </TableCell> */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableSection;
