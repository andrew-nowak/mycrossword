import { useEffect, useState } from 'react';

export type Breakpoint = typeof defaultBreakpoints[number];

const defaultBreakpoints = [
  { name: 'xs' as const, max: 576 },
  { name: 'sm' as const, max: 768 },
  { name: 'md' as const, max: 992 },
  { name: 'lg' as const, max: 1200 },
  { name: 'xl' as const, max: 1400 },
  { name: 'xxl' as const, max: 99999 },
];

export default function useBreakpoint(customBreakpoints?: Breakpoint[]) {
  const breakpoints = customBreakpoints ?? defaultBreakpoints;

  const [breakpoint, setBreakPoint] = useState<string>();
  const [windowWidth, setWindowWidth] = useState<number>();

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    if (windowWidth !== undefined) {
      // set the breakpoint to the first match (smallest first)
      const matches = breakpoints.filter((bp) => windowWidth < bp.max);
      if (matches.length > 0) {
        setBreakPoint(matches[0].name);
      } else {
        setBreakPoint(undefined);
      }
    }

    return function cleanup() {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);
  return breakpoint;
}
