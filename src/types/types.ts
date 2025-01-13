export type User = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role : 'admin';
  image: string;
  reservations: Reservation[];
};


export type Reservation = {
  id: string;
  clientName: string;
  phone: string;
  date: string;
  time: string;
  status: "pendiente" | "confirmada" | "cancelada";
  quantity: number;
  details: string;
  userId:string

};