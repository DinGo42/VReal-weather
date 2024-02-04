import { useAppDispatch, useAppSelector } from "../hooks";
import { createError as createErrorState, clearError as clearErrorState } from "../store";

export const useErrorStore = () => {
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
