import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ScrollView, View } from '@tarojs/components';
import classNames from 'classnames';
import { useDefault } from '../../../utils/hooks/useDefault';
import { useReady as useTaroReady } from '@tarojs/taro';
import { getRect } from './mini-utils';
import { useConfig } from '../../../extends/configContext';

/**
 * 兼容 useReady
 */
export const useReady = (fn: () => void | Promise<void>) => {
  useTaroReady(() => {
    fn();
  });

  // TODO 临时解决小程序中tabs点击后无法定位的问题 （原因是ready恒为false）
  useEffect(() => {
    // FIXME 解决tabs初始化事，无法获取容器的宽度等信息
    setTimeout(() => {
      fn();
    }, 100);
  }, [])
};

export function useIsReady() {
  const [ready, setReady] = useState(false);
  useReady(() => setReady(true));
  return ready;
}

export const MiniLayout = (props) => {
  const {
    children,
    placement = 'top',
    scrollable,
    tabLayoutDirection,
    className,
    style,
    external,
    type = 'card',
  } = props;

  const { clsPrefix } = useConfig();

  const tabs = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children],
  );

  const [activeId, setActiveId] = useDefault(
    props.activeId,
    props.defaultActiveId || (tabs[0] ? tabs[0].props.id : undefined),
    props.onActive,
  );
  const activeIndex = tabs.findIndex(x => x.props.id === activeId);

  // 在 activeId 变更之后，要更新 TabsBar 的滚动位置
  const ready = useIsReady();
  const [[scrollLeft, scrollTop], setScrollingPosition] = useState([0, 0]);
  const tabBarRef = useRef(null);

  const updateScrollingPosition = useCallback(async () => {
    if (!ready) {
      return;
    }
    if (!scrollable) {
      return;
    }
    const [scrollRect] = await getRect(tabBarRef, '.dzq-tabs__scroll');
    const tabRects = await getRect(tabBarRef, '.dzq-tabs__item');

    if (activeIndex === -1 || !scrollRect || !tabRects[activeIndex]) {
      return;
    }

    const tabRect = tabRects[activeIndex];

    const size = 'width';

    const offset = tabRects
      .slice(0, activeIndex)
      .reduce((prev, curr) => prev + curr[size], 0);

    const scrolling = offset - ((scrollRect[size] - tabRect[size]) / 2);
    setScrollingPosition(size === 'width' ? [scrolling, 0] : [0, scrolling]);
  }, [activeIndex, ready, scrollable]);

  useEffect(() => {
    if (ready) {
      updateScrollingPosition();
    }
  }, [ready, updateScrollingPosition]);

  const placementClassName = `${clsPrefix}-tabs__placement--${placement}`;

  return (
    <View
      className={classNames(`${clsPrefix}-tabs`, placementClassName, className)}
      style={style}
    >
      <View className={classNames(`${clsPrefix}-tabs__bar`, {
        'is-card': type === 'card',
      })} ref={tabBarRef}>
        <ScrollView
          className={classNames(`${clsPrefix}-tabs__scroll`, {
            [`${clsPrefix}-tabs__scroll--external`]: external,
          })}
          scrollWithAnimation
          scrollX={scrollable}
          scrollLeft={scrollLeft}
          scrollTop={scrollTop}
        >
          <View className={`${clsPrefix}-tabs__list`}>
            {tabs.map(({ props: tab }) => {
              const activeClassName = tab.id === activeId ? 'is-active' : 'is-inactive';
              return (
                // 选项卡按钮
                <View
                  key={tab.id}
                  className={classNames(
                    `${clsPrefix}-tabs__item`,
                    activeClassName,
                    `${clsPrefix}-tabs__direction--${tabLayoutDirection}`,
                    tab.className,
                  )}
                  style={tab.style}
                  onClick={() => {
                    setActiveId(tab.id);
                  }}
                >
                  <View className={`${clsPrefix}-tabs__label`}>
                    {tab.label}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
        {external && (
          <View className={`${clsPrefix}-tabs__external`}>{external}</View>
        )}
      </View>
      <View className={`${clsPrefix}-tabs__panel`}>
        {tabs.map(({ props: tab }) => (
          <View
            key={tab.id}
            className={classNames(
              `${clsPrefix}-tabs__content`,
              tab.id === activeId ? 'is-active' : 'is-inactive',
            )}
          >
            {tab.id === activeId ? tab.children : null}
          </View>
        ))}
      </View>
    </View>
  );
};

function TabPanel(props) {
  return <View />;
}

MiniLayout.TabPanel = TabPanel;
