import { forwardRef, type ElementType, type HTMLAttributes } from 'react';

type PanelPadding = 'none' | 'sm' | 'md' | 'lg';
type PanelSurface = 'default' | 'muted' | 'raised';
type PanelBorder = 'none' | 'subtle' | 'strong';
type PanelRadius = 'none' | 'sm' | 'md' | 'lg';
type PanelShadow = 'none' | 'sm' | 'md' | 'lg';

export type PanelProps = HTMLAttributes<HTMLElement> & {
  /** HTML element to render as */
  as?: ElementType;
  /** Interior spacing */
  padding?: PanelPadding;
  /** Surface treatment */
  surface?: PanelSurface;
  /** Border treatment */
  border?: PanelBorder;
  /** Corner radius */
  radius?: PanelRadius;
  /** Elevation */
  shadow?: PanelShadow;
  /** Additional CSS classes */
  className?: string;
};

const paddingClasses: Record<PanelPadding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const surfaceClasses: Record<PanelSurface, string> = {
  default: 'bg-bg-surface-default',
  muted: 'bg-bg-surface-muted',
  raised: 'bg-bg-surface-raised',
};

const borderClasses: Record<PanelBorder, string> = {
  none: '',
  subtle: 'border border-border-subtle',
  strong: 'border border-border-strong',
};

const radiusClasses: Record<PanelRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
};

const shadowClasses: Record<PanelShadow, string> = {
  none: '',
  sm: 'shadow-elevation-flat',
  md: 'shadow-elevation-raised',
  lg: 'shadow-elevation-overlay',
};

export const Panel = forwardRef<HTMLElement, PanelProps>(
  (
    {
      as,
      padding = 'md',
      surface = 'default',
      border = 'subtle',
      radius = 'md',
      shadow = 'none',
      className = '',
      children,
      ...props
    },
    ref,
  ) => {
    const Component = as || 'div';
    const classes = [
      surfaceClasses[surface],
      borderClasses[border],
      radiusClasses[radius],
      shadowClasses[shadow],
      paddingClasses[padding],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  },
);

Panel.displayName = 'Panel';
