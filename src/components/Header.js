import Button from "./Button";
import { useLocation } from "react-router-dom";
const Header = ({ title, onShow, buttonText }) => {
  const location = useLocation();
  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          color={`${!buttonText ? "green" : "red"}`}
          text={!buttonText ? "Add" : "Cancel"}
          onClick={onShow}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Hello",
};
export default Header;
