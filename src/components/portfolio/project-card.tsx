'use client';

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";

export type ProjectLink = {
  url: string;
  label: string;
  icon?: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "accent";
};

export type Project = {
  name: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  codeUrl?: string;
  codeButtonText?: string;
  demoButtonText?: string;
  imageAiHint?: string;
  links?: ProjectLink[];
};

type ProjectCardProps = {
    project: Project;
};

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={cn("h-4 w-4", className)}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
  >
    <g>
      <path
        strokeDasharray="32"
        strokeDashoffset="32"
        d="M12 4c1.67 0 2.61 0.4 3 0.5c0.53 -0.43 1.94 -1.5 3.5 -1.5c0.34 1 0.29 2.22 0 3c0.75 1 1 2 1 3.5c0 2.19 -0.48 3.58 -1.5 4.5c-1.02 0.92 -2.11 1.37 -3.5 1.5c0.65 0.54 0.5 1.87 0.5 2.5c0 0.73 0 3 0 3M12 4c-1.67 0 -2.61 0.4 -3 0.5c-0.53 -0.43 -1.94 -1.5 -3.5 -1.5c-0.34 1 -0.29 2.22 0 3c-0.75 1 -1 2 -1 3.5c0 2.19 0.48 3.58 1.5 4.5c1.02 0.92 2.11 1.37 3.5 1.5c-0.65 0.54 -0.5 1.87 -0.5 2.5c0 0.73 0 3 0 3"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.7s"
          values="32;0"
        />
      </path>
      <path
        strokeDasharray="10"
        strokeDashoffset="10"
        d="M9 19c-1.41 0 -2.84 -0.56 -3.69 -1.19c-0.84 -0.63 -1.09 -1.66 -2.31 -2.31"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.8s"
          dur="0.2s"
          values="10;0"
        />
      </path>
    </g>
  </svg>
);

const VideoIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className={cn("h-4 w-4", className)}
    fill="currentColor"
  >
    <path d="m10.275 16l5.575-3.575q.225-.15.225-.425t-.225-.425L10.275 8q-.25-.175-.513-.025t-.262.45v7.15q0 .3.263.45t.512-.025M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20z"/>
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <Eye className={cn("h-4 w-4", className)} />
);

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow hover:shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{project.name}</CardTitle>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col space-y-4">
        <div className="aspect-video overflow-hidden rounded-md border bg-neutral-800">
           <Image
            src={project.image}
            alt={project.name}
            width={600}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            data-ai-hint={project.imageAiHint}
          />
        </div>
        <CardDescription className="flex-grow">{project.description}</CardDescription>
      </CardContent>
       <CardFooter className="mt-auto pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {project.links && project.links.length > 0 ? (
              project.links.map((link, idx) => (
                <Button 
                  key={idx} 
                  asChild 
                  variant={link.variant || "default"} 
                  className={cn(
                    "w-full",
                    project.links!.length === 3 && idx === 0 ? "sm:col-span-2" : "sm:col-span-1",
                    project.links!.length === 1 ? "sm:col-span-2" : ""
                  )}
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.icon}
                    {link.label}
                  </a>
                </Button>
              ))
            ) : (
              <>
                {project.codeUrl && (
                <Button asChild className={cn("w-full", !project.demoUrl ? "sm:col-span-2" : "sm:col-span-1")}>
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="mr-2" />
                    {project.codeButtonText || "View Code"}
                    </a>
                </Button>
                )}
                {project.demoUrl && (
                <Button asChild variant="secondary" className={cn("w-full", !project.codeUrl ? "sm:col-span-2" : "sm:col-span-1")}>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    {project.demoButtonText?.toLowerCase().includes('video') || project.demoButtonText?.toLowerCase().includes('demo') ? (
                      <VideoIcon className="mr-2" />
                    ) : (
                      <EyeIcon className="mr-2" />
                    )}
                    {project.demoButtonText || "Live Site"}
                    </a>
                </Button>
                )}
              </>
            )}
        </div>
      </CardFooter>
    </Card>
  );
}