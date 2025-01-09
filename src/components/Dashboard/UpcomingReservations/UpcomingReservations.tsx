'use client'

import Link from 'next/link';
import { useStore } from '@/store/store';
import { useEffect } from 'react';

const statusStyles = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    confirmada: 'bg-green-100 text-green-800',
    cancelada: 'bg-red-100 text-red-800',
};

const UpcomingReservations = () => {
    const { reservations, loadReservations } = useStore();

    useEffect(() => {
        loadReservations();
    }, [loadReservations]);

    // Obtener la fecha actual
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filtrar y ordenar las reservaciones
    const upcomingReservations = reservations
        .filter(reservation => {
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
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Próximas Reservas</h2>
                <Link 
                    href="/dashboard/reservations" 
                    className="text-blue-500 hover:text-blue-700 text-sm"
                >
                    Ver todas
                </Link>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-2 px-3 text-xs text-gray-500">Cliente</th>
                            <th className="text-left py-2 px-3 text-xs text-gray-500">Fecha/Hora</th>
                            <th className="text-left py-2 px-3 text-xs text-gray-500">Personas</th>
                            <th className="text-left py-2 px-3 text-xs text-gray-500">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {upcomingReservations.length > 0 ? (
                            upcomingReservations.map((reservation) => (
                                <tr key={reservation.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-3">
                                        <span className="text-sm font-medium text-gray-900">
                                            {reservation.clientName}
                                        </span>
                                    </td>
                                    <td className="py-2 px-3">
                                        <span className="text-sm text-gray-500">
                                            {reservation.date} {reservation.time}
                                        </span>
                                    </td>
                                    <td className="py-2 px-3">
                                        <span className="text-sm text-gray-500">
                                            {reservation.quantity}
                                        </span>
                                    </td>
                                    <td className="py-2 px-3">
                                        <span className={`px-2 py-1 text-xs rounded-full ${statusStyles[reservation.status]}`}>
                                            {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="py-4 text-center text-sm text-gray-500">
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
