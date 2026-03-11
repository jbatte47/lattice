import { forwardRef, type ElementType, type HTMLAttributes } from 'react';

type TextVariant = 'hero' | 'h1' | 'h2' | 'h3' | 'body' | 'body-sm' | 'caption' | 'label';
type TextColor = 'primary' | 'secondary' | 'muted' | 'inherit';

export type TextProps = HTMLAttributes<HTMLElement> & {
  /** Typography variant (maps to lattice typography tokens) */
  variant?: TextVariant;
  /** Text color */
  color?: TextColor;
  /** HTML element to render as */
  as?: ElementType;
  /** Additional CSS classes */
  className?: string;
};

const defaultElements: Record<TextVariant, ElementType> = {
  hero: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
  label: 'span',
};

const variantClasses: Record<TextVariant, string> = {
  hero: 'text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight',
  h1: 'text-3xl sm:text-4xl font-bold tracking-tight',
  h2: 'text-xl sm:text-2xl font-bold tracking-tight',
  h3: 'text-lg font-semibold',
  body: 'text-base leading-relaxed',
  'body-sm': 'text-sm leading-relaxed',
  caption: 'text-xs',
  label: 'text-xs font-bold uppercase tracking-widest',
};

const colorClasses: Record<TextColor, string> = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  muted: 'text-text-muted',
  inherit: 'text-inherit',
};

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ variant = 'body', color = 'primary', as, className = '', children, ...props }, ref) => {
    const Component = as || defaultElements[variant];

    const classes = [variantClasses[variant], colorClasses[color], className]
      .filter(Boolean)
      .join(' ');

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  },
);

Text.displayName = 'Text';
