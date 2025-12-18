import { Button } from "./ui/button";
import { PlaneIcon } from "./PlaneIcon";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-pattern pt-16">
      {/* Background decorative planes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <PlaneIcon 
          size="lg" 
          className="absolute top-20 left-[10%] text-gold/10 rotate-12 animate-float" 
        />
        <PlaneIcon 
          size="lg" 
          className="absolute bottom-32 right-[15%] text-primary/10 -rotate-12 animate-float-delayed" 
        />
        <PlaneIcon 
          size="md" 
          className="absolute top-1/3 right-[25%] text-gold/5 rotate-45 animate-float" 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-card mb-8 animate-fade-in-up">
            <PlaneIcon size="sm" className="text-gold" />
            <span className="text-sm font-medium text-muted-foreground">
              Vintage Aviation Collection
            </span>
          </div>

          {/* Main heading */}
          <h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Preserve Your
            <span className="block text-gradient-gold">Flight Memories</span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            A curated collection of airline tickets and boarding passes from the golden age of aviation. 
            Every journey tells a story worth preserving.
          </p>

          {/* CTA buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button variant="gold" size="xl">
              View Collection
            </Button>
            <Button variant="outline" size="xl">
              Start Collecting
            </Button>
          </div>

          {/* Stats preview */}
          <div 
            className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="text-center">
              <p className="text-4xl font-display font-bold text-foreground">247</p>
              <p className="text-sm text-muted-foreground">Tickets Collected</p>
            </div>
            <div className="w-px h-12 bg-border hidden md:block" />
            <div className="text-center">
              <p className="text-4xl font-display font-bold text-foreground">84</p>
              <p className="text-sm text-muted-foreground">Airlines Featured</p>
            </div>
            <div className="w-px h-12 bg-border hidden md:block" />
            <div className="text-center">
              <p className="text-4xl font-display font-bold text-foreground">1952</p>
              <p className="text-sm text-muted-foreground">Oldest Ticket</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
