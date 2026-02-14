export const cities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
  "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
  "Noida", "Gurgaon", "Chandigarh", "Indore", "Kochi"
];

export const servicesSuggestions = [
  "AC Repair & Service", "Electrician", "Plumber", "Carpenter",
  "House Cleaning", "Pest Control", "Painting", "Appliance Repair",
  "Salon at Home", "Bathroom Cleaning", "Sofa Cleaning",
  "Water Purifier Repair", "Geyser Repair", "Microwave Repair",
  "Washing Machine Repair", "Refrigerator Repair", "Fan Installation",
  "CCTV Installation", "Interior Design", "Home Deep Cleaning"
];

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  serviceCount: number;
}

export const categories: Category[] = [
  { id: "cleaning", name: "Home Cleaning", icon: "🏠", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop", serviceCount: 24 },
  { id: "plumbing", name: "Plumbing", icon: "🔧", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop", serviceCount: 18 },
  { id: "electrical", name: "Electrical", icon: "⚡", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop", serviceCount: 21 },
  { id: "painting", name: "Painting", icon: "🎨", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop", serviceCount: 15 },
  { id: "ac-repair", name: "AC Repair", icon: "❄️", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop", serviceCount: 12 },
  { id: "carpentry", name: "Carpentry", icon: "🪚", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop", serviceCount: 16 },
  { id: "pest-control", name: "Pest Control", icon: "🛡️", image: "https://images.unsplash.com/photo-1632923057155-1be5e4e1a807?w=400&h=300&fit=crop", serviceCount: 9 },
  { id: "salon", name: "Salon at Home", icon: "💇", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop", serviceCount: 30 },
];

export interface Professional {
  id: string;
  name: string;
  service: string;
  category: string;
  rating: number;
  reviews: number;
  experience: string;
  price: string;
  priceNum: number;
  image: string;
  location: string;
  verified: boolean;
  responseTime: string;
  completedJobs: number;
  about: string;
  skills: string[];
}

export const professionals: Professional[] = [
  {
    id: "1", name: "Rajesh Kumar", service: "AC Repair & Service", category: "ac-repair",
    rating: 4.9, reviews: 342, experience: "8 years", price: "₹499", priceNum: 499,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    location: "Mumbai", verified: true, responseTime: "15 min", completedJobs: 1250,
    about: "Expert AC technician with 8+ years of experience in all brands. Specializing in split AC, window AC repairs and annual maintenance contracts.",
    skills: ["Split AC", "Window AC", "Central AC", "Installation", "Gas Refill"]
  },
  {
    id: "2", name: "Priya Sharma", service: "Home Deep Cleaning", category: "cleaning",
    rating: 4.8, reviews: 218, experience: "5 years", price: "₹1,999", priceNum: 1999,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    location: "Delhi", verified: true, responseTime: "30 min", completedJobs: 890,
    about: "Professional cleaning expert offering deep cleaning, move-in/out cleaning, and regular maintenance services with eco-friendly products.",
    skills: ["Deep Cleaning", "Bathroom", "Kitchen", "Sofa", "Carpet"]
  },
  {
    id: "3", name: "Amit Patel", service: "Electrician", category: "electrical",
    rating: 4.7, reviews: 156, experience: "10 years", price: "₹299", priceNum: 299,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    location: "Bangalore", verified: true, responseTime: "20 min", completedJobs: 2100,
    about: "Licensed electrician handling everything from minor repairs to complete house wiring. Safety-first approach with quality materials.",
    skills: ["Wiring", "MCB", "Fan Installation", "Switchboard", "Inverter"]
  },
  {
    id: "4", name: "Suman Devi", service: "Salon at Home", category: "salon",
    rating: 4.9, reviews: 489, experience: "7 years", price: "₹799", priceNum: 799,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    location: "Hyderabad", verified: true, responseTime: "45 min", completedJobs: 1800,
    about: "Certified beauty professional offering premium salon services at your doorstep. Trained in latest techniques and using top-brand products.",
    skills: ["Haircut", "Facial", "Waxing", "Manicure", "Bridal"]
  },
  {
    id: "5", name: "Vikram Singh", service: "Plumbing", category: "plumbing",
    rating: 4.6, reviews: 203, experience: "12 years", price: "₹349", priceNum: 349,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    location: "Pune", verified: false, responseTime: "25 min", completedJobs: 3200,
    about: "Master plumber specializing in leak detection, pipe fitting, bathroom renovation, and water heater installation.",
    skills: ["Leak Repair", "Pipe Fitting", "Tap Install", "Drainage", "Water Heater"]
  },
  {
    id: "6", name: "Meera Nair", service: "Interior Painting", category: "painting",
    rating: 4.8, reviews: 167, experience: "6 years", price: "₹2,499", priceNum: 2499,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    location: "Kochi", verified: true, responseTime: "1 hour", completedJobs: 650,
    about: "Creative painting professional with expertise in interior and exterior painting, texture painting, and waterproofing solutions.",
    skills: ["Interior", "Exterior", "Texture", "Waterproofing", "Wood Polish"]
  },
];

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  { id: "1", name: "Ananya Mishra", location: "Mumbai", rating: 5, text: "Absolutely wonderful experience! The AC technician was punctual, professional, and fixed the issue in under 30 minutes. Will definitely book again.", service: "AC Repair", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
  { id: "2", name: "Rahul Verma", location: "Delhi", rating: 5, text: "Best home cleaning service I've ever used. The team was thorough, used quality products, and my apartment looks brand new. Highly recommended!", service: "Deep Cleaning", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
  { id: "3", name: "Kavita Reddy", location: "Bangalore", rating: 4, text: "Great electrician service. Responsive, knowledgeable, and completed the full house wiring check efficiently. Fair pricing too.", service: "Electrical", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face" },
  { id: "4", name: "Deepak Joshi", location: "Pune", rating: 5, text: "The salon-at-home experience was luxurious. Professional staff, premium products, and I didn't even have to leave my house. Perfect for busy professionals!", service: "Salon at Home", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=face" },
  { id: "5", name: "Sneha Gupta", location: "Hyderabad", rating: 5, text: "Painting team transformed my living room completely. Clean work, no mess, and the finish quality is outstanding. Worth every rupee spent.", service: "Painting", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face" },
];

export const trustStats = [
  { label: "Happy Customers", value: 50000, suffix: "+" },
  { label: "Verified Professionals", value: 5000, suffix: "+" },
  { label: "Services Completed", value: 200000, suffix: "+" },
  { label: "Cities Served", value: 25, suffix: "" },
];

export const howItWorks = [
  { step: 1, title: "Search & Select", description: "Browse services or search for what you need. Compare professionals by ratings and reviews.", icon: "🔍" },
  { step: 2, title: "Book Instantly", description: "Pick a convenient date and time. Get instant confirmation with transparent pricing.", icon: "📅" },
  { step: 3, title: "Sit Back & Relax", description: "Verified professional arrives at your doorstep. Pay securely after service completion.", icon: "✨" },
];
