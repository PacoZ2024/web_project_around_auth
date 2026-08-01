import { useEffect, useRef } from 'react';
import CloseButton from '../../../../assets/images/Close_button.svg';

export default function Popup(props) {
  const { onClose, children } = props;
  const popupRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const focusableSelectors =
      'a[href], area[href], input, select, textarea, button, iframe, object, embed, [tabindex="0"], [contenteditable]';
    const popupElement = popupRef.current;

    if (popupElement) {
      const allElements = popupElement.querySelectorAll(focusableSelectors);
      const firstEnabled = Array.from(allElements).find((el) => !el.disabled);
      if (firstEnabled) firstEnabled.focus();
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;
      if (!popupRef.current) return;

      const allElements = popupRef.current.querySelectorAll(focusableSelectors);
      const activeElements = Array.from(allElements).filter(
        (el) => !el.disabled && el.tabIndex !== -1,
      );

      if (activeElements.length === 0) return;

      const firstElement = activeElements[0];
      const lastElement = activeElements[activeElements.length - 1];

      if (activeElements.length === 1) {
        e.preventDefault();
        firstElement.focus();
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }

    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      if (previousFocus) previousFocus.focus();
    };
  }, [onClose]);

  function handleClosePopup(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      onClose();
    }
  }

  return (
    <div className='popup'>
      <div
        className='popup__content'
        ref={popupRef}
        role='dialog'
        aria-modal='true'
      >
        <div
          className='form__close-button'
          tabIndex={0}
          onKeyDown={handleClosePopup}
          onClick={onClose}
        >
          <img
            className='form__label-close-button'
            src={CloseButton}
            alt='Botón para cerrar el formulario'
          />
        </div>
        {children}
      </div>
    </div>
  );
}
