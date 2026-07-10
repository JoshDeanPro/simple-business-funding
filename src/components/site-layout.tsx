import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { HandCoins, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/faq", label: "FAQ" },
  { to: "/blog", label: "Resources" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3 font-bold tracking-tight">
            <BrandIcon />
            <span className="text-base sm:text-lg">Smallbizloanz</span>
          </Link>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-brand" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button
              asChild
              className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
            >
              <Link to="/apply">Apply Now</Link>
            </Button>
          </div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-controls="mobile-navigation"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div id="mobile-navigation" className="border-t border-border/70 bg-background md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  activeProps={{ className: "bg-muted text-foreground" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
              <Button
                asChild
                className="mt-2 rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
              >
                <Link to="/apply" onClick={() => setOpen(false)}>
                  Apply Now
                </Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-24 border-t border-border/70 bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3 font-bold">
                <BrandIcon />
                <span>Smallbizloanz</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Business funding information, application guidance, and a straightforward way to
                contact our team.
              </p>
              <Link
                to="/apply"
                className="mt-5 inline-flex text-sm font-semibold text-brand hover:underline"
              >
                Apply for business funding
              </Link>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Site</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/apply" className="hover:text-foreground">
                    Apply for business funding
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-foreground">
                    Business funding resources
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-foreground">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-foreground">
                    Contact Smallbizloanz
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-foreground">
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Contact</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="mailto:lizzy.alemayehu@smallbizloanz.com"
                    className="hover:text-foreground"
                  >
                    lizzy.alemayehu@smallbizloanz.com
                  </a>
                </li>
                <li>
                  <a href="tel:+17209001921" className="hover:text-foreground">
                    (720) 900-1921
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-border/70 pt-6 text-xs leading-relaxed text-muted-foreground">
            <p>
              Smallbizloanz.com does not guarantee approval, funding, rates, terms, or funding
              amounts. Submitting an application does not constitute an offer of credit or funding.
              Final eligibility and terms depend on review of the applicant&rsquo;s information and
              supporting documents.
            </p>
            <p className="mt-4">
              &copy; {new Date().getFullYear()} Smallbizloanz. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BrandIcon() {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-brand-foreground shadow-sm ring-1 ring-brand/20">
      <HandCoins className="h-5 w-5" aria-hidden="true" />
    </span>
  );
}
