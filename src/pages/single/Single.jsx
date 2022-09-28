/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import TableSection from "../../components/table/Table";
import { useAuth } from "../../context/AuthContext";
import "./single.scss";

const Single = ({ tag }) => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const {
    userCredentials: { userData },
  } = useAuth();

  console.log(data);

  useEffect(() => {
    if (userData === null) return;

    if (tag === "user") {
      const user = userData.users.find((data) => data.id === id);
      setData(user);
    } else if (tag === "product") {
      const products = userData.products.find((data) => data.id === id);
      setData(products);
    }
  }, [tag]);

  return (
    <section className="single">
      <div className="top">
        <div className="title">{`${
          tag === "user" ? "User" : "Product"
        } Information`}</div>
        <div className="topWrapper">
          <article className="left">
            <div className="editButton">Edit</div>
            <div className="item">
              <img
                src={data?.image?.imageURL || "/images/john-doe.png"}
                alt="itemImg"
                className="itemImg"
              />

              <div className="details">
                {tag === "user" ? (
                  <>
                    <h1 className="itemTitle">{data?.fullName}</h1>
                    <div className="detailsItem">
                      <span className="itemKey">Email : </span>
                      <span className="itemValue">{data?.email}</span>
                    </div>
                    <div className="detailsItem">
                      <span className="itemKey">Phone : </span>
                      <span className="itemValue">{data?.phone}</span>
                    </div>
                    <div className="detailsItem">
                      <span className="itemKey">Country : </span>
                      <span className="itemValue">{data?.country}</span>
                    </div>
                    <div className="detailsItem">
                      <span className="itemKey">Address : </span>
                      <span className="itemValue">{data?.address}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="itemTitle">{data?.customerName}</h1>
                    <div className="detailsItem">
                      <span className="itemKey">Title : </span>
                      <span className="itemValue">{data?.title}</span>
                    </div>
                    <div className="detailsItem">
                      <span className="itemKey">Price : </span>
                      <span className="itemValue">${data?.price}</span>
                    </div>
                    <div className="detailsItem">
                      <span className="itemKey">Status : </span>
                      <span className="itemValue">{data?.status}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </article>
          <article className="right">
            <Chart
              aspect={2.8 / 1}
              title={
                tag === "user"
                  ? "User Spending (Last 6 Months)"
                  : "Product Chart"
              }
            />
          </article>
        </div>
      </div>
      <div className="bottom">
        <div className="title">Last Transations</div>
        <TableSection />
      </div>
    </section>
  );
};

export default Single;
