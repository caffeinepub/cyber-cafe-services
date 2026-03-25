import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarCheck, PhoneCall } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const serviceCards = [
    { icon: "🪪", label: "Aadhar Card" },
    { icon: "📋", label: "PAN Card" },
    { icon: "🚗", label: "Driving Licence" },
    { icon: "🛂", label: "Passport" },
    { icon: "🗳️", label: "Voter ID" },
    { icon: "📜", label: "Caste Cert" },
    { icon: "👶", label: "Birth Cert" },
    { icon: "🏭", label: "MSME/Udyam" },
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0B1F3B 0%, #0A2547 45%, #0d3060 70%, #1a3d6e 100%)",
        minHeight: "88vh",
      }}
    >
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #C7A24A, transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-1"
          style={{
            background: "linear-gradient(90deg, #C7A24A, #D2B35C, #C7A24A)",
          }}
        />
        <div className="absolute top-1/2 right-0 w-px h-48 bg-gold-400 opacity-20" />
        <div className="absolute top-20 left-1/3 w-64 h-64 rounded-full border border-white opacity-5" />
      </div>

      <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between py-20 lg:py-28 gap-12">
        {/* Left content */}
        <div className="flex-1 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-gold-400/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold-400" />
              <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest">
                Trusted Government Services
              </span>
            </div>

            <h1 className="text-white font-extrabold text-4xl sm:text-5xl lg:text-6xl uppercase leading-tight tracking-tight mb-4">
              Your Digital
              <span className="block text-gold-400">Government</span>
              Services Hub
            </h1>

            <p className="text-white/75 text-lg leading-relaxed mb-2 max-w-lg">
              Fast, reliable, and professional assistance for all your
              government documentation needs — Aadhar, PAN, Passport, Driving
              Licence, Voter ID, and more. All under one roof.
            </p>
            <p className="text-gold-300/90 text-sm font-semibold mb-8">
              Vinay Gautam — Your trusted cyber cafe in Bilaspur, Greater Noida
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => scrollTo("services")}
                data-ocid="hero.explore_services.button"
                className="rounded-full bg-gold-400 hover:bg-gold-500 text-navy-600 font-bold px-7 py-3 text-sm shadow-lg gap-2"
              >
                Explore Services <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => scrollTo("contact")}
                data-ocid="hero.book_appointment.button"
                className="rounded-full border-white/40 text-white hover:bg-white/10 font-semibold px-7 py-3 text-sm gap-2 bg-transparent border"
              >
                <CalendarCheck className="w-4 h-4" /> Book Appointment
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollTo("contact")}
                data-ocid="hero.contact_us.button"
                className="rounded-full border-white/20 text-white/70 hover:bg-white/10 font-medium px-5 py-3 text-sm gap-2"
              >
                <PhoneCall className="w-4 h-4" /> Contact Us
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
              {[
                { value: "10,000+", label: "Services Completed" },
                { value: "15+", label: "Gov Schemes" },
                { value: "5★", label: "Customer Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-gold-400 font-bold text-2xl">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-xs uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right cards — 2-col grid of 8 service cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-shrink-0 hidden lg:grid grid-cols-2 gap-4 w-72"
        >
          {serviceCards.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.07 }}
              className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-2 text-center cursor-default hover:bg-white/15 transition-colors"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-white/90 text-xs font-semibold leading-tight">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
