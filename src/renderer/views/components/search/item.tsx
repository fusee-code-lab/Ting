import { css, cx } from '@emotion/css';
import { textEllipsis } from '../../styles';
import { Match, Switch } from 'solid-js';
import { audioPlay } from '@/renderer/store/audio';
import { MusicType, SongItem } from 'ting_lib/src/types/music';

const style = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  > .img {
    width: 100%;
    height: var(--size-img);
    object-fit: cover;
  }

  > .title {
    ${textEllipsis}
    width: 100%;
    font-size: var(--size-xxs);
    line-height: var(--title-height);
    height: var(--title-height);
  }
  > .text {
    ${textEllipsis}
    width: 100%;
    font-size: var(--size-xxxs);
    color: var(--secondary-label-color);
    line-height: var(--text-height);
    height: var(--text-height);
  }
`;

const onClick = (type: MusicType, data: SongItem) => {
  audioPlay(type, data);
};

const NeteaseDom = (props: { data: SongItem }) => (
  <>
    <img class="img" src={`${props.data.song_img_url}?param=120y120`} />
  </>
);

const QQDom = (props: { data: SongItem }) => (
  <>
    <img class="img" src={`${props.data.song_img_url}?max_age=2592000`} />
  </>
);

export default (props: { class?: string; type: MusicType; data: SongItem }) => {
  return (
    <div onClick={() => onClick(props.type, props.data)} class={cx(style, props.class)}>
      <Switch>
        <Match when={props.type === MusicType.Netease}>
          <NeteaseDom data={props.data} />
        </Match>
        <Match when={props.type === MusicType.QQ}>
          <QQDom data={props.data} />
        </Match>
      </Switch>
      <div class="title">{props.data.song_name}</div>
      <div class="text">{props.data.song_desc}</div>
    </div>
  );
};
