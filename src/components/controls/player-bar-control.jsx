import { Slider } from "@mui/material";
import propTypes from "prop-types";

export function PlayerBarControl({
  name,
  id,
  maxValue,
  value,
  onChange,
  onMouseUp,
  sx,
}) {
  return (
    <Slider
      aria-label="Player bar"
      id={id}
      max={parseInt(maxValue, 10)}
      name={name}
      onChange={onChange}
      onMouseUp={onMouseUp}
      sx={sx}
      value={parseInt(value || 0, 10)}
    />
  );
}

PlayerBarControl.propTypes = {
  name: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  maxValue: propTypes.oneOfType([propTypes.string, propTypes.number]),
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func.isRequired,
  onMouseUp: propTypes.func,
  sx: propTypes.any,
};

PlayerBarControl.defaultProps = {
  value: "",
};
