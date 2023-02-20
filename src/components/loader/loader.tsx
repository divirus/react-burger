import styles from './loader.module.scss';
import logo from '../../images/doneIcon.svg'

function Loader() {
  return(
    <div className={styles.loader}>
      <img src={logo} alt='' title ='' className={styles.spinner} />
    </div>
  );
}

export default Loader;