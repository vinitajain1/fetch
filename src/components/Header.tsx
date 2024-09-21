import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStoreState } from "../redux/store";
import logoutMiddleware from "../middleware/logoutMiddleware";
import { MAIN_URL } from "../utils/utilities";

export default function Header() {
  const user: User = useSelector((store: RootStoreState) => store.authSlice.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch(`${MAIN_URL}/auth/logout`, {
      credentials: "include",
      method: "POST",
    });
    dispatch(logoutMiddleware());
    navigate("/");
  };

  return (
    <header className="px-4 py-5 md:px-10 lg:px-20 bg-customBackground w-full flex justify-between items-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-customPurple">
        FETCH
      </h1>
      <nav aria-label="main navigation">
        <ul className="p-0 m-0 list-none flex flex-col md:flex-row gap-4 md:gap-8 text-lg md:text-xl font-bold text-customPurple">
          <li>
            <span>Hello, {user?.name.toUpperCase()}</span>
          </li>
          <li className="cursor-pointer">
            <Link
              role="button"
              aria-label="View your favorite dogs and find a match"
              to={"./favorites"}
            >
              Favorites
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link
              role="button"
              aria-label="Browse dogs for adoption"
              to={"./browse"}
            >
              Adopt a Dog
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link
              to={"/"}
              role="button"
              aria-label="Logout from account"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
