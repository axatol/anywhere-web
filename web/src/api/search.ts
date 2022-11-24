import { APIInstance, APIResponse, unwrap } from "./instance";

import { config } from "~/config";

interface Tag {
  name: string;
  count: number;
}

interface ArtistCredit {
  artist: {
    "id": string;
    "name": string;
    "sort-name": string;
  };
}

interface ReleaseGroup {
  "id": string;
  "primary-type": string;
}

interface Track {
  id: string;
  number: string;
  title: string;
  length: number;
}

interface Media {
  "position": number;
  "format": string;
  "track": Track[];
  "track-count": number;
  "track-offset": number;
}

interface Release {
  "id": string;
  "title": string;
  "status-id": string;
  "status": string;
  "release-group": ReleaseGroup;
  "date": string;
  "country": string;
  "track-count": number;
  "media": Media[];
  "artist-credit": ArtistCredit[];
}

export interface MusicbrainzReleaseSearch {
  "id": string;
  "score": number;
  "title": string;
  "length": number;
  "artist-credit": ArtistCredit[];
  "releases": Release[];
  "tags": Tag[] | null;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YoutubeSearch {
  video_id: string;
  video_title: string;
  channel_id: string;
  channel_title: string;
  description: string;
  thumbnail: Thumbnail;
  published_at: string;
}

export const searchTracks = (api: APIInstance) => (query: string) =>
  api
    .get(`${config.api.endpoint}/api/tracks/search`, {
      searchParams: { query },
    })
    .json<APIResponse<YoutubeSearch[]>>()
    .then(unwrap);

export const searchTrackMetadata = (api: APIInstance) => (query: string) =>
  api
    .get(`${config.api.endpoint}/api/tracks/metadata`, {
      searchParams: { query },
    })
    .json<APIResponse<MusicbrainzReleaseSearch[]>>()
    .then(unwrap);
