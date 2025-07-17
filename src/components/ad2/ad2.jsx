import { useEffect } from 'react';

const YandexAdBanner2 = () => {
  useEffect(() => {
    // 1. Yandex kontekst skripti mavjudligini tekshirish
    const loadYandexAd = () => {
      window.yaContextCb = window.yaContextCb || [];
      window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
          blockId: 'R-A-16305559-2',
          renderTo: 'yandex_rtb_R-A-16305559-2'
        });
      });
    };

    // 2. Agar Yandex API allaqachon yuklangan bo'lsa
    if (window.Ya && window.Ya.Context) {
      loadYandexAd();
      return;
    }

    // 3. Agar skript yuklanmagan bo'lsa
    const existingScript = document.getElementById('yandexContextScript');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'yandexContextScript';
      script.src = 'https://yandex.ru/ads/system/context.js';
      script.async = true;
      
      script.onload = () => {
        loadYandexAd();
      };

      script.onerror = () => {
        console.error('Yandex reklama skripti yuklanmadi');
      };

      document.body.appendChild(script);
    }

    // 4. Tozalash funktsiyasi
    return () => {
      const script = document.getElementById('yandexContextScript');
      if (script && script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="yandex-ad-wrapper">
      <div id="yandex_rtb_R-A-16305559-2"></div>
    </div>
  );
};

export default YandexAdBanner2;