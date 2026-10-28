import { Badge, badgeVariants, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { tagLink } from "@/lib/tag-links";

/**
 * A tag badge that links to documentation about the tag, opening in a new tab.
 * Tags without an entry in src/lib/tag-links.ts render as plain badges.
 */
export function TagBadge({
  tag,
  variant = "secondary",
  className,
}: {
  tag: string;
  variant?: BadgeProps["variant"];
  className?: string;
}) {
  const href = tagLink(tag);
  if (!href) {
    return <Badge variant={variant} className={className}>{tag}</Badge>;
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={`Learn about ${tag}`}
      className={cn(badgeVariants({ variant }), "tag-link cursor-pointer", className)}
    >
      {tag}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
