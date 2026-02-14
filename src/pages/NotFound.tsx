import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl font-bold text-accent mb-4">404</p>
        <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
        <Link to="/" className="px-6 py-3 bg-accent text-accent-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
          Go Home
        </Link>
      </div>
    </div>
  );
}
