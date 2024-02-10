import { useContext } from "react";
import { UserContext } from "../../../AuthContext/AuthContext";

const UserHome = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h2 className="text-3xl">
        Welcome to!!{user.displayName ? user.displayName : "Back"}
      </h2>
    </div>
  );
};

export default UserHome;
