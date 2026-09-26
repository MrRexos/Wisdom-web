const copy = {
  en: {
    title: 'Get Wisdom',
    description: 'Find, compare and book professional services. All in one app.',
    scan: 'Scan with your phone',
    qrLabel: 'QR code to download Wisdom',
    back: 'Back to the website',
  },
  es: {
    title: 'Descarga Wisdom',
    description: 'Busca, compara y reserva servicios profesionales. Todo en una app.',
    scan: 'Escanea con tu móvil',
    qrLabel: 'Código QR para descargar Wisdom',
    back: 'Volver a la web',
  },
  ca: {
    title: 'Descarrega Wisdom',
    description: 'Busca, compara i reserva serveis professionals. Tot en una app.',
    scan: 'Escaneja amb el mòbil',
    qrLabel: 'Codi QR per descarregar Wisdom',
    back: 'Torna al web',
  },
  fr: {
    title: 'Téléchargez Wisdom',
    description: 'Trouvez, comparez et réservez des services professionnels. Dans une seule app.',
    scan: 'Scannez avec votre téléphone',
    qrLabel: 'Code QR pour télécharger Wisdom',
    back: 'Retour au site',
  },
  pt: {
    title: 'Descarrega a Wisdom',
    description: 'Encontra, compara e reserva serviços profissionais. Tudo numa app.',
    scan: 'Lê o código com o telemóvel',
    qrLabel: 'Código QR para descarregar a Wisdom',
    back: 'Voltar ao site',
  },
  zh: {
    title: '下载 Wisdom',
    description: '查找、比较并预约专业服务。一个应用，全部搞定。',
    scan: '用手机扫码',
    qrLabel: '下载 Wisdom 的二维码',
    back: '返回网站',
  },
  ar: {
    title: 'حمّل Wisdom',
    description: 'ابحث عن الخدمات المهنية وقارن بينها واحجزها. كل ذلك في تطبيق واحد.',
    scan: 'امسح الرمز بهاتفك',
    qrLabel: 'رمز QR لتنزيل Wisdom',
    back: 'العودة إلى الموقع',
  },
};

export const getAppDownloadCopy = (locale) => copy[locale] || copy.en;

// El idioma del navegador tiene prioridad sobre el país o una detección antigua guardada.
export function getAppDownloadLocale({ languages = [], language = 'en' } = {}) {
  for (const candidate of [...languages, language]) {
    if (typeof candidate !== 'string') continue;
    const locale = candidate.toLowerCase().split(/[-_]/)[0];
    if (Object.keys(copy).includes(locale)) return locale;
  }

  return 'en';
}
