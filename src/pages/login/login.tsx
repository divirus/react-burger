import { useState, useRef, useCallback, useEffect, Dispatch, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form } from '../../components/form/form';
import Loader from '../../components/loader/loader';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { login, userSlice } from '../../services/user';
import { useNavigate, useLocation } from 'react-router-dom';
import { IUserSliceState } from '../../shared/interfaces';

export const LoginPage = () => {
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
  const location = useLocation();

  const resetError = useCallback(() => {
    dispatch(resetStatus());
  }, [dispatch, resetStatus])

  useEffect(() => {
    resetError();
  }, [resetError])

  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid, setEmailValid] = useState(true);
  const [passwordValue, setPasswordValue] = useState('');
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);

  const emailInputRef = useRef<any>(null);
  const emailRegExp: RegExp = useMemo(() => /.+@.+\.[A-Za-z]+$/, []);

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
      password: false
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

    if (validFields.email && validFields.password) {
      return true;
    } else {
      return false;
    }
  }, [emailValue, passwordValue, emailRegExp]);

  const redirectOnSuccess = useCallback(() => {
    const { from } = location.state || { from: { pathname: "/" } };
    navigate(from, {replace: true});
  }, [navigate, location.state])

  const onLoginSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormCorrect = validateForm();

    if(!isFormCorrect) {
      return;
    } else {
      if (!userRequest) {
        dispatch(login({
          email: emailValue,
          password: passwordValue
        }, redirectOnSuccess));
      }
    }
  }, [dispatch, redirectOnSuccess, validateForm, emailValue, passwordValue, userRequest]);

  const onRegisterClick = () => {
    navigate('/register', {replace: true});
  }

  const onForgotPasswordClick = () => {
    navigate('/forgot-password', {replace: true});
  }

  return(
    <>
      {
        userRequest && 
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
                Ошибка авторизации
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
            title='Вход'
            actionName='Войти'
            onSubmit={onLoginSubmit}
          >
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
            Вы — новый пользователь?
          </p>
          <Button 
            type="secondary"
            size="medium"
            htmlType='button'
            onClick={onRegisterClick}
          >
            Зарегистрироваться
          </Button>
        </div>
        <div className='bottom_navigation mt-4'>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <Button 
            type="secondary"
            size="medium"
            htmlType='button'
            onClick={onForgotPasswordClick}
          >
            Восстановить пароль
          </Button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;