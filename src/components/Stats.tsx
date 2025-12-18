import { Plane, Globe, Calendar, MapPin } from "lucide-react";
import { StatCard } from "./StatCard";

const stats = [
  {
    icon: <Plane className="w-6 h-6" />,
    value: "247",
    label: "Tickets in Collection",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    value: "84",
    label: "Airlines Represented",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    value: "72",
    label: "Years of Aviation History",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    value: "156",
    label: "Destinations Covered",
  },
];

export const Stats = () => {
  return (
    <section id="stats" className="py-24 bg-primary">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-medium uppercase tracking-widest mb-4">
            Collection Statistics
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            By The Numbers
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Decades of aviation history preserved in our growing collection.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
