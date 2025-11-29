import { create } from 'zustand';

// save user to state to show in account
export const useUser = create((set) => ({
    userData: [],
    setUserData: (data) => set({ userData: data })
}));

//  this will handle all authentication
//  all the componets that i want to give acess to auth