import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <section className="container py-24">
      <div className="rounded-3xl border border-border bg-card p-10 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-primary">404</p>
        <h1 className="mb-4 font-heading text-5xl font-bold">Page not found</h1>
        <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
          The route <span className="text-foreground">{location.pathname}</span> does not exist in
          the current marketplace navigation.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to={routes.home}>Return home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={routes.cargo}>Browse cargo</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={routes.transport}>Browse transport</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
