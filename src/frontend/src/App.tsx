import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import AdminPage from "./components/AdminPage";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ServicesSection from "./components/ServicesSection";

export default function App() {
  const [view, setView] = useState<"home" | "admin">("home");
  const [preselectedService, setPreselectedService] = useState("");

  const handleApplyNow = (service: string) => {
    setPreselectedService(service);
    setView("home");
    setTimeout(() => {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        onAdminClick={() => setView(view === "admin" ? "home" : "admin")}
        isAdminView={view === "admin"}
      />
      {view === "admin" ? (
        <AdminPage onBack={() => setView("home")} />
      ) : (
        <>
          <HeroSection />
          <ServicesSection onApplyNow={handleApplyNow} />
          <ContactSection
            preselectedService={preselectedService}
            onServiceUsed={() => setPreselectedService("")}
          />
        </>
      )}
      <Footer onAdminClick={() => setView("admin")} />
      <Toaster richColors position="top-right" />
    </div>
  );
}
