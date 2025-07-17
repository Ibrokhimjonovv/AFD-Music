import { useEffect } from 'react';

const YandexAd3 = () => {
  useEffect(() => {
    // 1. Skript yuklanganligini tekshirish
    if (!document.getElementById('yandex-ads-script')) {
      const script = document.createElement('script');
      script.id = 'yandex-ads-script';
      script.src = 'https://yandex.ru/ads/system/context.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // 2. Reklamani ishga tushirish
    window.yaContextCb = window.yaContextCb || [];
    window.yaContextCb.push(() => {
      Ya.Context.AdvManager.render({
        blockId: 'R-A-16305559-3',
        renderTo: 'yandex_rtb_R-A-16305559-3'
      });
    });

  }, []);

  return <div id="yandex_rtb_R-A-16305559-3"></div>;
};

export default YandexAd3;