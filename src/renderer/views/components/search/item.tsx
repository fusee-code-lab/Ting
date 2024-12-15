import { css, cx } from '@emotion/css';
import { textEllipsis } from '../../styles';
import { MusicType, SongItem } from '@/types/music';
import { Match, Switch } from 'solid-js';
import { audioPlay } from '@/renderer/store/audio';

const style = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  --size-img: 120px;
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
  }
  > .text {
    ${textEllipsis}
    width: 100%;
  }
`;

const onClick = (type: MusicType, data: any) => {
  console.log(data);
  audioPlay(type, type === MusicType.QQ ? data.songmid : data.id);
};

const NeteaseDom = (props: { data: SongItem }) => (
  <>
    <img class="img" src={`${props.data?.al?.picUrl}?param=120y120`} />
    <div class="title">{props.data?.name}</div>
    <div class="text"></div>
  </>
);

const QQDom = (props: { data: SongItem }) => (
  <>
    <img class="img" src={props.data.cover_url} />
    <div class="title">{props.data?.songname}</div>
    <div class="text"></div>
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
    </div>
  );
};
