# Stripe Checkout & Payment Setup Guide

This guide walks through configuring Stripe for the FSA ELITE membership checkout system.

## Overview

The FSA ELITE platform uses Stripe for payment processing with the following features:

- **One-time payment**: $12.99 for lifetime membership access
- **Secure checkout**: Stripe-hosted checkout pages
- **Automatic activation**: Membership activated immediately after successful payment
- **Webhook backup**: Redundant payment verification via Stripe webhooks

## Setup Steps

### 1. Create a Stripe Account

1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete business verification
3. Note: You can use test mode during development

### 2. Get Your API Keys

1. Navigate to [Stripe Dashboard → Developers → API Keys](https://dashboard.stripe.com/apikeys)
2. Copy your **Secret key** (starts with `sk_test_` or `sk_live_`)
3. Copy your **Publishable key** (starts with `pk_test_` or `pk_live_`)
4. Add these to your `.env.local` file:

```env
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

### 3. Create a Product (Optional but Recommended)

You can either:
- **Option A**: Use inline price creation (automatic, uses `price_data`)
- **Option B**: Create a product in Stripe Dashboard (recommended for production)

#### Option B - Create Product in Dashboard:

1. Go to [Stripe Dashboard → Products](https://dashboard.stripe.com/products)
2. Click **+ Add Product**
3. Fill in:
   - **Name**: FSA ELITE Membership
   - **Description**: One payment. Full access. AI objection drills, member store, and rep-branding tools.
   - **Price**: $12.99 USD
   - **Type**: One-time
   - **Tax code**: `txcd_10000000` (General - Electronically Supplied Services)
4. Click **Save product**
5. Copy the **Price ID** (starts with `price_`)
6. Add to `.env.local`:

```env
STRIPE_TRAINING_PRICE_ID=price_your_id_here
```

### 4. Configure Webhook (Recommended)

Webhooks provide a backup mechanism for payment verification:

1. Go to [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **+ Add endpoint**
3. Set the endpoint URL:
   - **Development**: `https://your-vercel-url.vercel.app/api/stripe-webhook`
   - **Production**: `https://fsaeliteperformance.com/api/stripe-webhook`
4. Select events to listen for:
   - ✓ `checkout.session.completed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add to `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
```

### 5. Test the Checkout Flow

#### Using Test Mode:

1. Make sure you're using test API keys (`sk_test_` and `pk_test_`)
2. Visit your checkout page: `/checkout-preview`
3. Click "Unlock Lifetime Access"
4. Use Stripe test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **Requires authentication**: `4000 0025 0000 3155`
5. Use any future expiry date (e.g., `12/34`)
6. Use any 3-digit CVC (e.g., `123`)
7. Complete the checkout
8. Verify you're redirected to `/success` and membership is activated

#### Testing Webhooks Locally:

1. Install Stripe CLI: `brew install stripe/stripe-brew/stripe` (Mac) or download from [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Login: `stripe login`
3. Forward webhooks to local dev server:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe-webhook
   ```
4. The CLI will print a webhook signing secret starting with `whsec_`
5. Use this secret in your local `.env.local`
6. Complete a test checkout and verify the webhook is received

### 6. Production Deployment Checklist

Before going live:

- [ ] Switch from test keys to live keys (`sk_live_` and `pk_live_`)
- [ ] Update `NEXT_PUBLIC_BASE_URL` to production domain
- [ ] Configure production webhook endpoint in Stripe Dashboard
- [ ] Test a real payment in live mode (small amount or refund afterward)
- [ ] Verify membership activation works correctly
- [ ] Monitor Stripe Dashboard for any issues

## Environment Variables Summary

Required for checkout to work:

```env
# Required
STRIPE_SECRET_KEY=sk_test_or_live_your_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_or_live_your_key
NEXT_PUBLIC_BASE_URL=https://fsaeliteperformance.com

# Optional but recommended
STRIPE_TRAINING_PRICE_ID=price_your_id
STRIPE_WEBHOOK_SECRET=whsec_your_secret
MEMBERSHIP_SIGNING_SECRET=your_random_secret_for_cookies
```

## How It Works

### Checkout Flow:

1. User clicks "Unlock Lifetime Access" on `/checkout-preview`
2. Frontend calls `/api/create-checkout-session` (POST)
3. API creates Stripe checkout session with:
   - Product: FSA ELITE Membership ($12.99)
   - Success URL: `/api/activate-membership?session_id={CHECKOUT_SESSION_ID}`
   - Cancel URL: `/cancel`
4. User is redirected to Stripe-hosted checkout
5. User completes payment
6. Stripe redirects to success URL
7. `/api/activate-membership` verifies payment and sets membership cookie
8. User is redirected to `/success?checkout=membership`
9. Success page activates membership via POST to `/api/activate-membership`

### Membership Activation:

- Membership is stored as an HTTP-only secure cookie: `fsaelite_membership`
- Cookie contains HMAC-signed token with 180-day TTL
- Middleware checks this cookie for protected routes (`/roleplay`, `/store`, `/welcome`)

### Webhook Backup:

- Stripe sends `checkout.session.completed` event to `/api/stripe-webhook`
- Webhook logs payment for audit trail
- Primary activation still happens via redirect flow (sets cookie)

## Troubleshooting

### "Payment system is not configured"

- Ensure `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` are set
- Verify keys are not empty or malformed
- Check you're using the correct environment (test vs. live)

### "Unable to start checkout"

- Check Stripe API status at [status.stripe.com](https://status.stripe.com)
- Verify your Stripe account is fully activated
- Check server logs for detailed error messages

### "Membership activation failed"

- Ensure `STRIPE_SECRET_KEY` is set correctly
- Verify the checkout session completed successfully in Stripe Dashboard
- Check that the session metadata includes correct `product_id`
- Review server logs for specific error details

### Webhook not receiving events

- Verify webhook endpoint URL is correct and publicly accessible
- Check webhook signing secret matches your configuration
- Review webhook logs in Stripe Dashboard → Webhooks
- Ensure endpoint responds with 200 status code

## Security Notes

- **Never commit** real Stripe keys to version control
- Use environment variables (`.env.local`) for all secrets
- Keep `STRIPE_SECRET_KEY` server-side only (never expose to browser)
- Rotate keys periodically and after any suspected compromise
- Monitor Stripe Dashboard for suspicious activity

## Support

For issues with Stripe setup:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)
- FSA ELITE Support: contact@fsaeliteperformance.com

For issues with the FSA ELITE platform:
- Review server logs (Vercel Dashboard → Functions → Logs)
- Check this repository's Issues page
- Contact FSA ELITE support with payment confirmation details
