import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleContent from "../../Singlecontent/SingleContent";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Trending.css";
function Trending() {
  const [content, setcontent] = useState([]);
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
  };
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${
        import.meta.env.VITE_SOME_KEY
      }&page=${page}`
    );
    setcontent(data.results);
    console.log(data);
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);
  return (
    <div>
      <span className="pageTitle">Trending Today</span>
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
      <div className="pagination">
        <Stack spacing={2}>
          <Typography>Page: {page}</Typography>
          <Pagination
            className="pagination-num"
            count={6}
            page={page}
            onChange={(e) => handlePageChange(e.target.textContent)}
          />
        </Stack>
      </div>
    </div>
  );
}

export default Trending;
