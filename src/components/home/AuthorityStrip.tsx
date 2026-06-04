import { vendors } from "@/lib/data";

export function AuthorityStrip() {
  return (
    <section className="py-12 border-y border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-center gap-6 lg:gap-10 overflow-x-auto hide-scrollbar flex-nowrap">
          {vendors.map((vendor, i) => (
            <div key={vendor} className="flex items-center gap-6 lg:gap-10 shrink-0">
              <span className="text-xs font-medium text-[#52525B] tracking-widest uppercase whitespace-nowrap">
                {vendor}
              </span>
              {i < vendors.length - 1 && (
                <div className="w-px h-4 bg-[rgba(255,255,255,0.06)]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
