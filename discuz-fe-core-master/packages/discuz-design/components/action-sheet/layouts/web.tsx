import React, { useEffect } from 'react';
import classNames from 'classnames';
import { ActionItem, ActionSheetProps } from '../interface';
import { useConfig } from '../../../extends/configContext';
import Popup from '../../popup/index'
import Spin from '../../spin/index'
import Icon from '../../icon/index'

export const ActionSheetWebLayout: React.FC<ActionSheetProps> = ({
  visible = false,
  actions = [],
  title,
  zIndex = 100,
  cancelText = '取消',
  cancelButton = true,
  closeOnClickAction = true,
  closeOnClickOverlay = true,
  layout = 'column',
  number = 5,
  onClose,
  onCancel,
  onSelect = () => { },
  className,
  style,
  buttonClassName,
  buttonStyle
}) => {
  useEffect(() => {
    if ((layout === 'row' && !actions[0].icon && !actions[0].description) || (layout === 'column' && !actions[0].content)) {
      console.warn('[Discuz-design WARN]:' + '检查参数layout与actions是否匹配');
    }
  })
  const { clsPrefix } = useConfig();
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: ActionItem) => {
    if (typeof onSelect === 'function') {
      onSelect(e, item)
    }
    if (typeof onClose === 'function' && closeOnClickAction) {
      onClose()
    }
  }
  const handleCancle = () => {
    if (typeof onCancel === 'function') {
      onCancel()
    }
    if (typeof onClose === 'function') {
      onClose()
    }
  }

  // 布局方式为column时渲染的item
  const renderColumn = (item: ActionItem, index: number) => {
    return (
      <div
        key={index}
        className={classNames(`${clsPrefix}-action-sheet__item`, item.className)}
        style={item.color ? { ...item.style, color: `${item.color}` } : item.style}
        onClick={(e) => {
          if (item.disabled) {
            e.stopPropagation();
            return
          };
          handleClick(e, item)
        }}
      >
        {item.loading ? <Spin size='16px' type={'spinner'}></Spin> : item.content}
      </div>
    )
  }

  // 布局方式为row时渲染的item
  const renderRow = (item: ActionItem, index: number) => {
    return (
      <div className={classNames(
        item.className,
        `${clsPrefix}-action-sheet__moreItem`,
        {
          [`${clsPrefix}-action-sheet__flex-more-item`]: actions.length < number
        }
        )}
        onClick={(e) => {handleClick(e, item)}}
        key={index}
        style={item.style}
      >
        <div className={classNames(
          `${clsPrefix}-action-sheet__icon`
        )}
        >
          <Icon name={item.icon}></Icon>
        </div>
        <div className={classNames(
          `${clsPrefix}-action-sheet__text`
        )}
        >
          {item.description}
        </div>
      </div>
    )
  }

  // 渲染item
  const renderItem = (item: ActionItem, index: number) => {
    // 自定义节点
    if (React.isValidElement(item.element)) {
      return (
        <div key={index}>
          {item.element}
        </div>
      )
    }
    // 布局方式为column时
    else if (layout === 'column') {
      return renderColumn(item, index)
    } else {
      return renderRow(item, index)
    }
  }


  // 布局为grid时，根据传入的number判断一行需要几列
  const gridMoreItem = {
    gridTemplateColumns: `repeat(${number}, 40px)`
  } as React.CSSProperties

  // 为Popup设置层级
  const popupStyle = {
    zIndex: zIndex
  } as React.CSSProperties

  return (
    <Popup
      visible={visible}
      onClose={onClose}
      position='bottom'
      maskClosable={closeOnClickOverlay}
      style={popupStyle}
    >
      <div
        className={classNames(
          `${clsPrefix}-action-sheet`,
          className,
        )}
        style={style}
      >
        {/* 标题 */}
        {title && (
          <div className={classNames(
            `${clsPrefix}-action-sheet__title`
          )}>
            {title}
          </div>
        )}
        {/* 内容 */}
        {actions && (
          <div className={classNames(
            `${clsPrefix}-action-sheet__content`,
            {
              [`${clsPrefix}-action-sheet__row`]: layout === 'row',
              [`${clsPrefix}-action-sheet__grid`]: layout === 'row' && actions.length >= number,
              [`${clsPrefix}-action-sheet__flex`]: layout === 'row' && actions.length < number
            }
          )}
            // 根据传入的number，动态计算grid的列数
            style={actions.length >= number ? gridMoreItem : { }}
          >
            {actions.map((item, index) => {
              return renderItem(item, index)
            })}
          </div>
        )}
        {/* 取消按钮 */}
        {cancelButton && (
          <div
            className={classNames(
              buttonClassName,
              `${clsPrefix}-action-sheet__bottom`
            )}
            style={buttonStyle}
            onClick={handleCancle}
          >
            {cancelText}
          </div>
        )}
      </div>
    </Popup>
  )
}
