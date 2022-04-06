import { map } from "rxjs";
import { ProgressVisualizer as Presenter } from "../components/progress-visualizer";
import { useObservedValue } from "../hooks/use-observed-value";
import { usePlayer } from "../contexts/player-context";

export function ProgressVisualizer() {
  const player = usePlayer();
  const currentPercent = useObservedValue(
    player.timer$.pipe(map((value) => value / player.maxDuration)),
  );

  return <Presenter percent={currentPercent} />;
}
