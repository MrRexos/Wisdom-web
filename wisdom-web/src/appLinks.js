export const APP_DOWNLOAD_PATH = '/app';
export const APP_DOWNLOAD_URL = `https://wisdomapp.es${APP_DOWNLOAD_PATH}`;
export const IOS_APP_STORE_URL = 'https://apps.apple.com/app/id6737240739';
export const ANDROID_PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.anonymous.Wisdom_expo';

export function getDeviceStoreUrl({
  userAgent = '',
  platform = '',
  maxTouchPoints = 0,
  userAgentData,
} = {}) {
  if (/android/i.test(userAgent) || userAgentData?.platform === 'Android') {
    return ANDROID_PLAY_STORE_URL;
  }

  // Safari en iPadOS puede identificarse como un Mac al solicitar la web de escritorio.
  const isDesktopIPad = (platform === 'MacIntel' || /Macintosh/i.test(userAgent))
    && maxTouchPoints > 1;

  if (/iPhone|iPad|iPod/i.test(userAgent) || isDesktopIPad) {
    return IOS_APP_STORE_URL;
  }

  return null;
}
