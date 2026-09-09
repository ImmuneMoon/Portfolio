'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar } from "lucide-react";

const certifications = [
  {
    title: "Google IT Support Professional Certification",
    issuer: "Google/ Coursera",
    date: "Nov 2025",
    skills: ["Network Administration", "Network Security", "Windows", "Mobile Devices", "Mobile Applications", "System Administration", "IT Infrastructure Management", "Linux"]
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "Apr 2023",
    skills: ["Data Structures", "Algorithms", "JavaScript", "Front-End Development"]
  },
  {
    title: "CS50x: Introduction to Computer Science",
    issuer: "HarvardX",
    date: "Sep 2022",
    skills: ["Data Structures", "Algorithms", "C", "CSS", "Git", "HTML/CSS", "JavaScript", "Python", "Web Design", "Web Development", "Responsive Web Design", "Mobile Web Design", "Flask", "Bootstrap", "SQLite"]
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "Aug 2021",
    skills: ["Web Design", "Front-End Development", "CSS", "HTML"]
  }
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Optional subtle gradient to match the skills section feel */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      
      <div className="container relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl text-primary">My Certifications</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A collection of professional certifications I've worked to achieve.
            </p>
          </div>
        </div>

        <div className="grid gap-8 mt-12 sm:grid-cols-1 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <Card key={index} className="flex flex-col h-full border-none shadow-sm hover:shadow-md transition-shadow bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className="rounded-xl bg-primary/10 p-3 text-primary ring-1 ring-primary/20">
                  <Award className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <CardTitle className="font-headline text-xl leading-tight">{cert.title}</CardTitle>
                  <CardDescription className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-sm">
                    <span className="font-semibold text-primary">{cert.issuer}</span>
                    <span className="hidden sm:inline text-muted-foreground">•</span>
                    <span className="flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full text-xs">
                      <Calendar className="h-3 w-3" />
                      {cert.date}
                    </span>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-2">
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="outline" 
                      className="text-[10px] py-0 px-2 font-medium bg-background/50 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
