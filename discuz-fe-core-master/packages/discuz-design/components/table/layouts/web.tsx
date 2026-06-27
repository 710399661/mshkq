import React, { Component, createRef } from 'react';
import classNames from 'classnames';
import { TableProps } from '../interface';
import { ConfigContext } from '../../../extends/configContext';

export class TableWebLayout extends Component<TableProps> {
  static contextType = ConfigContext;

  tableRef = createRef();

  constructor(props) {
    super(props);
    this.state = {
      columns: [],
    };
  }

  componentDidMount() {
    console.dir(this.tableRef.current);
    this.setState({ columns: this.computeFix(this.computeWidth(this.props.columns || [])) });
  }

  computeWidth = (columns) => {
    const containerWidth = this.tableRef.current ? this.tableRef.current.offsetWidth : 0;
    let knownWidth = 0;   // 有配置的width总和
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
          const _cwidth = containerWidth * Number(cwidth.substring(0, cwidth.length - 1)) / 100;
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
  }

  computeFix = (_columns) => {
    const fixedleft_columns = _columns.filter(i => i.fixed === 'left');
    const fixedright_columns = _columns.filter(i => i.fixed === 'right');
    const nofixed_columns = _columns.filter(i => !i.fixed);

    fixedleft_columns.forEach((item, index) => {
      item.fixedLength = fixedleft_columns[index - 1]?.width || 0;
    });
    fixedright_columns.forEach((item, index) => {
      item.fixedLength = fixedright_columns[index + 1]?.width || 0;
    });

    const return_columns = fixedleft_columns.concat(nofixed_columns).concat(fixedright_columns);

    return return_columns;
  }

  isNumber = n => /^[0-9]+.?[0-9]*$/.test(n)

  isPercent = (str) => {
    if (typeof (str) === 'string') {
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
  }


  renderTd = (recordItem, columnsItem, index) => {
    if (columnsItem.render && typeof columnsItem.render === 'function') {
      return columnsItem.render(recordItem, columnsItem, index);
    }
    return recordItem[columnsItem.key];
  }

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
  }


  render() {
    const { clsPrefix } = this.context;
    const { columns } = this.state;
    const { maxScrollHeight, dataSource } = this.props;

    let allWidth = 0;
    columns.forEach((i) => {
      allWidth += i.width;
    });

    return (
      <div
        ref={this.tableRef}
        className={classNames(`${this.props.className || ''}`, `${clsPrefix}-table`)}
        style={{ maxHeight: maxScrollHeight ? maxScrollHeight : 'none' }}
      >
        <div className={`${clsPrefix}-table__thead`} >
          <div style={{ width: allWidth }} className={`${clsPrefix}-table__tr`}>
            {
              columns.map(columnsItem => (
                  <div
                    style={this.initTrStyle(columnsItem)}
                    className={`${clsPrefix}-table__thead--th`}
                  >
                    {columnsItem.name}
                  </div>
              ))
            }
          </div>
        </div>
        <div className={`${clsPrefix}-table__tbody`} >
          {
            (dataSource || []).map((recordItem, index) => (
              <div style={{ width: allWidth }} className={`${clsPrefix}-table__tr`}>
                {
                  columns.map(columnsItem => (
                      <div
                        style={this.initTrStyle(columnsItem)}
                        className={`${clsPrefix}-table__tbody--td`}
                      >
                        {this.renderTd(recordItem, columnsItem, index)}
                      </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

