import styles from './form.module.scss';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

function Form(props: any) {
  return(
    <form className={styles.form_container} autoComplete="on" onSubmit={props.onSubmit}>
      {props.title &&
        <label className="text text_type_main-medium">
          {props.title}
        </label>
      }
      {props.children}
      {
        props.actionName &&
          <Button type="primary" size="medium" htmlType='submit'>
            {props.actionName}
          </Button>
        }
    </form>
  );
}

export default Form;