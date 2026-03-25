import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Shield,
  Twitter,
  User,
  Youtube,
} from "lucide-react";

interface FooterProps {
  onAdminClick: () => void;
}

export default function Footer({ onAdminClick }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const hostname = window.location.hostname;
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="font-bold uppercase tracking-wide text-sm">
                  VG Cyber Cafe
                </div>
                <div className="text-primary-foreground/60 text-xs uppercase tracking-wider">
                  Gov Services Hub
                </div>
              </div>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-3">
              Your trusted partner for all government documentation and service
              needs. Fast, reliable, and professional.
            </p>
            <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-1">
              <User className="w-4 h-4 text-accent" />
              <span>Vinay Gautam (Proprietor)</span>
            </div>
            <div className="flex gap-3 mt-5">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <button
                  type="button"
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold uppercase tracking-wide text-sm mb-4 text-accent">
              Services
            </h4>
            <ul className="space-y-2">
              {[
                "Aadhar Card Download",
                "PAN Card Apply",
                "Voter ID",
                "Driving Licence",
                "Passport",
                "Caste Certificate",
                "Birth Certificate",
                "MSME / Udyam",
                "Bank Account Opening",
                "PM Yojana / Schemes",
              ].map((label) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => scrollTo("services")}
                    className="text-primary-foreground/60 hover:text-accent text-sm transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold uppercase tracking-wide text-sm mb-4 text-accent">
              Contact Info
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/60 text-sm">
                  Bilaspur, Greater Noida,
                  <br />
                  Gautam Buddh Nagar - 201009
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <a
                  href="tel:+918384821357"
                  className="text-primary-foreground/60 hover:text-accent text-sm transition-colors"
                >
                  +91 83848 21357
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/60 text-sm">
                  vgcybercafe@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/50">
          <span>
            © {currentYear} VG Cyber Cafe — Vinay Gautam. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onAdminClick}
              className="hover:text-accent transition-colors"
            >
              Admin
            </button>
            <span>
              Built with ❤️ using{" "}
              <a
                href={caffeineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent underline"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
