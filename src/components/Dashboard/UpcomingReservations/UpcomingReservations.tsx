"use client";

import { useReservationStore } from "@/store";
import Link from "next/link";
import { useEffect } from "react";

const statusStyles = {
  pendiente: "bg-yellow-100 text-yellow-800",
  confirmada: "bg-green-100 text-green-800",
  cancelada: "bg-red-100 text-red-800",
};

const UpcomingReservations = () => {
  const { reservations, getReservations } = useReservationStore();

  console.log("reservations", reservations);

  useEffect(() => {
    getReservations();
  }, [getReservations]);

  // Obtener la fecha actual
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filtrar y ordenar las reservaciones
  const upcomingReservations = reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.date);
      reservationDate.setHours(0, 0, 0, 0);
      return reservationDate >= today;
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 3);

  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Próximas Reservas</h2>
        <Link
          href="/dashboard/reservations"
          className="text-sm text-blue-500 hover:text-blue-700"
        >
          Ver todas
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-3 py-2 text-left text-xs text-gray-500">
                Cliente
              </th>
              <th className="px-3 py-2 text-left text-xs text-gray-500">
                Fecha/Hora
              </th>
              <th className="px-3 py-2 text-left text-xs text-gray-500">
                Personas
              </th>
              <th className="px-3 py-2 text-left text-xs text-gray-500">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {upcomingReservations.length > 0 ? (
              upcomingReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2">
                    <span className="text-sm font-medium text-gray-900">
                      {reservation.clientName}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className="text-sm text-gray-500">
                      {reservation.date} {reservation.time}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className="text-sm text-gray-500">
                      {reservation.quantity}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${statusStyles[reservation.status]}`}
                    >
                      {reservation.status.charAt(0).toUpperCase() +
                        reservation.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-4 text-center text-sm text-gray-500"
                >
                  No hay reservaciones próximas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingReservations;
