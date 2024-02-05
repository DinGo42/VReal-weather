import {
  createError as createErrorState,
  clearError as clearErrorState,
  useAppDispatch,
  useAppSelector,
} from "../store";

export const useError = () => {
  const { isError, message, type } = useAppSelector((state) => state.errorReducer);
  const dispatch = useAppDispatch();
  const createError = (value: ReturnType<typeof createErrorState>["payload"]) => dispatch(createErrorState(value));

  const clearError = () => dispatch(clearErrorState());
  return {
    isError,
    message,
    type,
    createError,
    clearError,
  };
};
