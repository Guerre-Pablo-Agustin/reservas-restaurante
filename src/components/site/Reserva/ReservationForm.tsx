"use client";

import { useReservationStore } from "@/store";
import { Reservation } from "@/types/types";
import { useState } from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

export default function ReservationForm() {
  const { reservations, createReservation, setReservations } = useReservationStore();

  const [newReservation, setNewReservation] = useState<Reservation>({
    id: "",
    clientName: "",
    phone: "",
    date: "",
    time: "",
    status: "pendiente",
    quantity: 1,
    details: "",
  });

  const handleNewReservationChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setNewReservation({ ...newReservation, [e.target.name]: e.target.value });
  };

  const handleAddReservation = () => {
    if (
      !newReservation.clientName ||
      !newReservation.phone ||
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
      phone: newReservation.phone,
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
      phone: "",
      date: "",
      time: "",
      status: "pendiente",
      quantity: 1,
      details: "",
    });
  };

  return (
    <form onSubmit={handleAddReservation} className="mx-auto max-w-md">
      <div className="space-y-4">
        <div className="flex flex-col gap-2 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-1/2">
          <label htmlFor="clientName">Nombre del cliente</label>
          <input
            type="text"
            id="name"
            name="clientName"
            value={newReservation.clientName}
            onChange={handleNewReservationChange}
            required
            className="rounded-lg border border-gray-600 p-2 text-sm"
          />
        </div>
        <div className="flex flex-col gap-2 lg:w-1/2">
          <label htmlFor="clientPhone">Teléfono</label>
          <input
            type="text"
            id="phone"
            name="clientPhone"
            value={newReservation.phone}
            onChange={handleNewReservationChange}
            required
            className="rounded-lg border border-gray-600 p-2 text-sm"
          />
        </div>
        </div>
        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-1/2">
            <label htmlFor="date">Fecha</label>
            <input
              type="date"
              id="date"
              name="date"
              value={newReservation.date}
              onChange={handleNewReservationChange}
              required
              className="rounded-lg border border-gray-600 p-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-2 lg:w-1/2">
            <label htmlFor="time">Hora</label>
            <input
              type="time"
              id="time"
              name="time"
              value={newReservation.time}
              onChange={handleNewReservationChange}
              required
              className="rounded-lg border border-gray-600 p-2 text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="quantity">Cantidad de personas</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={newReservation.quantity}
            onChange={handleNewReservationChange}
            min="1"
            max="10"
            required
            className="rounded-lg border border-gray-600 p-2 text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="details">Detalles de la reserva</label>
          <textarea
            id="details"
            name="details"
            value={newReservation.details}
            onChange={handleNewReservationChange}
            rows={3}
            className="rounded-lg border border-gray-600 p-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-primary px-4 py-2 text-white transition-transform duration-300 hover:scale-110 hover:bg-primary/90"
        >
          Enviar Reserva
        </button>
      </div>
    </form>
  );
}
