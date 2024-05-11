import * as React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import "./ContentModal.css";

import {
  img_300,
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";

const style = {
  position: "absolute",
  width: "80%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#39445a",
  border: "1px solid #282c34",
  boxShadow: 24,
  p: 4,
};

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = React.useState();
  const [video, setVideo] = React.useState();

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${
        import.meta.env.VITE_SOME_KEY
      }&language=en-US`
    );

    setContent(data);
    console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${
        import.meta.env.VITE_SOME_KEY
      }&language=en-US`
    );

    setVideo(data.results[0]?.key);
    console.log(data);
  };
  React.useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);
  return (
    <>
      <div className="media" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        style={{ height: "100vh" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ height: "80%" }}>
          {content && (
            <div>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_300}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="section-text">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {content.name || content.title} (
                    {content.first_air_date || content.release_date || "-----"})
                  </Typography>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}
                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div
                    style={{
                      marginTop: "10px",
                      width: "50%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button className="button">
                      <a href={`https://www.youtube.com/watch?v=${video}`}>
                        Watch the Trailer
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
}
