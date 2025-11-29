import { create } from 'zustand';

// bookedartist form by user information
const useInfo = create((set) => ({
    bookingInfoobj: {},
    setBookingFormInfo: (data) => set({ bookingInfoobj: data }),
}));

export default useInfo;