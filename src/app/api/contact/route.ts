import { NextResponse } from "next/server";

// Demo endpoint: validates the payload and logs it server-side.
// Koppel hier later een mailservice (Resend, SMTP, Teamleader, ...) aan.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const naam = String(body.naam ?? "").trim();
    const email = String(body.email ?? "").trim();
    const bericht = String(body.bericht ?? "").trim();

    if (!naam || !email || !bericht || !email.includes("@")) {
      return NextResponse.json({ ok: false, error: "Ongeldige invoer" }, { status: 400 });
    }

    console.log("[SP-Projects] Nieuwe offerte-aanvraag:", {
      naam,
      email,
      tel: body.tel,
      dienst: body.dienst,
      bericht,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Serverfout" }, { status: 500 });
  }
}
