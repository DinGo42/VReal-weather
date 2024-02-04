import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { createError as createErrorState, clearError as clearErrorState } from "../store";

export const useErrorStore = () => {
  const { isError, message, type } = useAppSelector((state) => state.errorReducer);
  const dispatch = useAppDispatch();
  const createError = useCallback(
    (value: ReturnType<typeof createErrorState>["payload"]) => dispatch(createErrorState(value)),
    [dispatch],
  );
  const clearError = useCallback(() => dispatch(clearErrorState()), [dispatch]);
  return {
    isError,
    message,
    type,
    createError,
    clearError,
  };
};
