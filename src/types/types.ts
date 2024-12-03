export type User = {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: "admin" | "user";
};

export type Table = {
    id: string;
    cantidad: number;
    location: string;
}

export type Reservation = {
  id: string;
  tableId: string;
  userId: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "canceled";
  quantity: number;

};