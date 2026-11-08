import Image from "next/image";
import { FileDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TagBadge } from "@/components/portfolio/tag-badge";
import { GithubIcon, type Project } from "@/components/portfolio/project-card";

/**
 * A guide shown as one row of a detailed list: the cover on the left, the title, tags and
 * full description in the middle, and the buttons on the right. On narrow screens the
 * cover shrinks beside the text and the buttons move underneath.
 */
export function GuideRow({ guide }: { guide: Project }) {
  return (
    <Card
      data-reveal=""
      className="spotlight grid grid-cols-[6.5rem_1fr] items-start gap-4 p-4 transition-shadow hover:shadow-lg sm:grid-cols-[11rem_1fr] sm:gap-5 lg:grid-cols-[13rem_1fr_11rem] lg:items-center"
    >
      <div className="aspect-video overflow-hidden rounded-md border bg-neutral-800">
        <Image
          src={guide.image}
          alt={guide.name}
          width={416}
          height={234}
          sizes="(min-width: 1024px) 208px, (min-width: 640px) 176px, 104px"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="min-w-0 space-y-2">
        <h4 className="font-headline text-lg font-bold leading-tight sm:text-xl">{guide.name}</h4>
        <div className="flex flex-wrap gap-1.5">
          {guide.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{guide.description}</p>
      </div>

      <div className="col-span-2 flex gap-2 lg:col-span-1 lg:flex-col">
        {guide.codeUrl && (
          <Button asChild size="sm" className="flex-1">
            <a href={guide.codeUrl} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="mr-2" />
              {guide.codeButtonText || "Read Guide"}
            </a>
          </Button>
        )}
        {guide.demoUrl && (
          <Button asChild size="sm" variant="secondary" className="flex-1">
            <a href={guide.demoUrl} target="_blank" rel="noopener noreferrer">
              <FileDown className="mr-2" />
              {guide.demoButtonText || "Download PDF"}
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
}
