import ky from "ky";
import { config } from "~/config";

export type APIInstance = ReturnType<typeof ky.create>;

export type APIResponse<T = any> = { message: string; data: T };

export const createAPI = (token: () => Promise<string>) =>
  ky.create({
    hooks: {
      beforeRequest: [
        async (req) => {
          req.headers.set("Authorization", `Bearer ${await token()}`);
          req.headers.set("X-Timestamp", `${Date.now()}`);
          return req;
        },
      ],
      afterResponse: [
        async (req, _, res) => {
          if (config.debug) {
            console.log({
              method: req.method,
              path: req.url,
              status: res.status,
              body: await res.json(),
            });
          }
        },
      ],
    },
  });

const unwrap = async <T>(response: APIResponse<T>) => response.data;

export enum TrackStatus {
  Ready = "READY",
  Unknown = "UNKNOWN",
  Pending = "PENDING",
  Invalid = "INVALID",
}

export interface Track {
  id: string;
  source_url: string;
  title: string;
  duration?: number;
  data_key?: string;
  artist_ids?: string[];
  track_status: TrackStatus;
  accessed_at: number;
  created_at: number;
  updated_at: number;
}

export type TrackCreate = Pick<Track, "source_url" | "title">;

export type TrackUpdate = Pick<
  Track,
  "duration" | "data_key" | "artist_ids" | "track_status"
>;

export interface Artist {
  id: string;
  name: string;
  created_at: number;
  updated_at: number;
}

export type ArtistUpdate = Pick<Artist, "name">;

export type ArtistCreate = Pick<Artist, "name">;

const listTracks = (api: APIInstance) => () =>
  api
    .get(`${config.api.endpoint}/api/tracks`)
    .json<APIResponse<Track[]>>()
    .then(unwrap);

const createTrack = (api: APIInstance) => (input: TrackCreate) =>
  api
    .post(`${config.api.endpoint}/api/tracks`, { json: input })
    .json<APIResponse<Track>>()
    .then(unwrap);

const readTrack = (api: APIInstance) => (id: string) =>
  api
    .get(`${config.api.endpoint}/api/tracks/${id}`)
    .json<APIResponse<Track[]>>()
    .then(unwrap);

const updateTrack = (api: APIInstance) => (id: string, input: TrackUpdate) =>
  api
    .patch(`${config.api.endpoint}/api/tracks/${id}`, { json: input })
    .json<APIResponse<Track>>()
    .then(unwrap);

const deleteTrack = (api: APIInstance) => (id: string) =>
  api
    .delete(`${config.api.endpoint}/api/tracks/${id}`)
    .json<APIResponse<null>>()
    .then(unwrap);

const listArtists = (api: APIInstance) => () =>
  api
    .get(`${config.api.endpoint}/api/artists`)
    .json<APIResponse<Artist[]>>()
    .then(unwrap);

const createArtist = (api: APIInstance) => (input: ArtistCreate) =>
  api
    .post(`${config.api.endpoint}/api/artists`, { json: input })
    .json<APIResponse<Artist>>()
    .then(unwrap);

const readArtist = (api: APIInstance) => (id: string) =>
  api
    .get(`${config.api.endpoint}/api/artists/${id}`)
    .json<APIResponse<Artist>>()
    .then(unwrap);

const updateArtist = (api: APIInstance) => (id: string, input: ArtistUpdate) =>
  api
    .patch(`${config.api.endpoint}/api/artists/${id}`, { json: input })
    .json<APIResponse<Artist>>()
    .then(unwrap);

const deleteArtist = (api: APIInstance) => (id: string) =>
  api
    .delete(`${config.api.endpoint}/api/artists/${id}`)
    .json<APIResponse<null>>()
    .then(unwrap);

export type APIEndpoints = ReturnType<typeof createEndpoints>;
export const createEndpoints = (api: APIInstance) => ({
  tracks: {
    list: listTracks(api),
    create: createTrack(api),
    read: readTrack(api),
    update: updateTrack(api),
    delete: deleteTrack(api),
  },
  artists: {
    list: listArtists(api),
    create: createArtist(api),
    read: readArtist(api),
    update: updateArtist(api),
    delete: deleteArtist(api),
  },
});
