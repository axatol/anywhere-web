import { listAlbums, readAlbum, updateAlbum } from "./albums";
import { listArtists, readArtist } from "./artists";
import { APIInstance } from "./instance";
import { searchTrackMetadata, searchTracks } from "./search";
import {
  createTrack,
  deleteTrack,
  listTracks,
  readTrack,
  updateTrack,
} from "./tracks";

export * from "./instance";

export type APIEndpoints = ReturnType<typeof createEndpoints>;
export const createEndpoints = (api: APIInstance) => ({
  tracks: {
    search: searchTracks(api),
    metadata: searchTrackMetadata(api),
    list: listTracks(api),
    create: createTrack(api),
    read: readTrack(api),
    update: updateTrack(api),
    delete: deleteTrack(api),
  },
  artists: {
    list: listArtists(api),
    read: readArtist(api),
  },
  albums: {
    list: listAlbums(api),
    read: readAlbum(api),
    update: updateAlbum(api),
  },
});
