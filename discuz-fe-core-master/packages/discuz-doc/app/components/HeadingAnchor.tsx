import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
// import { Link } from 'react-router-dom';
import useRoute from '@app/utils/use-route';

export interface HeadingAnchorProps {
  componentKey: string;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  name: string;
  children: React.ReactNode;
  scrollCenter?: boolean;
}

export default function HeadingAnchor({
  componentKey,
  level: Heading,
  name,
  children,
  scrollCenter,
}: HeadingAnchorProps) {
  const linkPath = `/components/${componentKey}/${name}`;
  const { match } = useRoute({
    path: linkPath,
    strict: true,
    exact: true,
  });
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headingRef.current && match) {
      setTimeout(() => {
        headingRef.current.scrollIntoView({
          behavior: 'smooth',
          block: scrollCenter ? 'center' : 'start',
          inline: scrollCenter ? 'center' : 'start',
        });
      }, 50);
    }
  }, [match]);

  return (
    <Heading id={name} ref={headingRef} className={classNames('heading-anchor', { match })}>
      {/* <Link className="anchor-link" to={linkPath}> */}
      {children}
      {/* </Link> */}
    </Heading>
  );
}
