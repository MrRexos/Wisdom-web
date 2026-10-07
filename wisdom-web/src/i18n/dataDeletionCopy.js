const copy = {
  en: {
    title: 'Wisdom – Data Deletion Request',
    developer: 'Developer',
    app: 'App',
    requestTitle: 'How to request deletion',
    requestBefore: 'Email',
    requestAfter: 'from the address linked to your account. Tell us whether you need a partial deletion (services, chats, addresses, images) or a full account removal. We process every request within 30 days and confirm completion by email.',
    deleteTitle: 'What we delete',
    items: ['Profile details', 'Saved addresses', 'Services and related images', 'Chats and messages', 'Reviews and ratings', 'Booking history'],
    retainTitle: 'What we retain and for how long',
    retain: 'Payment and billing records (Stripe) and security or fraud logs are retained for up to 90 days to meet legal obligations. After that period they are deleted or anonymized.',
    securityTitle: 'Security',
    security: 'All data is transmitted over encrypted connections (TLS/HTTPS).',
    updated: 'Last updated:',
  },
  es: {
    title: 'Wisdom – Solicitud de eliminación de datos',
    developer: 'Desarrollador',
    app: 'App',
    requestTitle: 'Cómo solicitar la eliminación',
    requestBefore: 'Escribe a',
    requestAfter: 'desde la dirección vinculada a tu cuenta. Indica si necesitas una eliminación parcial (servicios, chats, direcciones o imágenes) o la eliminación completa de la cuenta. Tramitamos todas las solicitudes en un plazo de 30 días y confirmamos su finalización por correo electrónico.',
    deleteTitle: 'Qué eliminamos',
    items: ['Datos del perfil', 'Direcciones guardadas', 'Servicios e imágenes relacionadas', 'Chats y mensajes', 'Reseñas y valoraciones', 'Historial de reservas'],
    retainTitle: 'Qué conservamos y durante cuánto tiempo',
    retain: 'Los registros de pagos y facturación (Stripe), así como los registros de seguridad o fraude, se conservan hasta 90 días para cumplir las obligaciones legales. Transcurrido ese plazo, se eliminan o se anonimizan.',
    securityTitle: 'Seguridad',
    security: 'Todos los datos se transmiten mediante conexiones cifradas (TLS/HTTPS).',
    updated: 'Última actualización:',
  },
};

export const getDataDeletionCopy = (locale) => copy[locale] || copy.en;
