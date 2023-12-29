import styles from "./Modal.module.scss";

import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import Form from "@/components/Form/Form";


export default function Modal({ onClose }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const handleWrapperClick = (event) => {
      const { target } = event;

      if (target instanceof Node && rootRef.current === target) {
        onClose?.();
      }
    };

    const handleEscapePress = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('click', handleWrapperClick);
    window.addEventListener('keydown', handleEscapePress);

    return () => {
      window.removeEventListener('click', handleWrapperClick);
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, [onClose]);

  const modalContent = (
    <div className={ styles[ "modal-overlay" ] } ref={rootRef}>
      <div className={ styles[ "modal" ] }>
        <h1 className={ styles[ "modal__title" ] }>Стать партнёром проекта</h1>
        <Form onClose={onClose}/>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById( "modal-root" )
  );
}

