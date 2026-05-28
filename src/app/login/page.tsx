import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Inloggen — SP-Projects",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await getSession()) redirect("/backend");

  return (
    <div className="min-h-dvh grid lg:grid-cols-[1fr_minmax(420px,520px)]">
      {/* Brand panel */}
      <div className="hidden lg:flex relative overflow-hidden bg-ink text-white p-16 flex-col justify-between">
        <Link href="/" className="relative z-10 inline-flex">
          <Image src="/img/logo.png" alt="SP-Projects" width={783} height={418} priority className="h-12 w-auto" />
        </Link>
        <div className="relative z-10">
          <h2 className="font-display text-4xl font-extrabold leading-tight text-white">
            Renovatiewerken op maat
            <br />
            voor jouw <span className="text-brand-500">droomhuis</span>.
          </h2>
          <p className="mt-4 max-w-sm text-white/60">
            Uw partner voor dakwerken, gevelwerken en totaalrenovatie in Gent &amp; Oost-Vlaanderen.
          </p>
        </div>
        <div className="relative z-10 text-sm text-white/40">SP-Projects · Backend</div>
        <span aria-hidden className="absolute top-0 right-0 h-40 w-40 bg-brand-500" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex justify-center mb-10">
            <Image src="/img/logo-black.png" alt="SP-Projects" width={783} height={418} priority className="h-11 w-auto" />
          </div>
          <div className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-2">
            <span aria-hidden className="h-2 w-2 bg-brand-500" />
            Backend
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight">Inloggen</h1>
          <p className="mt-2 text-ink-3 text-sm">Log in om je content te beheren.</p>
          <div className="mt-8">
            <LoginForm />
          </div>
          <Link href="/" className="mt-8 inline-block text-sm text-ink-3 hover:text-brand-600">
            ← Terug naar de website
          </Link>
        </div>
      </div>
    </div>
  );
}
