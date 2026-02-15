import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().trim().email("Please enter a valid email").max(255);

const footerLinks = {
  Services: ["Cleaning", "Electrical", "Plumbing", "AC Repair", "Painting", "Carpentry"],
  Company: ["About Us", "Careers", "Blog", "Press"],
  Support: ["Help Center", "Safety", "Terms", "Privacy"],
};

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    toast.success("Subscribed successfully! 🎉");
    setEmail("");
  };

  return (
    <footer className="bg-primary text-primary-foreground" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold">HomeServ</span>
            </div>
            <p className="text-primary-foreground/60 text-sm mb-6 max-w-xs">
              Your trusted partner for professional home services. Quality guaranteed.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-lg bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 text-sm outline-none focus:ring-1 focus:ring-accent"
                aria-label="Newsletter email"
              />
              <button type="submit" className="px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </form>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to={title === "Services" ? `/search?category=${encodeURIComponent(link)}` : "#"}
                      className="text-sm text-primary-foreground/60 hover:text-accent transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-sm text-primary-foreground/40">© 2026 HomeServ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
