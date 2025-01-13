"use client";
import React, { useState, useEffect } from "react";
import { useStore } from "@/store";
import { Reservation } from "@/types/types";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { CiEdit } from "react-icons/ci";

type Props = {
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  selectId: string;
};

const Details = ({ setShowDetails, selectId }: Props) => {
  const { reservations, updateReservation } = useStore();

  const selectedReservation = reservations.find(
    (reservation) => reservation.id === selectId,
  );

  const [editableReservation, setEditableReservation] = useState<
    Partial<Reservation>
  >(selectedReservation || {});

  useEffect(() => {
    setEditableReservation(selectedReservation || {});
  }, [selectedReservation]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setEditableReservation((prev) => ({ ...prev, [name]: value }));
  };

  const handlerEditReservation = () => {
    const data = {
      id: selectedReservation?.id || "",
      clientName: editableReservation.clientName,
      details: editableReservation.details,
      status: editableReservation.status as
        | "pendiente"
        | "confirmada"
        | "cancelada",
      date: editableReservation.date,
      time: editableReservation.time,
      quantity: editableReservation.quantity,
    };
    updateReservation(data.id, data);
    Swal.fire({
      title: "¡Reserva actualizada!",
      text: "La reserva ha sido actualizada con éxito.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    setShowDetails(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.125 }}
      id="create-modal"
      className="fixed top-24 z-50 w-[89%] items-center justify-center rounded-md border-2 border-gray-300 bg-white p-4 px-4 font-serif shadow-md md:top-5 md:w-[65%]"
    >
      <span className="text-center text-2xl font-bold">
        Detalles de la reserva
      </span>

      <div className="flex flex-col gap-10 p-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="clientName"
            className="text-sm font-medium text-gray-800"
          >
            Cliente
          </label>
          <input
            type="text"
            name="clientName"
            value={editableReservation.clientName || ""}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 p-2 text-sm text-gray-800"
            placeholder="Nombre del cliente"
          />
        </div>

        <div className="flex flex-row gap-16">
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-sm font-medium text-gray-800">
              Fecha
            </label>
            <input
              type="date"
              name="date"
              value={editableReservation.date || ""}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 p-2 text-sm text-gray-800"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="time" className="text-sm font-medium text-gray-800">
              Hora
            </label>
            <input
              type="time"
              name="time"
              value={editableReservation.time || ""}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 p-2 text-sm text-gray-800"
            />
          </div>
        </div>

        <div className="flex flex-row gap-16">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="quantity"
              className="text-sm font-medium text-gray-800"
            >
              Cantidad
            </label>
            <input
              type="number"
              name="quantity"
              min={1}
              max={10}
              value={editableReservation.quantity || ""}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 p-2 text-sm text-gray-800"
              placeholder="Cantidad"
            />
          </div>

          <div className="flex w-40 flex-col gap-2">
            <label
              htmlFor="status"
              className="text-sm font-medium text-gray-800"
            >
              Estado
            </label>
            <select
              name="status"
              value={editableReservation.status || ""}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 p-2 text-sm text-gray-800"
            >
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="details"
            className="text-sm font-medium text-gray-800"
          >
            Detalles
          </label>
          <textarea
            name="details"
            value={editableReservation.details || ""}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 p-2 text-sm text-gray-800"
            placeholder="Detalles"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={handlerEditReservation}
          className="rounded-full bg-primary px-4 py-2 font-bold text-white shadow-md shadow-primary/50 hover:bg-blue-700"
        >
          <CiEdit className="buton-editar text-2xl text-info" />
        </button>
        <button
          onClick={() => setShowDetails(false)}
          className="rounded-full bg-red-500 px-4 py-2 font-bold text-white shadow-md shadow-red-500/50 hover:bg-red-700"
        >
          Cerrar
        </button>
      </div>
    </motion.div>
  );
};

export default Details;
