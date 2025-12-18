import { PlaneIcon } from "./PlaneIcon";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PlaneIcon size="sm" className="text-gold" />
          <span className="font-display text-xl font-semibold text-foreground">
            SkyVault
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#collection" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Collection
          </a>
          <a href="#stats" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Statistics
          </a>
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};
