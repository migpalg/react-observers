import propTypes from "prop-types";
import { createContext, useMemo, useContext, useLayoutEffect } from "react";
import { PlayerController } from "../controllers/player-controller";

/**
 * This context should provide a single instance of the player controller in the
 * application
 */
export const PlayerContext = createContext(null);

/**
 * Gets the current instance in the context, can be null
 * @returns {PlayerController}
 */
export function usePlayer() {
  const playerController = useContext(PlayerContext);

  // If the context is null, the provider is not setted.
  if (!playerController || !(playerController instanceof PlayerController))
    throw new Error(
      "<PlayerProvider /> should be included to use this context",
    );

  return playerController;
}

/**
 * Provides controller to the children of this context
 */
export function PlayerProvider({ children }) {
  // This memo allows to have only one instance on the whole application
  const controller = useMemo(() => new PlayerController(), []);

  // By default, the player starts when the component renders
  useLayoutEffect(() => {
    controller.play();

    return () => {
      // If the provider is unmounted, all the timers will be cleared with this
      // function
      controller.stop();
    };
  }, []);

  return (
    <PlayerContext.Provider value={controller}>
      {children}
    </PlayerContext.Provider>
  );
}

PlayerProvider.propTypes = {
  children: propTypes.node,
};
