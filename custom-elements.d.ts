declare namespace JSX {
  interface IntrinsicElements {
    'auro-background': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        bg: string;
        alt: string;
        height: string;
        heightsm: string;
        heightmd: string;
      },
      HTMLElement
    >;
    'auro-header': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & { level: string; display: string },
      HTMLElement
    >;
    'auro-hyperlink': React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        cta?: string;
        href?: string;
        target?: string;
        ariaLabel?: string;
        type?: string;
        className?: string;
      },
      HTMLAnchorElement
    >;
    'auro-button': React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement> & { 
        cta?: boolean;
        onclick?: string;
        loading?: boolean;
        disabled?: boolean;
        variant?: string;
      },
      HTMLAnchorElement
    >;
  }
}
