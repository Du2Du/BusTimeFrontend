import React from "react";
import styles from "./Footer.module.scss";
import { BsGithub } from "react-icons/bs";
import { IoLogoInstagram } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";

export const Footer: React.FC = () => {
  const githubUrl = "https://github.com/Du2Du";
  const instagramUrl = "https://www.instagram.com/eduardoaraujo089/";

  //Método que redireciona para minha rede social
  const redirectSocial = (url: string) => () => {
    open(url);
  };

  return (
    <footer className={styles.footer}>
      <p>Site Criado por</p>
      <div className={`${styles.social} mt-1`}>
        <p className="mx-1">@Du2Du</p>
        <BsGithub
          className={`${styles.hide} mx-1 cursor-pointer`}
          onClick={redirectSocial(githubUrl)}
          size={23}
        />
        <IoLogoInstagram
          className={`${styles.hide} mx-1 cursor-pointer`}
          onClick={redirectSocial(instagramUrl)}
          size={23}
        />
        <div className="flex">
          <HiOutlineMail className={`${styles.hide} mx-1`} size={23} />
          <p className={styles.hide}>eduardohilario.eha@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};
