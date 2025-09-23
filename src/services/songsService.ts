import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export type SongInput = {
  title?: string;
  artist?: string;
  songNumber: number;
};

export type Song = {
  id: string;
  title: string;
  artist: string;
  songNumber: number;
  createdAt?: any;
};

export async function addSong(uid: string, input: SongInput) {
  const title = input.title?.trim();
  const artist = input.artist?.trim();
  const songNumber = input.songNumber;
  if (!songNumber) throw new Error("노래방 번호는 필수입니다.");

  await addDoc(collection(db, "users", uid, "songs"), {
    title,
    artist,
    songNumber,
    createdAt: serverTimestamp(),
  });
}

export function listenSongs(uid: string, cb: (songs: Song[]) => void) {
  const q = query(
    collection(db, "users", uid, "songs"),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    const list: Song[] = snap.docs.map((d) => ({
      id: d.id,
      title: (d.data().title ?? "") as string,
      artist: (d.data().artist ?? "") as string,
      songNumber: d.data().songNumber as number,
      createdAt: d.data().createdAt,
    }));
    cb(list);
  });
}

export async function updateSong(
  uid: string,
  songId: string,
  patch: Partial<SongInput>
) {
  const ref = doc(db, "users", uid, "songs", songId);
  const data: any = {};
  if (typeof patch.title !== "undefined") data.title = patch.title.trim();
  if (typeof patch.artist !== "undefined") data.artist = patch.artist.trim();
  if (typeof patch.songNumber !== "undefined") {
    const v = patch.songNumber;
    if (!v) throw new Error("노래방 번호는 필수입니다.");
    data.songNumber = v;
  }
  await updateDoc(ref, data);
}

export async function deleteSong(uid: string, songId: string) {
  await deleteDoc(doc(db, "users", uid, "songs", songId));
}
