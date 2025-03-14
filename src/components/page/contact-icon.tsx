import { buttonVariants, Link } from "@/components/atoms";
import { cx } from "cva";
import React from "react";

interface ContactIconProps {
  href: string;
  children: React.ReactNode;
  label?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const ContactIcon = ({
  href,
  children,
  label,
  className,
  onClick,
}: ContactIconProps) => (
  <li>
    <Link
      className={cx(
        buttonVariants({ variant: label ? "ghost" : "icon", size: "default" }),
        "text-solid hover:text-fill",
        label && "!px-3",
        className
      )}
      href={href}
      onClick={onClick}
    >
      {children}
      {label ? (
        <span className="text-meta font-normal max-sm:hidden">{label}</span>
      ) : null}
    </Link>
  </li>
);
