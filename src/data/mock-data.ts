import cleaningImg from "@/assets/services/cleaning.jpg";
import electricianImg from "@/assets/services/electrician.jpg";
import plumbingImg from "@/assets/services/plumbing.jpg";
import acRepairImg from "@/assets/services/ac-repair.jpg";
import paintingImg from "@/assets/services/painting.jpg";
import carpentryImg from "@/assets/services/carpentry.jpg";

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  duration: string;
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  jobsCompleted: number;
  responseTime: string;
  trustScore: number;
  verified: boolean;
  location: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceImage: string;
  professionalName: string;
  professionalId: string;
  date: string;
  price: number;
  rating: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  service: string;
  date: string;
}

export const services: Service[] = [
  { id: "s1", name: "Deep Home Cleaning", category: "Cleaning", description: "Professional deep cleaning for your entire home", price: 2499, rating: 4.8, reviewCount: 1240, image: cleaningImg, duration: "3-4 hrs" },
  { id: "s2", name: "Electrical Repair", category: "Electrical", description: "Expert electrical repair and installation", price: 499, rating: 4.7, reviewCount: 890, image: electricianImg, duration: "1-2 hrs" },
  { id: "s3", name: "Plumbing Services", category: "Plumbing", description: "Complete plumbing solutions for your home", price: 399, rating: 4.6, reviewCount: 760, image: plumbingImg, duration: "1-2 hrs" },
  { id: "s4", name: "AC Service & Repair", category: "AC Repair", description: "AC servicing, gas refilling, and repair", price: 699, rating: 4.9, reviewCount: 2100, image: acRepairImg, duration: "1-2 hrs" },
  { id: "s5", name: "Home Painting", category: "Painting", description: "Interior and exterior painting services", price: 4999, rating: 4.5, reviewCount: 430, image: paintingImg, duration: "2-3 days" },
  { id: "s6", name: "Carpentry Work", category: "Carpentry", description: "Custom furniture and woodwork", price: 899, rating: 4.7, reviewCount: 560, image: carpentryImg, duration: "2-4 hrs" },
];

export const categories = [
  { id: "c1", name: "Best Deal", icon: "🏷️" },
  { id: "c2", name: "AC Repair", icon: "❄️" },
  { id: "c3", name: "Cleaning", icon: "🧹" },
  { id: "c4", name: "Electrical", icon: "⚡" },
  { id: "c5", name: "Plumbing", icon: "🔧" },
  { id: "c6", name: "Painting", icon: "🎨" },
  { id: "c7", name: "Carpentry", icon: "🪚" },
  { id: "c8", name: "Pest Control", icon: "🐛" },
];

export const locations = [
  "Mirpur", "Dhanmondi", "Gulshan", "Banani", "Uttara", "Mohammadpur", "Bashundhara", "Motijheel"
];

export const professionals: Professional[] = [
  { id: "p1", name: "Rajesh Kumar", specialty: "AC Technician", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", rating: 4.9, jobsCompleted: 1250, responseTime: "15 min", trustScore: 96, verified: true, location: "Mirpur" },
  { id: "p2", name: "Amit Sharma", specialty: "Electrician", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face", rating: 4.8, jobsCompleted: 980, responseTime: "20 min", trustScore: 94, verified: true, location: "Gulshan" },
  { id: "p3", name: "Sunil Das", specialty: "Plumber", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face", rating: 4.7, jobsCompleted: 750, responseTime: "25 min", trustScore: 91, verified: true, location: "Dhanmondi" },
  { id: "p4", name: "Priya Patel", specialty: "Cleaning Expert", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face", rating: 4.9, jobsCompleted: 1500, responseTime: "10 min", trustScore: 98, verified: true, location: "Banani" },
];

export const mockBookings: Booking[] = [
  { id: "b1", serviceId: "s1", serviceName: "Deep Home Cleaning", serviceImage: cleaningImg, professionalName: "Priya Patel", professionalId: "p4", date: "2026-02-10", price: 2499, rating: 5 },
  { id: "b2", serviceId: "s4", serviceName: "AC Service & Repair", serviceImage: acRepairImg, professionalName: "Rajesh Kumar", professionalId: "p1", date: "2026-01-28", price: 699, rating: 4 },
  { id: "b3", serviceId: "s2", serviceName: "Electrical Repair", serviceImage: electricianImg, professionalName: "Amit Sharma", professionalId: "p2", date: "2026-01-15", price: 499, rating: 5 },
];

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", rating: 5, text: "Absolutely amazing service! The professional was on time, courteous, and did a fantastic job cleaning our home. Will definitely book again.", service: "Deep Cleaning", date: "2026-02-01" },
  { id: "t2", name: "Michael Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", rating: 5, text: "Best AC repair service I've ever used. Quick diagnosis and fix. The technician explained everything clearly. Highly recommend!", service: "AC Repair", date: "2026-01-25" },
  { id: "t3", name: "Fatima Rahman", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", rating: 4, text: "Great experience overall. The plumber fixed our leaking faucet in no time. Professional and clean work. Fair pricing too.", service: "Plumbing", date: "2026-01-18" },
  { id: "t4", name: "David Williams", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", rating: 5, text: "Transformed our living room with a beautiful paint job. The team was meticulous and the finish is perfect. Worth every penny!", service: "Painting", date: "2026-01-10" },
];

export const serviceSuggestions = [
  "Deep Home Cleaning", "AC Service & Repair", "Electrical Repair", "Plumbing Services",
  "Home Painting", "Carpentry Work", "Pest Control", "Bathroom Cleaning",
  "Kitchen Cleaning", "Fan Installation", "Tap Repair", "Wall Painting",
];
