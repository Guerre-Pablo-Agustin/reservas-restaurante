import { Reservation } from "@/types/types";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  onClose: () => void;
  onAddReservation: (reservations: Reservation) => void;
  newReservation: Reservation;
  setNewReservation: React.Dispatch<React.SetStateAction<Reservation>>;
};

const Create = ({
  onClose,
  onAddReservation,
  newReservation,
  setNewReservation,
}: Props) => {
  const handleNewReservationChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setNewReservation({ ...newReservation, [e.target.name]: e.target.value });
  };

  const handleAddReservation = () => {
    onAddReservation(newReservation);
    setNewReservation({
      id: 0,
      clientName: "",
      date: "",
      time: "",
      status: "pending",
      quantity: 1,
      details: "",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.125 }}
      id="create-modal"
      className="fixed top-5 z-50  w-[75%] items-center justify-center bg-white p-4 rounded-md border-2 border-gray-300 shadow-md font-serif"
    >
        <p className="text-center text-2xl font-bold ">Crear reserva</p>
      <div className="flex flex-col gap-4 p-4">
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
            value={newReservation.clientName}
            onChange={handleNewReservationChange}
            className="w-full rounded-md border-gray-300 p-2 text-sm text-gray-800"
            placeholder="Nombre del cliente"
          />
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-sm font-medium text-gray-800">
              Fecha
            </label>
            <input
              type="date"
              name="date"
              value={newReservation.date}
              onChange={handleNewReservationChange}
              className="w-full rounded-md border-gray-300 p-2 text-sm text-gray-800"
              placeholder="Fecha"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="time" className="text-sm font-medium text-gray-800">
              Hora
            </label>
            <input
              type="time"
              name="time"
              value={newReservation.time}
              onChange={handleNewReservationChange}
              className="w-full rounded-md border-gray-300 p-2 text-sm text-gray-800"
              placeholder="Hora"
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
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
              value={newReservation.quantity}
              onChange={handleNewReservationChange}
              className="w-full rounded-md border-gray-300 p-2 text-sm text-gray-800"
              placeholder="Cantidad"
            />
          </div>
          <div className="flex flex-col gap-2 w-40">
            <label
              htmlFor="status"
              className="text-sm font-medium text-gray-800"
            >
              Estado
            </label>
            <select
            className="w-full rounded-md border-gray-300 p-2 text-sm text-gray-800"
              name="status"
              value={newReservation.status}
              onChange={(e) =>
                setNewReservation((prev) => ({
                  ...prev,
                  status: e.target.value as
                    | "pending"
                    | "confirmed"
                    | "canceled",
                }))
              }
            >
              <option value="pending">Pendiente</option>
              <option value="confirmed">Confirmada</option>
              <option value="canceled">Cancelada</option>
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
            value={newReservation.details}
            onChange={handleNewReservationChange}
            className="w-full rounded-md border-gray-300 p-2 text-sm text-gray-800"
            placeholder="Detalles"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 p-4">
        <button
          onClick={handleAddReservation}
          className="rounded bg-primary px-4 py-2 font-bold text-white shadow-md shadow-primary/50 hover:bg-blue-700"
        >
          Crear
        </button>
        <button
          onClick={onClose}
          className="rounded bg-red-500 px-4 py-2 font-bold text-white shadow-md shadow-red-500/50 hover:bg-red-700"
        >
          Cancelar
        </button>
      </div>
    </motion.div>
  );
};

export default Create;
