import { User } from '@/types/types';
import { create } from 'zustand';

interface UserStore {
    currentUser: User | null; // Solo un usuario
    loading: boolean;
    error: string | null;
    getUserById: (id: string) => Promise<void>;
    createUser: (userData: Partial<User>) => Promise<boolean>;
    login: (mail: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    currentUser: null,
    loading: false,
    error: null,

    login: async (mail: string, password: string) => {
        console.log('mail', mail, 'password', password);
        set({ loading: true, error: null });
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: mail, password })
            });

            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data.user));
            console.log('data', data);
            if (!response.ok) {
                throw new Error(data.error);
            }

            set({ currentUser: data.user, loading: false });
            return true;
        } catch (error) {
            console.log('Error al iniciar sesión', error);
            set({ error: 'Error al iniciar sesión', loading: false });
            return false;
        }
    },

    logout: async () => {
        set({ loading: true });
        try {
            await fetch('/api/auth/logout', {
                method: 'POST'
            });
            set({ currentUser: null, loading: false });
        } catch (error) {
            console.log('Error al cerrar sesión', error);
            set({ error: 'Error al cerrar sesión', loading: false });
        }
    },

    checkAuth: async () => {
        set({ loading: true });
        try {
            const response = await fetch('/api/auth/session');
            const data = await response.json();
            set({ currentUser: data.user, loading: false });
        } catch (error) {
            console.log('Error al verificar sesión', error);
            set({ error: 'Error al verificar sesión', loading: false });
        }
    },

    getUserById: async (id: string) => {
        set({ loading: true });
        try {
            const response = await fetch(`/api/users/${id}`);
            const data = await response.json();
            set({ currentUser: data.user, loading: false });
        } catch (error) {
            console.log('Error al obtener usuario', error);
            set({ error: 'Error al obtener usuario', loading: false });
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
                throw new Error('Error al crear usuario');
            }

            const data = await response.json();
            // Aquí no necesitas agregar a un array, solo establece el usuario actual
            set({ currentUser: data.user, loading: false });

            return true; // Retorna true si la creación fue exitosa
        } catch (error) {
            console.log('Error al crear usuario', error);
            set({ error: 'Error al crear usuario', loading: false });
            return false; // Retorna false si hay un error
        }
    },
}));