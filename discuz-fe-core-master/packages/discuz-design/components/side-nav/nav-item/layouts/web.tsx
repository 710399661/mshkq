import React, { useContext } from 'react';
import { ConfigContext } from '../../../../extends/configContext';
import classNames from 'classnames';
import { SideNavItemProps } from '../../interface';
import { SideNavItemContext } from '../../sideNavContext';
export function NavItemWebLayout({
    className,
    style,
    index,
    children
}: SideNavItemProps) {
    const { clsPrefix } = useContext(ConfigContext); 
    const { defaultActiveIndex, activeIndex, activeClassName, activeStyle, onClick, direction, connect} = useContext(SideNavItemContext)
    let current = activeIndex || defaultActiveIndex
    // 防止出现activeIndex=0时，current不等于activeIndex的情况
    if(activeIndex === 0) {
        current = activeIndex
    }
    return (
        <>
            <div
                className={classNames(
                    className,
                    `${clsPrefix}-side-nav-item`,
                    {
                        [activeClassName]: index === current,
                        [`${clsPrefix}-side-nav-item--vertical`]: direction==='vertical',
                        [`${clsPrefix}-side-nav-item--horizontal`]: direction==='horizontal'
                    }
                )}
                style={index === current ? {...style, ...activeStyle} : style}
                onClick={(e) => {onClick(e, index)}}
            >
                {
                    // 导航栏前的小图标
                    index === current ? (
                        <div className={classNames(`${clsPrefix}-side-nav-item__circleBox`)}>
                        <div className={classNames(`${clsPrefix}-side-nav-item__innerRing`)}></div>
                        </div>
                    ) : (
                        <div className={classNames(`${clsPrefix}-side-nav-item__circle`)}></div>
                    )
                }
                {children}
            </div>
            {/* 连个item之间连接的样式 */}
            {connect? (
                {connect}
            ): (
                <div className={classNames(
                    {
                        [`${clsPrefix}-side-nav-item__connect--vertical`]: direction==='vertical',
                        [`${clsPrefix}-side-nav-item__connect--horizontal`]: direction==='horizontal'
                    }
                )}>
                </div>
            )}
        </>
    )
}
