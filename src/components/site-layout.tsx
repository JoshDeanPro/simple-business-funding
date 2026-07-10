import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { BriefcaseBusiness, Menu, X } from "@/components/ui/icons";
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
    <div className="flex min-h-screen flex-col bg-paper text-ink selection:bg-sage">
      <header className="sticky top-0 z-40 border-b border-neutral-border/50 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5 font-bold tracking-tight text-ink transition-opacity hover:opacity-90">
            <BrandIcon />
            <span className="text-lg">SmallBizLoans</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-medium text-muted-text transition-colors hover:text-ink"
                activeProps={{ className: "text-evergreen font-semibold" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button
              asChild
              className="rounded bg-evergreen text-white hover:bg-evergreen/90 px-5 font-semibold text-sm h-9"
            >
              <Link to="/apply">Apply Now</Link>
            </Button>
          </div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded transition-colors hover:bg-sage/40 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-controls="mobile-navigation"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div id="mobile-navigation" className="border-t border-neutral-border/50 bg-white md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded px-3 py-2.5 text-sm font-medium text-muted-text hover:bg-sage/20 hover:text-ink"
                  activeProps={{ className: "bg-sage/30 text-evergreen font-semibold" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
              <Button
                asChild
                className="mt-2 rounded bg-evergreen text-white hover:bg-evergreen/90 font-semibold"
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

      <footer className="mt-20 border-t border-neutral-border bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2.5 font-bold tracking-tight text-white">
                <BrandIcon />
                <span className="text-lg">SmallBizLoans</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-sage/75">
                Providing structured, dependable business funding information and clear application paths for owner-operated small businesses.
              </p>
              <Link
                to="/apply"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-signal-green hover:underline"
              >
                Start your application
              </Link>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-sage/50">Navigation</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-sage/80">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/apply" className="hover:text-white transition-colors">
                    Apply for Funding
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-white transition-colors">
                    Resources & Guides
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white transition-colors">
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-sage/50">Contact info</h4>
              <ul className="mt-4 space-y-3 text-sm text-sage/80">
                <li>
                  <span className="block text-xs text-sage/40">Email assistance</span>
                  <a href="mailto:lizzy.alemayehu@smallbizloanz.com" className="font-medium hover:text-white break-all">
                    lizzy.alemayehu@smallbizloanz.com
                  </a>
                </li>
                <li>
                  <span className="block text-xs text-sage/40">Phone support</span>
                  <a href="tel:+17209001921" className="font-medium hover:text-white">
                    (720) 900-1921
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-8 text-xs leading-relaxed text-sage/60">
            <p>
              SmallBizLoans.com does not guarantee approval, funding, rates, terms, or funding
              amounts. Submitting an application does not constitute an offer of credit or funding.
              Final eligibility and terms depend on review of the applicant&rsquo;s information and
              supporting documents.
            </p>
            <p className="mt-4">
              &copy; {new Date().getFullYear()} SmallBizLoans. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BrandIcon() {
  return (
    <span className="grid h-8 w-8 place-items-center text-evergreen bg-sage/30 rounded">
      <BriefcaseBusiness className="h-5 w-5" fill="currentColor" aria-hidden="true" />
    </span>
  );
}
