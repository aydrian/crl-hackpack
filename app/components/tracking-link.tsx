export function TrackingLink({
  children,
  href = "",
  referralId,
  source,
  target,
  ...props
}: React.HTMLProps<HTMLAnchorElement> & {
  referralId?: string;
  source: string;
}) {
  const url = new URL(href);
  url.searchParams.append("utm_source", source);
  url.searchParams.append("utm_medium", "events");
  url.searchParams.append("utm_campaign", "hackathon");
  if (referralId) {
    url.searchParams.append("referralId", referralId);
  }
  return (
    <a href={url.toString()} target={target ?? "_blank"} {...props}>
      {children}
    </a>
  );
}
