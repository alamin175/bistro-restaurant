import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../AuthContext/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();
  const [progressValue, setProgressValue] = useState(0);

  {
    /**OPTIONAL ---- it is only using for loading animation . */
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue((prevValue) => {
        if (prevValue < 70) {
          return prevValue + 1; // Increment the progress value
        }
        clearInterval(interval); // Stop the interval when reaching the desired value
        return prevValue;
      });
    }, 20);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  if (loading) {
    return (
      <div
        className="radial-progress text-primary"
        style={{ "--value": progressValue }}
        role="progressbar"
      >
        {progressValue}%
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
