import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#09090B] border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-baseline gap-0.5">
              <span className="text-lg font-bold text-white">GIT</span>
              <span className="text-lg font-light text-[#A1A1AA]">Academy</span>
            </Link>
            <p className="text-sm text-[#71717A] mt-3 leading-relaxed max-w-[240px]">
              India&apos;s premier cybersecurity command center. Authorized training partner since 2002.
            </p>
          </div>

          {/* Training */}
          <div>
            <h3 className="text-sm font-medium text-white mb-4">Training</h3>
            <ul className="space-y-2.5">
              {["Cisco", "EC-Council", "CompTIA", "Microsoft", "AWS", "Fortinet", "Palo Alto"].map(
                (vendor) => (
                  <li key={vendor}>
                    <Link
                      href={`/training?vendor=${vendor.toLowerCase().replace(/[\s-]/g, "-")}`}
                      className="text-sm text-[#71717A] hover:text-white transition-colors duration-200"
                    >
                      {vendor}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-medium text-white mb-4">Company</h3>
            <ul className="space-y-2.5">
              {[
                { label: "About", href: "/about" },
                { label: "Certifications", href: "/certifications" },
                { label: "Virtual Labs", href: "/labs" },
                { label: "Corporate Training", href: "/corporate" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#71717A] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium text-white mb-4">Contact</h3>
            <ul className="space-y-2.5 text-sm text-[#71717A]">
              <li>
                <a href="tel:+919972177745" className="hover:text-white transition-colors duration-200">
                  +91 99721 77745
                </a>
              </li>
              <li>
                <a href="mailto:info@gitinfo.com" className="hover:text-white transition-colors duration-200">
                  info@gitinfo.com
                </a>
              </li>
              <li className="leading-relaxed">
                Jayanagar 4th Block,<br />
                Bengaluru, Karnataka 560041
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[rgba(255,255,255,0.06)] pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#52525B]">
            © {new Date().getFullYear()} GIT Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#52525B]">
            <Link href="/privacy" className="hover:text-[#71717A] transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-[#71717A] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
