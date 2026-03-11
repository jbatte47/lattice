import { forwardRef, type HTMLAttributes } from 'react';

type CardVariant = 'default' | 'glass' | 'outlined';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  /** Visual style variant */
  variant?: CardVariant;
  /** Enable hover lift effect */
  interactive?: boolean;
  /** Additional CSS classes */
  className?: string;
};

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-bg-surface-raised border border-border-subtle shadow-elevation-raised',
  glass: ['bg-bg-surface-default/[0.03] border border-border-subtle/50', 'backdrop-blur-xl'].join(
    ' ',
  ),
  outlined: 'bg-transparent border border-border-subtle',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', interactive = false, className = '', children, ...props }, ref) => {
    const classes = [
      'rounded-2xl p-6',
      'transition-all duration-250 ease-out',
      variantClasses[variant],
      interactive
        ? 'hover:-translate-y-1 hover:shadow-elevation-overlay hover:border-border-strong cursor-pointer'
        : '',
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

Card.displayName = 'Card';
