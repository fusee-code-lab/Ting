import { Playlist, PlaylistUpdateOpt } from "@/types/playlist";
import { preload } from "@youliso/electronic/render";

export const playlistList = () => preload.invoke<Playlist[] | undefined>("playlist-list");

export const playlistInsert = (value: Playlist) => preload.invoke("playlist-insert", [value]);

export const playlistUpdate = (data: PlaylistUpdateOpt, key?: string) => {
  return preload.invoke("playlist-update", { data, key })
};

export const playlistDelete = (key: string) => preload.invoke("playlist-delete", key);  