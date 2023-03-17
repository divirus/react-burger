import { useRef, useEffect, useState, Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import styles from './draggable-element.module.scss';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { burgerConstructorSlice } from '../../services/recipe/burger-constructor';
import { itemsSlice } from '../../services/recipe/items';
import { IIngridientsData } from '../../shared/interfaces';

type DraggableElementType = {
  item: IIngridientsData,
  index: number
}

function DraggableElement({ item, index }: DraggableElementType) {
  const dispatch: Dispatch<any> = useDispatch();
  const dndItemRef = useRef<any>();
  const { decreaseQuantityValue } = itemsSlice.actions;
  const { moveIngredient, deleteIngredient } = burgerConstructorSlice.actions
  const [isItemHigher, setIsItemHigher] = useState(false);
  const [isItemLower, setIsItemLower] = useState(false);

  const [{targetId, isItemHover, offset}, dropItemTarget] = useDrop({
      accept: 'sortedIngredient',
      drop() {
          return ({index});
      },
      collect: monitor => ({
          targetId: monitor.getHandlerId(),
          isItemHover: monitor.isOver(),
          offset: monitor.getDifferenceFromInitialOffset()
      })
    });

  const [{sourceId, isItemDragging}, dragItemSource] = useDrag({
      type: 'sortedIngredient',
      item: item,
      collect: monitor => ({
          sourceId: monitor.getHandlerId(),
          isItemDragging: monitor.isDragging()
      }),
      end(item, monitor: DragSourceMonitor) {
        if(monitor.didDrop()) {
          dispatch(moveIngredient({
            oldIndex: index,
            newIndex: monitor.getDropResult<any>().index
          }));
        }
      }
  });

  const handleItemDelete = (itemId: string, index: number) => {   
    dispatch(deleteIngredient(index));
    dispatch(decreaseQuantityValue(itemId));
};

useEffect(() => {
  if(!!offset) {
    setIsItemHigher(offset.y < 0);
    setIsItemLower(offset.y > 0);    
  }
}, [offset, setIsItemHigher, setIsItemLower]);

dragItemSource(dropItemTarget(dndItemRef))

  return (
      <>
        <li className={`${styles.draggable_list_item} ${isItemDragging ? styles.dragged : null} ${isItemHover && isItemHigher ? 
            (
                styles.levelUp
            ) : isItemHover && isItemLower ? 
            (
                styles.levelDown
            ) : null }`}
            ref={dndItemRef}
            data-source-id={sourceId}
            data-target-id={targetId}
        >
            <span className={styles.drag_icon}>
                <DragIcon type='primary' />
            </span>
            <ConstructorElement 
                text={item.name || ''}
                thumbnail={item.image || ''}
                price={item.price || 0}
                handleClose={() => 
                  item?._id && handleItemDelete(item?._id, index)
                }
            />
        </li>
      </>
  )
}

export default DraggableElement