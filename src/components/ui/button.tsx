import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { buttonVariants, type IButtonProps } from '../../constants/buttons';
import cn from '../../lib/utils';

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';

export { Button };
