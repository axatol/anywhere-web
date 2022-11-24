import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useList } from "react-use";

import { Track } from "~/api/tracks";

interface PlayerContextValue {
  playing: boolean;
  position: number | undefined;
  progress: number | undefined;
  queue: Track[];
  togglePlaying(): void;
  jump(amount: number): void;
  next(): void;
  previous(): void;
  enqueue(track: Track): void;
  removeAt(index: number): void;
}

const context = createContext<PlayerContextValue | undefined>(undefined);

export const usePlayer = () => {
  const value = useContext(context);
  if (!value) {
    throw new Error(`API context consumer must have a matching provider`);
  }

  return value;
};

export const PlayerProvider = (props: PropsWithChildren<{}>) => {
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState<number | undefined>(undefined);
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [queue, actions] = useList<Track>();

  // TODO shortcuts
  // useEvent("k", () => setPlaying((state) => !state));
  // useEvent(",", () => previous);
  // useEvent(".", () => next);

  const togglePlaying = () => {
    setPlaying((current) => !current);
  };

  const jump = (amount: number) => {
    setProgress((current) => {
      if (current === undefined) {
        return current;
      }

      // todo clamp
      return current + amount;
    });
  };

  const next = () => {
    setPosition((current) => {
      if (current === undefined) {
        return current;
      }

      return Math.min(queue.length - 1, current + 1);
    });
    // TODO stop if already at end of queue?
  };

  const previous = () => {
    setPosition((current) => {
      if (current === undefined) {
        return current;
      }

      return Math.max(0, current - 1);
    });
    // TODO stop if already at beginning of queue?
  };

  const enqueue = (track: Track) => {
    actions.push(track);
    // TODO if not playing, begin playing?
  };

  const removeAt = (index: number) => {
    actions.removeAt(index);
    // TODO skip if it was currently playing?
  };

  const value = {
    playing,
    position,
    progress,
    queue,
    togglePlaying,
    jump,
    next,
    previous,
    enqueue,
    removeAt,
  };

  return <context.Provider value={value}>{props.children}</context.Provider>;
};
