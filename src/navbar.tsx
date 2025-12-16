import { NavLink } from "react-router";

export default function NavBar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded transition-colors text-2xl
     ${isActive ? "text-red-500" : "hover:text-my-blue"}`;

  return (
    <nav className="flex justify-center gap-4 p-4 m-4 ml-4 mr-4">
      <NavLink
        to="/"
        end
        prefetch="viewport"
        className={linkClass}
      >
        Home
      </NavLink>

      <NavLink
        to="/works"
        end
        prefetch="viewport"
        className={linkClass}
      >
        Works
      </NavLink>

      <NavLink
        to="/about"
        end
        prefetch="viewport"
        className={linkClass}
      >
        About
      </NavLink>

      <NavLink
        to="/contact"
        end
        prefetch="viewport"
        className={linkClass}
      >
        Contact
      </NavLink>
    </nav>
  );
}
