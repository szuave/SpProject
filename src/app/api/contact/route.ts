import { NextResponse } from "next/server";
import { createLead } from "@/lib/db";

export const runtime = "nodejs";

const cap = (s: string, n: number) => s.slice(0, n);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot — bots vullen dit verborgen veld in. Doe alsof het lukt,
    // maar sla niets op.
    if (String(body.website ?? "").trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const naam = cap(String(body.naam ?? "").trim(), 120);
    const email = cap(String(body.email ?? "").trim(), 160);
    const bericht = cap(String(body.bericht ?? "").trim(), 5000);
    const tel = cap(String(body.tel ?? "").trim(), 40);
    const dienst = cap(String(body.dienst ?? "").trim(), 80);
    const bron = cap(String(body.bron ?? "contact").trim(), 40) || "contact";

    if (naam.length < 2 || bericht.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Ongeldige invoer" }, { status: 400 });
    }

    createLead({ naam, email, tel: tel || null, dienst: dienst || null, bericht, bron });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Serverfout" }, { status: 500 });
  }
}
