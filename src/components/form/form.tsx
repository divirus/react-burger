import styles from './form.module.scss';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

function Form(props: any) {
  return(
    <form className={styles.form_container} autoComplete="on">
      {props.title &&
        <label className="text text_type_main-medium">
          {props.title}
        </label>
      }
      {props.children}
      {
        props.actionName &&
          <Button type="primary" size="medium" htmlType='button' onClick={props.onClick}>
            {props.actionName}
          </Button>
        }
    </form>
  );
}

export default Form;