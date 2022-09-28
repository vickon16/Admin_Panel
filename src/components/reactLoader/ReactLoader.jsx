import { Puff } from "react-loader-spinner";
import "./reactLoader.scss";

const ReactLoader = () => {
  return (
    <div className="loaderWrapper">
      <Puff
        height="45"
        width="45"
        radius="1"
        color="#6439ff"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
}

export default ReactLoader



