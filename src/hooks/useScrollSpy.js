import { useEffect, useState } from "react";

export function useScrollSpy(ids, offset = 120) {
  const key = ids.join("|");
  const [activeId, setActiveId] = useState(ids[0] ?? null);

  useEffect(() => {
    const list = key ? key.split("|") : [];
    if (!list.length) return undefined;

    let observer;

    const connect = () => {
      const elements = list.map((id) => document.getElementById(id)).filter(Boolean);
      if (!elements.length) return false;

      observer?.disconnect();
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          if (visible[0]?.target?.id) {
            setActiveId(visible[0].target.id);
          }
        },
        {
          rootMargin: `-${offset}px 0px -55% 0px`,
          threshold: [0.15, 0.3, 0.5],
        },
      );

      elements.forEach((element) => observer.observe(element));
      return true;
    };

    if (connect()) {
      return () => observer?.disconnect();
    }

    const root = document.getElementById("main") || document.body;
    const mutation = new MutationObserver(() => {
      if (connect()) mutation.disconnect();
    });
    mutation.observe(root, { childList: true, subtree: true });

    return () => {
      mutation.disconnect();
      observer?.disconnect();
    };
  }, [key, offset]);

  return activeId;
}
