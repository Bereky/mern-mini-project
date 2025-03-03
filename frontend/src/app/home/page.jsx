import { useState } from "react";
import { useSelector } from "react-redux";

import { useGetTicketsQuery } from "../../redux/features/ticket/ticketService";

import Header from "../../components/header";
import Tickets from "../../components/tickets";
import CreateTicketModal from "../../components/create-ticket-modal";
import UpdateTicketModal from "../../components/update-ticket-modal";

const HomePage = () => {
  const { account, token } = useSelector((state) => state.user);
  const { data, isLoading, isError, error, refetch } = useGetTicketsQuery({
    token,
  });

  const [updateModal, setUpdateModal] = useState({
    state: false,
    ticketId: null,
  });
  const [createModal, setCreateModal] = useState({ state: false });

  const openUpdateModal = (ticketId) => {
    setUpdateModal({ ticketId: ticketId, state: true });
  };

  const closeUpdateModal = () => {
    setUpdateModal({ ticketId: null, state: false });
    refetch();
  };

  const openCreateModal = (payload) => {
    setCreateModal({ state: payload.state });
  };

  const closeCreateModal = () => {
    setCreateModal({ state: false });
    refetch();
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <Header name={account.name} />

      {createModal.state && <CreateTicketModal closeModal={closeCreateModal} />}

      {updateModal.state && updateModal.ticketId && (
        <UpdateTicketModal
          closeModal={closeUpdateModal}
          ticketId={updateModal.ticketId}
        />
      )}

      <main className="flex-1 md:p-10 p-4 overflow-y-auto">
        <div className="flex flex-row justify-between gap-4 mb-6">
          <h2 className="md:text-2xl text-xl font-bold">Tickets</h2>
          {account.role === "user" && (
            <button
              className="h-8 flex justify-center items-center gap-2 rounded-md bg-indigo-600 px-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => openCreateModal({ state: true })}
            >
              <i className="fa fa-plus fa-sm bg-amber-200"></i>
              New Ticket
            </button>
          )}
        </div>
        {data && !isLoading && !isError && (
          <Tickets data={data?.data} update={openUpdateModal} />
        )}
        {isLoading && <Skeleton />}
        {isError && <Error error={error?.data?.message || error?.error} />}
      </main>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="w-full min-h-48 grid md:grid-cols-3 grid-cols-1 md:gap-6 gap-4 rounded-lg animate-pulse">
      <div className="col-span-1 min-h-48 skeleton bg-zinc-200 rounded-md"></div>
      <div className="col-span-1 min-h-48 skeleton bg-zinc-200 rounded-md"></div>
      <div className="col-span-1 min-h-48 skeleton bg-zinc-200 rounded-md"></div>
      <div className="col-span-1 min-h-48 skeleton bg-zinc-200 rounded-md"></div>
      <div className="col-span-1 min-h-48 skeleton bg-zinc-200 rounded-md"></div>
      <div className="col-span-1 min-h-48 skeleton bg-zinc-200 rounded-md"></div>
    </div>
  );
};

const Error = (props) => {
  return (
    <div className="min-h-48 flex flex-col items-center justify-center bg-white p-6">
      <i className="fas fa-error text-gray-400 md:text-4xl text-2xl mb-4"></i>
      <h2 className="md:text-md text-sm font-semibold text-gray-800">Error</h2>
      <p className="text-gray-500 text-center md:text-sm text-xs">
        {props.error}
      </p>
    </div>
  );
};

export default HomePage;
