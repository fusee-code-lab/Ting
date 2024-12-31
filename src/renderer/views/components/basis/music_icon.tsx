import netease_music_icon from '@/assets/icons/netease_music.png';
import netease_music_icon2x from '@/assets/icons/netease_music@2x.png';
import qq_music_icon from '@/assets/icons/qq_music.png';
import qq_music_icon2x from '@/assets/icons/qq_music@2x.png';
import { MusicType } from '@/types/music';
import { css, cx } from '@emotion/css';
import { Match, Switch } from 'solid-js';

const style = css`
  object-fit: contain;
`;
export const MusicIcon = (props: {
  type: MusicType;
  class?: string;
  onClick?: (e: MouseEvent) => void;
}) => {
  return (
    <Switch>
      <Match when={props.type === 'netease'}>
        <img
          class={cx(style, props.class)}
          srcset={`${netease_music_icon} 1x, ${netease_music_icon2x} 2x`}
          src={netease_music_icon2x}
        />
      </Match>
      <Match when={props.type === 'qq'}>
        <img
          class={cx(style, props.class)}
          srcset={`${qq_music_icon} 1x, ${qq_music_icon2x} 2x`}
          src={qq_music_icon2x}
        />
      </Match>
    </Switch>
  );
};
