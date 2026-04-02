import { NextResponse } from 'next/server'
import { getProductById } from '@/lib/products'

export async function POST(request: Request) {
  try {
    const { productId } = await request.json()
    
    const product = getProductById(productId)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // In production, this would create a Stripe Checkout Session
    // For now, return a success response for the demo
    // When Stripe is properly configured, uncomment the code below:
    
    /*
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
    })

    return NextResponse.json({ url: session.url })
    */

    // Demo response - simulates successful checkout
    return NextResponse.json({ 
      success: true,
      message: 'Checkout initiated',
      product: product.name,
      amount: product.priceInCents
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
