import React from 'react';
import classNames from 'classnames';
import Flex from '../../flex';
import Icon from '../../icon';
import { GridProps, GridItem } from '../interface';
import { useConfig } from '../../../extends/configContext';

const { Row, Col } = Flex;

const gridCols = 12;

export const GridWebLayout = function ({
  data = [],
  gutter = 0,
  bordered = true,
  columnNum = 3,
  square = false,
  iconSize = '32px',
  onClick,
  className,
  style,
}: GridProps) {
  const { clsPrefix } = useConfig();

  const span = gridCols / columnNum;

  const handleClick = (event: TouchEvent, { onClick: itemOnClick, ...item }: GridItem, index: number): void => {
    event.stopPropagation();
    onClick && onClick(item, { event, index });
    itemOnClick && itemOnClick(item, { event, index });
  };

  return (
    <div
      className={classNames(`${clsPrefix}-grid`, className, {
        [`${clsPrefix}-grid--bordered`]: bordered && gutter === 0,
      })}
      style={style}
    >
      <Row gutter={gutter}>
        {data.map((item, index) => {
          const iconProps = typeof item.icon === 'string' ? { name: item.icon } : item.icon || {};
          return (
            <Col key={`${index}-${item.title}-${item.description}`} className={`col-${span}`}>
              <div
                className={classNames(`${clsPrefix}-grid-item`, item.className, {
                  [`${clsPrefix}-grid-item--square`]: square,
                  [`${clsPrefix}-grid-item--bordered`]: bordered && gutter === 0,
                  [`${clsPrefix}-grid-item--bordered-surrounded`]: bordered && gutter > 0,
                  'is-clickable': typeof onClick === 'function' || typeof item.onClick === 'function',
                })}
                onClick={e => handleClick(e, item, index)}
                style={item.style}
              >
                <div
                  className={classNames(`${clsPrefix}-grid-item__content`, {
                    [`${clsPrefix}-grid-item__content--square`]: square,
                  })}
                >
                  <Icon className={`${clsPrefix}-grid-item__icon`} size={iconSize} {...iconProps} />
                  <div className={`${clsPrefix}-grid-item__text`}>
                    <div className={`${clsPrefix}-grid-item__title ${clsPrefix}-ellipsis`}>{item.title}</div>
                    <div className={`${clsPrefix}-grid-item__description ${clsPrefix}-ellipsis`}>
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
