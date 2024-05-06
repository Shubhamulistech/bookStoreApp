import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password
    };
  
    axios.post("/user/login", userInfo)
      .then((res) => {
        console.log(res.data);
        const userData = res.data;
        if (userData) {
        
          toast.success('Login Successfully!');
          setTimeout(() => {
            document.getElementById("my_modal_3").close();
            window.location.reload();
            localStorage.setItem("Users", JSON.stringify(userData.user));
          },3000)
         
        }
        
      })
      .catch((err) => {
        console.error("Error:", err);
        if (err.response) {
        
          toast.error(`Error: ${err.response.data.message}`);
          setTimeout(()=>{},3000)
        } else if (err.request) {
          console.error("No response received:", err.request);
        
          toast.error(`No response received from server`);
        } else {
          console.error("Request setup error:", err.message);
        
          toast.error(`Error in setting up request`);
        }
      });
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form onSubmit={handleSubmit(onSubmit)} method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
          <h3 className="font-bold text-lg">Login</h3>
          {/* {Email} */}
          <div className="mt-4 space-y-2">
            <span>Email</span>
            <br />
            <input
              type="email" // Corrected the type from "emil" to "email"
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
          {/* {password} */}
          <div className="mt-4 space-y-2">
            <span>Password</span>
            <br />
            <input
              type="password" // Corrected the type from "emil" to "email"
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
          {/* {Button} */}
          <div className="flex justify-around mt-4">
            <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
              Login
            </button>
            <p>
              Not Registered?{" "}
              <Link
                to="/signup"
                className="underline text-blue-500 cursor-pointer"
              >
                {" "}
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default Login;
