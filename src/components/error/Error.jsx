import "./error.scss";

const Error = ({error}) => {
  return (
    <div className="errorWrapper">
      {error && <span className="errorMsg">{error}</span>}
    </div>
  );
};

export default Error;
