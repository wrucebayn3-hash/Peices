import { createFileRoute } from "@tanstack/react-router";
import "../styles.css";
import Nav from "../components/aerovia/Nav";
import Hero from "../components/aerovia/Hero";
import Booking from "../components/aerovia/Booking";
import FeaturedFlights from "../components/aerovia/FeaturedFlights";
import WhyAerovia from "../components/aerovia/WhyAerovia";
import Aircraft from "../components/aerovia/Aircraft";
import Memberships from "../components/aerovia/Memberships";
import HowItWorks from "../components/aerovia/HowItWorks";
import Destinations from "../components/aerovia/Destinations";
import FinalCta from "../components/aerovia/FinalCta";
import Footer from "../components/aerovia/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "AEROVIA — Private Aviation, Booked on Your Terms",
      },
      {
        name: "description",
        content:
          "Book private aviation around your schedule, route, and rhythm. AEROVIA gives you on-demand access and short-term memberships without the friction of traditional chartering.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="bg-onyx text-ivory overflow-x-hidden">
      <Nav />
      <Hero />
      <Booking />
      <FeaturedFlights />
      <WhyAerovia />
      <Aircraft />
      <Memberships />
      <HowItWorks />
      <Destinations />
      <FinalCta />
      <Footer />
    </main>
  );
}
