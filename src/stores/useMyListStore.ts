import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Song {
  no: string;
  title: string;
  artist: string;
  brand: 'TJ';
}

interface MyListStore {
  selectedSongs: Song[];

  addSong: (song: Song) => void;
  removeSong: (no: string) => void;
  clearList: () => void;
}

export const useMyListStore = create(
  persist<MyListStore>(
    (set) => ({
      selectedSongs: [],

      addSong: (newSong) => set((state) => {
        const exists = state.selectedSongs.find((s) => s.no === newSong.no);
        if (exists) {
          alert("이미 담긴 노래입니다.");
          return state;
        }
        return {selectedSongs: [...state.selectedSongs, newSong]};
      }),
      removeSong: (no) => set((state) => ({
        selectedSongs: state.selectedSongs.filter((song) => song.no !== no)
      })),
      clearList: () => set({selectedSongs: []}),
    }),
    {
      name: "my-list-store",
    }
  )
)
