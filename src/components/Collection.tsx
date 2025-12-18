import { TicketCard } from "./TicketCard";

const tickets = [
  {
    airline: "Pan American",
    flightNumber: "PA 101",
    from: "JFK",
    to: "LHR",
    date: "Dec 15",
    year: "1965",
  },
  {
    airline: "TWA",
    flightNumber: "TW 800",
    from: "LAX",
    to: "CDG",
    date: "Mar 22",
    year: "1972",
  },
  {
    airline: "BOAC",
    flightNumber: "BA 001",
    from: "LHR",
    to: "HND",
    date: "Aug 8",
    year: "1958",
  },
  {
    airline: "Lufthansa",
    flightNumber: "LH 456",
    from: "FRA",
    to: "JFK",
    date: "Jun 30",
    year: "1969",
  },
  {
    airline: "Air France",
    flightNumber: "AF 002",
    from: "CDG",
    to: "RIO",
    date: "Nov 12",
    year: "1974",
  },
  {
    airline: "Eastern Air",
    flightNumber: "EA 723",
    from: "MIA",
    to: "SJU",
    date: "Jul 4",
    year: "1963",
  },
];

export const Collection = () => {
  return (
    <section id="collection" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-medium uppercase tracking-widest mb-4">
            Featured Collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Vintage Treasures
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore rare airline tickets from aviation's most iconic era. 
            Each piece represents a moment in travel history.
          </p>
        </div>

        {/* Tickets grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tickets.map((ticket, index) => (
            <div
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TicketCard {...ticket} />
            </div>
          ))}
        </div>

        {/* View more button */}
        <div className="text-center mt-12">
          <button className="text-gold font-medium hover:underline underline-offset-4 transition-all">
            View All 247 Tickets →
          </button>
        </div>
      </div>
    </section>
  );
};
