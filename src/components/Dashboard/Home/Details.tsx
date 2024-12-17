import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/store';
import { Reservation } from '@/types/types';
import Swal from 'sweetalert2';

type Props = {
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  selectId: number;
};

const Details = ({ setShowDetails, selectId }: Props) => {
  const { reservations, updateReservation } = useStore();


  const selectedReservation = reservations.find(
    (reservation) => reservation.id === selectId
  );

  
  const [editableReservation, setEditableReservation] = useState<Partial<Reservation>>(
    selectedReservation || {}
  );

 
  useEffect(() => {
    setEditableReservation(selectedReservation || {});
  }, [selectedReservation]);

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditableReservation((prev) => ({ ...prev, [name]: value }));
  };

  const handlerEditReservation = () => {
    const data = {
      id: selectedReservation?.id || 0,
      clientName: editableReservation.clientName,
      details: editableReservation.details,
      status: editableReservation.status as "pending" | "confirmed" | "canceled",
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
    <div className="fixed top-24 md:top-5 z-50 w-[89%] px-4 md:w-[65%] items-center justify-center bg-white p-4 rounded-md border-2 border-gray-300 shadow-md font-serif">
      <p className="text-center text-2xl font-bold">Detalles de la reserva</p>

      <div className="flex flex-col gap-10 p-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="clientName" className="text-sm font-medium text-gray-800">
            Cliente
          </label>
          <input
            type="text"
            name="clientName"
            value={editableReservation.clientName || ''}
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
              value={editableReservation.date || ''}
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
              value={editableReservation.time || ''}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 p-2 text-sm text-gray-800"
            />
          </div>
        </div>

        <div className="flex flex-row gap-16">
          <div className="flex flex-col gap-2">
            <label htmlFor="quantity" className="text-sm font-medium text-gray-800">
              Cantidad
            </label>
            <input
              type="number"
              name="quantity"
              value={editableReservation.quantity || ''}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 p-2 text-sm text-gray-800"
              placeholder="Cantidad"
            />
          </div>

          <div className="flex flex-col gap-2 w-40">
            <label htmlFor="status" className="text-sm font-medium text-gray-800">
              Estado
            </label>
            <select
              name="status"
              value={editableReservation.status || ''}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 p-2 text-sm text-gray-800"
            >
              <option value="pending">Pendiente</option>
              <option value="confirmed">Confirmada</option>
              <option value="canceled">Cancelada</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="details" className="text-sm font-medium text-gray-800">
            Detalles
          </label>
          <textarea
            name="details"
            value={editableReservation.details || ''}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 p-2 text-sm text-gray-800"
            placeholder="Detalles"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button onClick={handlerEditReservation} className="rounded bg-primary px-4 py-2 font-bold text-white shadow-md shadow-primary/50 hover:bg-blue-700">Editar</button>
        <button
          onClick={() => setShowDetails(false)}
          className="rounded bg-red-500 px-4 py-2 font-bold text-white shadow-md shadow-red-500/50 hover:bg-red-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Details;
