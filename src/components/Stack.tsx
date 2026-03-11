import { forwardRef, type HTMLAttributes } from 'react';

type StackDirection = 'row' | 'column';
type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
type StackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  /** Flex direction */
  direction?: StackDirection;
  /** Align items */
  align?: StackAlign;
  /** Justify content */
  justify?: StackJustify;
  /** Gap between children */
  gap?: StackGap;
  /** Wrap children */
  wrap?: boolean;
  /** Additional CSS classes */
  className?: string;
};

const directionClasses: Record<StackDirection, string> = {
  row: 'flex-row',
  column: 'flex-col',
};

const alignClasses: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyClasses: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const gapClasses: Record<StackGap, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'column',
      align = 'stretch',
      justify = 'start',
      gap = 'md',
      wrap = false,
      className = '',
      children,
      ...props
    },
    ref,
  ) => {
    const classes = [
      'flex',
      directionClasses[direction],
      alignClasses[align],
      justifyClasses[justify],
      gapClasses[gap],
      wrap ? 'flex-wrap' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  },
);

Stack.displayName = 'Stack';
