import { useState } from "react";
import { useSearchSongs } from "./hooks/useSearchSongs";
import { useMyListStore } from "./stores/useMyListStore"; // 👈 1. 임포트 추가!
import { Toaster } from "react-hot-toast";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: songs } = useSearchSongs(debouncedKeyword);
  const { addSong, removeSong, selectedSongs } = useMyListStore();

  const handleAddClick = (song: any) => {
    addSong({
      no: song.no,
      title: song.title,
      artist: song.singer,
      brand: "TJ",
    });
  };

  return (
    <div style={{ paddingBottom: "80px" }}>
      {" "}
      <div style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
        <h1
          style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Conodex 🎤
        </h1>
        <input
          type="text"
          placeholder="노래 제목을 입력하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        />
      </div>
      <div style={{ padding: "0 20px" }}>
        {songs?.map((song: any) => (
          <div
            key={song.no}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "15px 0",
              borderBottom: "1px solid #f0f0f0",
              paddingBottom: "10px",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                {song.title}
              </div>
              <div style={{ color: "#666", fontSize: "14px" }}>
                {song.singer} <span style={{ color: "#aaa" }}>({song.no})</span>
              </div>
            </div>

            <button
              onClick={() => handleAddClick(song)}
              style={{
                backgroundColor: "#e6f0ff",
                color: "#0066ff",
                border: "none",
                padding: "8px 15px",
                borderRadius: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              + 담기
            </button>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,

          maxWidth: "430px",
          margin: "0 auto",

          backgroundColor: "#222",
          color: "white",
          padding: "15px 20px",

          paddingBottom: "calc(15px + env(safe-area-inset-bottom))",

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
          zIndex: 100,
        }}
      >
        <span>
          현재 담은 곡:{" "}
          <strong style={{ color: "#ffcc00" }}>{selectedSongs.length}</strong>개
        </span>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            backgroundColor: "white",
            color: "black",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          내 리스트 보기
        </button>
      </div>
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              width: "100%",
              maxWidth: "500px",
              height: "80vh",
              borderRadius: "20px 20px 0 0",
              padding: "20px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
                내 애창곡 리스트 🎶
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            {selectedSongs.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#999",
                  marginTop: "50px",
                }}
              >
                아직 담은 노래가 없어요! 🥲
              </div>
            ) : (
              <div style={{ flex: 1 }}>
                {selectedSongs.map((song) => (
                  <div
                    key={song.no}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "15px 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "bold" }}>{song.title}</div>
                      <div style={{ fontSize: "13px", color: "#666" }}>
                        {song.artist} ({song.no})
                      </div>
                    </div>
                    <button
                      onClick={() => removeSong(song.no)}
                      style={{
                        backgroundColor: "#ff4444",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        fontSize: "12px",
                      }}
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: { background: "#333", color: "#fff" },
        }}
      />
    </div>
  );
}

export default App;
