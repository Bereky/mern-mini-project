import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "./modal";
import { useCreateTicketMutation } from "../redux/features/ticket/ticketService";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { MoonLoader } from "react-spinners";

const CreateTicketModal = (props) => {
  const { token } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [
    createTicket,
    { data: response, isLoading, isSuccess, isError, error },
  ] = useCreateTicketMutation();

  const onSubmit = (data) => {
    const payload = {
      token,
      data,
    };

    createTicket(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      props.closeModal();
      toast.success("Ticket created successfully!");
    }
  }, [response, isLoading, isSuccess, isError, error]);

  return (
    <Modal
      label="Create Ticket"
      close={props.closeModal}
      className="w-full max-w-lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-900"
          >
            Title
          </label>
          <div className="mt-2">
            <input
              id="title"
              type="text"
              {...register("title", {
                required: "title is required",
                maxLength: {
                  value: 50,
                  message: "Title must be 50 characters or less",
                },
              })}
              className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm ${
                errors?.title ? "outline-red-500" : ""
              }`}
            />
            {errors?.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              type="text"
              {...register("description", {
                required: "description is required",
                minLength: {
                  value: 6,
                  message: "description must be at least 6 characters long",
                },
                maxLength: {
                  value: 500,
                  message: "description must be 500 characters or less",
                },
              })}
              className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm ${
                errors?.description ? "outline-red-500" : ""
              }`}
            />
            {errors?.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
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
            {isLoading ? <MoonLoader size={10} color="white" /> : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTicketModal;
