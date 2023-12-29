import styles from "./Close.module.scss"
import Image from "next/image";

export default function Close({onClick}){
  return (
    <div className={styles["close"]}>
      <Image
        onClick={onClick}
        src="/images/close.svg"
        alt="Закрыть окно"
        width={40}
        height={40}
        className={styles["close__icon"]}
      />
    </div>
  )
}