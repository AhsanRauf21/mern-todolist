import React from "react";
import { Field, Formik, Form, ErrorMessage} from "formik";
import * as yup from "yup";
import { axiosClient } from "../utils/axiosClient";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useMainContext } from "../context/MainContext";

const LoginPage = () => {

const navigate = useNavigate()
const {fetchProfile} = useMainContext()



  const initialValues = {
    email: "",
    password: "",
  };

  const submitHandler = async (values, {resetForm} ) => {
    try {

      const res = await axiosClient.post('/login',values)
const data = await res.data
      localStorage.setItem('user',res?.data?.token)
      toast.success(data?.message)
      
      await fetchProfile()
navigate('/')
      resetForm()
    } catch (error) {
toast.error(error.response?.data?.message || error.message)
console.log(error);

    }
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  return (
    <>
    
    <div className="max-w-md mx-auto my-5 p-2 shadow-lg rounded-md bg-gray-500 text-blue-300">
      <h1 className="text-center font-semibold text-2xl mb-6">
        Login Page
      </h1>

      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
        >
        {() => (
          <Form className="space-y-4 ">
      

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-md p-2 outline-none"
                />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-600 text-sm"
                />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-1 font-medium">
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full border rounded-md p-2 outline-none"
                />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-600 text-sm"
                />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-600-300 text-blue-300 p-2 rounded-md font-semibold   hover:bg-gray-700 transition"
              >
              Login
            </button>
          </Form>
        )}
      </Formik>
      <div className=" w-full text-center" >
        <Link to={'/register'}>Don't have an account?<span className=" text-black underline">Regsiter</span></Link>
      </div>
    </div>

        </>
  );
};

export default LoginPage;
