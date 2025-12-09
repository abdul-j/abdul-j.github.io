import { NavLink } from "react-router";

export default function NavBar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1 rounded transition-colors text-2xl
     ${isActive ? "text-red-500" : "hover:text-my-blue"}`;

  return (
    <nav className="flex justify-center gap-4 py-4 px-4">
      <NavLink
        to="/"
        end
        className={linkClass}
      >
        Home
      </NavLink>

      <NavLink
        to="/works"
        end
        className={linkClass}
      >
        Works
      </NavLink>

      <NavLink
        to="/about"
        end
        className={linkClass}
      >
        About
      </NavLink>

      <NavLink
        to="/contact"
        end
        className={linkClass}
      >
        Contact
      </NavLink>
    </nav>
  );
}
