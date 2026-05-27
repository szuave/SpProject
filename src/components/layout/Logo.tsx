import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <Link href="/" aria-label={`${site.name} — home`} className="inline-flex items-center">
      <Image
        src={variant === "light" ? "/img/logo.png" : "/img/logo-black.png"}
        alt={site.name}
        width={783}
        height={418}
        priority
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
