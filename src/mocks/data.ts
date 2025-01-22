import { Reservation, User } from '@/types/types';

export const data : {
    users : User[],
    reservations : Reservation[]
} = {

    //**users
    users : [
        {
            id: "1",
            name: "Juan",
            lastName: "Perez",
            email: "admin@gmail.com",
            password: "123456",
            image: "/images/avatars/hombre.jpg",
            role: "admin",
            reservations: []
        }
    ],

    //**reservations
    reservations : [
        {
            id: "1",
            clientName: "Juan Perez",
            date: "2025-01-01",
            time: "9:00",
            status: "pendiente",
            quantity: "2",
            details: "Detalles de la reserva",
            phone: "123456789",
            userId: "1"
        },
        {
            id: "2",
            clientName: "Maria Díaz",
            date: "2025-01-02",
            time: "10:00",
            status: "confirmada",
            quantity: "6",
            details: "Detalles de la reserva",
            phone: "123456789",
            userId: "1"
        },
        {
            id: "3",
            clientName: "Luis sanchez",
            date: "2025-01-03",
            time: "17:00",
            status: "cancelada",
            quantity: "8",
            details: "Detalles de la reserva",
            phone: "123456789",
            userId: "1"
        }
    ]
}