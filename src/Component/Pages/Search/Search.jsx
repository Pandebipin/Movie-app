import {
  Button,
  Pagination,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SingleContent from "../../Singlecontent/SingleContent";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Search() {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [NumOfPages, setNumOfPages] = useState();
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });
  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          import.meta.env.VITE_SOME_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      console.log(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page, searchText]);
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div
          className="search"
          style={{ display: "flex", gap: "2px", margin: "10px 14px" }}
        >
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="contained" style={{ marginLeft: 10 }}>
            search
          </Button>
        </div>
        <Tabs
          value={type}
          textColor="primary"
          indicatorColor="primary"
          onChange={(e, newvalue) => {
            setType(newvalue);
            setPage(1);
          }}
        >
          <Tab style={{ width: "50%" }} label="show movies" />
          <Tab style={{ width: "50%" }} label="show Tv series" />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {NumOfPages > 1 && (
        <Stack
          spacing={2}
          style={{ padding: "2px", display: "flex", justifyContent: "center" }}
        >
          <Typography>Page: {page}</Typography>
          <Pagination
            className="pagination-num"
            onChange={(e) => handlePageChange(e.target.textContent)}
            count={NumOfPages}
            color="primary"
            hideNextButton
            hidePrevButton
          />
        </Stack>
      )}
    </div>
  );
}
