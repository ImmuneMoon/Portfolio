import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-secondary w-full py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl">Get in Touch</h2>
          <p className="text-center max-w-2xl text-muted-foreground">
            I'm currently open to new opportunities and collaborations. Feel free to reach out if you have a project in mind or just want to connect.
          </p>
          <div className="flex items-center space-x-4">
            <Button size="icon" variant="ghost" asChild>
              <a href="mailto:hello@fulllion.dev" aria-label="Email">
                <Mail className="h-6 w-6" />
              </a>
            </Button>
            <Button size="icon" variant="ghost" asChild>
              <a href="https://github.com/ImmuneMoon" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-6 w-6" />
              </a>
            </Button>
            <Button size="icon" variant="ghost" asChild>
              <a href="https://www.deviantart.com/fulllion" target="_blank" rel="noopener noreferrer" aria-label="DeviantArt">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-6 w-6">
                  <path d="M9.4 11H5V6h7.5L15 2h4v4l-4.4 7H19v5h-7.5L9 22H5v-4Z" />
                </svg>
              </a>
            </Button>
            <Button size="icon" variant="ghost" asChild>
              <a href="https://linktr.ee/fulllion" target="_blank" rel="noopener noreferrer" aria-label="Linktree">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" className="h-6 w-6" fill="currentColor"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.126 17.707h9.598L10.9 11.202l3.776-3.882l6.505 6.687V4.5h5.64v9.508l6.506-6.672l3.773 3.866l-6.82 6.49h9.595v5.368h-9.65l6.866 6.672l-3.764 3.79l-9.325-9.37l-9.326 9.37l-3.775-3.775l6.868-6.672H8.126zm13.04 13.056h5.64V43.5h-5.64z" /></svg>
              </a>
            </Button>
          </div>
          <div className="text-sm text-muted-foreground pt-4">
            © {new Date().getFullYear()} Fulllion Creative Works. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
