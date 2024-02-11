import { useNavigate } from "react-router";
import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../AuthContext/AuthContext";

const SocialLogin = () => {
  const { googleSignIn, setError } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const signInWithGoogle = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const name = user.displayName;
        const email = user.email;
        const saveUser = { name: name, email: email };
        fetch("https://bistro-restaurant-server-chi.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            setError("");
            navigate(from, { replace: true });
          });
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div>
      <div className="divider">OR</div>
      <div className="text-center">
        <button
          onClick={signInWithGoogle}
          className="btn btn-outline btn-primary w-full"
        >
          <FaGoogle></FaGoogle>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
