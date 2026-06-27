import React, { useState } from 'react';
import { Popup, Button, Radio, Toast } from '@discuzq/design';
import { WebPopupProps } from '../../interface';
import './index.scss';

type positionType = WebPopupProps['position'];

export default function PopupExample() {
  const [visible, setVisible] = useState(false);

  const [item, setItem] = useState<positionType>('top');

  const handleCancel = () => {
    setVisible(false);
    setTimeout(() => {
      Toast.success({
        content: '已关闭',
      });
    }, 200);
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      Toast.success({
        content: '已取消',
      });
    }, 200);
  };

  const handleSubmit = () => {
    setTimeout(() => {
      Toast.success({
        content: '点击确认',
      });
    }, 200);
  };

  return (
    <div className="page">
      <p className="header">Popup 弹出层</p>

      <div className="popup-section">
        <Radio.Group
          value={item}
          onChange={item => setItem(item as positionType)}
        >
          <Radio name="top">top</Radio>
          <Radio name="center">center</Radio>
          <Radio name="bottom">bottom</Radio>
        </Radio.Group>
        <Button
          onClick={() => setVisible(true)}
          className="popup-btn"
          type="primary"
        >
          open
        </Button>
        <Popup
          position={item}
          visible={visible}
          onClose={() => handleCancel()}
          withFooter
          onCancel={handleClose}
          onSubmit={handleSubmit}
        >
          <div className="popup-box">
            <div className="popup-header">Basic Popup</div>
            <div className="popup-content">
              <div>Some contents...</div>
              <div>Some contents...</div>
              <div>Some contents...</div>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
}
