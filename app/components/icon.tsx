import { type SVGProps } from "react";

import { type IconName } from "~/components/icons/names.ts";
import spriteHref from "~/components/icons/sprite.svg";

export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
}) {
  return (
    <svg {...props}>
      <use href={`${spriteHref}#${name}`} />
    </svg>
  );
}

export function IconGradient({
  name,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
}) {
  return (
    <svg {...props}>
      <linearGradient id="icon-gradient">
        <stop
          className="[--start-color:theme(colors.crl.starfleet-blue)]"
          offset="0"
          stopColor="var(--start-color)"
        ></stop>
        <stop
          className="[--end-color:theme(colors.crl.electric-purple)]"
          offset="1"
          stopColor="var(--end-color)"
        ></stop>
      </linearGradient>
      <use
        fill="url(#icon-gradient)"
        href={`${spriteHref}#${name}`}
        stroke="url(#icon-gradient)"
      />
    </svg>
  );
}
