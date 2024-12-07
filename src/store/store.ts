import { data } from "@/mocks/data";
import { Reservation, User } from "@/types/types";
import { create } from "zustand";

interface Store {
  //User
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  login: (mail: string, password: string) => boolean;
  loadUser: () => void;
  createUser: (newUser: User) => void;

  //Reservation
  reservations: Reservation[];
  setReservations: (reservations: Reservation[]) => void;
  createReservation: (reservation: Reservation) => void;
  deleteReservation: (id: string) => void;
  updateReservation: (
    id: string,
    updateReservation: Partial<Reservation>,
  ) => void;
}

export const useStore = create<Store>((set) => ({
  //User
  user: null,
  createUser: (newUser) => {
    set(() => {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const allUsers = [...data.users, ...existingUsers];

      const userExists = allUsers.some(
        (user: User) => user.email === newUser.email,
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
        (user: User) => user.email === email && user.password === password,
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
  reservations: [],

  setReservations: (reservations) => {
    set({ reservations });
    localStorage.setItem("reservations", JSON.stringify(reservations));
  },
  createReservation: (reservation) => {
    set(() => {
      const existingReservations = JSON.parse(
        localStorage.getItem("reservations") || "[]",
      );
      const allReservations = [...data.reservations, ...existingReservations];

      const reservationExists = allReservations.some(
        (reservation: Reservation) => reservation.id === reservation.id,
      );

      if (reservationExists) {
        throw new Error("La reserva ya existe con este id.");
      }

      const updatedReservations = [...existingReservations, reservation];
      localStorage.setItem("reservations", JSON.stringify(updatedReservations));

      return {};
    });
  },

  deleteReservation: (id) => {
    set(() => {
      const existingReservations = JSON.parse(
        localStorage.getItem("reservations") || "[]",
      );
      const allReservations = [...data.reservations, ...existingReservations];

      const reservationIndex = allReservations.findIndex(
        (reservation: Reservation) => reservation.id === id,
      );

      if (reservationIndex === -1) {
        throw new Error("La reserva no existe.");
      }

      const updatedReservations = [
        ...existingReservations.slice(0, reservationIndex),
        ...existingReservations.slice(reservationIndex + 1),
      ];
      localStorage.setItem("reservations", JSON.stringify(updatedReservations));

      return {};
    });
  },
  updateReservation: (id, updateReservation) => {
    set((state) => {
      const updatedReservations = state.reservations.map((reservation) =>
        reservation.id === id
          ? { ...reservation, ...updateReservation }
          : reservation,
      );
      localStorage.setItem("reservations", JSON.stringify(updatedReservations));
      return { reservations: updatedReservations };
    });
  },
}));
