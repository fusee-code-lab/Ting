import { css, cx } from '@emotion/css';
import Input from '../../basis/input';
import { createSignal } from 'solid-js';
import { search } from '@/renderer/common/musicapi';

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
  console.log(val);
  const res = await search(val);
  console.log(res);
};

export default (props: { class?: string }) => {
  const [val, setVal] = createSignal('');

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code !== 'Enter') return;
    const str = val();
    str && onSearch(str);
  };

  return (
    <div class={cx(style, props.class)}>
      <Input
        placeholder="搜索"
        value={val()}
        onInput={(e) => setVal((e.currentTarget as HTMLInputElement).value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
