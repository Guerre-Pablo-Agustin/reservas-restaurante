import { Reservation } from '@/types/types'
import { create } from 'zustand'


interface ReservationStore {
  reservations: Reservation[]
  loading: boolean
  error: string | null
  getReservations: () => Promise<void>
  setReservations: (reservations: Reservation[]) => void;
  getReservationById: (id: string) => Promise<void>
  createReservation: (reservationData: Partial<Reservation>) => Promise<void>
  updateReservation: (id: string, reservationData: Partial<Reservation>) => Promise<void>
  deleteReservation: (id: string) => Promise<void>
}

export const useReservationStore = create<ReservationStore>((set) => ({
  reservations: [],
  loading: false,
  error: null,

  setReservations: (reservations) => {
    set({ reservations })
  },

  getReservations: async () => {
    set({ loading: true })
    try {
      const response = await fetch('/api/reservations')
      const data = await response.json()
      set({ reservations: data, loading: false })
    } catch (error) {
      console.log('Error al cargar reservaciones', error)
      set({ error: 'Error al cargar reservaciones', loading: false })
    }
  },

  getReservationById: async (id: string) => {
    set({ loading: true })
    try {
      const response = await fetch(`/api/reservations/${id}`)
      const data = await response.json()
      set({ loading: false })
      return data.reservation
    } catch (error) {
      console.log('Error al obtener reservación', error)
      set({ error: 'Error al obtener reservación', loading: false })
    }
  },

  createReservation: async (reservationData: Partial<Reservation>) => {
    set({ loading: true })
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData)
      })
      const data = await response.json()
      console.log('Datos recibidos:', data.reservation)
      set((state) => ({
          reservations: [...state.reservations, data.reservation],
          loading: false
        }))
    } catch (error) {
      console.log('Error al crear reservación', error)
      set({ error: 'Error al crear reservación', loading: false })
    }
  },

  updateReservation: async (id: string, reservationData: Partial<Reservation>) => {
    set({ loading: true })
    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData)
      })
      const data = await response.json()
      set((state) => ({
        reservations: state.reservations.map(reservation => 
          reservation.id === id ? { ...reservation, ...data.reservation } : reservation
        ),
        loading: false
      }))
    } catch (error) {
      console.log('Error al actualizar reservación', error)
      set({ error: 'Error al actualizar reservación', loading: false })
    }
  },

  deleteReservation: async (id: string) => {
    set({ loading: true })
    try {
      await fetch(`/api/reservations/${id}`, { method: 'DELETE' })
      set((state) => ({
        reservations: state.reservations.filter(reservation => reservation.id !== id),
        loading: false
      }))
    } catch (error) {
      console.log('Error al eliminar reservación', error)
      set({ error: 'Error al eliminar reservación', loading: false })
    }
  }
}))