import { useState } from "react";
import { Menu, Package, Shield, Truck, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { NavLink } from "@/components/NavLink";
import { navigationItems, routes } from "@/lib/routes";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, role, signOut, workspaceMode, setWorkspaceMode } = useAuth();
  const visibleNavigationItems =
    role === "admin"
      ? navigationItems
      : navigationItems.filter((item) => item.to !== routes.admin);
  const homeTarget =
    isAuthenticated && role !== "admin"
      ? workspaceMode === "transport"
        ? routes.transport
        : routes.cargo
      : routes.home;

  return (
    <nav className="fixed left-1/2 top-6 z-50 flex h-10 w-[calc(100%-2rem)] max-w-[1120px] -translate-x-1/2 items-center justify-between rounded-[48px] border border-white/10 bg-[rgba(255,255,255,0.02)] px-5 shadow-[0_18px_80px_-40px_rgba(0,0,0,0.85)] backdrop-blur-[14px] md:h-16 md:px-8">
      <div className="flex w-full items-center justify-between gap-6">
        <Link to={homeTarget} className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_24px_-10px_rgba(0,212,204,0.7)] md:h-10 md:w-10">
            <Truck className="h-5 w-5" />
          </div>
          <div>
            <div className="font-heading text-base font-bold tracking-tight text-white md:text-xl">Cargo Connect</div>
            <div className="hidden text-[11px] uppercase tracking-[0.24em] text-[#8f96a3] md:block">Freight exchange</div>
          </div>
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          {visibleNavigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="relative text-sm font-normal text-[#9c9c9c] transition-colors hover:text-white"
              activeClassName="font-medium text-white"
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <>
              {role !== "admin" ? (
                <div className="flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1">
                  <Button
                    className="gap-2 rounded-full"
                    onClick={() => {
                      setWorkspaceMode("cargo");
                      navigate(routes.cargo);
                    }}
                    size="sm"
                    type="button"
                    variant={workspaceMode === "cargo" ? "default" : "ghost"}
                  >
                    <Package className="h-4 w-4" />
                    Cargo
                  </Button>
                  <Button
                    className="gap-2 rounded-full"
                    onClick={() => {
                      setWorkspaceMode("transport");
                      navigate(routes.transport);
                    }}
                    size="sm"
                    type="button"
                    variant={workspaceMode === "transport" ? "default" : "ghost"}
                  >
                    <Truck className="h-4 w-4" />
                    Driver
                  </Button>
                </div>
              ) : null}
              <Button asChild className="text-[#9c9c9c] hover:text-white" size="sm" variant="ghost">
                <Link to={routes.profile}>{role}</Link>
              </Button>
              {role === "admin" ? (
                <Button asChild className="gap-2 rounded-full" size="sm">
                  <Link to={routes.admin}>
                    <Shield className="h-4 w-4" />
                    Admin
                  </Link>
                </Button>
              ) : null}
              <Button
                className="text-[#9c9c9c] hover:text-white"
                onClick={signOut}
                size="sm"
                type="button"
                variant="ghost"
              >
                Sign out
              </Button>
            </>
          ) : (
            <Button asChild className="text-[#9c9c9c] hover:text-white" variant="ghost" size="sm">
              <Link to={routes.auth}>Sign in</Link>
            </Button>
          )}
        </div>

        <button
          aria-label="Toggle navigation"
          className="text-sm font-medium text-[#9c9c9c] transition-colors hover:text-white lg:hidden"
          onClick={() => setMobileOpen((current) => !current)}
          type="button"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : "Menu"}
        </button>
      </div>

      {mobileOpen ? (
        <div className="absolute left-0 right-0 top-[calc(100%+12px)] rounded-[28px] border border-white/10 bg-[rgba(10,14,20,0.94)] px-4 pb-5 pt-4 shadow-[0_24px_100px_-40px_rgba(0,0,0,0.9)] backdrop-blur-[16px] lg:hidden">
          <div className="flex flex-col gap-3">
            {visibleNavigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="rounded-xl px-3 py-2 text-sm text-[#9c9c9c] transition-colors hover:bg-white/5 hover:text-white"
                activeClassName="bg-white/5 text-white"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-2 flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  {role !== "admin" ? (
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => {
                          setWorkspaceMode("cargo");
                          setMobileOpen(false);
                          navigate(routes.cargo);
                        }}
                        size="sm"
                        type="button"
                        variant={workspaceMode === "cargo" ? "default" : "outline"}
                      >
                        Cargo
                      </Button>
                      <Button
                        onClick={() => {
                          setWorkspaceMode("transport");
                          setMobileOpen(false);
                          navigate(routes.transport);
                        }}
                        size="sm"
                        type="button"
                        variant={workspaceMode === "transport" ? "default" : "outline"}
                      >
                        Driver
                      </Button>
                    </div>
                  ) : null}
                  <Button asChild size="sm" variant="ghost">
                    <Link onClick={() => setMobileOpen(false)} to={routes.profile}>
                      Profile
                    </Link>
                  </Button>
                  {role === "admin" ? (
                    <Button asChild size="sm">
                      <Link onClick={() => setMobileOpen(false)} to={routes.admin}>
                        Admin panel
                      </Link>
                    </Button>
                  ) : null}
                  <Button
                    onClick={() => {
                      signOut();
                      setMobileOpen(false);
                    }}
                    size="sm"
                    type="button"
                    variant="ghost"
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <Button asChild variant="ghost" size="sm">
                  <Link onClick={() => setMobileOpen(false)} to={routes.auth}>
                    Sign in
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
