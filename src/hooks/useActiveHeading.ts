/* eslint-disable filenames/match-exported */
import forEach from 'lodash.foreach';
import { useEffect, useState } from 'react';

const useActiveHeading = (headingIds: string[]): string => {
  const [
    activeHeading,
    setActiveHeading,
  ] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        forEach(entries, (entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        // TODO - Adjust margin from bottom based on height of viewport in px
        rootMargin: '0% 0% -80% 0%',
      },
    );

    const headings: HTMLElement[] = headingIds.reduce(
      (accumulator: HTMLElement[], headingId: string) => {
        const element = headingId.startsWith('schema--')
          ? document.getElementById(headingId)
          : document.getElementById(`toc-${headingId}`);

        if (!element) {
          return accumulator;
        }

        return [
          ...accumulator,
          element,
        ];
      },
      [],
    );

    headings.forEach((heading: HTMLElement) => {
      observer.observe(heading);
    });

    return () => {
      headings.forEach((heading: HTMLElement) => {
        observer.unobserve(heading);
      });
    };
  }, [
    headingIds,
  ]);

  return activeHeading;
};

export default useActiveHeading;
