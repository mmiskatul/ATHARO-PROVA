import { cn } from "@/lib/utils";

export function Logo({
  locale = "en",
  className,
}: {
  locale?: "en" | "bn";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col leading-none", className)}>
      <span className="text-lg font-extrabold tracking-[0.22em] text-secondary">
        ATHARO PROVA
      </span>
      <span className={cn("text-sm font-semibold text-muted-foreground", locale === "bn" && "bangla")}>
        {locale === "bn" ? "আঠারো প্রভা" : "আঠারো প্রভা"}
      </span>
    </div>
  );
}
