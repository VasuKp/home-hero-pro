import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";

const Index = lazy(() => import("@/pages/Index"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const ConfirmationPage = lazy(() => import("@/pages/ConfirmationPage"));
const ProfessionalPage = lazy(() => import("@/pages/ProfessionalPage"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <ScrollProgress />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                <Route path="/professional/:id" element={<ProfessionalPage />} />
              </Routes>
            </Suspense>
            <Toaster position="top-right" richColors />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
