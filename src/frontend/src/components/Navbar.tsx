import { Button } from "@/components/ui/button";
import { Menu, Shield, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onAdminClick: () => void;
  isAdminView: boolean;
}

export default function Navbar({ onAdminClick, isAdminView }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", action: () => scrollTo("hero") },
    { label: "Services", action: () => scrollTo("services") },
    { label: "Contact", action: () => scrollTo("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-navy-500 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <div className="font-bold text-navy-600 text-sm leading-tight uppercase tracking-wide">
                VG Cyber Cafe
              </div>
              <div className="font-bold text-navy-500 text-xs leading-tight uppercase tracking-wider">
                Gov. Services
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={link.action}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                className="text-sm font-medium text-foreground hover:text-navy-500 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={onAdminClick}
              data-ocid="nav.admin.link"
              className="text-sm font-medium text-foreground hover:text-navy-500 transition-colors"
            >
              {isAdminView ? "← Back" : "Admin"}
            </button>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={() => scrollTo("contact")}
              data-ocid="nav.book_consultation.button"
              className="rounded-full bg-gold-400 hover:bg-gold-500 text-navy-600 font-semibold text-sm px-5 shadow-sm"
            >
              Book Now
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="nav.mobile_menu.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              onClick={link.action}
              className="text-sm font-medium text-left text-foreground hover:text-navy-500 py-2"
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              onAdminClick();
              setMobileOpen(false);
            }}
            className="text-sm font-medium text-left text-foreground hover:text-navy-500 py-2"
          >
            {isAdminView ? "← Back to Site" : "Admin Panel"}
          </button>
          <Button
            onClick={() => scrollTo("contact")}
            className="rounded-full bg-gold-400 hover:bg-gold-500 text-navy-600 font-semibold text-sm mt-2"
          >
            Book Now
          </Button>
        </div>
      )}
    </header>
  );
}
