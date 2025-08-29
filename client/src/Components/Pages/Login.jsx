import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../AuthProvider/useAuth";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();
    const { loginUser }  = useAuth();

    const location = useLocation();
    
    const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass =form.pass.value;
    console.log({email, pass});
    
    // firebase login
    loginUser(email, pass)
    .then(user => {
        console.log("user login: ", user);
        toast.success('Successfully Login!')

        navigate(location?.state || '/');
    })
    .catch(err => {
      toast.error(err.message);
        console.log(err.message)
    })

  }


  return (
    <div className="bg-base-200" >
        <div className="w-full flex justify-start p-4 bg-base-200">
        <button
          onClick={() => navigate("/")}
          className="btn btn-sm btn-outline"
        >
          ← Back Home
        </button>
      </div>
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col w-full max-w-2xl">
        {/* full width but max 2xl for good balance */}
        <h1 className="text-4xl font-bold mb-6">Login</h1>

        <div className="card bg-base-100 w-full shadow-2xl">
          <div className="card-body w-full">
            <form onSubmit={(e) => handleLogin(e)} className="w-full">
              <label className="label">Email</label>
              <input
              name="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="Email"
              />

              <label className="label mt-4">Password</label>
              <input
              name="pass"
                type="password"
                className="input input-bordered w-full"
                placeholder="Password"
              />

              <button className="btn btn-neutral mt-6 w-full">Login</button>
              <span>New here? <Link state={location?.state} to={'/signin'} className="link" >Sign In</Link></span>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
