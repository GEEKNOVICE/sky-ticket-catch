import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaneIcon } from "./PlaneIcon";
import { CalendarDays, MapPin, Users, ArrowLeftRight, Train, Plane } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const airports = [
  { code: "DEL", city: "New Delhi", name: "Indira Gandhi International" },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Maharaj" },
  { code: "BLR", city: "Bengaluru", name: "Kempegowda International" },
  { code: "MAA", city: "Chennai", name: "Chennai International" },
  { code: "CCU", city: "Kolkata", name: "Netaji Subhas Chandra Bose" },
  { code: "HYD", city: "Hyderabad", name: "Rajiv Gandhi International" },
  { code: "GOI", city: "Goa", name: "Dabolim Airport" },
  { code: "JAI", city: "Jaipur", name: "Jaipur International" },
];

const trainStations = [
  { code: "NDLS", city: "New Delhi", name: "New Delhi Railway Station" },
  { code: "BCT", city: "Mumbai", name: "Mumbai Central" },
  { code: "SBC", city: "Bengaluru", name: "Bengaluru City Junction" },
  { code: "MAS", city: "Chennai", name: "Chennai Central" },
  { code: "HWH", city: "Kolkata", name: "Howrah Junction" },
  { code: "SC", city: "Hyderabad", name: "Secunderabad Junction" },
  { code: "JP", city: "Jaipur", name: "Jaipur Junction" },
  { code: "LKO", city: "Lucknow", name: "Lucknow Charbagh" },
];

const travelClasses = {
  flight: [
    { value: "economy", label: "Economy" },
    { value: "premium", label: "Premium Economy" },
    { value: "business", label: "Business" },
    { value: "first", label: "First Class" },
  ],
  train: [
    { value: "sl", label: "Sleeper (SL)" },
    { value: "3a", label: "AC 3 Tier (3A)" },
    { value: "2a", label: "AC 2 Tier (2A)" },
    { value: "1a", label: "AC First Class (1A)" },
    { value: "cc", label: "Chair Car (CC)" },
  ],
};

export const BookingForm = () => {
  const [activeTab, setActiveTab] = useState("flights");
  
  // Flight state
  const [flightOrigin, setFlightOrigin] = useState("");
  const [flightDestination, setFlightDestination] = useState("");
  const [flightDepartureDate, setFlightDepartureDate] = useState<Date>();
  const [flightReturnDate, setFlightReturnDate] = useState<Date>();
  const [flightPassengers, setFlightPassengers] = useState("1");
  const [flightClass, setFlightClass] = useState("economy");
  const [flightTripType, setFlightTripType] = useState<"roundtrip" | "oneway">("oneway");

  // Train state
  const [trainOrigin, setTrainOrigin] = useState("");
  const [trainDestination, setTrainDestination] = useState("");
  const [trainDepartureDate, setTrainDepartureDate] = useState<Date>();
  const [trainPassengers, setTrainPassengers] = useState("1");
  const [trainClass, setTrainClass] = useState("3a");

  const handleFlightSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flightOrigin || !flightDestination || !flightDepartureDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (flightOrigin === flightDestination) {
      toast.error("Origin and destination cannot be the same");
      return;
    }
    const originCity = airports.find(a => a.code === flightOrigin)?.city;
    const destCity = airports.find(a => a.code === flightDestination)?.city;
    toast.success("Searching flights...", {
      description: `${originCity} → ${destCity} on ${format(flightDepartureDate, "MMM d, yyyy")}`,
    });
  };

  const handleTrainSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainOrigin || !trainDestination || !trainDepartureDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (trainOrigin === trainDestination) {
      toast.error("Origin and destination cannot be the same");
      return;
    }
    const originCity = trainStations.find(s => s.code === trainOrigin)?.city;
    const destCity = trainStations.find(s => s.code === trainDestination)?.city;
    toast.success("Searching trains...", {
      description: `${originCity} → ${destCity} on ${format(trainDepartureDate, "MMM d, yyyy")}`,
    });
  };

  const swapFlightLocations = () => {
    const temp = flightOrigin;
    setFlightOrigin(flightDestination);
    setFlightDestination(temp);
  };

  const swapTrainLocations = () => {
    const temp = trainOrigin;
    setTrainOrigin(trainDestination);
    setTrainDestination(temp);
  };

  return (
    <section className="py-16 bg-pattern" id="booking">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl shadow-elevated border border-border overflow-hidden">
            {/* Tabs Header */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full h-auto p-0 bg-muted/50 rounded-none border-b border-border">
                <TabsTrigger 
                  value="flights" 
                  className="flex-1 py-4 px-6 rounded-none data-[state=active]:bg-card data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-secondary gap-2"
                >
                  <Plane className="w-5 h-5" />
                  <span className="font-semibold">Flights</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="trains" 
                  className="flex-1 py-4 px-6 rounded-none data-[state=active]:bg-card data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-secondary gap-2"
                >
                  <Train className="w-5 h-5" />
                  <span className="font-semibold">Trains</span>
                </TabsTrigger>
              </TabsList>

              {/* Flights Tab */}
              <TabsContent value="flights" className="p-6 mt-0">
                {/* Trip Type Toggle */}
                <div className="flex gap-6 mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="flightTripType"
                      checked={flightTripType === "oneway"}
                      onChange={() => setFlightTripType("oneway")}
                      className="w-4 h-4 accent-secondary"
                    />
                    <span className="font-medium">One Way</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="flightTripType"
                      checked={flightTripType === "roundtrip"}
                      onChange={() => setFlightTripType("roundtrip")}
                      className="w-4 h-4 accent-secondary"
                    />
                    <span className="font-medium">Round Trip</span>
                  </label>
                </div>

                <form onSubmit={handleFlightSearch} className="space-y-6">
                  {/* Origin & Destination */}
                  <div className="grid md:grid-cols-2 gap-4 relative">
                    <div className="bg-muted/30 rounded-xl p-4 border border-border hover:border-secondary/50 transition-colors">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">From</Label>
                      <Select value={flightOrigin} onValueChange={setFlightOrigin}>
                        <SelectTrigger className="border-0 p-0 h-auto text-lg font-semibold bg-transparent shadow-none focus:ring-0">
                          <SelectValue placeholder="Select City" />
                        </SelectTrigger>
                        <SelectContent>
                          {airports.map((airport) => (
                            <SelectItem key={airport.code} value={airport.code}>
                              <div className="flex flex-col">
                                <span className="font-semibold">{airport.city}</span>
                                <span className="text-xs text-muted-foreground">{airport.code} - {airport.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {flightOrigin && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {airports.find(a => a.code === flightOrigin)?.name}
                        </p>
                      )}
                    </div>

                    {/* Swap Button */}
                    <button
                      type="button"
                      onClick={swapFlightLocations}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border-2 border-secondary text-secondary flex items-center justify-center shadow-lg hover:bg-secondary hover:text-secondary-foreground transition-all"
                    >
                      <ArrowLeftRight className="w-4 h-4" />
                    </button>

                    <div className="bg-muted/30 rounded-xl p-4 border border-border hover:border-secondary/50 transition-colors">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">To</Label>
                      <Select value={flightDestination} onValueChange={setFlightDestination}>
                        <SelectTrigger className="border-0 p-0 h-auto text-lg font-semibold bg-transparent shadow-none focus:ring-0">
                          <SelectValue placeholder="Select City" />
                        </SelectTrigger>
                        <SelectContent>
                          {airports.map((airport) => (
                            <SelectItem key={airport.code} value={airport.code}>
                              <div className="flex flex-col">
                                <span className="font-semibold">{airport.city}</span>
                                <span className="text-xs text-muted-foreground">{airport.code} - {airport.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {flightDestination && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {airports.find(a => a.code === flightDestination)?.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Date, Passengers, Class */}
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-muted/30 rounded-xl p-4 border border-border hover:border-secondary/50 transition-colors">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">Departure</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button type="button" className="w-full text-left">
                            <div className="text-lg font-semibold">
                              {flightDepartureDate ? format(flightDepartureDate, "d MMM") : "Select Date"}
                            </div>
                            {flightDepartureDate && (
                              <p className="text-xs text-muted-foreground">{format(flightDepartureDate, "EEEE, yyyy")}</p>
                            )}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={flightDepartureDate}
                            onSelect={setFlightDepartureDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {flightTripType === "roundtrip" && (
                      <div className="bg-muted/30 rounded-xl p-4 border border-border hover:border-secondary/50 transition-colors">
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider">Return</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button type="button" className="w-full text-left">
                              <div className="text-lg font-semibold">
                                {flightReturnDate ? format(flightReturnDate, "d MMM") : "Select Date"}
                              </div>
                              {flightReturnDate && (
                                <p className="text-xs text-muted-foreground">{format(flightReturnDate, "EEEE, yyyy")}</p>
                              )}
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={flightReturnDate}
                              onSelect={setFlightReturnDate}
                              disabled={(date) => date < (flightDepartureDate || new Date())}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}

                    <div className="bg-muted/30 rounded-xl p-4 border border-border hover:border-secondary/50 transition-colors">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">Travellers</Label>
                      <Select value={flightPassengers} onValueChange={setFlightPassengers}>
                        <SelectTrigger className="border-0 p-0 h-auto text-lg font-semibold bg-transparent shadow-none focus:ring-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "Traveller" : "Travellers"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-muted/30 rounded-xl p-4 border border-border hover:border-secondary/50 transition-colors">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">Class</Label>
                      <Select value={flightClass} onValueChange={setFlightClass}>
                        <SelectTrigger className="border-0 p-0 h-auto text-lg font-semibold bg-transparent shadow-none focus:ring-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {travelClasses.flight.map((cls) => (
                            <SelectItem key={cls.value} value={cls.value}>
                              {cls.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" variant="gold" size="xl" className="w-full">
                    <Plane className="w-5 h-5" />
                    Search Flights
                  </Button>
                </form>
              </TabsContent>

              {/* Trains Tab */}
              <TabsContent value="trains" className="p-6 mt-0">
                <form onSubmit={handleTrainSearch} className="space-y-6">
                  {/* Origin & Destination */}
                  <div className="grid md:grid-cols-2 gap-4 relative">
                    <div className="bg-muted/30 rounded-xl p-4 border border-border hover:border-secondary/50 transition-colors">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">From</Label>
                      <Select value={trainOrigin} onValueChange={setTrainOrigin}>
                        <SelectTrigger className="border-0 p-0 h-auto text-lg font-semibold bg-transparent shadow-none focus:ring-0">
                          <SelectValue placeholder="Select Station" />
                        </SelectTrigger>
                        <SelectContent>
                          {trainStations.map((station) => (
                            <SelectItem key={station.code} value={station.code}>
                              <div className="flex flex-col">
                                <span className="font-semibold">{station.city}</span>
                                <span className="text-xs text-muted-foreground">{station.code} - {station.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {trainOrigin && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {trainStations.find(s => s.code === trainOrigin)?.name}
                        </p>
                      )}
                    </div>

                    {/* Swap Button */}
                    <button
                      type="button"
                      onClick={swapTrainLocations}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border-2 border-secondary text-secondary flex items-center justify-center shadow-lg hover:bg-secondary hover:text-secondary-foreground transition-all"
                    >
                      <ArrowLeftRight className="w-4 h-4" />
                    </button>

                    <div className="bg-muted/30 rounded-xl p-4 border border-border hover:border-secondary/50 transition-colors">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">To</Label>
                      <Select value={trainDestination} onValueChange={setTrainDestination}>
                        <SelectTrigger className="border-0 p-0 h-auto text-lg font-semibold bg-transparent shadow-none focus:ring-0">
                          <SelectValue placeholder="Select Station" />
                        </SelectTrigger>
                        <SelectContent>
                          {trainStations.map((station) => (
                            <SelectItem key={station.code} value={station.code}>
                              <div className="flex flex-col">
                                <span className="font-semibold">{station.city}</span>
                                <span className="text-xs text-muted-foreground">{station.code} - {station.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {trainDestination && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {trainStations.find(s => s.code === trainDestination)?.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Date, Passengers, Class */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-muted/30 rounded-xl p-4 border border-border hover:border-secondary/50 transition-colors">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">Travel Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button type="button" className="w-full text-left">
                            <div className="text-lg font-semibold">
                              {trainDepartureDate ? format(trainDepartureDate, "d MMM") : "Select Date"}
                            </div>
                            {trainDepartureDate && (
                              <p className="text-xs text-muted-foreground">{format(trainDepartureDate, "EEEE, yyyy")}</p>
                            )}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={trainDepartureDate}
                            onSelect={setTrainDepartureDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="bg-muted/30 rounded-xl p-4 border border-border hover:border-secondary/50 transition-colors">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">Passengers</Label>
                      <Select value={trainPassengers} onValueChange={setTrainPassengers}>
                        <SelectTrigger className="border-0 p-0 h-auto text-lg font-semibold bg-transparent shadow-none focus:ring-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "Passenger" : "Passengers"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-muted/30 rounded-xl p-4 border border-border hover:border-secondary/50 transition-colors">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">Class</Label>
                      <Select value={trainClass} onValueChange={setTrainClass}>
                        <SelectTrigger className="border-0 p-0 h-auto text-lg font-semibold bg-transparent shadow-none focus:ring-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {travelClasses.train.map((cls) => (
                            <SelectItem key={cls.value} value={cls.value}>
                              {cls.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" variant="gold" size="xl" className="w-full">
                    <Train className="w-5 h-5" />
                    Search Trains
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};
