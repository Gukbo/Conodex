export type Brand = 'TJ';

export interface Song {
  id?: string; // Firebase ID
  title: string; // 노래 제목
  artist: string; // 가수 이름
  no: string; // 노래방 번호
  brand: Brand; // 노래방 브랜드
  uid: string; // 작성자 UID
  createdAt: number; // 생성 시간
}