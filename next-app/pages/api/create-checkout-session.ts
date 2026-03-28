import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

type ResponseData = { url: string } | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    console.warn(
      "[FSA Elite] STRIPE_SECRET_KEY is not set. " +
        "Copy next-app/.env.example to next-app/.env.local and add your Stripe secret key."
    );
    return res.status(500).json({
      error:
        "Stripe is not configured. Set STRIPE_SECRET_KEY in your environment variables.",
    });
  }

  const stripe = new Stripe(secretKey, { apiVersion: "2023-10-16" });

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") || "http://localhost:3000";

  const priceAmountCents = parseInt(process.env.PRICE_AMOUNT_CENTS || "4997", 10);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: priceAmountCents,
            product_data: {
              name: "FSA Elite — Early Access",
              description:
                "Performance-driven sales training for closers who want more. " +
                "AI-powered objection handling, mobile-first, built for real-world results.",
            },
          },
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
    });

    return res.status(200).json({ url: session.url as string });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Stripe session creation failed.";
    console.error("[FSA Elite] Stripe error:", message);
    return res.status(500).json({ error: message });
  }
}
