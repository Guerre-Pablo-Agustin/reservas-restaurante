export type User = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
};


export type Reservation = {
  id: string;
  clientName: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "canceled";
  quantity: number;

};