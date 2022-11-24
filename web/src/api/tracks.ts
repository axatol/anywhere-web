import { APIInstance, APIResponse, unwrap } from "./instance";

import { config } from "~/config";

export enum TrackStatus {
  Ready = "READY",
  Unknown = "UNKNOWN",
  Pending = "PENDING",
  Invalid = "INVALID",
}

export interface Track {
  id: string;
  mbid?: string;
  source_url?: string;
  name: string;
  duration?: number;
  data_key?: string;
  artist_ids?: string[];
  metadata?: Record<string, string>;
  track_status?: TrackStatus;
  accessed_at: number;
  created_at: number;
  updated_at: number;
}

export const listTracks = (api: APIInstance) => () =>
  api
    .get(`${config.api.endpoint}/api/tracks`)
    .json<APIResponse<Track[]>>()
    .then(unwrap);

export const createTrack = (api: APIInstance) => (input: Track) =>
  api
    .post(`${config.api.endpoint}/api/tracks`, { json: input })
    .json<APIResponse<Track>>()
    .then(unwrap);

export const readTrack = (api: APIInstance) => (id: string) =>
  api
    .get(`${config.api.endpoint}/api/tracks/${id}`)
    .json<APIResponse<Track[]>>()
    .then(unwrap);

export const updateTrack =
  (api: APIInstance) => (id: string, input: Partial<Track>) =>
    api
      .patch(`${config.api.endpoint}/api/tracks/${id}`, { json: input })
      .json<APIResponse<Track>>()
      .then(unwrap);

export const deleteTrack = (api: APIInstance) => (id: string) =>
  api
    .delete(`${config.api.endpoint}/api/tracks/${id}`)
    .json<APIResponse<null>>()
    .then(unwrap);
