"use client";

import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Searcher from "./Searcher";
import Paginated from "./Paginated";
import { useStore } from "@/store/store";
import Create from "./Create";
import Details from "./Details";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Tooltip } from "react-tooltip";

const ReserveList = () => {
  const { reservations, deleteReservation, loadReservations } = useStore();

  //busqueda
  const [search, setSearch] = useState("");

  const filteredReservations = reservations.filter(
    (r) =>
      r.clientName.toLowerCase().includes(search.toLowerCase()) ||
      r.date.toLowerCase().includes(search.toLowerCase()) ||
      r.status.toLowerCase().includes(search.toLowerCase()) ||
      r.quantity.toString().includes(search.toLowerCase()),
  );

  //paginado
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReservations = filteredReservations.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  //carga de datos
  useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  //fecha
  const formatDate = (date: string) => {
    const formatedDate = new Date(date);
    const day = formatedDate.getDate().toString().padStart(2, "0");
    const month = (formatedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = formatedDate.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  const getStatus = (status: string) => {
    switch (status) {
      case "pendiente":
        return "bg-yellow-500 text-yellow-300 shadow-md shadow-yellow-500/50";
      case "confirmada":
        return "bg-green-500 text-green-300 shadow-md shadow-green-500/50";
      case "cancelada":
        return "bg-red-500 text-red-300 shadow-md shadow-red-500/50";
      default:
        return "bg-gray-500 text-white shadow-md shadow-gray-500/50";
    }
  };

  //eliminar reserva
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Deseas eliminar la reserva?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReservation(id);
        Swal.fire({
          title: "Eliminado",
          text: "La reserva ha sido eliminada.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
    });
  };

  //crear reserva
  const [showForm, setShowForm] = useState(false);

  //ver detalles
  const [showDetails, setShowDetails] = useState(false);
  const [selectId, setSelectId] = useState<string>("");

  return (
    <section>
      <div className="mb-4 text-center text-2xl font-bold">Lista de reservas</div>

      {/* Buscador */}
      <div className="mx-auto flex w-full max-w-screen-lg items-center gap-4 rounded-md px-6 py-4">
        <Searcher search={search} setSearch={setSearch} />
        <button
          onClick={() => setShowForm(true)}
          data-modal-toggle="create-modal"
          className="flex-shrink-0 rounded bg-primary px-4 py-2 font-bold text-white shadow-md shadow-primary/50 hover:bg-blue-700"
        >
          Crear +
        </button>
      </div>

      <br />

      {/* Tabla de tareas */}
      <div className="mt-2 overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-400 text-white text-sm font-medium uppercase">
            <tr className="border-b border-gray-300">
              <th className="p-3 text-left rounded-l-lg">#</th>
              <th className="p-3 text-left">Cliente</th>
              <th className="p-3 text-center">Cantidad</th>
              <th className="p-3 text-center">Fecha</th>
              <th className="p-3 text-center">Hora</th>
              <th className="p-3 text-center">Estado</th>
              <th className="p-3 text-center rounded-r-lg">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-300">
            {currentReservations.map((r) => (
              <tr key={r.id} className="even:bg-gray-100">
                <td className="p-2 text-center text-sm">{r.id}</td>
                <td className="p-2 text-center text-sm">{r.clientName}</td>
                <td className="p-2 text-center text-sm">{r.quantity}</td>
                <td className="p-2 text-center text-sm">
                  {formatDate(r.date)}
                </td>
                <td className="p-2 text-center text-sm">
                {new Date(r.date).toLocaleString(
                    "es-ES",
                    {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}
                </td>
                <td className={`text-center text-sm`}>
                  <p
                    className={`${getStatus(r.status)} mx-auto rounded-full p-1 text-center lg:w-[80%]`}
                  >
                    {r.status.toUpperCase()}
                  </p>
                </td>
                <td className="flex items-center justify-center gap-2 p-2 text-center text-sm">
                  <button
                    data-tip="Editar"
                    onClick={() => {
                      setSelectId(r.id); // Guarda el ID seleccionado
                      setShowDetails(true); // Muestra el componente Details
                    }}
                  >
                    <CiEdit className="buton-editar text-2xl text-info" />
                  </button>
                  <Tooltip
                    anchorSelect=".buton-editar"
                    place="top"
                    style={{ backgroundColor: "#a3bffa", borderRadius: "50%" }}
                  >
                    Editar
                  </Tooltip>
                  <button
                    data-tip="Eliminar"
                    onClick={() => handleDelete(r.id)}
                  >
                    <RiDeleteBin5Line className="buton-eliminar text-2xl text-red-500" />
                  </button>
                  <Tooltip
                    anchorSelect=".buton-eliminar"
                    place="top"
                    style={{ backgroundColor: "#ef4444", borderRadius: "50%" }}
                  >
                    Eliminar
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulario de creación de reserva */}
      {showForm && (
        <Create setShowForm={setShowForm} onClose={() => setShowForm(false)} />
      )}

      {/* Detalles de reserva */}
      {showDetails && (
        <Details selectId={selectId} setShowDetails={setShowDetails} />
      )}

      {/* Paginación */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <Paginated
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default ReserveList;
