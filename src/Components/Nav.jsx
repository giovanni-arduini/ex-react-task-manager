import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <NavLink to="/">Task List</NavLink>
      <NavLink to="/add">Add a new Task</NavLink>
    </nav>
  );
}

export default Nav;
