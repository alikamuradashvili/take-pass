import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import CargoPage from "./pages/CargoPage.tsx";
import TransportPage from "./pages/TransportPage.tsx";
import RequestsPage from "./pages/RequestsPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import PostCargoPage from "./pages/PostCargoPage.tsx";
import PostTransportPage from "./pages/PostTransportPage.tsx";
import ListingDetailsPage from "./pages/ListingDetailsPage.tsx";
import ShellLayout from "./components/layout/ShellLayout.tsx";
import RequireAdmin from "./components/auth/RequireAdmin.tsx";
import RequireAuth from "./components/auth/RequireAuth.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route element={<ShellLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/cargo" element={<CargoPage />} />
              <Route path="/transport" element={<TransportPage />} />
              <Route
                path="/requests"
                element={
                  <RequireAuth>
                    <RequestsPage />
                  </RequireAuth>
                }
              />
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <ProfilePage />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin"
                element={
                  <RequireAdmin>
                    <AdminPage />
                  </RequireAdmin>
                }
              />
              <Route
                path="/post/cargo"
                element={
                  <RequireAuth>
                    <PostCargoPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/post/transport"
                element={
                  <RequireAuth>
                    <PostTransportPage />
                  </RequireAuth>
                }
              />
              <Route path="/listings/:type/:id" element={<ListingDetailsPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
