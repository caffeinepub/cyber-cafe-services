import { Button } from "@/components/ui/button";
import {
  Baby,
  BookOpen,
  Building2,
  Car,
  CreditCard,
  ExternalLink,
  Factory,
  FileText,
  Landmark,
  type LucideIcon,
  ScrollText,
  Vote,
} from "lucide-react";
import { motion } from "motion/react";
import { ServiceType } from "../backend";

interface SubService {
  label: string;
  url: string;
}

interface Service {
  icon: LucideIcon;
  title: string;
  subServices: SubService[];
  primaryService: ServiceType;
}

const SERVICES: Service[] = [
  {
    icon: CreditCard,
    title: "Aadhar Card",
    primaryService: ServiceType.aadharCardDownload,
    subServices: [
      { label: "Download Aadhar", url: "https://myaadhaar.uidai.gov.in/" },
      { label: "New / Update Aadhar", url: "https://uidai.gov.in/" },
    ],
  },
  {
    icon: FileText,
    title: "PAN Card",
    primaryService: ServiceType.panCardNew,
    subServices: [
      {
        label: "Apply PAN Card",
        url: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
      },
      {
        label: "Download / Link PAN",
        url: "https://www.incometax.gov.in/iec/foportal/",
      },
    ],
  },
  {
    icon: Vote,
    title: "Voter ID",
    primaryService: ServiceType.voterIdNew,
    subServices: [
      { label: "Apply / Update Voter ID", url: "https://voters.eci.gov.in/" },
    ],
  },
  {
    icon: Car,
    title: "Driving Licence",
    primaryService: ServiceType.identityCardApplication,
    subServices: [
      { label: "Apply / Renew DL", url: "https://parivahan.gov.in/parivahan/" },
    ],
  },
  {
    icon: BookOpen,
    title: "Passport",
    primaryService: ServiceType.identityCardApplication,
    subServices: [
      { label: "Apply / Renew Passport", url: "https://passportindia.gov.in/" },
    ],
  },
  {
    icon: ScrollText,
    title: "Caste Certificate",
    primaryService: ServiceType.otherGovernmentSchemes,
    subServices: [
      {
        label: "Apply Caste Certificate (UP)",
        url: "https://edistrict.up.gov.in/",
      },
    ],
  },
  {
    icon: Baby,
    title: "Birth Certificate",
    primaryService: ServiceType.otherGovernmentSchemes,
    subServices: [
      { label: "Apply Birth Certificate", url: "https://crsorgi.gov.in/" },
    ],
  },
  {
    icon: Factory,
    title: "MSME / Udyam",
    primaryService: ServiceType.otherGovernmentSchemes,
    subServices: [
      { label: "Udyam Registration", url: "https://udyamregistration.gov.in/" },
    ],
  },
  {
    icon: Building2,
    title: "Bank Account (Saving)",
    primaryService: ServiceType.bankAccountOpening,
    subServices: [
      {
        label: "Open Saving Account",
        url: "https://www.india.gov.in/topics/banking",
      },
    ],
  },
  {
    icon: Landmark,
    title: "PM Yojana / Schemes",
    primaryService: ServiceType.pmgScheme,
    subServices: [
      { label: "All PM Schemes", url: "https://pmmodiyojana.in/" },
      { label: "More Schemes", url: "https://www.india.gov.in/" },
    ],
  },
];

interface ServicesSectionProps {
  onApplyNow: (service: string) => void;
}

export default function ServicesSection({ onApplyNow }: ServicesSectionProps) {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-20 bg-secondary">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-primary text-xs font-semibold uppercase tracking-widest">
              What We Offer
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-foreground tracking-tight">
            Our Essential Services
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Professional assistance for all government documentation, scheme
            enrollment, and online services — with direct links to official
            portals.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const officialUrl = service.subServices[0].url;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                data-ocid={`services.item.${i + 1}`}
                className="group bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 p-6 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold uppercase text-sm tracking-wide text-foreground mb-3">
                  {service.title}
                </h3>
                <ul className="flex-1 space-y-1.5 mb-5">
                  {service.subServices.map((sub) => (
                    <li
                      key={sub.url}
                      className="flex items-center gap-2 text-muted-foreground text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {sub.label}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => {
                      onApplyNow(service.primaryService);
                      scrollToContact();
                    }}
                    data-ocid={`services.apply_now.button.${i + 1}`}
                    size="sm"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg text-xs uppercase tracking-wide"
                  >
                    Book Appointment
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    data-ocid={`services.official_site.button.${i + 1}`}
                    className="w-full border-primary/30 text-primary hover:bg-primary/5 font-semibold rounded-lg text-xs uppercase tracking-wide gap-1"
                  >
                    <a
                      href={officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Official Site <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
