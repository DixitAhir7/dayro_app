import { create } from 'zustand';

export const useAuth = create((set) => ({
    authdata: {},
    setUserauth: (data) => set({ authdata: data })
}));

//  this will handle all authentication
//  all the componets that i want to give acess to auth