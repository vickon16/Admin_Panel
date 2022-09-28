import DataTable from "../../components/dataTable/DataTable";
import "./list.scss";

const List = ({tag}) => {
  return (
    <section className="list">
      <div className="dataTableContainer">
        <DataTable tag={tag} />
      </div>
    </section>
  )
}

export default List
