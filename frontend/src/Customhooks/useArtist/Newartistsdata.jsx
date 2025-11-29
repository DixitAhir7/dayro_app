import { create } from "zustand";
import ArtistData from "components/artistcomponents/ArtistData";

const useNewartist = create((set) => ({
    globalartistdata: ArtistData,
    newArtistdata: {},
    setartistData: (data) => set({ newArtistdata: data }),
}));

export default useNewartist;