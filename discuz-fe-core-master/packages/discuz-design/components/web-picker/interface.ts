import React from 'react';
import { StyledProps } from 'utils/_type/StyledProps';

interface BasePickerProps extends StyledProps {

  /**
   * @default '''
   * @requires false
   */
   prefixCls?: string

  /**
   * @default []
   * @requires true
   */
  pickerData?: Array<PickerData>

  /**
   * @default null
   * @requires false
   */
  renderAfter?: Function

  /**
   * @default null
   * @requires false
   */
  onTouchEnd?: Function

  /**
   * @default null
   * @requires false
   */
  onTouchStart?: Function

  /**
   * @default 187
   * @requires false
   */
  height?: number
  
}

interface BasePickerWrapperProps {
  /**
   * @default null
   * @requires false
   */
  data?: any

  /**
   * @default null
   * @requires false
   */
   onTouchEnd?: Function

   /**
    * @default null
    * @requires false
    */
   onTouchStart?: Function

  /**
   * @default 187
   * @requires false
   */
   height?: number
}


export interface WebPickerWrapperProps extends BasePickerWrapperProps{

  /**
    * @default null
    * @requires false
    */
  wrapperIndex?: number

  /**
    * @default () => {}
    * @requires true
    */
  initBScrollCallback: Function

  /**
    * @default ''
    * @requires false
    */
  wrapperKey?: string

  /**
    * @default ''
    * @requires false
    */
  type?: string  
}

/**
 * Web端 Picker 支持的属性
 */
export interface WebPickerProps extends BasePickerProps {
}

export interface PickerData {
  /**
   * @default ''
   * @requires false
   */
  className?: string

  /**
   * @default ''
   * @requires false
   */
  itemClassName?: string

  /**
   * @default null
   * @requires false
   */
  selectIndex?: number

  /**
   * @default []
   * @requires true
   */
  listData?: Array<ListData>

  /**
   * 只有web端有效
   * @default null
   * @requires false
   */
  scrollData?: Object

  /**
   * @default null
   * @requires false
   */
  scrollType?: string
};

export interface ListData {

  /**
   * @default '''
   * @requires true
   */
  text?: string

  /**
   * @default '''
   * @requires true
   */
  dataKey?: string
};
