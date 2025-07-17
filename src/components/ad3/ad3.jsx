import { useEffect } from 'react';

const YandexAdComponent3 = () => {
  useEffect(() => {
    // 1. Yandex kontekst skriptini yuklash funksiyasi
    const loadYandexAd = () => {
      // Agar skript allaqachon yuklangan bo'lsa
      if (window.Ya && window.Ya.Context) {
        initializeAd();
        return;
      }

      // Skript yuklanmagan bo'lsa
      const existingScript = document.getElementById('yandex-rtb-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'yandex-rtb-script';
        script.src = 'https://yandex.ru/ads/system/context.js';
        script.async = true;
        
        script.onload = () => {
          initializeAd();
        };

        script.onerror = (error) => {
          console.error('Yandex reklama skripti yuklanmadi:', error);
        };

        document.body.appendChild(script);
      }
    };

    // 2. Reklamani ishga tushirish
    const initializeAd = () => {
      window.yaContextCb = window.yaContextCb || [];
      window.yaContextCb.push(() => {
        try {
          Ya.Context.AdvManager.render({
            blockId: 'R-A-16305559-3',
            renderTo: 'yandex_rtb_R-A-16305559-3',
            onRender: () => {
              console.log('Reklama bloki muvaffaqiyatli yuklandi');
            },
            onError: (error) => {
              console.error('Reklama yuklanmadi:', error);
            }
          });
        } catch (error) {
          console.error('Reklama ishga tushirishda xato:', error);
        }
      });
    };

    // 3. Komponent yuklanganda reklamani yuklash
    loadYandexAd();

    // 4. Tozalash funktsiyasi
    return () => {
      const script = document.getElementById('yandex-rtb-script');
      if (script && script.parentNode) {
        document.body.removeChild(script);
      }
      // Qo'shimcha tozalash amallari kerak bo'lsa
    };
  }, []);

  return (
    <div className="yandex-ad-container" style={{ minHeight: '250px', margin: '20px 0' }}>
      <div id="yandex_rtb_R-A-16305559-3"></div>
      {/* Reklama yuklanmaganda alternativ kontent */}
      <noscript>
        <div style={{ textAlign: 'center' }}>
          <a href="https://yandex.ru/ads/">Yandex reklamalari</a>
        </div>
      </noscript>
    </div>
  );
};

export default YandexAdComponent3;