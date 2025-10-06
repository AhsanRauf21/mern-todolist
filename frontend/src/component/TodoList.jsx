import React, { use, useEffect, useState } from "react";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { MdDelete, MdSystemSecurityUpdate } from "react-icons/md";
import * as yup from "yup";
import { toast } from "react-toastify";
import { axiosClient } from "../utils/axiosClient";
import { useMainContext } from "../context/MainContext";
import UpdateModal from "./UpdateModal";

const TodoList = () => {
  const { todo, fetchTasks } = useMainContext();

  const delTask = async (id) => {
try {
  
  const res = await axiosClient.delete(`/${id}`,{headers:{
    "user":localStorage.getItem('user')
  }})
toast.success(res.data.message)
await fetchTasks()


} catch (error) {
      toast.error(error?.response?.data?.message || error.message);
  
}


  };

  const initailValues = { task: "" };
  const validationSchema = yup.object({
    task: yup.string().required("task is required"),
  });
  const onSubmitHandler = async (values, { resetForm }) => {
    try {
      const res = await axiosClient.post("/", values, {
        headers: {
          user: localStorage.getItem("user") || "",
        },
      });

      toast.success(res?.data?.message);
      await fetchTasks();
      resetForm();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="my-10 mx-auto  max-w-[500px] p-2 ">
        <Formik
          onSubmit={onSubmitHandler}
          validationSchema={validationSchema}
          initialValues={initailValues}
        >
          <Form>
            <div className="flex border-2">
              <Field
                name="task"
                placeholder="Enter Task"
                type="text"
                className="outline-none w-full p-1 border-r-2"
              />
              <button type="submit" className="p-1">
                <FaArrowRightToBracket />
              </button>
            </div>
            <ErrorMessage
              name="task"
              component={"p"}
              className="text-red-700"
            />
          </Form>
        </Formik>

        <ul>
          {todo.map((data,i) => {
            return (
              <li key={data._id}>
               <div className="flex border my-2 p-1 justify-between items-center">
            <div className="flex items-center">
               <span className="font-semibold ">{i+1}  </span><p className="font-semibold capitalize ">

{
   '-  ' +  data.task
}
                </p>
            </div>
           
              <div className="flex items-center space-x-2">
               <UpdateModal id={data._id}/>
                  <button type="button" title='delete' onClick={() => delTask(data._id)}>
                  <MdDelete className="text-2xl text-red-600"/>
                </button>
              </div>
               </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default TodoList;
