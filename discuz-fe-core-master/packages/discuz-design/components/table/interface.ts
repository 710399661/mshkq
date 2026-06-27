import { StyledProps } from 'utils/_type/StyledProps';

export interface TableProps extends StyledProps {

   /**
   * 表格列配置
   */
   columns: Array<Object>;

   /**
   * 表格源数据
   */
   dataSource: Array<Object>;
  /**
   * 通过宽高配置可设置表格的横纵向滚动，其中纵向滚动将固定表头
   */
   maxScrollHeight?: Number;
}
