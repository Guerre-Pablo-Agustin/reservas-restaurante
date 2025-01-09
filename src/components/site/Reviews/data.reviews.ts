export interface Review {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
    image?: string;
}

export const reviews: Review[] = [
    {
        id: 1,
        name: "María González",
        rating: 5,
        comment: "¡Excelente experiencia! La comida estaba deliciosa y el servicio fue excepcional. Definitivamente volveré.",
        date: "2024-01-05",
        image: "/avatars/avatar1.jpg"
    },
    {
        id: 2,
        name: "Juan Pérez",
        rating: 4,
        comment: "Muy buen ambiente y platos bien presentados. El servicio fue rápido y amable.",
        date: "2024-01-03",
        image: "/avatars/avatar2.jpg"
    },
    {
        id: 3,
        name: "Ana Martínez",
        rating: 5,
        comment: "Los sabores son únicos y la atención es impecable. El lugar tiene un ambiente muy acogedor.",
        date: "2024-01-01",
        image: "/avatars/avatar3.jpg"
    },
    {
        id: 4,
        name: "Carlos Rodríguez",
        rating: 5,
        comment: "Una experiencia gastronómica inolvidable. Los platos son obras de arte.",
        date: "2023-12-28",
        image: "/avatars/avatar4.jpg"
    }
];
