import type { RouteSectionProps } from '@solidjs/router';
import Head from './components/head';

export default (props: RouteSectionProps) => {
  return (
    <div class="container">
      <Head title={window.customize.title ?? ''} />
      {props.children}
    </div>
  );
};
