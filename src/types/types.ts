export type User = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
};


export type Reservation = {
  id: number;
  clientName: string;
  date: string;
  time: string;
  status: "pendiente" | "confirmada" | "cancelada";
  quantity: number;
  details: string;

};