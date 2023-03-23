import styles from './reset-password.module.scss';
import { useSelector } from "react-redux";
import { useState, useRef, useCallback, useEffect } from 'react';
import { Form } from '../../components/form/form';
import Loader from '../../components/loader/loader';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword, userSlice } from '../../services/user';
import { useNavigate } from 'react-router-dom';
import { IUserSliceState } from '../../shared/interfaces';
import { useAppDispatch } from '../../services/hooks';

export const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();

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
  
  const [passwordValue, setPasswordValue] = useState('');
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);
  const [codeValue, setCodeValue] = useState('');
  const [isCodeEmpty, setCodeEmpty] = useState(false);
  const codeInputRef = useRef(null);

  const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setCodeEmpty(false);
    }
    setCodeValue(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length !== 0) {
      setPasswordEmpty(false);
    }
    setPasswordValue(e.target.value);
  };

  const validateForm = useCallback(() => {    
    const validFields = {
      password: false,
      code: false
    }

    if (passwordValue.length < 6) {
      if (passwordValue.length === 0) {
        setPasswordEmpty(true);
      }
    } else {
      validFields.password = true;
    }

    if (codeValue.length === 0) {
      setCodeEmpty(true);
    } else {
      validFields.code = true;
    }    

    if (validFields.password && validFields.code) {
      return true;
    } else {
      return false;
    }
  }, [codeValue, passwordValue]);

  const redirectOnSuccess = useCallback(() => {
    navigate('/login', {replace: true});
  }, [navigate])

  const onResetPasswordSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormCorrect = validateForm();
    if(!isFormCorrect) {
      return;
    } else {
      if (!userRequest) {
        dispatch(resetPassword(
          codeValue,
          passwordValue,
          redirectOnSuccess
        ));
      }
    }
  }, [dispatch, codeValue, passwordValue, userRequest, redirectOnSuccess, validateForm]);

  const onLoginClick = () => {
    navigate('/login', {replace: true});
  }

  return(
    <>
      {
        userRequest && 
        !userFailed && (
          <Loader />
      )}
      <div 
        className={styles.reset_password_container + ' fullscreen_message'}>
        {
          userFailed && 
          !userRequest && 
          !userSuccess && (
            <div className='flex_column mb-30'>
              <h2 className='mb-10 text text_type_main-large text_color_inactive'>
                Ошибка восстановления пароля
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
            title='Восстановление пароля'
            actionName='Сохранить'
            onSubmit={onResetPasswordSubmit}
          >
            <div className={isPasswordEmpty ? 'password_error' : ''}>
              <PasswordInput
                onChange={onPasswordChange}
                value={passwordValue}
                name={'password'}
              />
            </div>
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              onChange={onCodeChange}
              value={codeValue}
              name={'code'}
              error={isCodeEmpty}
              ref={codeInputRef}
              errorText={'Поле не может быть пустым'}
              size={'default'}
            />
          </Form>
        )}
        <div className='bottom_navigation mt-4'>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
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

export default ResetPasswordPage;