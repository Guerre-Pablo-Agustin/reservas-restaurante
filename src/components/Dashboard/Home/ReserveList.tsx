"use client";

import Link from "next/link";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Searcher from "./Searcher";
import Paginated from "./Paginated";
import { useStore } from "@/store/store";

const ReserveList = () => {
  const { reservations, deleteReservation, loadReservations } = useStore();

  //busqueda
  const [search, setSearch] = useState("");

  const filteredReservations = reservations.filter(
    (r) =>
      r.clientName.toLowerCase().includes(search.toLowerCase()) ||
      r.date.toLowerCase().includes(search.toLowerCase()) ||
      r.status.toLowerCase().includes(search.toLowerCase()) ||
      r.quantity.toString().includes(search.toLowerCase())
  );

  //paginado
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReservations = filteredReservations.slice(
    startIndex,
    startIndex + itemsPerPage
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
      case "pending":
        return "bg-green-500 text-white shadow-md shadow-green-500/50";
      case "confirmed":
        return "bg-yellow-500 text-white shadow-md shadow-yellow-500/50";
      case "canceled":
        return "bg-violet-500 text-white shadow-md shadow-violet-500/50";
      default:
        return "bg-gray-500 text-white shadow-md shadow-gray-500/50";
    }
  };

  const handleDelete = (id: number) => {
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

  return (
    <section>
      <div className="text-2xl text-center font-bold mb-4">
        Lista de tareas
      </div>

      {/* Buscador */}
      <div className="w-full justify-between flex items-center m-6 gap-2 py-4 px-8">
        <Searcher search={search} setSearch={setSearch} />
        <button className=" bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md shadow-primary/50 w-[20%]">
          Crear +
        </button>
      </div>

      {/* Tabla de tareas */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="text-gray-700 text-sm font-medium uppercase">
            <tr>
              <th>#</th>
              <th>
                Cliente
              </th>
              <th>
                Cantidad
              </th>
              <th>Fecha</th>
              <th>
                Estado
              </th>
              <th>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {currentReservations.map((r) => (
              <tr key={r.id}>
                <td className="text-sm text-center p-2">{r.id}</td>
                <td className="text-sm text-start p-2">{r.clientName}</td>
                <td className="text-sm text-start p-2">{r.quantity}</td>
                <td className="text-sm text-center p-2">
                  {formatDate(r.date)}
                </td>
                <td className={`text-sm text-center rounded`}>
                  <p className={`${getStatus(r.status)} py-0.5 px-2 rounded`}>
                    {r.status.toUpperCase()}
                  </p>
                </td>
                <td className="text-sm text-center flex gap-2 items-center justify-center p-2">
                  <Link href={`/panel/edit/${r.id}`}>
                    <button className="bg-edit hover:bg-edit/70 text-white font-bold py-2 px-4 rounded shadow-md shadow-edit/50">
                    Editar
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="bg-delete hover:bg-delete text-white font-bold py-2 px-4 rounded shadow-md shadow-delete/50"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center mt-4 gap-2">
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
