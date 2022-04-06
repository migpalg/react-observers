import { Box } from "@mui/material";
import propTypes from "prop-types";

export function ProgressVisualizer({ percent }) {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "grey.400",
        position: "relative",
        minHeight: "12em",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          insetBlock: 0,
          left: 0,
          right: `${(1 - percent) * 100}%`,
          transition: "all 150ms ease-in-out",
          backgroundColor: "grey.600",
        }}
      />
    </Box>
  );
}

ProgressVisualizer.propTypes = {
  percent: propTypes.number,
};

ProgressVisualizer.defaultProps = {
  percent: 0,
};
