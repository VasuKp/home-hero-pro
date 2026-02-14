import { useState } from "react";
import { Wrench, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email");

const footerLinks = {
  Services: ["Home Cleaning", "Plumbing", "Electrical", "AC Repair", "Painting"],
  Company: ["About Us", "Careers", "Blog", "Press", "Contact"],
  Support: ["Help Center", "Safety", "Terms of Service", "Privacy Policy", "Refund Policy"],
};

const socials = [
  { label: "Twitter", icon: "𝕏" },
  { label: "Instagram", icon: "📸" },
  { label: "Facebook", icon: "📘" },
  { label: "LinkedIn", icon: "💼" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    toast.success("Subscribed successfully!", { description: "You'll receive our latest updates." });
    setEmail("");
  };

  return (
    <footer className="bg-primary text-white">
      <div className="container-main py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <Wrench className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">HomeServ</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Your trusted partner for all home services. Verified professionals, transparent pricing, guaranteed satisfaction.
            </p>
            {/* Newsletter */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                  placeholder="Your email"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/10 rounded-xl text-sm text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-accent/50 border border-white/10"
                  aria-label="Newsletter email"
                />
              </div>
              <button
                onClick={handleSubscribe}
                className="px-4 py-2.5 bg-accent text-accent-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <Link to="#" className="text-sm text-white/50 hover:text-accent transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} HomeServ. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socials.map(s => (
              <a
                key={s.label}
                href="#"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-sm hover:bg-accent transition-colors"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
