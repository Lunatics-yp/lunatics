import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from 'client/src/stores/store';

// Для взаимодействия со store используем кастомные типизированные хуки.

/**
 * Добавить данные в store.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
/**
 * Получить данные из store.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
