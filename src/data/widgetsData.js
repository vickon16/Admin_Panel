import { AccountBalanceWalletOutlined, MonetizationOnOutlined, PersonOutlined, ShoppingCartOutlined } from "@mui/icons-material";

export const widgetsData = [
  {
    id : 1,
    title: "USERS",
    isMoney: false,
    link: "See all users",
    amount : 1400,
    diff : 90,
    icon: (
      <PersonOutlined
        className="icon"
        style={{
          color: "crimson",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
        }}
      />
    ),
  },
  {
    id : 2,
    title: "ORDERS",
    isMoney: false,
    link: "View all orders",
    amount : 1200,
    diff : -10,
    icon: (
      <ShoppingCartOutlined
        className="icon"
        style={{
          color: "goldenrod",
          backgroundColor: "rgba(218, 165, 32, 0.2)",
        }}
      />
    ),
  },
  {
    id : 3,
    title: "EARNINGS",
    isMoney: true,
    link: "View net Earnings",
    amount : 2000,
    diff : -8,
    icon: (
      <MonetizationOnOutlined
        className="icon"
        style={{
          color: "green",
          backgroundColor: "rgba(0, 128, 0, 0.2)",
        }}
      />
    ),
  },
  {
    id : 4,
    title: "BALANCE",
    isMoney: true,
    link: "See details",
    amount : 1500,
    diff : 20,
    icon: (
      <AccountBalanceWalletOutlined
        className="icon"
        style={{
          color: "purple",
          backgroundColor: "rgba(128, 0, 128, 0.2)",
        }}
      />
    ),
  },
];