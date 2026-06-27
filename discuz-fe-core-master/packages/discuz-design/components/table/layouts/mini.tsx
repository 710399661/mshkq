import React, { Component } from 'react';
import classNames from 'classnames';
import { TableProps } from '../interface';
import { ConfigContext } from '../../../extends/configContext';
import { View } from '@tarojs/components';
import { createSelectorQuery, nextTick, getSystemInfoSync } from '@tarojs/taro';

export class TableMiniLayout extends Component<TableProps> {
  tableId = Math.random().toString(36)
    .substr(2)
    .substr(0, 10);

  static contextType = ConfigContext;

  constructor(props) {
    super(props);
    this.state = {
      columns: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const { windowWidth } = getSystemInfoSync();
      nextTick(async () => {
        const query = await this.selectorQueryClientRect(`#${this.tableId}`);
        this.setState({
          columns: this.computeFix(this.computeWidth(
            this.props.columns || [],
              query?.width || windowWidth,
          )),
        });
      });
    }, 0);
  }

  selectorQueryClientRect = (selector: string) => new Promise((resolve) => {
    const query = createSelectorQuery();
    query
      .select(selector)
      .boundingClientRect((res) => {
        resolve(res);
      })
      .exec();
  });

  computeWidth = (columns, containerWidth) => {
    let knownWidth = 0; // 有配置的width总和
    let noWidthNum = 0; // 没有配置width的列数量
    const hasWidth = w => w && (this.isNumber(w) || this.isPercent(w));
    columns.forEach((citem) => {
      const cwidth = citem.width;
      if (hasWidth(cwidth)) {
        if (this.isNumber(cwidth)) {
          citem.width = cwidth * 1;
          knownWidth += cwidth * 1;
        }
        if (this.isPercent(cwidth)) {
          const _cwidth =            (containerWidth * Number(cwidth.substring(0, cwidth.length - 1)))
            / 100;
          citem.width = _cwidth * 1;
          knownWidth += _cwidth;
        }
      } else {
        noWidthNum++;
      }
    });
    const remainWidth = containerWidth - knownWidth;

    columns.forEach((citem) => {
      if (!hasWidth(citem.width)) {
        const remainItemWidth = remainWidth / noWidthNum;
        const minWidth = 100;
        citem.width = remainItemWidth < minWidth ? minWidth : remainItemWidth;
      }
    });

    return columns;
  };

  computeFix = (_columns) => {
    const fixedleftColumns = _columns.filter(i => i.fixed === 'left');
    const fixedrightColumns = _columns.filter(i => i.fixed === 'right');
    const nofixedColumns = _columns.filter(i => !i.fixed);

    fixedleftColumns.forEach((item, index) => {
      item.fixedLength = fixedleftColumns[index - 1]?.width || 0;
    });
    fixedrightColumns.forEach((item, index) => {
      item.fixedLength = fixedrightColumns[index + 1]?.width || 0;
    });

    const returnColumns = fixedleftColumns
      .concat(nofixedColumns)
      .concat(fixedrightColumns);

    return returnColumns;
  };

  isNumber = n => /^[0-9]+.?[0-9]*$/.test(n);

  isPercent = (str) => {
    if (typeof str === 'string') {
      const symbol = str.charAt(str.length - 1);
      if (symbol == '%') {
        const subS = str.substring(0, str.length - 1);
        if (isNaN(Number(subS))) {
          return false;
        }
        return true;
      }
    }
    return false;
  };

  renderTd = (recordItem, columnsItem, index) => {
    if (columnsItem.render && typeof columnsItem.render === 'function') {
      return columnsItem.render(recordItem, columnsItem, index);
    }
    return recordItem[columnsItem.key];
  };

  initTrStyle = (columnsItem) => {
    const style = { width: columnsItem.width };
    if (columnsItem.fixed && columnsItem.fixed === 'left') {
      style.position = 'sticky';
      style.left = columnsItem.fixedLength;
    }

    if (columnsItem.fixed && columnsItem.fixed === 'right') {
      style.position = 'sticky';
      style.right = columnsItem.fixedLength;
    }
    return style;
  };

  render() {
    const { clsPrefix } = this.context;
    const { columns } = this.state;
    const { maxScrollHeight, dataSource } = this.props;

    let allWidth = 0;
    columns.forEach((i) => {
      allWidth += i.width;
    });

    return (
      <View
        id={this.tableId}
        style={{ maxHeight: maxScrollHeight ? maxScrollHeight : 'none' }}
        className={classNames(
          `${this.props.className || ''}`,
          `${clsPrefix}-table`,
        )}
      >
        <View className={`${clsPrefix}-table__thead`}>
          <View
            style={{ width: allWidth, position: 'sticky', top: 0 }}
            className={`${clsPrefix}-table__tr`}
          >
            {columns.map(columnsItem => (
                <View
                  style={this.initTrStyle(columnsItem)}
                  className={`${clsPrefix}-table__thead--th`}
                >
                  {columnsItem.name}
                </View>
            ))}
          </View>
        </View>
        <View className={`${clsPrefix}-table__tbody`}>
          {dataSource.map((recordItem, index) => (
            <View
              style={{ width: allWidth }}
              className={`${clsPrefix}-table__tr`}
            >
              {columns.map(columnsItem => (
                  <View
                    style={this.initTrStyle(columnsItem)}
                    className={`${clsPrefix}-table__tbody--td`}
                  >
                    {this.renderTd(recordItem, columnsItem, index)}
                  </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    );
  }
}
