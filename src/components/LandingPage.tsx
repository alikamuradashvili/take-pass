import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { routes } from "@/lib/routes";

const LandingPage = () => {
  const { isAuthenticated, workspaceMode } = useAuth();
  const browseTarget = workspaceMode === "transport" ? routes.transport : routes.cargo;
  const primaryProfileTarget =
    isAuthenticated && workspaceMode === "transport" ? routes.postTransport : routes.postCargo;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(51,206,198,0.14),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(32,112,255,0.12),transparent_18%)]" />

      <div className="container relative flex min-h-[calc(100vh-9rem)] items-center py-24">
        <div className="grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">
              Cargo Connect
            </p>
            <h1 className="mb-6 font-heading text-5xl font-bold leading-[0.94] tracking-tight sm:text-6xl">
              Freight exchange for cargo and drivers.
            </h1>
            <p className="mb-10 max-w-xl text-base leading-7 text-muted-foreground">
              Post cargo. Post transport. Review requests. Work from one clean marketplace.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link to={primaryProfileTarget}>
                  {isAuthenticated ? (workspaceMode === "transport" ? "Post transport" : "Post cargo") : "Post cargo"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to={isAuthenticated ? browseTarget : routes.transport}>
                  {isAuthenticated ? "Browse market" : "Post transport"}
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link to={isAuthenticated ? routes.profile : routes.auth}>
                  {isAuthenticated ? "Profile" : "Sign in"}
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <Link
              className="rounded-3xl border border-border bg-card/80 p-6 transition-colors hover:border-primary/40"
              to={routes.cargo}
            >
              <div className="mb-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Cargo
              </div>
              <div className="font-heading text-2xl font-bold">Find demand</div>
            </Link>

            <Link
              className="rounded-3xl border border-border bg-card/80 p-6 transition-colors hover:border-primary/40"
              to={routes.transport}
            >
              <div className="mb-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Driver
              </div>
              <div className="font-heading text-2xl font-bold">Find transport</div>
            </Link>

            <Link
              className="rounded-3xl border border-border bg-card/80 p-6 transition-colors hover:border-primary/40"
              to={isAuthenticated ? routes.requests : routes.auth}
            >
              <div className="mb-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Requests
              </div>
              <div className="font-heading text-2xl font-bold">
                {isAuthenticated ? "Open workspace" : "Sign in first"}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
