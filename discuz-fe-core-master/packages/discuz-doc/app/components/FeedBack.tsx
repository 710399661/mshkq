import React from 'react';
import { Icon } from '@discuzq/design';

export const FeedBack = () => {
    return (
      <a target='_blank' href='https://discuz.chat/?categoryId=3&sequence=0'>
        <div className={"dzq-feedback"} title={"反馈"}>
          <Icon name={"NotepadOutlined"} />
          <span>反馈建议</span>
        </div>
      </a>
    )
}
