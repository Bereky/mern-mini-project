import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { MoonLoader } from "react-spinners";

import Modal from "./modal";
import {
  useGetTicketQuery,
  useUpdateTicketMutation,
} from "../redux/features/ticket/ticketService";

const UpdateTicketModal = (props) => {
  const { token } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [
    updateTicket,
    { data: response, isLoading, isSuccess, isError, error },
  ] = useUpdateTicketMutation();

  const {
    data,
    isFetching,
    error: isFetchingError,
  } = useGetTicketQuery({
    token,
    ticketId: props.ticketId,
  });

  const onSubmit = (formData) => {
    const payload = {
      token,
      data: formData,
      ticketId: props.ticketId,
    };
    updateTicket(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      props.closeModal();
      toast.success("Ticket updated successfully!");
    }
  }, [response, isLoading, isSuccess, isError, error]);

  return (
    <Modal
      label="Update Ticket Status"
      close={props.closeModal}
      className="w-full max-w-lg"
    >
      {data && (
        <div className="w-full flex flex-col gap-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <p className="">{data.data?.title}</p>
            </div>
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <p className="">{data.data?.description}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-900"
              >
                Status
              </label>
              <div className="mt-2">
                <select
                  defaultValue={data.data.status}
                  {...register("status", {
                    required: "title is required",
                  })}
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm ${
                    errors.status ? "outline-red-500" : ""
                  }`}
                  name="status"
                  id="status"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
                {errors?.status && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="h-8 flex w-full justify-center items-center rounded-md bg-indigo-600  px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 disabled:bg-indigo-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? <MoonLoader size={10} color="white" /> : "Update"}
              </button>
            </div>
          </form>
        </div>
      )}
      {isFetching && (
        <div className="h-16 flex items-center justify-center">
          <MoonLoader color="black" size={20} />
        </div>
      )}
      {isFetchingError && <div className="">Fetching error</div>}
    </Modal>
  );
};

export default UpdateTicketModal;
