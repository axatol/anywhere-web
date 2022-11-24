import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useAsyncFn } from "react-use";
import { FunctionReturningPromise } from "react-use/lib/misc/types";
import { AsyncFnReturn } from "react-use/lib/useAsyncFn";

import { useAPI } from "./APIProvider";

import { APIEndpoints } from "~/api";
import { FullPageError } from "~/components/FullPageError";

type AsyncState<T extends FunctionReturningPromise> = AsyncFnReturn<T>[0];

interface DataContextValue {
  artists: AsyncState<APIEndpoints["artists"]["list"]>;
  listArtists: APIEndpoints["artists"]["list"];

  tracks: AsyncState<APIEndpoints["tracks"]["list"]>;
  listTracks: APIEndpoints["tracks"]["list"];

  albums: AsyncState<APIEndpoints["albums"]["list"]>;
  listAlbums: APIEndpoints["albums"]["list"];
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
  const [albums, listAlbums] = useAsyncFn(api.albums.list);

  useEffect(() => {
    listArtists();
    listTracks();
    listAlbums();
  }, []);

  const value = {
    artists,
    listArtists,
    tracks,
    listTracks,
    albums,
    listAlbums,
  };

  const error = artists.error ?? tracks.error;

  return (
    <context.Provider value={value}>
      {error ? (
        <FullPageError title={error.message}>
          <pre>{error.stack}</pre>
        </FullPageError>
      ) : (
        props.children
      )}
    </context.Provider>
  );
};
