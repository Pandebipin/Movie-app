import Chip from "@mui/material/Chip";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Genres({
  genres,
  setGenres,
  type,
  setPage,
  selectedGenres,
  setSelectedGenres,
}) {
  // const [genres, setGenres] = useState([]);

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(
      genres.filter((g) => {
        return g.id !== genre.id;
      })
    );
    setPage(1);
  };
  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((g) => {
        return g.id !== genre.id;
      })
    );
    setGenres([...genres, genre]);
    setPage(1);
  };
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${
        import.meta.env.VITE_SOME_KEY
      }&language=en-US`
    );
    setGenres(data.genres);
    console.log(data);
  };

  useEffect(() => {
    fetchGenres();

    // eslint-disable-next-line
  }, []);
  return (
    <div
      style={{
        padding: "6px 0px",
        width: "700px",
        display: "flex",
        gap: "3px",
      }}
    >
      {selectedGenres &&
        selectedGenres.map((genre, ind) => (
          <Chip
            color="primary"
            size="small"
            key={ind}
            label={genre.name}
            component="a"
            onDelete={() => handleRemove(genre)}
          />
        ))}
      {genres &&
        genres.map((genre, ind) => (
          <Chip
            size="small"
            key={ind}
            label={genre.name}
            component="a"
            clickable
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
}

export default Genres;
