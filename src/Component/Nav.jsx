import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import { useNavigate } from "react-router-dom";
function Nav() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  return (
    <div className="bg-gray-600">
      <Box sx={{ width: 500 }}>
        <BottomNavigation
          value={value}
          showLabels
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          className="w-full bg-[#2d313a] -z-50 fixed bottom-0"
        >
          <BottomNavigationAction
            onClick={() => navigate("/")}
            label="trending"
            icon={<WhatshotIcon />}
          />
          <BottomNavigationAction
            onClick={() => navigate("/movie")}
            label="movie"
            icon={<SlideshowIcon />}
          />
          <BottomNavigationAction
            onClick={() => navigate("/series")}
            label="tv"
            icon={<SavedSearchIcon />}
          />
          <BottomNavigationAction
            onClick={() => navigate("/search")}
            label="search"
            icon={<LiveTvIcon />}
          />
        </BottomNavigation>
      </Box>
    </div>
  );
}

export default Nav;
