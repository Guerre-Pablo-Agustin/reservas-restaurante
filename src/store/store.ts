import { data } from '@/mocks/data';
import { Reservation, User } from '@/types/types';
import { create } from 'zustand';

interface Store {
 
  //User
  user : User | null;
  setUser : (user : User) => void;
  logout : () => void;
  login: (mail: string, password: string) => boolean;
  loadUser : () => void;
  createUser : (newUser : User) => void;

  //Reservation
  reservations : Reservation[];
  setReservations : (reservations : Reservation[]) => void;
  createReservation : (reservation : Reservation) => void;
  deleteReservation : (id : string) => void;
  updateReservation : (id : string, updateReservation: Partial<Reservation>) => void;
  confirmReservation : (id : string) => void;
  cancelReservation : (id : string) => void;

}

export const useStore = create<Store>((set, get) => ({
  
  //User
  user : null,
  createUser: (newUser) => {
    set(() => {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const allUsers = [...data.users, ...existingUsers];
  
      const userExists = allUsers.some(
        (user: User) => user.email === newUser.email
      );
  
      if (userExists) {
        throw new Error("El usuario ya existe con este correo electrónico.");
      }
  
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
  
      return {};
    });
  },
  
  setUser: (user) => set({ user }),

  login: (email, password) => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const allUsers = [...data.users, ...existingUsers]; 
  
      const foundUser = allUsers.find(
        (user: User) => user.email === email && user.password === password
      );
  
      if (foundUser) {
        set({ user: foundUser });
        localStorage.setItem("user", JSON.stringify(foundUser));
        return true;
      }
  
      return false;
    } catch (error) {
      console.error("Error en el login:", error);
      return false;
    }
  },
  

  loadUser: () => {
    const user = localStorage.getItem("user");
    if (user) {
      set({ user: JSON.parse(user) });
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },

  //Reservation
  reservations : [],
  setReservations : (reservations : Reservation[]) => set(() => ({ reservations })),
  createReservation : (reservation : Reservation) => set(() => ({ reservations: [...get().reservations, reservation] })),
  deleteReservation : (id : string) => set(() => ({ reservations: get().reservations.filter(reservation => reservation.id !== id) })),
  updateReservation : (id : string, updateReservation: Partial<Reservation>) => set(() => ({ reservations: get().reservations.map(reservation => reservation.id === id ? { ...reservation, ...updateReservation } : reservation) })),
  confirmReservation : (id : string) => set(() => ({ reservations: get().reservations.map(reservation => reservation.id === id ? { ...reservation, status: "confirmed" } : reservation) })),
  cancelReservation : (id : string) => set(() => ({ reservations: get().reservations.map(reservation => reservation.id === id ? { ...reservation, status: "canceled" } : reservation) })),

}));