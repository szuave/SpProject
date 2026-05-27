import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">404</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-ink">Pagina niet gevonden</h1>
        <p className="mt-4 text-lg text-ink-2">
          Sorry, deze pagina bestaat niet (meer).{" "}
          <Link href="/" className="text-brand-600 hover:underline">
            Ga terug naar de homepage
          </Link>
          .
        </p>
        <div className="mt-8 inline-flex">
          <Button href="/" iconRight={<ArrowRight className="h-4 w-4" />}>
            Terug naar home
          </Button>
        </div>
      </Container>
    </section>
  );
}
