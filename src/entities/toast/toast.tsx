import { Provider, Root, Title, Description, Viewport, Action } from "@radix-ui/react-toast";
import { Button, useError } from "@weather/shared";
import { FC, memo } from "react";

export const Toast: FC = memo(() => {
  const { isError, message, type, clearError } = useError();

  return (
    <Provider swipeDirection="right">
      <Root
        className="grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-white-1000 p-[15px] shadow-main [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
        open={isError}
        onOpenChange={clearError}
      >
        <Title className="mb-[5px] text-[15px] font-medium [grid-area:_title]">{message}</Title>
        <Description asChild>
          <span className="m-0 text-[13px] leading-[1.3] [grid-area:_description]">Error type {type}</span>
        </Description>
        <Action className="[grid-area:_action]" asChild altText="Goto schedule to undo">
          <Button className="shadow-green7 hover:shadow-green8 focus:shadow-green8 inline-flex h-[25px] items-center justify-center rounded px-[10px] font-medium leading-[25px] shadow-[inset_0_0_0_1px] hover:shadow-[inset_0_0_0_1px] focus:shadow-[0_0_0_2px]">
            Undo
          </Button>
        </Action>
      </Root>
      <Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
    </Provider>
  );
});
