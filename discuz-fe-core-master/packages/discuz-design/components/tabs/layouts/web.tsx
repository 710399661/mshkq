import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { useDefault } from '../../../utils/hooks/useDefault';
import { getRect } from './web-utils';
import { get } from '../../../utils/get';
import { useConfig } from '../../../extends/configContext';
import { useReport } from '../../../utils/report';

/**
 * 兼容 useReady
 */
export const useReady = (fn: () => void | Promise<void>) => {
  useEffect(() => {
    fn();
  }, []);
};

export function useIsReady() {
  const [ready, setReady] = useState(false);
  useReady(() => setReady(true));
  return ready;
}

export const WebLayout = (props) => {
  const {
    children,
    placement = 'top',
    scrollable = 'true',
    tabBarExtraContent,
    className,
    style,
    type = 'card',
  } = props;

  useReport({
    componentName: 'tab'
  })

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

  const startPosition = useRef(0);

  // 在 activeId 变更之后，要更新 TabsBar 的滚动位置
  const ready = useIsReady();
  const [[scrollLeft, scrollTop], setScrollingPosition] = useState([0, 0]);
  const tabBarRef = useRef(null);

  // 阻止左右滑动带动全局滑动的问题
  useEffect(() => {
    if (tabBarRef.current) {
      tabBarRef.current.addEventListener('touchmove', (event) =>  {
        event.preventDefault();// 阻止浏览器的默认事件
      });
    }
  }, []);

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

    const tabRectsWidth = tabRects.reduce((prev, curr) => prev + curr[size], 0);

    if(tabRectsWidth < scrollRect.width) {
      return;
    }

    if (scrolling <= 0) {
      setScrollingPosition([0, 0]);
      return;
    }

    if (scrolling >= tabRectsWidth - scrollRect.width) {
      setScrollingPosition([tabRectsWidth - scrollRect.width, 0]);
      return;
    }

    setScrollingPosition([scrolling, 0]);
  }, [activeIndex, ready, scrollable]);

  useEffect(() => {
    if (ready) {
      updateScrollingPosition();
    }
  }, [ready, updateScrollingPosition]);

  const handleTouchStart = (e) => {
    e.persist();
    if (!scrollable) return;
    startPosition.current = get(e, 'touches[0].clientX');
  };

  const handleTouchMove = async (e: React.TouchEvent) => {
    e.persist();
    if (!scrollable) return;
    const [scrollRect] = await getRect(tabBarRef, '.dzq-tabs__scroll');
    const tabRects = await getRect(tabBarRef, '.dzq-tabs__item');

    setScrollingPosition(([currentX]) => {
      const changedPosition = get(e, 'touches[0].clientX') - startPosition.current;
      startPosition.current = get(e, 'touches[0].clientX');
      const nextPosition = currentX - (changedPosition * 3);

      const tabRectsWidth = tabRects.reduce(
        (prev, curr) => prev + curr.width,
        0,
      );

      if (nextPosition <= 0) {

        return [0, 0];
      } else if (nextPosition >= tabRectsWidth - scrollRect.width) {

        return [tabRectsWidth - scrollRect.width, 0];
      } else {

        return [nextPosition, 0];
      }
    });
  };

  const placementClassName = `${clsPrefix}-tabs__placement--${placement}`;

  return (
    <div
      className={classNames(`${clsPrefix}-tabs`, placementClassName, className)}
      style={style}
    >
        <div className={classNames(`${clsPrefix}-tabs__bar`, {
          'is-card': type === 'card',
        })} ref={tabBarRef}>
          <div
            className={classNames(`${clsPrefix}-tabs__scroll`, {
              [`${clsPrefix}-tabs__scroll--external`]: tabBarExtraContent,
            })}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <div
              className={`${clsPrefix}-tabs__list`}
              style={{
                transform: `translateX(${-scrollLeft}px)`,
              }}
            >
              {tabs.map(({ props: tab }) => {
                const activeClassName = tab.id === activeId ? 'is-active' : 'is-inactive';
                return (
                  // 选项卡按钮
                  <div
                    key={tab.id}
                    className={classNames(
                      `${clsPrefix}-tabs__item`,
                      activeClassName,
                      `${clsPrefix}-tabs__direction--top`,
                      tab.className,
                    )}
                    style={tab.style}
                    onClick={() => {
                      setActiveId(tab.id);
                    }}
                  >
                    <div className={`${clsPrefix}-tabs__label`}>{tab.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
          {tabBarExtraContent && <div className={`${clsPrefix}-tabs__external`}>{tabBarExtraContent}</div>}
        </div>
      <div className={`${clsPrefix}-tabs__panel`}>
        {tabs.map(({ props: tab }) => (
          <div
            key={tab.id}
            className={classNames(
              `${clsPrefix}-tabs__content`,
              tab.id === activeId ? 'is-active' : 'is-inactive',
            )}
          >
            {tab.id === activeId ? tab.children : null}
          </div>
        ))}
      </div>
    </div>
  );
};

function TabPanel(props) {
  return <div />;
}

WebLayout.TabPanel = TabPanel;
