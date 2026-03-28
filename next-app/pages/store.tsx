import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  PUBLIC_BUSINESS_NAME,
  SUPPORT_ADDRESS_CITY,
  SUPPORT_ADDRESS_COUNTRY,
  SUPPORT_ADDRESS_LINE_1,
  SUPPORT_ADDRESS_POSTAL,
  SUPPORT_ADDRESS_STATE,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
} from '../lib/businessDetails';
import { MERCH_PRODUCTS } from '../lib/merchCatalog';

const BUSINESS_NAME = PUBLIC_BUSINESS_NAME;

type CartItem = {
  productId: string;
  quantity: number;
};

type StoreCategory = 'all' | 'clothing' | 'headwear' | 'creator-kit';

const CART_STORAGE_KEY = 'fsaelite:store-cart:v1';
const LAST_CHECKOUT_KEY = 'fsaelite:last-checkout:v1';

const CATEGORY_LABELS: Record<StoreCategory, string> = {
  all: 'All Drops',
  clothing: 'Clothing',
  headwear: 'Headwear',
  'creator-kit': 'Creator Kits',
};

function formatUsd(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

export default function Store() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState<StoreCategory>('all');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored) as Record<string, number>;
      const sanitized: Record<string, number> = {};

      for (const [productId, quantity] of Object.entries(parsed)) {
        if (
          typeof productId === 'string' &&
          Number.isInteger(quantity) &&
          quantity > 0 &&
          MERCH_PRODUCTS.some((product) => product.id === productId)
        ) {
          sanitized[productId] = Math.min(quantity, 10);
        }
      }

      setCart(sanitized);
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return MERCH_PRODUCTS;
    return MERCH_PRODUCTS.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const cartCount = useMemo(() => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  }, [cart]);

  const cartItems = useMemo<CartItem[]>(() => {
    return Object.entries(cart)
      .filter(([, quantity]) => quantity > 0)
      .map(([productId, quantity]) => ({ productId, quantity }));
  }, [cart]);

  const cartTotalCents = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const product = MERCH_PRODUCTS.find((p) => p.id === item.productId);
      return product ? sum + product.priceCents * item.quantity : sum;
    }, 0);
  }, [cartItems]);

  function addToCart(productId: string) {
    setCart((prev) => ({
      ...prev,
      [productId]: Math.min((prev[productId] ?? 0) + 1, 10),
    }));
  }

  function removeFromCart(productId: string) {
    setCart((prev) => {
      const nextQty = Math.max((prev[productId] ?? 0) - 1, 0);
      return {
        ...prev,
        [productId]: nextQty,
      };
    });
  }

  function clearCart() {
    setCart({});
  }

  async function startMerchCheckout() {
    if (cartItems.length === 0 || checkoutLoading) return;

    setCheckoutLoading(true);
    setCheckoutError('');

    try {
      const response = await fetch('/api/create-merch-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setCheckoutError(data.error ?? 'Unable to start merch checkout right now.');
        return;
      }

      window.localStorage.setItem(
        LAST_CHECKOUT_KEY,
        JSON.stringify({
          items: cartItems,
          totalCents: cartTotalCents,
          at: new Date().toISOString(),
        })
      );

      window.location.href = data.url;
    } catch {
      setCheckoutError('Network error while starting merch checkout.');
    } finally {
      setCheckoutLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>FSA ELITE Member Store | Sales Gear and Self-Logo Products</title>
        <meta
          name="description"
          content="Shop FSA ELITE member gear, self-logo products, and creator-ready bundles built for salespeople across industries."
        />
      </Head>

      <main className="store-page">
        <section className="store-hero">
          <div className="container">
            <Link href="/" className="store-back-link">
              ← Back to Home
            </Link>
            <p className="eyebrow">FSA ELITE Member Store</p>
            <h1 className="store-title">Self-logo products and clean gear for salespeople building a real presence.</h1>
            <p className="store-copy">
              This marketplace is for reps in any industry who want to train, come back, and buy products that support
              their own image, team identity, and personal sales brand.
            </p>
            <p className="store-cart-count">Items in cart: {cartCount}</p>
            <p className="store-support-line">
              Operated by {BUSINESS_NAME} · Support: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> · {SUPPORT_PHONE}
            </p>
          </div>
        </section>

        <section className="store-section">
          <div className="container store-layout">
            <div className="store-main-column">
              <div className="store-collections" role="tablist" aria-label="Store collections">
                {(Object.keys(CATEGORY_LABELS) as StoreCategory[]).map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`store-collection-chip ${activeCategory === category ? 'store-collection-chip-active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                    role="tab"
                    aria-selected={activeCategory === category}
                  >
                    {CATEGORY_LABELS[category]}
                  </button>
                ))}
              </div>

            <div className="store-grid">
              {filteredProducts.map((product) => {
                const quantity = cart[product.id] ?? 0;

                return (
                  <article className="store-card" key={product.id}>
                    <div className="store-card-media">
                      <img src={product.image} alt={product.name} />
                      <span className="store-card-badge">{product.badge}</span>
                    </div>
                    <div className="store-card-body">
                      <h2>{product.name}</h2>
                      <p>{product.description}</p>
                      <div className="store-card-footer">
                        <strong>{formatUsd(product.priceCents)}</strong>
                        <div className="store-stepper" aria-label={`Quantity controls for ${product.name}`}>
                          <button type="button" onClick={() => removeFromCart(product.id)}>
                            -
                          </button>
                          <span>{quantity}</span>
                          <button type="button" onClick={() => addToCart(product.id)}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            </div>

            <aside className="store-cart-panel">
              <h2>Cart</h2>
              <p className="store-cart-subtitle">Your FSA ELITE drop selection</p>

              {cartItems.length === 0 ? (
                <p className="store-empty">Add items to begin checkout.</p>
              ) : (
                <ul className="store-cart-list">
                  {cartItems.map((item) => {
                    const product = MERCH_PRODUCTS.find((p) => p.id === item.productId);
                    if (!product) return null;

                    return (
                      <li key={item.productId}>
                        <span>{product.name}</span>
                        <span>x{item.quantity}</span>
                      </li>
                    );
                  })}
                </ul>
              )}

              <div className="store-cart-total">
                <span>Total</span>
                <strong>{formatUsd(cartTotalCents)}</strong>
              </div>

              <button
                type="button"
                className="btn-secondary store-clear-btn"
                onClick={clearCart}
                disabled={cartItems.length === 0 || checkoutLoading}
              >
                Clear Cart
              </button>

              <button
                type="button"
                className="btn-primary store-checkout-btn"
                onClick={startMerchCheckout}
                disabled={cartItems.length === 0 || checkoutLoading}
              >
                {checkoutLoading ? 'Starting Checkout...' : 'Checkout Merch'}
              </button>

              {checkoutError && <p className="store-error">{checkoutError}</p>}

              <p className="store-note">Secure Stripe checkout. Shipping and taxes are calculated at checkout.</p>
            </aside>
          </div>
        </section>

        <section className="store-section store-section-alt">
          <div className="container">
            <div className="store-info-grid">
              <article className="store-info-card">
                <p className="eyebrow">Store Information</p>
                <h2>What customers are buying</h2>
                <p>
                  FSA ELITE sells digital training access, roleplay tools, and branded merchandise for sales professionals.
                  All checkout flows use Stripe.
                </p>
              </article>

              <article className="store-info-card">
                <p className="eyebrow">Support</p>
                <h2>Billing and order help</h2>
                <p>
                  For billing questions, order updates, merch support, access issues, or cancellation requests, contact{' '}
                  <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or call {SUPPORT_PHONE}.
                </p>
              </article>

              <article className="store-info-card">
                <p className="eyebrow">Fulfillment</p>
                <h2>Delivery details</h2>
                <p>
                  Digital access is delivered online after payment confirmation. Merchandise orders are confirmed at checkout
                  and fulfilled after payment is captured.
                </p>
                <p>
                  Support address: {SUPPORT_ADDRESS_LINE_1}, {SUPPORT_ADDRESS_CITY}, {SUPPORT_ADDRESS_STATE} {SUPPORT_ADDRESS_POSTAL},{' '}
                  {SUPPORT_ADDRESS_COUNTRY}.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
