import { useEffect } from 'react';

const YandexAdBanner = () => {
  useEffect(() => {
    // 1. Yandex reklama skripti yuklanganligini tekshirish
    if (window.Ya && window.Ya.Context) {
      renderAd();
      return;
    }

    // 2. Agar skript yuklanmagan bo'lsa, yuklash
    const script = document.createElement('script');
    script.src = 'https://yandex.ru/ads/system/context.js';
    script.async = true;
    
    // 3. Skript yuklangandan so'ng reklamani ko'rsatish
    script.onload = () => {
      window.yaContextCb = window.yaContextCb || [];
      renderAd();
    };

    document.body.appendChild(script);

    function renderAd() {
      window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
          blockId: 'R-A-16305559-1',
          renderTo: 'yandex_rtb_R-A-16305559-1'
        });
      });
    }

    // 4. Komponent olib tashlanganda skriptni ham olib tashlash
    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="yandex-ad-container">
      <div id="yandex_rtb_R-A-16305559-1"></div>
    </div>
  );
};

export default YandexAdBanner;