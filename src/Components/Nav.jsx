import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Nav() {
  return (
    <nav className="flex p-6 bg-blue-200 dark:bg-sky-950 dark:text-gray-200 grow-0">
      <div className="flex items-center flex-3">
        <NavLink className={" mx-5"} to="/">
          Lista Task
        </NavLink>
        <NavLink className={" mx-5"} to="/add">
          Aggiungi una nuova task
        </NavLink>
      </div>
      <div className="flex-1 ">
        <div className="justify-self-end">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
