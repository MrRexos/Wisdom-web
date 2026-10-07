/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { APP_DOWNLOAD_PATH, isMobileDevice } from './appLinks';
import { getAppDownloadCopy } from './i18n/appDownloadCopy';
import { useLocale } from './i18n/LocaleContext';
import AppStoreLinks from './AppStoreLinks';
import appQr from './assets/qr-wisdom-app-redondo.svg';
import './GetAppLink.css';

export default function GetAppLink({ children, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const { locale } = useLocale();
  const copy = getAppDownloadCopy(locale);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen) {
      if (dialog.open) dialog.close();
      return;
    }

    const trigger = triggerRef.current;
    dialog.showModal();
    dialog.focus({ preventScroll: true });
    document.documentElement.classList.add('app-download-modal-open');

    return () => {
      document.documentElement.classList.remove('app-download-modal-open');
      trigger?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  function handleClick(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || isMobileDevice(navigator)) return;
    event.preventDefault();
    setIsOpen(true);
  }

  return (
    <>
      <a ref={triggerRef} href={APP_DOWNLOAD_PATH} className={className} onClick={handleClick}>
        {children}
      </a>
      {typeof document !== 'undefined' && createPortal(
        <dialog
          ref={dialogRef}
          className="app-download-dialog"
          aria-label={copy.title}
          tabIndex={-1}
          data-lenis-prevent
          onClose={() => setIsOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) dialogRef.current.close();
          }}
        >
          <div className="app-download-glass">
            <img className="app-download-qr" src={appQr} alt={copy.qrLabel} width="264" height="264" />
            <AppStoreLinks iconsOnly />
          </div>
        </dialog>,
        document.body,
      )}
    </>
  );
}
