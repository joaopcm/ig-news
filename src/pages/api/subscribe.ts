import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { stripe } from "../../services/stripe";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).end("Method not allowed");
  }

  const session = await getSession({ req: request });

  const stripeCustomer = await stripe.customers.create({
    email: session.user.email,
  });

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomer.id,
    payment_method_types: ["card"],
    billing_address_collection: "required",
    line_items: [
      {
        price: "price_1IosESKXGWZ1KcGbjxTr6VlD",
        quantity: 1,
      },
    ],
    mode: "subscription",
    allow_promotion_codes: true,
    success_url: process.env.STRIPE_SUCCESS_URL,
    cancel_url: process.env.STRIPE_CANCEL_URL,
  });

  return response.status(200).json({ sessionId: stripeCheckoutSession.id });
};