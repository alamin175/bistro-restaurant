import { useContext } from "react";
import { Helmet } from "react-helmet";
import { UserContext } from "../../../AuthContext/AuthContext";

const UserHome = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Helmet>
        <title>User Home-Bistro Boss</title>
      </Helmet>
      <h2 className="text-3xl">
        Welcome to!!
        <span className="text-yellow-500">
          {user.displayName ? user.displayName : "Back"}
        </span>
      </h2>
    </div>
  );
};

export default UserHome;
