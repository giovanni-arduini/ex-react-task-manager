import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="flex justify-around p-6  m-auto bg-blue-100">
      <div className="flex-3">
        <NavLink className={"mx-5"} to="/">
          Task List
        </NavLink>
        <NavLink className={"mx-5"} to="/add">
          Add a new Task
        </NavLink>
      </div>
      <div className="flex-1 ">
        <div className="m-auto" src="" alt="Logo">
          Dark mode on/off
        </div>
      </div>
    </nav>
  );
}

export default Nav;
