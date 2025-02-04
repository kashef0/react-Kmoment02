import { Link } from "react-router-dom"; 
import "./Nav.css";

const Nav = () => {
  return (
    <nav className="menu">
      <ul>
        <li className="menuitem">
          <Link className="link" to="/DisplayPost">Lista att göra</Link>
        </li>
        <li className="menuitem">
          <Link className="link" to="/CreateToDo">Lägga till</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
