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

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      if (!popupRef.current) return;

      const allElements = popupRef.current.querySelectorAll(focusableSelectors);

      const activeFocusableElements = Array.from(allElements).filter(
        (el) => !el.disabled && el.tabIndex !== -1,
      );

      if (activeFocusableElements.length === 0) return;

      const firstElement = activeFocusableElements[0];
      const lastElement =
        activeFocusableElements[activeFocusableElements.length - 1];

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
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocus) previousFocus.focus();
    };
  }, []);

  return (
    <div className='popup'>
      <div
        className='popup__content'
        ref={popupRef}
        role='dialog'
        aria-modal='true'
      >
        <div className='form__close-button' onClick={onClose}>
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
