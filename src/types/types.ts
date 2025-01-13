export type User = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role : 'admin';
  image: string;
};


export type Reservation = {
  id: string;
  clientName: string;
  date: string;
  time: string;
  status: "pendiente" | "confirmada" | "cancelada";
  quantity: number;
  details: string;

};