import { create } from 'zustand';

export type UserStatus = 'Active' | 'Inactive';

export interface User {
    id: string;
    name: string;
    email: string;
    status: UserStatus;
}

interface UserState {
    users: User[];
    isLoading: boolean;
    error: string | null;
    fetchUsers: () => Promise<void>;
    addUser: (user: Omit<User, 'id'>) => Promise<void>;
    updateUser: (id: string, user: Partial<Omit<User, 'id'>>) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    setUsers: (users: User[]) => void; // For optimistic updates or manual setting
}

export const useUserStore = create<UserState>((set, get) => ({
    users: [],
    isLoading: false,
    error: null,

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch('/api/users');
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            set({ users: data });
        } catch (error) {
            set({ error: (error as Error).message });
        } finally {
            set({ isLoading: false });
        }
    },

    addUser: async (newUser) => {
        // Optimistic update
        const tempId = Math.random().toString(36).substr(2, 9);
        const userWithId = { ...newUser, id: tempId };
        set((state) => ({ users: [...state.users, userWithId] }));

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });
            if (!response.ok) throw new Error('Failed to add user');
            const savedUser = await response.json();

            // Replace temp user with real one
            set((state) => ({
                users: state.users.map((u) => (u.id === tempId ? savedUser : u)),
            }));
        } catch (error) {
            // Revert on failure
            set((state) => ({
                users: state.users.filter((u) => u.id !== tempId),
                error: (error as Error).message,
            }));
        }
    },

    updateUser: async (id, updatedFields) => {
        // Optimistic update
        const oldUsers = get().users;
        set((state) => ({
            users: state.users.map((u) => (u.id === id ? { ...u, ...updatedFields } : u)),
        }));

        try {
            const response = await fetch('/api/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ...updatedFields }),
            });
            if (!response.ok) throw new Error('Failed to update user');
            const savedUser = await response.json();

            // Ensure sync
            set((state) => ({
                users: state.users.map((u) => (u.id === id ? savedUser : u)),
            }));
        } catch (error) {
            // Revert
            set({ users: oldUsers, error: (error as Error).message });
        }
    },

    deleteUser: async (id) => {
        // Optimistic update
        const oldUsers = get().users;
        set((state) => ({
            users: state.users.filter((u) => u.id !== id),
        }));

        try {
            const response = await fetch(`/api/users?id=${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete user');
        } catch (error) {
            // Revert
            set({ users: oldUsers, error: (error as Error).message });
        }
    },

    setUsers: (users) => set({ users }),
}));
