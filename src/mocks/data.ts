import { Reservation, User } from '@/types/types';

export const data : {
    users : User[],
    reservations : Reservation[]
} = {

    //**users
    users : [
        {
            id: "1",
            nombre: "Juan",
            apellido: "Perez",
            email: "admin@gmail.com",
            password: "123456",
            image: "/images/avatars/hombre.jpg"
        }
    ],

    //**reservations
    reservations : [
        {
            id: "1",
            clientName: "Juan Perez",
            date: "2025-01-01",
            time: "10:00",
            status: "pending",
            quantity: 2
        },
        {
            id: "2",
            clientName: "Maria Perez",
            date: "2025-01-02",
            time: "10:00",
            status: "confirmed",
            quantity: 6
        },
        {
            id: "3",
            clientName: "Pedro Perez",
            date: "2025-01-03",
            time: "10:00",
            status: "pending",
            quantity: 8
        }
    ]
}