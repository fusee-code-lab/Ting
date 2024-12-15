import { css, cx } from '@emotion/css';
import Input from '@/renderer/views/components/basis/input';
import { search } from '@/renderer/common/musicapi';
import { search_val, set_search_val, set_song_search_list } from '@/renderer/store/song';

const style = css`
  > input {
    width: 100%;
    font-size: var(--size-xxxs);
    &::-webkit-input-placeholder {
      font-size: var(--size-xxxs);
    }
  }
`;

const onSearch = async (val: string) => {
  const res = await search(val);
  if (res) {
    set_song_search_list(res);
  }
};

export default (props: { class?: string }) => {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code !== 'Enter') return;
    const str = search_val();
    str && onSearch(str);
  };

  return (
    <div class={cx(style, props.class)}>
      <Input
        placeholder="搜索"
        value={search_val()}
        onInput={(e) => set_search_val((e.currentTarget as HTMLInputElement).value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
