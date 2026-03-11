import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type Ref } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type CommonProps = {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Full width button */
  fullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
};

export type ButtonProps = CommonProps &
  (
    | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
    | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  );

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-intent-primary text-on-intent',
    'hover:bg-intent-primary-hover hover:-translate-y-0.5',
    'hover:shadow-elevation-raised',
    'focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
    'active:translate-y-0',
  ].join(' '),
  secondary: [
    'bg-bg-surface-raised text-text-primary',
    'border border-border-subtle',
    'hover:bg-bg-layer-2 hover:border-border-strong',
    'focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
  ].join(' '),
  ghost: [
    'text-text-secondary bg-transparent',
    'hover:text-text-primary hover:bg-bg-surface-muted',
    'focus-visible:ring-2 focus-visible:ring-focus',
  ].join(' '),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-base gap-2',
  lg: 'px-7 py-3.5 text-lg gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', fullWidth = false, className = '', children, ...rest },
    ref,
  ) => {
    const classes = [
      'inline-flex items-center justify-center',
      'rounded-full font-semibold',
      'transition-all duration-150 ease-out',
      'cursor-pointer select-none',
      variantClasses[variant],
      sizeClasses[size],
      fullWidth ? 'w-full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if ('href' in rest && rest.href) {
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          className={classes}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
