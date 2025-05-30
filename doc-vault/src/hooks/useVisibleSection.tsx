"use client";

import { useEffect, useState, useCallback } from "react";
import { throttle } from "lodash";

interface ISection {
  id: string;
  title: string;
}

export function useVisibleSection(sections: ISection[]) {
  const [visibleSectionId, setVisibleSectionId] = useState<string | undefined>();

  const isSectionVisible = (elementId: string) => {
    const section = document.getElementById(elementId);

    if (section) {
      const sectionPosition = section.getBoundingClientRect();
      const viewPortHeight = window.innerHeight;

      return sectionPosition.top >= 0 && sectionPosition.top < viewPortHeight / 2;
    }

    return false;
  };

  const checkVisibility = useCallback(
    throttle(() => {
      for (const { id } of sections) 
      {
        if (isSectionVisible(id)) 
        {
          setVisibleSectionId(id);
          break;
        }
      }
    }, 300),
    [sections]
  );

  useEffect(() => {
    window.addEventListener("scroll", checkVisibility);
    checkVisibility();

    return () => window.removeEventListener("scroll", checkVisibility);
  }, [checkVisibility]);

  return visibleSectionId;
}
