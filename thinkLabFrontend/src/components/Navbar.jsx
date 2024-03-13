import { Link } from "react-router-dom";
import "./navbar.css";

function MainNav() {
  return (
    <nav>
      <Link to="/" className={"logo"}>
        Think Lab
      </Link>
      <div>
        <Link to="/" className={"btn"}>
          Form
        </Link>
        <Link to="list" className={"btn"}>
          List
        </Link>
      </div>
    </nav>
  );
}

export default MainNav;
