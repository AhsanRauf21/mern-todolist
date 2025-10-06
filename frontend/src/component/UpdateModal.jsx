import { useEffect, useState } from "react";
import { MdSystemSecurityUpdate } from "react-icons/md";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { toast } from "react-toastify";
import { axiosClient } from "../utils/axiosClient";
import { CgSpinner } from "react-icons/cg";
import { ImCross } from "react-icons/im";
import { useMainContext } from "../context/MainContext";
const UpdateModal = ({ id }) => {
  const { fetchTasks } = useMainContext();

  let [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  const fetchTaskbyId = async () => {
    try {
      const res = await axiosClient.get(`/${id}`, {
        headers: {
          user: localStorage.getItem("user") || "",
        },
      });

      setInput(res.data.task);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const updateTaskById = async () => {
    try {
      const res = await axiosClient.put(
        `/${id}`,
        { task: input },
        {
          headers: {
            user: localStorage.getItem("user") || "",
          },
        }
      );

      console.log(input);
      toast.success(res.data.message);
      setIsOpen(false);
      await fetchTasks();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setInput("");
    }
  };

  const openModal = async () => {
    try {
      setLoading(true);
      setIsOpen(true);
      await fetchTaskbyId();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => openModal()}
        type="button"
        className="text-xl text-green-300 "
        title="Edit"
      >
        <MdSystemSecurityUpdate />
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="min-w-[400px]  space-y-4 border bg-white p-4">
            {loading ? (
              <div className="text-6xl flex justify-center">
                <CgSpinner className="animate-spin" />
              </div>
            ) : (
              <>
                <div className=" flex justify-between items-center">
                  <DialogTitle className="font-bold">Edit Task</DialogTitle>

                  <button onClick={() => setIsOpen(false)}>
                    <ImCross />
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="update task"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={() => updateTaskById()}>check</button>
              </>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default UpdateModal;
