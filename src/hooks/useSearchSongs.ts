import {useQuery} from '@tanstack/react-query'

const fetchTJSongs = async (keyword: string) => {
  const res = await fetch(`/api/karaoke/song/${keyword}/tj.json`);
  return res.json();
}

export const useSearchSongs = (keyword: string) => {
  return useQuery({
    queryKey: ['songs', keyword],
    queryFn: () => fetchTJSongs(keyword),
    enabled: !!keyword,
    staleTime: 1000 * 60 * 5,
  })
}