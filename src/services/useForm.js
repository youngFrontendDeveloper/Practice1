"use client";

import { useState } from "react";

export const useForm = (options) => {
  const [ data, setData ] = useState( ( {} ) );
  const [ errors, setErrors ] = useState( {} );
  const [ valid, setValid ] = useState( false );
  const validations = options?.validations;
  const newErrors = {};

  // Получение данных
  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setData( {
      ...data,
      [ key ]: value,
    } );
  };

  // Получение данных о выбранном изображении
  const onFileChange = async(e) => {

    if( !e.target.files ) {
      newErrors[ "file" ] = "Выберите файл";
      setErrors( { ...errors, ...newErrors } );
      return;

    } else if( e.target.files[ 0 ].size > 625000 ) {
      const size = ( e.target.files[ 0 ].size / 1048576 ).toFixed( 2 );
      newErrors[ "file" ] = `Размер файла ${ size }Мб превышает 5Мб. Выберите другой файл`;
      setErrors( { ...errors, ...newErrors } );
      e.target.value = "";
      return;

    } else if( e.target.files[ 0 ].type !== "image/jpeg" && e.target.files[ 0 ].type !== "image/png" ) {
      newErrors[ "file" ] = "Формат файла должен быть JPG/JPEG или PNG";
      setErrors( { ...errors, ...newErrors } );
      e.target.value = "";
      return;
    }

    setData( {
      ...data,
      file: e.target.files[ 0 ],
    } );
    newErrors[ "file" ] = "";
    setErrors( { ...errors, ...newErrors } );
  };

  // Убираем ошибку при фокусе на поле
  const handleOnFocus = (e) => {
    setErrors( { ...errors, [ e.target.name ]: "" } );
  };

  // Показываем ошибку, если поле не заполнено и ушли с него
  const handleOnBlur = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const validation = validations[ key ];
    const pattern = validation?.pattern;

    if( validation?.required?.value && !value ) {
      setErrors( { ...errors, [ key ]: validation?.required?.message } );
      return;
    } else {
      setErrors( { ...errors, [ key ]: "" } );
    }

    if( pattern?.value && !RegExp( pattern.value ).test( value ) ) {
      setErrors( { ...errors, [ key ]: pattern.message } );
    } else {
      setErrors( { ...errors, [ key ]: "" } );
    }
  };

  //  Проверка формы при нажатии на кнопку "Отправить"
  const handleSubmit = async(e) => {
    e.preventDefault();

    if( validations ) {
      setValid( true );

      for( const key in validations ) {
        const value = data[ key ];
        const validation = validations[ key ];
        const pattern = validation?.pattern;

        if( validation?.required?.value && !value ) {
          setValid( false );
          newErrors[ key ] = validation?.required?.message;
          setErrors( { ...errors, ...newErrors } );

        } else if( pattern?.value && !RegExp( pattern.value ).test( value ) ) {
          setValid( false );
          newErrors[ key ] = pattern.message;
          setErrors( { ...errors, ...newErrors } );

        } else {
          setErrors( { ...errors, [ key ]: "" } );
        }
      }

      if( !valid ) {
        setErrors( { ...newErrors } );
        return;
      }

      setErrors( {} );

      if( options?.onSubmit ) {
        options.onSubmit();
      }
    }
  };

  const handleReset = () => {
    setData( {} );
  };

  return {
    data,
    handleChange,
    onFileChange,
    handleSubmit,
    handleOnBlur,
    handleOnFocus,
    handleReset,
    errors,
    valid
  };
};

