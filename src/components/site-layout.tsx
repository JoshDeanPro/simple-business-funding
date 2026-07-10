import { Link, useLocation } from "@tanstack/react-router";
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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClass = scrolled
    ? "sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-border/50 shadow-sm transition-all duration-200"
    : isHome
      ? "absolute top-0 left-0 w-full z-40 bg-transparent border-b border-transparent transition-all duration-200"
      : "sticky top-0 z-40 bg-white border-b border-neutral-border/50 transition-all duration-200";

  const logoTextClass =
    !scrolled && isHome
      ? "flex items-center gap-2.5 font-bold tracking-tight text-white transition-opacity hover:opacity-90"
      : "flex items-center gap-2.5 font-bold tracking-tight text-ink transition-opacity hover:opacity-90";

  const brandIconColor = !scrolled && isHome ? "text-white" : "text-cobalt";

  const navLinkClass =
    !scrolled && isHome
      ? "text-sm font-semibold text-cloud/80 transition-colors hover:text-white py-1 border-b-2 border-transparent"
      : "text-sm font-semibold text-muted-text transition-colors hover:text-ink py-1 border-b-2 border-transparent";

  const activeLinkClass =
    !scrolled && isHome
      ? "text-white font-bold border-white"
      : "text-cobalt font-bold border-cobalt";

  const menuButtonClass =
    !scrolled && isHome
      ? "grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-white/10 text-white md:hidden"
      : "grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-cloud text-ink md:hidden";

  return (
    <div className="flex min-h-screen flex-col bg-warm-white text-ink selection:bg-soft-aqua">
      <header className={headerClass}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className={logoTextClass}>
            <BrandIcon customColor={brandIconColor} />
            <span className="text-lg font-display font-extrabold tracking-tight">
              SmallBizLoans
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={navLinkClass}
                activeProps={{ className: activeLinkClass }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              asChild
              className="rounded-full btn-premium-cobalt px-5 font-semibold text-sm h-9"
            >
              <Link to="/apply">Apply Now</Link>
            </Button>
          </div>

          <button
            type="button"
            className={menuButtonClass}
            onClick={() => setOpen((v) => !v)}
            aria-controls="mobile-navigation"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div
            id="mobile-navigation"
            className="border-t border-neutral-border/50 bg-white md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded px-3 py-2.5 text-sm font-semibold text-muted-text hover:bg-cloud hover:text-ink"
                  activeProps={{ className: "bg-soft-aqua text-cobalt font-bold" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
              <Button asChild className="mt-2 rounded-full btn-premium-cobalt font-semibold w-full">
                <Link to="/apply" onClick={() => setOpen(false)}>
                  Apply Now
                </Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-24 border-t border-neutral-border/20 bg-midnight-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2.5 font-bold tracking-tight text-white">
                <BrandIcon customColor="text-white" />
                <span className="text-lg font-display font-extrabold tracking-tight">
                  SmallBizLoans
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-cloud/70">
                Providing structured, dependable business funding information and clear application
                paths for owner-operated small businesses.
              </p>
              <Link
                to="/apply"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-signal-lime hover:underline"
              >
                Start your application &rarr;
              </Link>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cloud/40">
                Navigation
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-cloud/80">
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
              <h4 className="text-xs font-bold uppercase tracking-wider text-cloud/40">
                Contact info
              </h4>
              <ul className="mt-4 space-y-3.5 text-sm text-cloud/85">
                <li>
                  <span className="block text-xs text-cloud/40 font-bold uppercase tracking-wider mb-1">
                    Email assistance
                  </span>
                  <a
                    href="mailto:lizzy.alemayehu@smallbizloanz.com"
                    className="font-semibold hover:text-white break-all hover:underline"
                  >
                    lizzy.alemayehu@smallbizloanz.com
                  </a>
                </li>
                <li>
                  <span className="block text-xs text-cloud/40 font-bold uppercase tracking-wider mb-1">
                    Phone support
                  </span>
                  <a
                    href="tel:+17209001921"
                    className="font-semibold hover:text-white hover:underline text-base"
                  >
                    (720) 900-1921
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-8 text-xs leading-relaxed text-cloud/50">
            <p>
              SmallBizLoans.com is an independent representative coordinating application files with
              Mom &amp; Pop Business Funding. SmallBizLoans.com does not make underwriting reviews,
              credit decisions, or guarantee approval, funding, rates, terms, or final funding
              amounts. Submitting an application or contact form does not constitute an offer of
              credit or funding. Final eligibility depends entirely on review and verification of
              applicant information by Mom &amp; Pop Business Funding.
            </p>
            <p className="mt-4 font-semibold">
              &copy; {new Date().getFullYear()} SmallBizLoans. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BrandIcon({ customColor = "text-cobalt" }: { customColor?: string }) {
  return (
    <svg
      className={`h-5 w-5 ${customColor} shrink-0`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
