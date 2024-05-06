import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {

  const location = useLocation();
  const nevigate = useNavigate();
  const from = location.state?.form?.pathname || "/";
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password
    };
  
    axios.post("/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        const userData = res.data;
        if (userData) {
          
          toast.success('Signup Successfully!');
          nevigate(from, { replace: true });
        }
        localStorage.setItem("Users", JSON.stringify(userData.user));
      })
      .catch((err) => {
        console.error("Error:", err);
        if (err.response) {
          
          toast.error(`Error: ${err.response.data.message}`);
        } else if (err.request) {
          console.error("No response received:", err.request);
         
          toast.error("No response received from server");
        } else {
          console.error("Request setup error:", err.message);
          
          toast.error("Error in setting up request");
        }
      });
  };
  
  return (
    <div className="flex h-screen items-center justify-center">
      <dialog className="border-[2px] shadow-md p-5 rounded-md modal" open>
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>
            <h3 className="font-bold text-lg">Signup</h3>
            <div className="mt-4 space-y-2">
              <span>Name</span>
              <br />
              <input
                type="text"
                placeholder="Enter Your Name"
                className="w-80 px-3 py-1 border rounded"
                {...register("fullname", { required: true })}
              />
              <br />
              {errors.fullname && (
                <span className="text-sm text-red-500">
                  Full name field is required
                </span>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-80 px-3 py-1 border rounded"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500">
                  Email field is required
                </span>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter Your Password"
                className="w-80 px-3 py-1 border rounded"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && (
                <span className="text-sm text-red-500">
                  Password field is required
                </span>
              )}
            </div>
            <div className="flex justify-around mt-4">
              <button
                type="submit"
                className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
              >
                Signup
              </button>
              <p>
                Have Account?{" "}
                <button
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() => console.log("Implement login modal logic")}
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Signup;
