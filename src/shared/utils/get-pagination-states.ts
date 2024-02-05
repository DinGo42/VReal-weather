type PaginationProps = {
  arrayFormPagination: unknown[];
  maxItemsInRow: number;
  itemHeight: number;
  screensToConsider: number;
};

export const getPaginationStates = ({
  arrayFormPagination,
  itemHeight,
  maxItemsInRow,
  screensToConsider,
}: PaginationProps) => {
  const arrayLength = arrayFormPagination.length;
  const screenHeight = window.innerHeight;
  const maxElementsPerPage = (Math.ceil(screenHeight * screensToConsider) / itemHeight) * maxItemsInRow;
  const maxPaginationPages = Math.ceil(arrayLength / maxElementsPerPage);

  return {
    maxElementsPerPage,
    maxPaginationPages,
  };
};
