import React, { useState, useEffect, useRef, useMemo } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { ComponentDocument } from '!!toc-loader!@discuz/design/../README.md';
import { isHeading, isText, isParent, isInterface } from '@app/utils/md-guard';

export interface MarkdownTocProps {
  componentKey: string;
  document: ComponentDocument;
}

export default function MarkdownToc({ componentKey, document }: MarkdownTocProps) {
  const [acticedIndexList, setActicedIndexList] = useState<number[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<HTMLHeadingElement[]>(null);
  const timerRef = useRef<number>(null);

  const headings = useMemo(() => {
    const { blocks } = document;
    return blocks
      .filter((x) => isHeading(x) || isInterface(x))
      .filter((x) => (isHeading(x) ? x.children && x.children.length > 0 : true))
      .map((x) => ({ ...x, text: isHeading(x) ? getHeadingText(x) : x.name }));
  }, [componentKey, document]);

  useEffect(() => {
    headingRefs.current = headings.map((x) => {
      try {
        // 部分 id 使用 querySelector 异常
        const heading: HTMLHeadingElement = window.document.querySelector(
          `#${x.text.replace(/\s+/g, '')}`,
        );
        return heading || null;
      } catch (err) {
        return null;
      }
    });
  }, [componentKey, document]);

  useEffect(() => {
    bodyRef.current = window.document.querySelector('.tdesign-site-body');
    if (!bodyRef.current) {
      return;
    }
    bodyRef.current.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => bodyRef.current.removeEventListener('scroll', handleScroll);
  }, [componentKey, document]);

  function handleScroll() {
    if (!bodyRef.current) {
      return;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      const top = bodyRef.current.scrollTop;
      const bottom = bodyRef.current.clientHeight + top;
      const topList = headingRefs.current.map((heading) =>
        heading ? heading.getBoundingClientRect().top + top : -1,
      );
      const indexList = [];
      topList.forEach((t, i) => (topList[i] = t >= 0 ? t : topList[i - 1] || t));
      topList.forEach((t, i) => {
        if (t >= top && t <= bottom) {
          return indexList.push(i);
        }
      });
      // 所有标题都不在当前位置
      if (!indexList.length) {
        if (topList[0] >= top) {
          return setActicedIndexList([0]);
        }
        for (let i = 1; i < topList.length; ++i) {
          if (topList[i - 1] < top && topList[i] >= top) {
            return setActicedIndexList([i - 1]);
          }
        }
        return setActicedIndexList([topList.length - 1]);
      }
      return setActicedIndexList(indexList);
    }, 0);
  }

  return (
    <ul>
      {headings.map((heading, idx) => (
        // TODO: 改为在页面中的导航都激活
        <li
          key={idx}
          className={classNames(
            heading.depth && `heading-${heading.depth}`,
            isInterface(heading) && 'interface',
            acticedIndexList.includes(idx) ? 'actived' : '',
          )}
        >
          <NavLink
            title={heading.text}
            to={`/react/${componentKey}/${heading.text.replace(/\s+/g, '')}`}
            style={{
              marginLeft: isInterface(heading) ? 20 : Math.max(0, heading.depth - 2) * 20,
            }}
          >
            {heading.text}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export function getHeadingText(node: import('unist').UNIST.Parent) {
  return node.children.reduce((text, child) => {
    if (isText(child)) {
      return text + child.value;
    }
    if (isParent(child)) {
      return text + getHeadingText(child);
    }
    return text;
  }, '');
}
