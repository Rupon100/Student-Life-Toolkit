import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../AuthProvider/useAuth";
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const { createUser } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      document.title = 'StudyEase | Register'
    }, [])

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true)
    const form = e.target;
    const email = form.email.value;
    const pass =form.pass.value;
    
    // firebase login
    createUser(email, pass)
    .then(user => {
        toast.success('Successfully registered & login!')
        navigate(location?.state || '/');
    })
    .catch(err => {
      toast.error(err.message);
    })
    .finally(() => {
      setLoading(false)
    })

  }

  return (
    <div className="bg-base-200">
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
          <h1 className="text-4xl font-bold mb-6">Register</h1>

          <div className="card bg-base-100 w-full shadow-2xl">
            <div className="card-body w-full">
              <form onSubmit={(e) => handleRegister(e)} className="w-full">
                <label className="label">Email</label>
                <input
                name="email"
                  type="email"
                  required
                  className="input input-bordered w-full"
                  placeholder="Email"
                />

                <label className="label mt-4">Password</label>
                <input
                name="pass"
                  type="password"
                  required
                  className="input input-bordered w-full"
                  placeholder="Password"
                />

                <button 
                disabled={loading}
                className="btn btn-neutral mt-6 w-full">
                  {
                   loading ? 'Registering...' : 'Register'
                  }
                </button>
                <span>
                  New here?{" "}
                  <Link state={location?.state} to={"/login"} className="link">
                    Sign In
                  </Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
