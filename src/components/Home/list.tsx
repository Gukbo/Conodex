import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  addSong,
  listenSongs,
  deleteSong,
  type Song,
} from "../../services/songsService";

export default function List() {
  const { user } = useAuth();
  const [songs, setSongs] = useState<Song[]>([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [songNumber, setSongNumber] = useState<number | "">("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = listenSongs(user.uid, setSongs);
    return () => unsubscribe();
  }, [user]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    if (!songNumber) return alert("노래방 번호는 필수입니다.");

    try {
      setPending(true);
      await addSong(user.uid, { title, artist, songNumber });
      setTitle("");
      setArtist("");
      setSongNumber("");
    } catch (e: any) {
      alert("리스트 추가 실패 : " + e.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-2 rounded-xl bg-blue-600 px-4 py-2 font-medium hover:bg-blue-700 disabled:opacity-60"
      >
        <div className="flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="곡명 (선택)"
            className="flex-1 rounded border border-gray-700 bg-gray-800 px-3 py-2"
          />
          <input
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="가수 (선택)"
            className="flex-1 rounded border border-gray-700 bg-gray-800 px-3 py-2"
          />
          <input
            value={songNumber}
            onChange={(e) => {
              const value = e.target.value;
              setSongNumber(value === "" ? "" : Number(value));
            }}
            placeholder="노래방 번호 (필수)"
            required
            className="w-48 rounded border border-gray-700 bg-gray-800 px-3 py-2"
          />
          <button
            className="rounded bg-blue-600 px-4 py-2 font-medium hover:bg-blue-700 disabled:opacity-60"
            disabled={pending}
          >
            {pending ? "추가 중..." : "추가"}
          </button>
        </div>
      </form>

      {songs.length === 0 ? (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 text-center text-gray-300">
          아직 저장한 노래가 없어요. 위 입력칸에 추가해보세요 🎶
        </div>
      ) : (
        <ul className="space-y-2">
          {songs.map((s) => (
            <li
              key={s.id}
              className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900 px-4 py-3"
            >
              <div className="min-w-0">
                <div className="truncate font-semibold">
                  {s.title || "(제목 없음)"} — {s.artist || "(가수 없음)"}
                </div>
                <div className="text-sm text-gray-400">
                  번호: {s.songNumber}
                </div>
              </div>
              <button
                className="text-red-400 hover:text-red-300"
                onClick={() => user && deleteSong(user.uid, s.id)}
                title="삭제"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
