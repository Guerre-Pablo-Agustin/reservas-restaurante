import { User } from '@/types/types'
import { create } from 'zustand'

interface UserStore {
  users: User[]
  currentUser: User | null
  loading: boolean
  error: string | null
  getUserById: (id: string) => Promise<void>
  createUser: (userData: Partial<User>) => Promise<boolean>
  updateUser: (id: string, userData: Partial<User>) => Promise<void>
  login: (mail: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  currentUser: null,
  loading: false,
  error: null,

  login: async (mail: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: mail, password }) // Asegúrate de usar 'email' en lugar de 'mail' si tu API espera eso
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error); // Lanza un error si la respuesta no es OK
      }
  
      set({ currentUser: data.user, loading: false });
      return true; // Retorna true si el inicio de sesión fue exitoso
    } catch (error) {
      console.log('Error al iniciar sesión', error);
      set({ error: 'Error al iniciar sesión', loading: false });
      return false; // Retorna false si hay un error
    }
  },

  logout: async () => {
    set({ loading: true })
    try {
      await fetch('/api/auth/logout', {
        method: 'POST'
      })
      set({ currentUser: null, loading: false })
    } catch (error) {
      console.log('Error al cerrar sesión', error)
      set({ error: 'Error al cerrar sesión', loading: false })
    }
  },

  checkAuth: async () => {
    set({ loading: true })
    try {
      const response = await fetch('/api/auth/session')
      const data = await response.json()
      set({ currentUser: data.user, loading: false })
    } catch (error) {
      console.log('Error al verificar sesión', error)
      set({ error: 'Error al verificar sesión', loading: false })
    }
  },
  
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
      console.log('userData', userData);
      set({ loading: true });
      try {
          const response = await fetch('/api/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userData)
          });
  
          if (!response.ok) {
              throw new Error('Error al crear usuario'); // Manejo de error
          }
  
          const data = await response.json();
          set((state) => ({
              users: [...state.users, data.user],
              loading: false
          }));

          return true
      } catch (error) {
          console.log('Error al crear usuario', error);
          set({ error: 'Error al crear usuario', loading: false });
          return false
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