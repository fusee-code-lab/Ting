import { RouteSectionProps } from '@solidjs/router';
import { windowShow } from '@youliso/electronic/render';
import { onMount } from 'solid-js';
import Button from '../components/basis/button';
import { search } from '@/renderer/common/musicapi';

export const test = async () => {
  const res = await search('稻香');
  console.log(res);
};

export default (props: RouteSectionProps) => {
  onMount(() => windowShow());

  return (
    <div class="container">
      <Button onClick={test}>test</Button>
    </div>
  );
};
