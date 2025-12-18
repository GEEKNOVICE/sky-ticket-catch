import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BookingForm } from "@/components/BookingForm";
import { Collection } from "@/components/Collection";
import { Stats } from "@/components/Stats";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <BookingForm />
        <Collection />
        <Stats />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
