import { useState, useRef, useCallback, useEffect, Dispatch, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Form from '../../components/form/form';
import Loader from '../../components/loader/loader';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { register, userSlice } from '../../services/user';

import { useNavigate, useLocation } from 'react-router-dom';
import { IUserSliceState } from '../../shared/interfaces';

export const RegisterPage = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const {
    userRequest,
    userSuccess,
    userFailed
  } = useSelector(
    (state: {user: IUserSliceState}) => state.user
  );
  const { resetStatus } = userSlice.actions;

  const navigate = useNavigate();

  const resetError = useCallback(() => {
    dispatch(resetStatus());
  }, [dispatch, resetStatus])

  useEffect(() => {
    resetError();
  }, [resetError])

  const [nameValue, setNameValue] = useState('');
  const [isNameEmpty, setNameEmpty] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid, setEmailValid] = useState(true);
  const [passwordValue, setPasswordValue] = useState('');
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const location = useLocation();
  const emailRegExp: RegExp = useMemo(() => /.+@.+\.[A-Za-z]+$/, []);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setNameEmpty(false);
    }
    setNameValue(e.target.value);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (emailRegExp.test(e.target.value)) {
      setEmailValid(true);
    }
    setEmailValue(e.target.value);
  };
  
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length !== 0) {
      setPasswordEmpty(false);
    }
    setPasswordValue(e.target.value);
  };

  const validateForm = useCallback(() => {
    
    const validFields = {
      email: false,
      password: false,
      name: false
    }
    
    if (!emailRegExp.test(emailValue)) {
      setEmailValid(false);
    } else {
      validFields.email = true;
    }
 
    if (passwordValue.length < 6) {
      if (passwordValue.length === 0) {
        setPasswordEmpty(true);
      }
    } else {
      validFields.password = true;
    }

    if (nameValue.length === 0) {
      setNameEmpty(true);
    } else {
      validFields.name = true;
    }

    if (validFields.email && validFields.password && validFields.name) {
      return true;
    } else {
      return false;
    }
  }, [emailValue, passwordValue, nameValue, emailRegExp]);

  const redirectOnSuccess = useCallback(() => {
    const { from } = location.state || { from: { pathname: "/" } };
    navigate(from, {replace: true});
  }, [navigate, location.state])

  const onRegisterSubmit = useCallback((e: Event) => {
    e.preventDefault();
    const isFormCorrect = validateForm();
    if(!isFormCorrect) {
      return;
    } else {
      if (!userRequest) {
        dispatch(register({
          name: nameValue,
          email: emailValue,
          password: passwordValue
        }, redirectOnSuccess))
      }
    }
  }, [dispatch, redirectOnSuccess, validateForm, emailValue, nameValue, passwordValue, userRequest]);

  const onLoginClick = () => {
    navigate('/login', {replace: true})
  }

  return(
    <>
      {
        (userRequest) && 
        !userFailed && (
          <Loader />
      )}
      <div className='fullscreen_message'>
        {
          userFailed && 
          !userRequest && 
          !userSuccess && (
            <div className='flex_column mb-30'>
              <h2 className='mb-10 text text_type_main-large text_color_inactive'>
                Ошибка при регистрации
              </h2>
              <Button 
                type="primary"
                size="medium"
                htmlType='button'
                onClick={resetError}
              >
                Попробовать снова
              </Button>
            </div>
        )}
        {
          !userFailed && (
          <Form
            title='Регистрация'
            actionName='Зарегистрироваться'
            onSubmit={onRegisterSubmit}
          >
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onNameChange}
              value={nameValue}
              name={'name'}
              error={isNameEmpty}
              ref={nameInputRef}
              errorText={'Поле не может быть пустым'}
              size={'default'}
            />
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={onEmailChange}
              value={emailValue}
              name={'email'}
              error={!isEmailValid}
              ref={emailInputRef}
              errorText={'Неправильно введен e-mail'}
              size={'default'}
            />
            <div className={isPasswordEmpty ? 'password_error' : ''}>
              <PasswordInput
                onChange={onPasswordChange}
                value={passwordValue}
                name={'password'}
              />
            </div>
          </Form>
        )}
        <div className='bottom_navigation'>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>
          <Button 
            type="secondary"
            size="medium"
            htmlType='button'
            onClick={onLoginClick}
          >
            Войти
          </Button>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;