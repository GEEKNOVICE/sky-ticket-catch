import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlaneIcon } from "./PlaneIcon";
import { CalendarDays, MapPin, Users, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const airports = [
  { code: "JFK", city: "New York", country: "USA" },
  { code: "LAX", city: "Los Angeles", country: "USA" },
  { code: "LHR", city: "London", country: "UK" },
  { code: "CDG", city: "Paris", country: "France" },
  { code: "NRT", city: "Tokyo", country: "Japan" },
  { code: "DXB", city: "Dubai", country: "UAE" },
  { code: "SIN", city: "Singapore", country: "Singapore" },
  { code: "SYD", city: "Sydney", country: "Australia" },
];

export const BookingForm = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState("1");
  const [tripType, setTripType] = useState<"roundtrip" | "oneway">("roundtrip");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!origin || !destination || !departureDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (origin === destination) {
      toast.error("Origin and destination cannot be the same");
      return;
    }

    toast.success("Searching for flights...", {
      description: `${origin} → ${destination} on ${format(departureDate, "MMM d, yyyy")}`,
    });
  };

  return (
    <section className="py-20 bg-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-secondary mb-4">
            <PlaneIcon size="sm" className="text-secondary" />
            <span className="font-medium tracking-wider uppercase text-sm">Book Your Journey</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Start Your <span className="text-gradient-gold">Adventure</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the golden age of aviation with our premium booking service
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-elevated border border-border p-8">
            {/* Trip Type Toggle */}
            <div className="flex gap-4 mb-8">
              <button
                type="button"
                onClick={() => setTripType("roundtrip")}
                className={cn(
                  "px-6 py-2 rounded-full font-medium transition-all duration-300",
                  tripType === "roundtrip"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                Round Trip
              </button>
              <button
                type="button"
                onClick={() => setTripType("oneway")}
                className={cn(
                  "px-6 py-2 rounded-full font-medium transition-all duration-300",
                  tripType === "oneway"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                One Way
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Origin & Destination */}
              <div className="grid md:grid-cols-2 gap-6 relative">
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-secondary" />
                    From
                  </Label>
                  <Select value={origin} onValueChange={setOrigin}>
                    <SelectTrigger className="h-14 text-base">
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      {airports.map((airport) => (
                        <SelectItem key={airport.code} value={airport.code}>
                          <span className="font-semibold">{airport.code}</span>
                          <span className="text-muted-foreground ml-2">
                            {airport.city}, {airport.country}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Swap Button */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1 z-10">
                  <button
                    type="button"
                    onClick={() => {
                      const temp = origin;
                      setOrigin(destination);
                      setDestination(temp);
                    }}
                    className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shadow-gold hover:scale-110 transition-transform"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-secondary" />
                    To
                  </Label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger className="h-14 text-base">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {airports.map((airport) => (
                        <SelectItem key={airport.code} value={airport.code}>
                          <span className="font-semibold">{airport.code}</span>
                          <span className="text-muted-foreground ml-2">
                            {airport.city}, {airport.country}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Dates & Passengers */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-secondary" />
                    Departure
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "h-14 w-full justify-start text-left font-normal text-base",
                          !departureDate && "text-muted-foreground"
                        )}
                      >
                        {departureDate ? format(departureDate, "MMM d, yyyy") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={departureDate}
                        onSelect={setDepartureDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {tripType === "roundtrip" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-secondary" />
                      Return
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "h-14 w-full justify-start text-left font-normal text-base",
                            !returnDate && "text-muted-foreground"
                          )}
                        >
                          {returnDate ? format(returnDate, "MMM d, yyyy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={returnDate}
                          onSelect={setReturnDate}
                          disabled={(date) => date < (departureDate || new Date())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Users className="w-4 h-4 text-secondary" />
                    Passengers
                  </Label>
                  <Select value={passengers} onValueChange={setPassengers}>
                    <SelectTrigger className="h-14 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "Passenger" : "Passengers"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" variant="gold" size="xl" className="w-full mt-4">
                <PlaneIcon size="sm" className="text-secondary-foreground" />
                Search Flights
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
