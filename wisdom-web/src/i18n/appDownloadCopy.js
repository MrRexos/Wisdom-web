import { getBrowserLocale } from './detectLocale.js';

const copy = {
  en: {
    title: 'Get Wisdom',
    description: 'Find, compare and book professional services. All in one app.',
    qrLabel: 'QR code to download Wisdom',
    back: 'Back to the website',
  },
  es: {
    title: 'Descarga Wisdom',
    description: 'Busca, compara y reserva servicios profesionales. Todo en una app.',
    qrLabel: 'Código QR para descargar Wisdom',
    back: 'Volver a la web',
  },
  ca: {
    title: 'Descarrega Wisdom',
    description: 'Busca, compara i reserva serveis professionals. Tot en una app.',
    qrLabel: 'Codi QR per descarregar Wisdom',
    back: 'Torna al web',
  },
  fr: {
    title: 'Téléchargez Wisdom',
    description: 'Trouvez, comparez et réservez des services professionnels. Dans une seule app.',
    qrLabel: 'Code QR pour télécharger Wisdom',
    back: 'Retour au site',
  },
  pt: {
    title: 'Descarrega a Wisdom',
    description: 'Encontra, compara e reserva serviços profissionais. Tudo numa app.',
    qrLabel: 'Código QR para descarregar a Wisdom',
    back: 'Voltar ao site',
  },
  zh: {
    title: '下载 Wisdom',
    description: '查找、比较并预约专业服务。一个应用，全部搞定。',
    qrLabel: '下载 Wisdom 的二维码',
    back: '返回网站',
  },
  ar: {
    title: 'حمّل Wisdom',
    description: 'ابحث عن الخدمات المهنية وقارن بينها واحجزها. كل ذلك في تطبيق واحد.',
    qrLabel: 'رمز QR لتنزيل Wisdom',
    back: 'العودة إلى الموقع',
  },
  de: {
    title: 'Hol dir Wisdom',
    description: 'Finde, vergleiche und buche professionelle Dienstleistungen. Alles in einer App.',
    qrLabel: 'QR-Code zum Herunterladen von Wisdom',
    back: 'Zurück zur Website',
  },
  it: {
    title: 'Scarica Wisdom',
    description: 'Trova, confronta e prenota servizi professionali. Tutto in una sola app.',
    qrLabel: 'Codice QR per scaricare Wisdom',
    back: 'Torna al sito',
  },
  hi: {
    title: 'Wisdom डाउनलोड करें',
    description: 'पेशेवर सेवाएँ खोजें, तुलना करें और बुक करें। सब एक ऐप में।',
    qrLabel: 'Wisdom डाउनलोड करने के लिए QR कोड',
    back: 'वेबसाइट पर लौटें',
  },
  ja: {
    title: 'Wisdomをダウンロード',
    description: 'プロのサービスを探して、比べて、予約。すべてひとつのアプリで。',
    qrLabel: 'WisdomをダウンロードするQRコード',
    back: 'ウェブサイトに戻る',
  },
  ru: {
    title: 'Скачайте Wisdom',
    description: 'Находите, сравнивайте и бронируйте услуги специалистов. Всё в одном приложении.',
    qrLabel: 'QR-код для скачивания Wisdom',
    back: 'Вернуться на сайт',
  },
};

export const getAppDownloadCopy = (locale) => copy[locale] || copy.en;

// El idioma del navegador tiene prioridad sobre el país o una detección antigua guardada.
export const getAppDownloadLocale = getBrowserLocale;
