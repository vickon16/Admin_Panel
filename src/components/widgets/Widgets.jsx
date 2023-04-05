import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import "./widgets.scss";

const Widgets = ({ title, isMoney, link, icon, amount, diff }) => {

  return (
    <article className="widget">
      <div className="left">
        <span className="title">{title}</span>
        <span className="counter">{isMoney ? `$${amount}` : amount}</span>
        <span className="link">{link}</span>
      </div>
      <div className="right">
        {diff < 0 ? (
          <div className="percentage negative">
            <KeyboardArrowDown />
            {`${diff}`}
          </div>
        ) : (
          <div className="percentage positive">
            <KeyboardArrowUp />
            {`${diff}`}
          </div>
        )}
        {icon}
      </div>
    </article>
  );
};

export default Widgets;
