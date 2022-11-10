import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { useAPI } from "~/components/APIProvider";
import { Artist, Track } from "~/utils/api";

export const App = withAuthenticationRequired(() => {
  const api = useAPI();
  const [artists, setArtists] = useState<Artist[] | null>(null);
  const [tracks, setTracks] = useState<Track[] | null>(null);

  useEffect(() => {
    api.artists.list().then(setArtists);
    api.tracks.list().then(setTracks);
  }, []);

  return <Typography>App</Typography>;
});
