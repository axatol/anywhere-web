import { createContext, PropsWithChildren, useContext } from "react";
import { useAsyncFn } from "react-use";
import { FunctionReturningPromise } from "react-use/lib/misc/types";
import { AsyncFnReturn } from "react-use/lib/useAsyncFn";
import { APIEndpoints } from "~/utils/api";
import { useAPI } from "./APIProvider";

type AsyncState<T extends FunctionReturningPromise> = AsyncFnReturn<T>[0];

interface DataContextValue {
  artists: AsyncState<APIEndpoints["artists"]["list"]>;
  listArtists: APIEndpoints["artists"]["list"];

  tracks: AsyncState<APIEndpoints["tracks"]["list"]>;
  listTracks: APIEndpoints["tracks"]["list"];
}

const context = createContext<DataContextValue | undefined>(undefined);

export const useData = () => {
  const value = useContext(context);
  if (!value) {
    throw new Error("Data context consumer must have a matching provider");
  }

  return value;
};

export const DataProvider = (props: PropsWithChildren<{}>) => {
  const api = useAPI();
  const [artists, listArtists] = useAsyncFn(api.artists.list);
  const [tracks, listTracks] = useAsyncFn(api.tracks.list);

  const value = { artists, listArtists, tracks, listTracks };

  return <context.Provider value={value}>{props.children}</context.Provider>;
};
