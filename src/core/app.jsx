import { Box, Button, Container, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { PlayerProvider } from "../contexts/player-context";
import { ControlsBar } from "../wrappers/controls-bar";
import { ProgressVisualizer } from "../wrappers/progress-visualizer";
import { ErrorBoundary } from "./error-boundary";

/**
 * Root component of the application
 */
export function App() {
  const [showPlayer, setShowPlayer] = useState(true);

  const toggleShowPlayer = useCallback(
    () => setShowPlayer((current) => !current),
    [],
  );

  return (
    <ErrorBoundary>
      <PlayerProvider>
        <Container maxWidth="sm">
          <Box textAlign="center" my={4}>
            <Typography variant="h4">Observable Test</Typography>
            <Typography variant="body1" my={1}>
              Created a custom Subject with rxjs to prevent unnecesary renders
            </Typography>
            <Button onClick={toggleShowPlayer} variant="contained">
              {showPlayer ? "Hide" : "Show"} Player
            </Button>
          </Box>
          {showPlayer && (
            <>
              <ProgressVisualizer />
              <ControlsBar />
            </>
          )}
        </Container>
      </PlayerProvider>
    </ErrorBoundary>
  );
}
