import { forwardRef, type HTMLAttributes } from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Additional CSS classes */
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-bg-surface-muted text-text-secondary border border-border-subtle',
  success: 'bg-intent-success/10 text-intent-success border border-intent-success/20',
  warning: 'bg-intent-warning/10 text-intent-warning border border-intent-warning/20',
  danger: 'bg-intent-danger/10 text-intent-danger border border-intent-danger/20',
  info: 'bg-intent-info/10 text-intent-info border border-intent-info/20',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    const classes = [
      'inline-flex items-center gap-1.5',
      'rounded-full px-3 py-1',
      'text-xs font-semibold uppercase tracking-wider',
      variantClasses[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
