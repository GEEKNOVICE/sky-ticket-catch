import { PlaneIcon } from "./PlaneIcon";

interface TicketCardProps {
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  date: string;
  year: string;
  imageUrl?: string;
}

export const TicketCard = ({
  airline,
  flightNumber,
  from,
  to,
  date,
  year,
  imageUrl,
}: TicketCardProps) => {
  return (
    <div className="group relative bg-card rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2">
      {/* Ticket top section */}
      <div className="relative h-40 bg-primary overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${airline} ${flightNumber}`}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary to-navy-light" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
        
        {/* Floating plane */}
        <div className="absolute top-4 right-4 opacity-40 group-hover:opacity-70 transition-opacity">
          <PlaneIcon size="md" className="text-primary-foreground animate-float" />
        </div>
        
        {/* Airline name */}
        <div className="absolute bottom-4 left-4">
          <p className="text-gold text-xs font-medium uppercase tracking-widest">{year}</p>
          <h3 className="text-primary-foreground font-display text-xl font-semibold">{airline}</h3>
        </div>
      </div>

      {/* Ticket body */}
      <div className="p-5 bg-card">
        {/* Perforated line effect */}
        <div className="absolute left-0 right-0 top-40 flex justify-between px-4">
          <div className="w-4 h-4 rounded-full bg-background -mt-2" />
          <div className="flex-1 border-t-2 border-dashed border-border mt-0" />
          <div className="w-4 h-4 rounded-full bg-background -mt-2" />
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="text-center">
            <p className="text-2xl font-display font-bold text-foreground">{from}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">From</p>
          </div>
          
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="w-full h-px bg-border relative">
              <PlaneIcon size="sm" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gold rotate-90" />
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-display font-bold text-foreground">{to}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">To</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Flight</p>
            <p className="font-semibold text-foreground">{flightNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Date</p>
            <p className="font-semibold text-foreground">{date}</p>
          </div>
        </div>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500">
        <div className="absolute inset-0 animate-shimmer" />
      </div>
    </div>
  );
};
