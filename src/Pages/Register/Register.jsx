import { getAuth } from "firebase/auth";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../AuthContext/AuthContext";
import { app } from "../../FirebaseConfig/firebase";

const Register = () => {
  const { createUser, updateUserProfile, error, setError } =
    useContext(UserContext);
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    createUser(email, password)
      .then((currentUser) => {
        const user = currentUser.user;
        // console.log(user);
        updateUserProfile(name, photo).then(() => {
          form.reset();
          setError("");
          console.log();
          Swal.fire({
            title: "User Created Successfully.",
            showClass: {
              popup: `
              animate__animated
              animate__fadeInUp
                  animate__faster
                  `,
            },
            hideClass: {
              popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                  `,
            },
          });
          navigate("/");
          console.log(getAuth(app).currentUser);
        });
      })
      .catch((error) => {
        // console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Register- Bistro</title>
      </Helmet>
      <div className="hero md:w-10/12 mx-auto min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="Photo URL "
                  className="input input-bordered"
                  required
                />
              </div>
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

                <p className="text-red-600">{error} </p>
                <div>
                  <p>
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-800 link-hover">
                      Login
                    </Link>{" "}
                  </p>
                </div>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Register"
                />
              </div>
            </form>
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
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

export default Register;
