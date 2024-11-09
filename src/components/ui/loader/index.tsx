import { type ComponentProps, type FC } from 'react';

// CSS
import './styles.css';

export const Loader: FC<ComponentProps<'div'>> = (props) => {
  return (
    <div {...props}>
      <div className="loader" />
    </div>
  );
};
