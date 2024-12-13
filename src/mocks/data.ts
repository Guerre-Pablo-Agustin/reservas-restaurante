import { Reservation, User } from '@/types/types';

export const data : {
    users : User[],
    reservations : Reservation[]
} = {

    //**users
    users : [
        {
            id: 1,
            name: "Juan",
            lastName: "Perez",
            email: "admin@gmail.com",
            password: "123456",
            image: "/images/avatars/hombre.jpg"
        }
    ],

    //**reservations
    reservations : [
        {
            id: 1,
            clientName: "Juan Perez",
            date: "2025-01-01",
            time: "10:00",
            status: "canceled",
            quantity: 2,
            details: "Detalles de la reserva"
        },
        {
            id: 2,
            clientName: "Maria Díaz",
            date: "2025-01-02",
            time: "10:00",
            status: "confirmed",
            quantity: 6,
            details: "Detalles de la reserva"

        },
        {
            id: 3,
            clientName: "Luis sanchez",
            date: "2025-01-03",
            time: "10:00",
            status: "pending",
            quantity: 8,
            details: "Detalles de la reserva"
        }
    ]
}