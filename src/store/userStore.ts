import { User } from '@/types/types'
import { create } from 'zustand'

interface UserStore {
  users: User[]
  currentUser: User | null
  loading: boolean
  error: string | null
  getUserById: (id: string) => Promise<void>
  createUser: (userData: Partial<User>) => Promise<void>
  updateUser: (id: string, userData: Partial<User>) => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  currentUser: null,
  loading: false,
  error: null,

  
  getUserById: async (id: string) => {
    set({ loading: true })
    try {
      const response = await fetch(`/api/users/${id}`)
      const data = await response.json()
      set({ currentUser: data.user, loading: false })
    } catch (error) {
     console.log('Error al obtener usuario', error)
      set({ error: 'Error al obtener usuario', loading: false })
    }
  },

  createUser: async (userData: Partial<User>) => {
    set({ loading: true })
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      const data = await response.json()
      set((state) => ({
        users: [...state.users, data.user],
        loading: false
      }))
    } catch (error) {
      console.log('Error al crear usuario', error)
      set({ error: 'Error al crear usuario', loading: false })
    }
  },

  updateUser: async (id: string, userData: Partial<User>) => {
    set({ loading: true })
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      const data = await response.json()
      set((state) => ({
        users: state.users.map(user => 
          user.id === id ? { ...user, ...data.user } : user
        ),
        loading: false
      }))
    } catch (error) {
      console.log('Error al actualizar usuario', error)
      set({ error: 'Error al actualizar usuario', loading: false })
    }
  },

}))