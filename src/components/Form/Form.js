"use client";

import styles from "./Form.module.scss";

import { useEffect, useRef } from "react";
import Image from "next/image";

import Button from "@/components/Button/Button";
import { useForm } from "@/services/useForm";

const phoneRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Form({ onClose }) {
  const nameRef = useRef();

  const {
    handleSubmit, handleChange,
    onFileChange,
    handleOnBlur, handleOnFocus, handleReset, data, errors, valid
  } = useForm( {
    validations: {
      name: {
        required: {
          value: true,
          message: "Пожалуйста, заполните это поле",
        },
      },
      phone: {
        required: {
          value: true,
          message: "Пожалуйста, заполните это поле",
        },
        pattern: {
          value: phoneRegExp,
          message: "Введите корректное значение",
        },
      },
      email: {
        required: {
          value: true,
          message: "Пожалуйста, заполните это поле",
        },
        pattern: {
          value: emailRegExp,
          message: "Введите корректное значение",
        },
      },
      file: {
        required: {
          value: true,
          message: "Пожалуйста, выберите файл",
        },
      },
    },
  } );

  useEffect( () => {
    if( valid ) {
      const timer = setTimeout( () => {
        onClose?.();
      }, 2000 );

      clearTimeout( timer );
    }
  }, [ valid ] );

  return (
    <form className={ styles.form } onSubmit={ handleSubmit }>
      <div className={ styles[ "form__item-wrap" ] }>

        <div className={ styles[ "form__item" ] }>
          <label className={ `${ styles[ "form__libel" ] } ${ styles[ "form__libel--required" ] }` } htmlFor="name">
            Название организации
          </label>
          <input
            ref={ nameRef }
            type="text"
            className={ styles[ "form_input" ] }
            id="name"
            name="name"
            placeholder="ООО Ромашка"
            value={ data.name || "" }
            onChange={ handleChange( "name" ) }
            onBlur={ (e) => handleOnBlur( e ) }
            onFocus={ (e) => {
              handleOnFocus( e );
            } }
          />
        </div>
        {
          errors.name && <p className={ `error ${ styles[ "form__error" ] }` }>{ errors.name }</p>
        }

        <div className={ styles[ "form__item" ] }>
          <label className={ `${ styles[ "form__libel" ] } ${ styles[ "form__libel--required" ] }` } htmlFor="phone">
            Телефон
          </label>
          <input
            type="tel"
            className={ styles[ "form_input" ] }
            id="phone"
            name="phone"
            placeholder="+7 933 848-34-33"
            value={ data.phone || "" }
            onChange={ handleChange( "phone" ) }
            onBlur={ (e) => handleOnBlur( e ) }
            onFocus={ (e) => {
              handleOnFocus( e );
            } }
          />

        </div>
        {
          errors.phone && <p className={ `error ${ styles[ "form__error" ] }` }>{ errors.phone }</p>
        }

        <div className={ styles[ "form__item" ] }>
          <label className={ `${ styles[ "form__libel" ] } ${ styles[ "form__libel--required" ] }` } htmlFor="email">
            E-mail
          </label>
          <input
            type="email"
            className={ styles[ "form_input" ] }
            id="email"
            name="email"
            placeholder="mail@mail.ru"
            value={ data.email || "" }
            onChange={ handleChange( "email" ) }
            onBlur={ (e) => handleOnBlur( e ) }
            onFocus={ (e) => {
              handleOnFocus( e );
            } }
          />
        </div>
        {
          errors.email && <p className={ `error ${ styles[ "form__error" ] }` }>{ errors.email }</p>
        }
      </div>

      <div className={ `${ styles[ "form__item--file" ] }` }>
        <label
          className={ `${ styles[ "form__libel" ] } ${ styles[ "form__libel-file" ] } ${ styles[ "form__libel--required" ] }  ` }
          htmlFor="file"
        >Логотип (jpeg, png)
          <div className={ styles[ "form__avatar-wrap" ] }>
            <Image
              src="/images/avatar.jpg"
              className={ styles[ "form__avatar-img" ] }
              fill
              sizes="163px"
              alt="Аватар пользователя"
            />
            <div className={ styles[ "form__avatar-shading" ] }><p
              className={ styles[ "form__avatar-text" ] }
            >Выберите<br /> файл</p></div>
          </div>
        </label>
        {
          errors.file &&
          <p className={ `error ${ styles[ "form__error" ] } ${ styles[ "form__error--margin" ] }` }>{ errors.file }</p>
        }
        <input
          id="file"
          name="file"
          type="file"
          accept="image/png, image/jpeg"
          className={ styles[ "form_input-file" ] }
          onChange={ onFileChange }
        />
      </div>

      <div className={ `${ styles[ "form__item" ] } ${ styles[ "form__item--relative" ] }` }>
        <label
          className={ `${ styles[ "form__libel" ] } ${ styles[ "form__libel--required" ] }` } htmlFor="activity"
        >
          Направление
        </label>
        <select
          name="activity"
          id="activity"
          className={ styles[ "form_select" ] }
          value={ data.activity || "ecology" }
          onChange={ handleChange( "activity" ) }
          required
        >
          {
            errors.activity && <p className={ `error ${ styles[ "form__error" ] }` }>{ errors.activity }</p>
          }
          <option value="ecology">Экология</option>
          <option value="programming">Программирование</option>
          <option value="art">Искусство</option>
        </select>
      </div>

      <div className={ `${ styles[ "form__item" ] } ${ styles[ "form__item--relative" ] }` }>
        <input
          type="text"
          className={ `${ styles[ "form_input" ] } ${ styles[ "globe" ] }` }
          placeholder="avc.ru"
          name="site"
          value={ data.site || "" }
          onChange={ handleChange( "site" ) }
        />
      </div>

      <div className={ `${ styles[ "form__item" ] } ${ styles[ "form__item--relative" ] }` }>
        <input
          type="text"
          className={ `${ styles[ "form_input" ] } ${ styles[ "vk" ] }` }
          placeholder="vk.com/shans"
          name="vk"
          value={ data.vk || "" }
          onChange={ handleChange( "vk" ) }
        />
      </div>

      <div className={ `${ styles[ "form__item" ] } ${ styles[ "form__item--relative" ] }` }>
        <input
          type="text"
          className={ `${ styles[ "form_input" ] } ${ styles[ "classmates" ] }` }
          placeholder="ok.com/shans"
          name="classmates"
          value={ data.classmates || "" }
          onChange={ handleChange( "classmates" ) }
        />
      </div>

      <div className={ `${ styles[ "form__item" ] } ${ styles[ "form__item--relative" ] }` }>
        <input
          type="text"
          className={ `${ styles[ "form_input" ] } ${ styles[ "facebook" ] }` }
          placeholder="facebook.com/shans"
          name="facebook"
          value={ data.facebook || "" }
          onChange={ handleChange( "facebook" ) }
        />
      </div>

      <div className={ `${ styles[ "form__item" ] } ${ styles[ "form__item--relative" ] }` }>
        <input
          type="text"
          className={ `${ styles[ "form_input" ] } ${ styles[ "instagram" ] }` }
          placeholder="instagram.com/shans"
          name="instagram"
          value={ data.instagram || "" }
          onChange={ handleChange( "instagram" ) }
        />
      </div>

      <div className={ `${ styles[ "form__item" ] } ${ styles[ "form__item--relative" ] }` }>
        <input
          type="text"
          className={ `${ styles[ "form_input" ] } ${ styles[ "youtube" ] }` }
          placeholder="youtube.com/shans"
          name="youtube"
          value={ data.youtube || "" }
          onChange={ handleChange( "youtube" ) }
        />
      </div>

      <div className={ styles[ "form__item" ] }>
        <label className={ styles[ "form__libel" ] } htmlFor="director">
          Руководитель
        </label>
        <input
          type="text"
          className={ styles[ "form_input" ] }
          id="director"
          placeholder="Иванов Иван Иванович"
          name="director"
          value={ data.director || "" }
          onChange={ handleChange( "director" ) }
        />
      </div>

      <Button type="submit" text="Стать партнёром проекта" btnClass={ styles[ "form__btn" ] } />
      <Button type="reset" text=" Отменить" btnClass="button--reset" func={ handleReset } />
      {
        valid && <p className={ `success ${ styles[ "form__success" ] }` }>Ваша заявка отправлена!</p>
      }
    </form>
  );
}