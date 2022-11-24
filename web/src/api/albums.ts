import { APIInstance, APIResponse, unwrap } from "./instance";

import { config } from "~/config";

export interface Album {
  id: string;
  mbid?: string;
  name: string;
  cover_art?: string;
  artist_ids?: string[];
  track_ids?: string[];
  metadata?: Record<string, string>;
  created_at: number;
  updated_at: number;
}

export const listAlbums = (api: APIInstance) => () =>
  api
    .get(`${config.api.endpoint}/api/artists`)
    .json<APIResponse<Album[]>>()
    .then(unwrap);

export const readAlbum = (api: APIInstance) => (id: string) =>
  api
    .get(`${config.api.endpoint}/api/artists/${id}`)
    .json<APIResponse<Album>>()
    .then(unwrap);

export const updateAlbum =
  (api: APIInstance) => (id: string, input: Partial<Album>) =>
    api
      .patch(`${config.api.endpoint}/api/artists/${id}`, { json: input })
      .json<APIResponse<Album>>()
      .then(unwrap);
