import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import Loader from '../../components/loader/loader';

export const IngredientPage = () => {
  const {
    items,
    itemsPendingStatus
  } = useSelector(
    (state: any) => state.items
  );

  const { id } = useParams();

  return (
    <>
    {
      itemsPendingStatus === 'loading' && (
        <Loader />
    )}
    {
      itemsPendingStatus === 'error' && (
        <h2 className='fullscreen_message text text_type_main-large text_color_inactive'>
          Ошибка загрузки
        </h2>
    )}
    {
      itemsPendingStatus === 'success' && (
        <div className='fullscreen_message'>
          <p className="text text_type_main-large">
            Детали ингредиента
          </p>
          <IngredientDetails
            ingredient={items.find((item: any) => item._id === id)}
          />
        </div>
      )}
  </>
  );
}

export default IngredientPage;