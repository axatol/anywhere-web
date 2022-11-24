import { APIInstance, APIResponse, unwrap } from "./instance";

import { config } from "~/config";

export interface Artist {
  id: string;
  mbid?: string;
  name: string;
  metadata?: Record<string, string>;
  created_at: number;
  updated_at: number;
}

export type ArtistUpdate = Pick<Artist, "name" | "metadata">;

export type ArtistCreate = Pick<Artist, "name" | "metadata">;

export const listArtists = (api: APIInstance) => () =>
  api
    .get(`${config.api.endpoint}/api/artists`)
    .json<APIResponse<Artist[]>>()
    .then(unwrap);

export const readArtist = (api: APIInstance) => (id: string) =>
  api
    .get(`${config.api.endpoint}/api/artists/${id}`)
    .json<APIResponse<Artist>>()
    .then(unwrap);
