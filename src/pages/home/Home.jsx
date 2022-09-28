import Featured from "../../components/featured/Featured";
import Widgets from "../../components/widgets/Widgets";
import Chart from "../../components/chart/Chart";
import "./home.scss";
import TableSection from "../../components/table/Table";
import { widgetsData } from "../../data/widgetsData";

const Home = () => {
  return (
    <section className="home">
      <div className="widgets">
        {widgetsData.map((widget) => (
          <Widgets key={widget.id} {...widget} />
        ))}
      </div>

      <div className="charts">
        <Featured />
        <Chart aspect={2.3 / 1} title="Last Six Months (Revenue)" />
      </div>

      <div className="listContainer">
        <div className="listTitle">Latest Transations</div>
        <TableSection />
      </div>
    </section>
  );
};

export default Home;
