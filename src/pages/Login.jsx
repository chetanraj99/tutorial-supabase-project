import { AiOutlineClose } from "react-icons/ai";
import React, { useContext, useState } from "react";
import MiniLoader from "../MiniLoader";
import supabase from "../supabaseClient";
import { GlobalContext } from "../ContextProvider";

const Login = ({ loginModal, setLoginModal }) => {
  const [loginLoading, setLoginLoading] = useState(false);
  const { token, setToken } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setFormData((presState) => ({
      ...presState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoginLoading(true);
      const { data } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", data.session.access_token);
      setToken(data.session.access_token);
      setLoginLoading(false);
      setLoginModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={(e) => {
        setLoginModal(!(e.target === document.getElementById("loginModal")));
      }}
      id="loginModal"
      className={`fixed inset-0   flex justify-center items-center  z-40  ${
        loginModal ? "scale-100 bg-[rgba(0,0,0,0.61)]" : "scale-0"
      } `}
    >
      <div
        className={`h-[500px] relative bg-gray-900 text-white w-[500px]  flex flex-col justify-evenly p-10 rounded-md ${
          loginModal ? "scale-100" : "scale-90"
        } z-50 transition-transform`}
      >
        <h1 className="text-white font-bold  py-2 text-4xl text-center rounded-md">
          Please Login Here
        </h1>
        <button
          className="absolute -right-6 -top-6"
          onClick={(e) => {
            e.stopPropagation();
            setLoginModal(false);
          }}
        >
          <AiOutlineClose className="text-2xl" />
        </button>
        <form
          action=""
          className="mt-4 mb-10 gap-4 flex-col flex items-center "
          onSubmit={handleLoginSubmit}
        >
          <div className="w-full">
            <label htmlFor="email" className=" text-xl">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleFormChange}
              placeholder="Email"
              value={formData.email}
              className="w-full flex items-center text-black text-sm h-10  border-gray-400 px-2 rounded-md border "
            />
          </div>
          <div className="w-full">
            <label htmlFor="password" className=" text-xl">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleFormChange}
              className="w-full text-black   text-sm h-10 border-gray-400 px-2 rounded-md border "
              value={formData.password}
            />
          </div>
          <button
            type="submit"
            className="bg-emerald-600 mt-10 flex justify-center items-center gap-2 hover:bg-emerald-700 self-center py-2 rounded-md w-[300px] text-white"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {loginLoading && <MiniLoader className="h-5 w-5" />}Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
