import { type ComponentProps } from "react";
import { useInView } from "react-intersection-observer";

type InfiniteScrollContainerProps = ComponentProps<"div"> & {
  onBottomReached?: () => void;
};

export const InfiniteScrollContainer = ({
  children,
  onBottomReached,
  ...props
}: InfiniteScrollContainerProps) => {
  const { ref } = useInView({
    rootMargin: "200px",
    threshold: 1,
    onChange(inView) {
      if (inView) {
        onBottomReached?.();
      }
    },
  });

  return (
    <div {...props}>
      {children}
      <div ref={ref} />
    </div>
  );
};
