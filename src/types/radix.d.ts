import { ReactNode, MouseEventHandler } from 'react';

declare module '@radix-ui/react-dropdown-menu' {
  export interface DropdownMenuTriggerProps {
    children?: ReactNode;
    asChild?: boolean;
    className?: string;
  }
  export interface DropdownMenuItemProps {
    children?: ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
  }
  export interface DropdownMenuLabelProps {
    children?: ReactNode;
    className?: string;
    asChild?: boolean;
  }
  export interface DropdownMenuSeparatorProps {
    children?: ReactNode;
    className?: string;
    asChild?: boolean;
  }
  export interface DropdownMenuContentProps {
    children?: ReactNode;
    className?: string;
  }
}

declare module '@radix-ui/react-tooltip' {
  export interface TooltipTriggerProps {
    children?: ReactNode;
    asChild?: boolean;
    className?: string;
  }
  export interface TooltipContentProps {
    children?: ReactNode;
    className?: string;
  }
  export interface TooltipArrowProps {
    children?: ReactNode;
    className?: string;
    asChild?: boolean;
  }
}

declare module '@radix-ui/react-tabs' {
  export interface TabsProps {
    children?: ReactNode;
    className?: string;
  }
  export interface TabsListProps {
    children?: ReactNode;
    className?: string;
  }
  export interface TabsTriggerProps {
    children?: ReactNode;
    className?: string;
  }
  export interface TabsContentProps {
    children?: ReactNode;
    className?: string;
  }
}
 
declare module '@radix-ui/react-dialog' {
  export interface DialogTriggerProps {
    children?: ReactNode;
    asChild?: boolean;
    className?: string;
  }
  export interface DialogOverlayProps {
    children?: ReactNode;
    className?: string;
  }
  export interface DialogContentProps {
    children?: ReactNode;
    className?: string;
  }
  export interface DialogTitleProps {
    children?: ReactNode;
    className?: string;
  }
  export interface DialogCloseProps {
    children?: ReactNode;
    asChild?: boolean;
    className?: string;
  }
}
