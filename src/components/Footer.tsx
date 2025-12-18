import { PlaneIcon } from "./PlaneIcon";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <PlaneIcon size="sm" className="text-gold" />
            <span className="font-display text-xl font-semibold text-foreground">
              SkyVault
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            Preserving the golden age of aviation, one ticket at a time.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 SkyVault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
