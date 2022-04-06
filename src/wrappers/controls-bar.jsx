import { useCallback } from "react";
import { ControlsBar as Presenter } from "../components/controls/controls-bar";
import { usePlayer } from "../contexts/player-context";
import { useObservedValue } from "../hooks/use-observed-value";

export function ControlsBar() {
  const player = usePlayer();
  const timer = useObservedValue(player.timer$);
  const isPlaying = useObservedValue(player.isPlaying$);
  const isPaused = useObservedValue(player.isPaused$);

  const handlePlayerBarChange = useCallback((event) => {
    const value = event?.target?.value;
    player.setTime(parseInt(value || 0, 10));
  }, []);

  const handlePlayerBarRelease = useCallback(() => {
    player.play();
  }, []);

  const handlePlayButtonClick = useCallback(() => {
    player.play();
  }, []);

  const handlePauseButtonClick = useCallback(() => {
    player.pause();
  }, []);

  const handleStopButtonClick = useCallback(() => {
    player.stop();
  }, []);

  return (
    <Presenter
      isPaused={isPaused}
      isPlaying={isPlaying}
      onPauseClick={handlePauseButtonClick}
      onPlayClick={handlePlayButtonClick}
      onPlayerBarChange={handlePlayerBarChange}
      onPlayerBarChangeEnd={handlePlayerBarRelease}
      onStopClick={handleStopButtonClick}
      seconds={timer}
    />
  );
}
