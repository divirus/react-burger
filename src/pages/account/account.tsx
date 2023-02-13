import { useState, useRef, useEffect, Dispatch, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styles from './account.module.scss';
import Form from '../../components/form/form';
import Sidebar from '../../components/login-sidebar/login-sidebar';
import Loader from '../../components/loader/loader';
import { Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser, setUser, userSlice } from '../../services/user';
import { IUserSliceState } from '../../shared/interfaces';

export const ProfilePage = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const {
    user,
    userRequest,
    userSuccess,
    userFailed
  } = useSelector(
    (state: {user:IUserSliceState}) => state.user
  );

  const { resetStatus } = userSlice.actions
  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const resetError = useCallback(() => {
    dispatch(resetStatus());
  }, [dispatch, resetStatus])

  useEffect(() => {
    if (userFailed) {
      resetError();
    }
    
    if (!userRequest && !userSuccess) {
      dispatch(getUser());
    }
  }, [dispatch, userFailed, userRequest, userSuccess, resetError])

  useEffect(() => {
    setNameValue(user.name);
    setEmailValue(user.email);
    setPasswordValue(user.password);
  }, [user, setNameValue, setEmailValue, setPasswordValue]);

  const [isNameInputDisabled, setNameInputDisabled] = useState(true)
  const [isNameInputEmpty, setNameInputEmpty] = useState(false)
  const [isPasswordInputDisabled, setPasswordInputDisabled] = useState(true)
  const [isPasswordInputEmpty, setPasswordInputEmpty] = useState(false)
  const [hasFormChanged, setFormChanged] = useState(false)

  const nameInputRef = useRef<any>(null)
  const passwordInputRef = useRef<any>(null)

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setNameInputEmpty(false);
    }
    setNameValue(e.target.value);
    setFormChanged(true);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setPasswordInputEmpty(false);
    }
    setPasswordValue(e.target.value);
    setFormChanged(true);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
    setFormChanged(true);
  };

  const onNameIconClick = () => {
    nameInputRef.current.focus();
    setNameInputDisabled(false);
  }

  const onPasswordIconClick = () => {
    passwordInputRef.current.focus();
    setPasswordInputDisabled(false);
  }

  const onNameInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setNameInputEmpty(true);
    }
    setNameInputDisabled(true);
  }

  const onPasswordInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setPasswordInputEmpty(true);
    }
    setPasswordInputDisabled(true);
  }

  const onSubmitChanges = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    if (!userRequest) {
      dispatch(setUser({
        name: nameValue,
        email: emailValue,
        password: passwordValue
      }));
    }
    setFormChanged(false);
  }

  const onCancelChanges = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setNameValue(user.name);
    setEmailValue(user.email);
    setPasswordValue(user.password);
    setFormChanged(false);
  }

  return(
    <>
      {
          userRequest && 
          !userFailed && 
          !userSuccess && (
            <Loader />
        )}
      <div className={styles.profile_container + ' mt-30'}>
        <Sidebar />
        <div className={styles.form_container}>
          {
            userFailed && 
            !userRequest && 
            !userSuccess && (
              <h2 className='ml-30 text text_type_main-large text_color_inactive'>
                Ошибка загрузки
              </h2>
          )}
          {
            userSuccess && 
            !userFailed && 
            !userRequest && (
              <Form onSubmit={onSubmitChanges}>
                <Input
                  type={'text'}
                  placeholder={'Имя'}
                  onChange={onNameChange}
                  value={nameValue}
                  name={'name'}
                  error={isNameInputEmpty}
                  ref={nameInputRef}
                  errorText={'Поле не может быть пустым'}
                  size={'default'}
                  icon={'EditIcon'}
                  onIconClick={onNameIconClick}
                  disabled={isNameInputDisabled}
                  onBlur={onNameInputBlur}
                />
                <EmailInput
                  onChange={onEmailChange}
                  value={emailValue}
                  name={'email'}
                  size={'default'}
                />            
                <Input
                  type={'password'}
                  placeholder={'Пароль'}
                  onChange={onPasswordChange}
                  value={passwordValue}
                  name={'password'}
                  error={isPasswordInputEmpty}
                  ref={passwordInputRef}
                  errorText={'Поле не может быть пустым'}
                  size={'default'}
                  icon={'EditIcon'}
                  onIconClick={onPasswordIconClick}
                  disabled={isPasswordInputDisabled}
                  onBlur={onPasswordInputBlur}
                />
                {hasFormChanged && 
                  <div className={styles.buttons_container}>
                    <Button 
                      type="secondary"
                      size="medium"
                      htmlType='button'
                      onClick={onCancelChanges}
                    >
                      Отменить
                    </Button>
                    <Button 
                      type="primary"
                      size="medium"
                      htmlType='submit'
                    >
                      Сохранить
                    </Button>
                  </div>
                }
              </Form>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;