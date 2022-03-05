import { getCustomize } from '@/renderer/store';
import { windowClose, windowMaxMin, windowMin } from '@/renderer/common/window';
import style from './style';

const args = getCustomize();
export default class Head {
  isHead: boolean;

  constructor(isHead: boolean = true) {
    this.isHead = isHead;
  }

  events() {
    return (
      <div class="events">
        <div class="event min no-drag" onClick={() => windowMin()}>
          <span class="ting-font ting-font-minimize"></span>
        </div>
        <div class="event max-min no-drag" onClick={() => windowMaxMin()}>
          <span class="ting-font ting-font-maximize"></span>
        </div>
        <div class="event close no-drag" onClick={() => windowClose()}>
          <span class="ting-font ting-font-close"></span>
        </div>
      </div>
    );
  }

  render() {
    const content = <div class="content"></div>;
    const title = <div class="title">{args.title}</div>;
    if (window.environment.platform === 'darwin') {
      content.appendChild(<div></div>);
      content.appendChild(title);
    } else {
      content.appendChild(title);
      if (this.isHead) content.appendChild(this.events());
    }
    return <div class={style + ' drag'}>{content}</div>;
  }
}
