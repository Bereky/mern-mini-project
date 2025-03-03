import { useSelector } from "react-redux";
import dayjs from "dayjs";

const TicketCard = ({ ticket, update }) => {
  const { account } = useSelector((state) => state.user);

  return (
    <div
      key={ticket._id}
      className="bg-white rounded shadow-md p-4 flex flex-col gap-4 border border-zinc-100"
    >
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-row justify-between gap-4s">
          <div className="flex flex-col justify-between gap-4s">
            <h3 className="text-lg font-bold">{ticket.title}</h3>
            <p className="text-gray-600 text-sm">
              {dayjs(ticket.createdAt).format("MMM D, YYYY h:mm A")}
            </p>
          </div>
          <div className="">
            {ticket.status === "Open" && (
              <span className="h-6 font-medium text-xs border border-amber-100 bg-amber-200 text-amber-600 rounded-md px-2 py-0.5">
                <i className="fa fa-clock fa-xs mr-1"></i>
                {ticket.status}
              </span>
            )}
            {ticket.status === "In Progress" && (
              <span className="h-6 font-medium text-xs border border-indigo-100 bg-indigo-200 text-indigo-600 rounded-md px-2 py-0.5">
                <i className="fa fa-clock fa-xs mr-1"></i>
                {ticket.status}
              </span>
            )}

            {ticket.status === "Resolved" && (
              <span className="h-6 font-medium text-xs border border-emerald-100 bg-emerald-200 text-emerald-600 rounded-md px-2 py-0.5">
                <i className="fa fa-check-circle fa-xs mr-1"></i>
                {ticket.status}
              </span>
            )}

            {ticket.status === "Closed" && (
              <span className="h-6 font-medium text-xs border border-rose-100 bg-rose-200 text-rose-600 rounded-md px-2 py-0.5">
                <i className="fa fa-xmark-circle fa-xs mr-1"></i>
                {ticket.status}
              </span>
            )}
          </div>
        </div>
        <p className="text-gray-600">{ticket.description}</p>

        {account.role === "admin" && (
          <p className="text-gray-600">
            Owner: <span className="font-bold">{ticket.creator.name}</span>
          </p>
        )}
      </div>

      <div className="flex flex-row justify-start items-end grow">
        {account.role === "admin" && (
          <button
            className="h-8 flex justify-center items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => update(ticket._id)}
          >
            <i className="fa fa-edit fa-xs"></i>
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default TicketCard;
