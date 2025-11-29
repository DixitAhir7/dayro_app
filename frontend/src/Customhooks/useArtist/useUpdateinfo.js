import { create } from "zustand";

const useUpdateinfo = create((set) => ({
  datatoSend: {},
  setData: (data) => set({ datatoSend: data })
}));

export default useUpdateinfo;