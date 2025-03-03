import TicketCard from "./ticket-card";

const Tickets = (props) => {
  return (
    <div className="flex gap-4 flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-4">
        {props.data?.map((ticket) => (
          <TicketCard ticket={ticket} update={props.update} key={ticket._id} />
        ))}
      </div>
      {props.data?.length === 0 && (
        <div className="min-h-48 flex flex-col items-center justify-center bg-white p-6">
          <i className="fas fa-folder-open text-gray-400 md:text-4xl text-2xl mb-4"></i>
          <h2 className="md:text-md text-sm font-semibold text-gray-800">
            No Tickets
          </h2>
          <p className="text-gray-500 text-center md:text-sm text-xs">
            It looks like the you haven't attached any documents yet. Please
            attach the required documents to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default Tickets;
