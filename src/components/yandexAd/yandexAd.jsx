import React, { useEffect } from "react";

export default function YandexRTB({ blockId = "R-A-17113198-1", containerId }) {
  const renderTo = containerId || `yandex_rtb_${blockId}`;

  useEffect(() => {
    const tryRender = () => {
      if (
        typeof window !== "undefined" &&
        window.Ya &&
        window.Ya.Context &&
        window.Ya.Context.AdvManager &&
        typeof window.Ya.Context.AdvManager.render === "function"
      ) {
        try {
          window.Ya.Context.AdvManager.render({
            blockId: blockId,
            renderTo: renderTo,
          });
        } catch (err) {}
        return true;
      }
      return false;
    };

    if (typeof window !== "undefined") {
      window.yaContextCb = window.yaContextCb || [];
    }

    const scriptSrc = "https://an.yandex.ru/system/context.js";

    if (tryRender()) return;

    const existing = document.querySelector(`script[src=\"${scriptSrc}\"]`);
    if (!existing) {
      const s = document.createElement("script");
      s.src = scriptSrc;
      s.async = true;
      s.onload = () => {
        if (!tryRender()) {
          window.yaContextCb.push(() => tryRender());
        }
      };
      document.body.appendChild(s);
    } else {
      window.yaContextCb.push(() => tryRender());
    }
  }, [blockId, containerId, renderTo]);

  return <div id={renderTo} className="w-full" />;
}

export function YandexRTB2({ blockId = "R-A-17113198-2", containerId }) {
  const renderTo = containerId || `yandex_rtb_${blockId}`;

  useEffect(() => {
    const tryRender = () => {
      if (
        typeof window !== "undefined" &&
        window.Ya &&
        window.Ya.Context &&
        window.Ya.Context.AdvManager &&
        typeof window.Ya.Context.AdvManager.render === "function"
      ) {
        try {
          window.Ya.Context.AdvManager.render({
            blockId: blockId,
            renderTo: renderTo,
          });
        } catch (err) {}
        return true;
      }
      return false;
    };

    if (typeof window !== "undefined") {
      window.yaContextCb = window.yaContextCb || [];
    }

    const scriptSrc = "https://an.yandex.ru/system/context.js";

    if (tryRender()) return;

    const existing = document.querySelector(`script[src=\"${scriptSrc}\"]`);
    if (!existing) {
      const s = document.createElement("script");
      s.src = scriptSrc;
      s.async = true;
      s.onload = () => {
        if (!tryRender()) {
          window.yaContextCb.push(() => tryRender());
        }
      };
      document.body.appendChild(s);
    } else {
      window.yaContextCb.push(() => tryRender());
    }
  }, [blockId, containerId, renderTo]);

  return <div id={renderTo} />;
}
