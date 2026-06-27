import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { StepItemProps } from '../../interface';
import { ConfigContext } from '../../../../extends/configContext';
import { StepContext } from '../../stepContext';

export function StepItemWebLayout({
  index,
  className,
  style,
  children,
}: StepItemProps) {
  
  const { clsPrefix } = useContext(ConfigContext);
  const {currentKey, onChange, connectNode, length, direction} = useContext(StepContext)
  useEffect(() => {
    if(currentKey === index) {
      onChange(index)
    }
  },[currentKey])
  // 渲染connect
  const renderConnect = () => {
    if(connectNode) {
      return connectNode
    } else {
      return <div className={classNames(
          {
            [`${clsPrefix}-step-item__connect--vertical`]: direction === 'vertical',
            [`${clsPrefix}-step-item__connect--horizontal`]: direction === 'horizontal',
          }
        )}
      >
        
      </div>
    }
  }  
  return (
    <>
      <div
        key={index}
        className={classNames(
          className,
          `${clsPrefix}-step-item`,
          {
            [`${clsPrefix}-step-item--vertical`]: direction === 'vertical',
            [`${clsPrefix}-step-item--horizontal`]: direction === 'horizontal',
          }
        )}
        style={style}
      >
        <div className={classNames(
            `${clsPrefix}-step-item__index`,
            {
              [`${clsPrefix}-step-item__index--active`]: currentKey >= index
            }
          )}
        >{index + 1}</div>
        <div className={classNames(
            `${clsPrefix}-step-item__text`,
            {
              [`${clsPrefix}-step-item__text--active`]: currentKey >= index,
              [`${clsPrefix}-step-item__text--vertical`]: direction === 'vertical',
              [`${clsPrefix}-step-item__text--horizontal`]: direction === 'horizontal',
            }
          )}
        >{children}</div>
      </div>
      {index < length - 1 && (
        renderConnect()
      )}
    </>
  )
}