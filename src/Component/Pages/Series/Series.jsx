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
  const GenreUrl = Usegenres(selectedGenres);
  const [numOfPages, setNumOfPages] = useState();
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  console.log(GenreUrl);
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${
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
      <span className="pageTitle">Discover Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <Stack
          spacing={2}
          style={{ padding: "2px", display: "flex", justifyContent: "center" }}
        >
          <Typography>Page: {page}</Typography>
          <Pagination
            className="pagination-num"
            onChange={(e) => handlePageChange(e.target.textContent)}
            count={numOfPages}
            color="primary"
            hideNextButton
            hidePrevButton
          />
        </Stack>
      )}
    </div>
  );
}

export default Movie;
