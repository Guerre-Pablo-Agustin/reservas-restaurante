"use client";
import { Reservation } from "@/types/types";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useStore } from "@/store/store";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

type Props = {
  onClose?: () => void;
  setShowForm?: React.Dispatch<React.SetStateAction<boolean>>;
};
const Create = ({ onClose = () => {}, setShowForm = () => {} }: Props) => {
  const { reservations, createReservation, setReservations } = useStore();

  const [newReservation, setNewReservation] = useState<Reservation>({
    id: "",
    clientName: "",
    date: "",
    time: "",
    status: "pendiente",
    quantity: 1,
    details: "",
  });

  const handleAddReservation = () => {
    if (
      !newReservation.clientName ||
      !newReservation.date ||
      !newReservation.time ||
      !newReservation.quantity ||
      !newReservation.details ||
      !newReservation.status
    ) {
      Swal.fire({
        title: "Error",
        text: "Por favor, rellena todos los campos.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    const data = {
      id: uuidv4(),
      clientName: newReservation.clientName,
      details: newReservation.details,
      status: newReservation.status as "pendiente" | "confirmada" | "cancelada",
      date: newReservation.date,
      time: newReservation.time,
      quantity: newReservation.quantity,
    };
    createReservation(data);
    setReservations([...reservations, data]);
    Swal.fire({
      title: "¡Reserva creada!",
      text: "La reserva ha sido creada con éxito.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    setNewReservation({
      id: "",
      clientName: "",
      date: "",
      time: "",
      status: "pendiente",
      quantity: 1,
      details: "",
    });
    setShowForm(false);
  };

  const handleNewReservationChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setNewReservation({ ...newReservation, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.125 }}
      id="create-modal"
      className="fixed top-24 z-50 w-[89%] items-center justify-center rounded-md border-2 border-gray-300 bg-white p-4 font-serif shadow-md md:top-5 md:w-[75%]"
    >
      <span className="text-center text-2xl font-bold">Crear reserva</span>
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
            value={newReservation.clientName}
            onChange={handleNewReservationChange}
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
              value={newReservation.quantity}
              onChange={handleNewReservationChange}
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
              className="w-full rounded-md border-gray-300 p-2 text-sm text-gray-800"
              name="status"
              value={newReservation.status}
              onChange={(e) =>
                setNewReservation((prev) => ({
                  ...prev,
                  status: e.target.value as
                    | "pendiente"
                    | "confirmada"
                    | "cancelada",
                }))
              }
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
          <AiOutlinePlusCircle className="buton-crear text-2xl text-info" />
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
