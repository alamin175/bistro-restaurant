import { useContext, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import Swal from "sweetalert2";
import { UserContext } from "../../AuthContext/AuthContext";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const { signIn, error, setError } = useContext(UserContext);
  const [disabled, setDisabled] = useState(true);
  const captchaRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        setError("");
        form.reset();
        // navigate(from, { replace: true });
        navigate("/");
      })
      .catch((error) => {
        // console.log(error.message);

        setError(error.message);
      });
  };

  const captchaValidation = () => {
    const userCaptcha = captchaRef.current.value;

    if (validateCaptcha(userCaptcha)) {
      setDisabled(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your captcha validation successfull, now login",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      setDisabled(true);
      alert("captcha are not matched please try again");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login- Bistro </title>
      </Helmet>
      <div className="hero md:w-10/12 mx-auto min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <p className="text-red-600"> {error} </p>
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link text-red-600 link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
                <div>
                  <LoadCanvasTemplate />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Verify Captcha</span>
                </label>
                <input
                  ref={captchaRef}
                  name="captcha"
                  type="text"
                  placeholder="verify  captcha"
                  className="input input-bordered"
                  required
                />

                <button
                  type="button"
                  onClick={captchaValidation}
                  className="btn btn-outline btn-xs"
                >
                  Validate Captcha
                </button>

                <div>
                  <p>
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-800 link-hover">
                      Register
                    </Link>{" "}
                  </p>
                </div>
              </div>

              <div className="form-control mt-6">
                <input
                  disabled={disabled}
                  className={`btn ${
                    disabled
                      ? "disabled:bg-gray-300 cursor-not-allowed"
                      : "btn-primary"
                  }`}
                  type="submit"
                  value="Login"
                />
              </div>
              <SocialLogin></SocialLogin>
            </form>
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
