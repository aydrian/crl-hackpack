import { type Staff } from "@prisma/client";

import { Icon } from "~/components/icon.tsx";

export function SocialBar({ staff }: { staff: Staff }) {
  const { github, instagram, linkedin, twitter, website } = staff;
  return (
    <div className="flex min-h-[1rem] flex-wrap gap-1 text-crl-deep-purple">
      {linkedin && (
        <a
          className="hover:text-[#0A66C2]"
          href={linkedin}
          rel="noreferrer"
          target="_blank"
        >
          <Icon className="h-4 w-4" name="linkedin" />
        </a>
      )}
      {twitter && (
        <a
          className="hover:text-[#1D9BF0]"
          href={twitter}
          rel="noreferrer"
          target="_blank"
        >
          <Icon className="h-4 w-4" name="twitter" />
        </a>
      )}
      {instagram && (
        <a
          className="hover:text-[#E4405F]"
          href={instagram}
          rel="noreferrer"
          target="_blank"
        >
          <Icon className="h-4 w-4" name="instagram" />
        </a>
      )}
      {github && (
        <a
          className="hover:text-[#181717]"
          href={github}
          rel="noreferrer"
          target="_blank"
        >
          <Icon className="h-4 w-4" name="github" />
        </a>
      )}
      {website && (
        <a
          className="hover:text-green-700"
          href={website}
          rel="noreferrer"
          target="_blank"
        >
          <Icon className="h-4 w-4" name="link-outline" />
        </a>
      )}
    </div>
  );
}
