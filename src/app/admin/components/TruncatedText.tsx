'use client';

import React, { useEffect, useRef, useState } from 'react';

type TruncatedTextProps = {
  text: string;
  maxWidth?: number | string;
  className?: string;
};

export default function TruncatedText({
  text,
  maxWidth = 180,
  className = '',
}: TruncatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => {
      setIsTruncated(el.scrollWidth > el.clientWidth);
    };

    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [text, maxWidth]);

  return (
    <span
      ref={ref}
      className={`truncated-text ${className}`.trim()}
      style={{ maxWidth }}
      title={isTruncated ? text : undefined}
    >
      {text}
    </span>
  );
}
