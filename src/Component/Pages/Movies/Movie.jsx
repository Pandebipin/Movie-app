import React, { useState, useEffect } from "react";
import SingleContent from "../../Singlecontent/SingleContent";
import axios from "axios";
import { Chip, Pagination, Stack, Typography } from "@mui/material";
import Genres from "../../Genres/Genres";
import Usegenres from "../../Hooks/Usegenres";

function Movie() {
  const [content, setcontent] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [NumOfPages, setNumOfPages] = useState();
  const GenreUrl = Usegenres(selectedGenres);
  console.log(GenreUrl);
  const handlePageChange = (page) => {
    setPage(page);

    console.log(page);
  };
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_SOME_KEY
      }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${GenreUrl}`
    );
    setcontent(data.results);
    setNumOfPages(data.total_pages);
    console.log(data);
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
  }, [page, GenreUrl]);
  return (
    <div>
      <span className="pageTitle">Movies Today</span>
      <div className="flex gap-2 text-white">
        <Genres
          type="movie"
          selectedGenres={selectedGenres}
          genres={genres}
          setGenres={setGenres}
          setSelectedGenres={setSelectedGenres}
          setPage={setPage}
        />
      </div>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <div className="pagination flex justify-center">
        <Stack spacing={2}>
          <Typography>Page: {page}</Typography>
          <Pagination
            className="pagination-num"
            count={NumOfPages}
            page={page}
            onChange={(e) => handlePageChange(e.target.textContent)}
          />
        </Stack>
      </div>
    </div>
  );
}

export default Movie;
