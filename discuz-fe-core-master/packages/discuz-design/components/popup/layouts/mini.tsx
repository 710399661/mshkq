import React from 'react';
import { ITouchEvent, ScrollView, View } from '@tarojs/components';
import classnames from 'classnames';
import { MiniPopupProps } from '../interface';
import { useConfig } from '../../../extends/configContext';
import Icon from '../../icon';
import Button from '../../button';
import { noop } from '../../../utils/noop';

export function PopupMiniLayout({
  position,
  visible,
  onClose,
  onCancel = noop,
  onSubmit = noop,
  maskClosable,
  children,
  className,
  containerClassName,
  customScroll,
  withCloseIcon,
  withFooter,
  ...props
}: MiniPopupProps) {
  const { clsPrefix } = useConfig();

  return (
    <View
      className={classnames(`${clsPrefix}-popup`, className)}
      catchMove={true}
      {...props}
    >
      <View
        className={classnames(`${clsPrefix}-popup__overlay`, {
          'is-shown': visible,
        })}
        onClick={() => {
          if (maskClosable) {
            onClose();
          }
        }}
      />
      {
        customScroll
          ? (
          <View
            className={classnames(`${clsPrefix}-popup__container`, containerClassName, position, {
              'is-shown': visible,
              'is-expanded': visible,
            })}
          >
            {withCloseIcon && (<View
                className={classnames(`${clsPrefix}-popup__close-icon`)}
                onClick={() => {
                  onClose();
                }}
            >
              <Icon name={'CloseOutlined'} />
            </View>)}
            {children}

          {
            withFooter && <View className={classnames(`${clsPrefix}-popup__footer`)}>
              <Button className={classnames(`${clsPrefix}-popup__btn`)} type="info" onClick={() => {
                onClose();
                onCancel();
              }}>取消</Button>
              <Button className={classnames(`${clsPrefix}-popup__btn`)} type='primary' onClick={() => {
                onSubmit();
              }}>确认</Button>
            </View>
          }
          </View>
          ) : (
          <ScrollView
            scrollY
            scrollX={false}
            className={classnames(`${clsPrefix}-popup__container`, containerClassName, position, {
              'is-shown': visible,
              'is-expanded': visible,
            })}
          >
            {withCloseIcon && (<View
                className={classnames(`${clsPrefix}-popup__close-icon`)}
                onClick={() => {
                  onClose();
                }}
            >
              <Icon name={'CloseOutlined'} />
            </View>)}
            {children}

          {
            withFooter && <View className={classnames(`${clsPrefix}-popup__footer`)}>
              <Button className={classnames(`${clsPrefix}-popup__btn`)} type="info" onClick={() => {
                onClose();
                onCancel();
              }}>取消</Button>
              <Button className={classnames(`${clsPrefix}-popup__btn`)} type='primary' onClick={() => {
                onSubmit();
              }}>确认</Button>
            </View>
          }
          </ScrollView>
          )
      }
    </View>
  );
}
