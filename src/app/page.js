"use client";

import styles from "./page.module.scss";
import Modal from "@/components/Modal/Modal";
import { useState } from "react";
import Button from "@/components/Button/Button";

export default function Home() {
  const [ isOpen, setOpen ] = useState( false );

  const handleToggleModal = () => {
    setOpen( !isOpen );
  };

  const handleClose = () => {
    setOpen( false );
  };

  return (
    <section className={ styles.home }>
      <h1 className={ styles[ "home__title" ] }>Тестовое задание</h1>
      <Button text="Стать участником проекта" btnClass={styles[ "home__btn" ]} func={handleToggleModal}/>
      {
        isOpen && <Modal onClose={ handleClose } />
      }
    </section>
  );
}
