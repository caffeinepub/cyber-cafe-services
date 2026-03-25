import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  LayoutDashboard,
  Loader2,
  LogIn,
  LogOut,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ServiceType } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsAdmin, useSubmitInquiry } from "../hooks/useQueries";

const SERVICE_OPTIONS: { label: string; value: ServiceType }[] = [
  { label: "Aadhar Card — Download", value: ServiceType.aadharCardDownload },
  { label: "Aadhar Card — New", value: ServiceType.aadharCardNew },
  { label: "Aadhar Card — Update", value: ServiceType.aadharCardUpdate },
  { label: "PAN Card — Apply New", value: ServiceType.panCardNew },
  { label: "PAN Card — Download / Link", value: ServiceType.panCardUpdate },
  { label: "Voter ID — Apply / Update", value: ServiceType.voterIdNew },
  { label: "Voter ID — Update", value: ServiceType.voterIdUpdate },
  {
    label: "Driving Licence — Apply / Renew",
    value: ServiceType.identityCardApplication,
  },
  { label: "Passport — Apply / Renew", value: ServiceType.identityCardUpdate },
  { label: "Caste Certificate", value: ServiceType.otherGovernmentSchemes },
  { label: "Birth Certificate", value: ServiceType.otherGovernmentSchemes },
  {
    label: "MSME / Udyam Registration",
    value: ServiceType.otherGovernmentSchemes,
  },
  {
    label: "Bank Account Opening (Saving)",
    value: ServiceType.bankAccountOpening,
  },
  { label: "PM Yojana / Schemes", value: ServiceType.pmgScheme },
  {
    label: "Other Government Services",
    value: ServiceType.otherGovernmentSchemes,
  },
];

interface ContactSectionProps {
  preselectedService: string;
  onServiceUsed: () => void;
}

export default function ContactSection({
  preselectedService,
  onServiceUsed,
}: ContactSectionProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { mutateAsync: submitInquiry, isPending } = useSubmitInquiry();
  const { login, clear, identity, isLoggingIn } = useInternetIdentity();
  const { data: isAdmin } = useIsAdmin();

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
      onServiceUsed();
    }
  }, [preselectedService, onServiceUsed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !service) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      await submitInquiry({
        name: name.trim(),
        phone: phone.trim(),
        service: service as ServiceType,
      });
      setSubmitted(true);
      setName("");
      setPhone("");
      setService("");
      toast.success("Appointment booked! We'll contact you soon.");
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  };

  const isLoggedIn = !!identity;

  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-primary text-xs font-semibold uppercase tracking-widest">
              Book Your Appointment
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-foreground tracking-tight">
            Contact & Appointment
          </h2>
          <p className="mt-3 text-muted-foreground">
            Fill the form below and we'll confirm your appointment shortly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Inquiry / Appointment Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-card p-8"
          >
            <h3 className="font-bold uppercase tracking-wide text-foreground text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent rounded-full" />
              Book Appointment
            </h3>

            {submitted ? (
              <div
                data-ocid="contact.success_state"
                className="flex flex-col items-center justify-center py-12 gap-4"
              >
                <CheckCircle2 className="w-16 h-16 text-green-500" />
                <p className="text-foreground font-semibold text-center">
                  Thank you! Your appointment has been booked.
                  <br />
                  We will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold text-foreground mb-1.5 block"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    data-ocid="contact.name.input"
                    className="border-border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-semibold text-foreground mb-1.5 block"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    data-ocid="contact.phone.input"
                    className="border-border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-foreground mb-1.5 block">
                    Select Service
                  </Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger
                      data-ocid="contact.service.select"
                      className="border-border rounded-lg"
                    >
                      <SelectValue placeholder="Choose a service..." />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_OPTIONS.map((opt, idx) => (
                        <SelectItem
                          key={`${opt.value}-${idx}`}
                          value={opt.value}
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  data-ocid="contact.submit.button"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg uppercase tracking-wide"
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  {isPending ? "Booking..." : "Book Appointment"}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Right panel: Contact Info + Admin Login */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary rounded-2xl shadow-card p-8 flex flex-col gap-6"
          >
            {/* Contact Info */}
            <div>
              <h3 className="font-bold uppercase tracking-wide text-primary-foreground text-lg mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-accent rounded-full" />
                Visit Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <User className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-primary-foreground/50 text-xs uppercase tracking-wide mb-0.5">
                      Proprietor
                    </p>
                    <p className="text-primary-foreground font-semibold">
                      Vinay Gautam
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-primary-foreground/50 text-xs uppercase tracking-wide mb-0.5">
                      Address
                    </p>
                    <p className="text-primary-foreground font-semibold">
                      Bilaspur, Greater Noida
                      <br />
                      Gautam Buddh Nagar, UP
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-primary-foreground/50 text-xs uppercase tracking-wide mb-0.5">
                      Phone
                    </p>
                    <a
                      href="tel:+918384821357"
                      className="text-primary-foreground font-semibold hover:text-accent transition-colors"
                    >
                      +91 83848 21357
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="border-t border-white/10" />

            {/* Admin Login */}
            <div>
              <h3 className="font-bold uppercase tracking-wide text-primary-foreground text-base mb-2 flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-accent" />
                Admin Dashboard
              </h3>
              <p className="text-primary-foreground/60 text-xs mb-4">
                Staff login to manage service requests and inquiries.
              </p>

              {isLoggedIn ? (
                <div className="flex flex-col gap-3">
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-primary-foreground/60 text-xs uppercase tracking-wide mb-1">
                      Logged In As
                    </p>
                    <p className="text-white font-mono text-xs truncate">
                      {identity.getPrincipal().toString()}
                    </p>
                  </div>
                  {isAdmin && (
                    <div className="bg-accent/20 border border-accent/30 rounded-xl p-3">
                      <p className="text-accent font-semibold text-sm">
                        ✓ Admin Access Granted
                      </p>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    onClick={clear}
                    data-ocid="admin.logout.button"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={login}
                  disabled={isLoggingIn}
                  data-ocid="admin.login.button"
                  className="w-full bg-accent hover:bg-gold-500 text-accent-foreground font-bold gap-2 rounded-lg"
                >
                  {isLoggingIn ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <LogIn className="w-4 h-4" />
                  )}
                  {isLoggingIn ? "Logging in..." : "Admin Login"}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
