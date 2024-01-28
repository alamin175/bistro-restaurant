import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../AuthContext/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";

const Navbar = () => {
  const { user, logOut } = useContext(UserContext);
  const [cart] = useCart();
  const navOption = (
    <>
      <li>
        <Link to="/"> Home</Link>
      </li>
      <li>
        <Link to="/menu"> Menu</Link>
      </li>
      <li>
        <Link to="/order/salad"> Order</Link>
      </li>

      <li>
        <Link to="/dashboard/mycart">
          <button className="btn my-auto">
            <FaShoppingCart />
            <div className="badge badge-secondary">+{cart?.length || 0} </div>
          </button>
        </Link>
      </li>

      {user ? (
        <>
          <span className="mt-2 mr-2">{user?.displayName} </span>
          <button onClick={logOut} className="btn btn-outline text-white">
            Logout
          </button>{" "}
        </>
      ) : (
        <>
          <li>
            <Link to="/login"> Login</Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar fixed z-10 bg-opacity-30 bg-black max-w-screen-xl  text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOption}
            </ul>
          </div>
          <Link to="/">
            <a className="btn btn-ghost text-xl">Restaurant</a>
          </Link>
        </div>
        <div className="navbar-center items-center mt-0 hidden lg:flex">
          <ul className="menu menu-horizontal items-center px-1">
            {navOption}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
