import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { StepItemProps } from '../../interface';
import { ConfigContext } from '../../../../extends/configContext';
import { StepContext } from '../../stepContext';
import { View } from '@tarojs/components'
export function StepItemMiniLayout({
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
      return <View className={classNames(
          {
            [`${clsPrefix}-step-item__connect--vertical`]: direction === 'vertical',
            [`${clsPrefix}-step-item__connect--horizontal`]: direction === 'horizontal',
          }
        )}
      >
        
      </View>
    }
  }  
  return (
    <>
      <View
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
        <View className={classNames(
            `${clsPrefix}-step-item__index`,
            {
              [`${clsPrefix}-step-item__index--active`]: currentKey >= index
            }
          )}
        >{index + 1}</View>
        <View className={classNames(
            `${clsPrefix}-step-item__text`,
            {
              [`${clsPrefix}-step-item__text--active`]: currentKey >= index,
              [`${clsPrefix}-step-item__text--vertical`]: direction === 'vertical',
              [`${clsPrefix}-step-item__text--horizontal`]: direction === 'horizontal',
            }
          )}
        >{children}</View>
      </View>
      {index < length - 1 && (
        renderConnect()
      )}
    </>
  )
}