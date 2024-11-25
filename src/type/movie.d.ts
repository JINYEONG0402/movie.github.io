// TMDB API에서 반환하는 영화 데이터 구조를 정의
export interface Movie {
  id: number; // 영화 ID
  title: string; // 영화 제목
  poster_path: string; // 포스터 경로
  release_date: string; // 개봉일
  vote_average: number; // 평점
  overview: string; // 줄거리
}
