import { useState } from "react";
import { Truck, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Truck className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-foreground">
            Take<span className="text-primary">Pass</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            How It Works
          </a>
          <a href="#stats" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Marketplace
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            შესვლა
          </Button>
          <Button size="sm">რეგისტრაცია</Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-3">
            <a href="#features" className="text-sm text-muted-foreground py-2">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground py-2">How It Works</a>
            <a href="#stats" className="text-sm text-muted-foreground py-2">Marketplace</a>
            <hr className="border-border" />
            <Button variant="ghost" size="sm" className="justify-start text-muted-foreground">
              შესვლა
            </Button>
            <Button size="sm">რეგისტრაცია</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
