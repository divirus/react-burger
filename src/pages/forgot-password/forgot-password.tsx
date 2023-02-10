import { useState, useRef, useCallback, useEffect, Dispatch, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Form from '../../components/form/form';
import Loader from '../../components/loader/loader';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPassword, userSlice } from '../../services/user';
import { useNavigate } from 'react-router-dom';
import { IUserSliceState } from '../../shared/interfaces';

export const ForgotPasswordPage = () => {
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

  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid, setEmailValid] = useState(true);
  const emailInputRef = useRef<any>(null);
  const emailRegExp: RegExp = useMemo(() => /.+@.+\.[A-Za-z]+$/, []);

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (emailRegExp.test(e.target.value)) {
      setEmailValid(true);
    }
    setEmailValue(e.target.value);
  };

  const validateForm = useCallback(() => {
    const validFields = {
      email: false
    }

    if (!emailRegExp.test(emailValue)) {
      setEmailValid(false);
    } else {
      validFields.email = true;
    }

    if (validFields.email) {
      return true;
    } else {
      return false;
    }
  }, [emailRegExp, emailValue])

  const redirectOnSuccess = useCallback(() => {
    navigate('/reset-password', { 
      replace: true,
      state: { from: '/forgot-password' }
    })
  }, [navigate])

  const onResetPasswordClick = useCallback((e: Event) => {
    e.preventDefault();
    const isFormCorrect = validateForm();
    if(!isFormCorrect) {
      return;
    } else {
      if (!userRequest) {
        dispatch(forgotPassword(emailValue, redirectOnSuccess));
      }
    }
  }, [dispatch, emailValue, userRequest, redirectOnSuccess, validateForm]);

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
      <div className='fullscreen_message'>
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
            actionName='Восстановить'
            onClick={onResetPasswordClick}
          >
            <Input
              type={'email'}
              placeholder={'Укажите e-mail'}
              onChange={onEmailChange}
              value={emailValue}
              name={'email'}
              error={!isEmailValid}
              ref={emailInputRef}
              errorText={'Неправильно введен e-mail'}
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
export default ForgotPasswordPage;