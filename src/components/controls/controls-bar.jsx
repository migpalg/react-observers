import { Box, IconButton, Typography } from "@mui/material";
import { PlayCircle, PauseCircle, StopCircle } from "@mui/icons-material";
import propTypes from "prop-types";
import { PlayerBarControl } from "./player-bar-control";

export function ControlsBar({
  isPaused,
  isPlaying,
  onPauseClick,
  onPlayClick,
  onPlayerBarChange,
  onPlayerBarChangeEnd,
  onStopClick,
  seconds,
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="body1">{seconds}</Typography>
      <PlayerBarControl
        onChange={onPlayerBarChange}
        onMouseUp={onPlayerBarChangeEnd}
        value={seconds}
        id="player-bar-control"
        maxValue={60}
        name="player-bar"
        sx={{ flex: 1, mx: 2 }}
      />
      <IconButton disabled={isPlaying} onClick={onPlayClick}>
        <PlayCircle />
      </IconButton>
      <IconButton disabled={isPaused} onClick={onPauseClick}>
        <PauseCircle />
      </IconButton>
      <IconButton disabled={!isPlaying && seconds <= 0} onClick={onStopClick}>
        <StopCircle />
      </IconButton>
    </Box>
  );
}

ControlsBar.propTypes = {
  isPaused: propTypes.bool,
  isPlaying: propTypes.bool,
  onPauseClick: propTypes.func,
  onPlayClick: propTypes.func,
  onPlayerBarChange: propTypes.func,
  onPlayerBarChangeEnd: propTypes.func,
  onStopClick: propTypes.func,
  seconds: propTypes.oneOfType([propTypes.number, propTypes.string]),
};

ControlsBar.defaultProps = {
  seconds: 0,
  onPlayerBarChange: () => {},
};
