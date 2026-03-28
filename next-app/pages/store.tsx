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
import { CHECKOUT_CONTEXT_KEY } from '../lib/accessKeys';
import { fetchMembershipStatus } from '../lib/membershipClient';
import { MERCH_PRODUCTS } from '../lib/merchCatalog';
import { SUBSCRIPTION_PRICE_CENTS } from '../lib/subscriptionPlan';

const BUSINESS_NAME = PUBLIC_BUSINESS_NAME;

type CartItem = {
  productId: string;
  quantity: number;
};

type StoreCategory = 'all' | 'clothing' | 'headwear' | 'creator-kit' | 'business-cards';

const CART_STORAGE_KEY = 'fsaelite:store-cart:v1';
const LAST_CHECKOUT_KEY = 'fsaelite:last-checkout:v1';
const STORE_COMING_SOON = false;

const CATEGORY_LABELS: Record<StoreCategory, string> = {
  all: 'All Drops',
  clothing: 'Clothing',
  headwear: 'Headwear',
  'creator-kit': 'Creator Kits',
  'business-cards': 'Business Cards',
};

const STORE_SIGNAL_ITEMS = [
  {
    value: 'Member-Only',
    label: 'Premium drops and brand-building products reserved for FSA members',
  },
  {
    value: 'Stripe Live',
    label: 'Secure merch checkout is active for supported products',
  },
  {
    value: 'Closer Identity',
    label: 'Built for reps who want stronger image, better presentation, and repeat-return buying',
  },
];

const MEMBER_STORE_POINTS = [
  'Custom identity products instead of generic merch filler',
  'Business-card and creator-kit options that support real rep positioning',
  'A store designed to make members return, not just buy once',
];

const BUNDLE_OFFERS = [
  {
    id: 'starter-presence-kit',
    title: 'Starter Presence Kit',
    description: 'The fastest first upgrade for a rep who wants to look sharper immediately online and in person.',
    productIds: ['digital-business-card', 'premium-business-cards'],
    label: 'Fastest image upgrade',
  },
  {
    id: 'closer-daily-kit',
    title: 'Closer Daily Kit',
    description: 'Daily-wear identity stack for members who want brand consistency on the floor and in content.',
    productIds: ['elite-cap-series', 'closer-uniform-hoodie'],
    label: 'Daily visibility',
  },
  {
    id: 'authority-stack',
    title: 'Authority Stack',
    description: 'Higher-status bundle for members who want the strongest jump in presentation and self-branding.',
    productIds: ['self-promo-brand-kit', 'premium-business-cards', 'elite-cap-series'],
    label: 'Highest-status bundle',
  },
];

function formatUsd(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

export default function Store() {
  const [hasMembership, setHasMembership] = useState<boolean | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState<StoreCategory>('all');
  const [selectedProductId, setSelectedProductId] = useState<string>(MERCH_PRODUCTS[0]?.id ?? '');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  useEffect(() => {
    let active = true;

    void fetchMembershipStatus().then((status) => {
      if (active) {
        setHasMembership(status);
      }
    });

    return () => {
      active = false;
    };
  }, []);

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

  const featuredProduct = useMemo(() => {
    const topSeller = filteredProducts.find((product) => product.badge === 'Top Seller');
    return topSeller ?? filteredProducts[0] ?? MERCH_PRODUCTS[0];
  }, [filteredProducts]);

  const selectedProduct = useMemo(() => {
    return MERCH_PRODUCTS.find((product) => product.id === selectedProductId) ?? featuredProduct;
  }, [featuredProduct, selectedProductId]);

  const bundles = useMemo(() => {
    return BUNDLE_OFFERS.map((bundle) => {
      const products = bundle.productIds
        .map((productId) => MERCH_PRODUCTS.find((product) => product.id === productId))
        .filter((product): product is NonNullable<typeof product> => Boolean(product));

      return {
        ...bundle,
        products,
        totalCents: products.reduce((sum, product) => sum + product.priceCents, 0),
      };
    }).filter((bundle) => bundle.products.length > 0);
  }, []);

  const recommendedProduct = useMemo(() => {
    const cartIds = new Set(cartItems.map((item) => item.productId));
    const selected = selectedProduct;

    if (!selected) {
      return null;
    }

    const preferredOrderByCategory: Record<typeof selected.category, Array<StoreCategory>> = {
      clothing: ['business-cards', 'headwear', 'creator-kit', 'clothing'],
      headwear: ['business-cards', 'clothing', 'creator-kit', 'headwear'],
      'creator-kit': ['business-cards', 'clothing', 'headwear', 'creator-kit'],
      'business-cards': ['headwear', 'clothing', 'creator-kit', 'business-cards'],
    };

    for (const category of preferredOrderByCategory[selected.category]) {
      const candidate = MERCH_PRODUCTS.find(
        (product) => product.category === category && product.id !== selected.id && !cartIds.has(product.id)
      );

      if (candidate) {
        return candidate;
      }
    }

    return MERCH_PRODUCTS.find((product) => product.id !== selected.id) ?? null;
  }, [cartItems, selectedProduct]);

  const cartProductCount = cartItems.length;

  function addToCart(productId: string) {
    setCart((prev) => ({
      ...prev,
      [productId]: Math.min((prev[productId] ?? 0) + 1, 10),
    }));
  }

  function openProductDetails(productId: string) {
    setSelectedProductId(productId);
  }

  function addBundleToCart(productIds: string[]) {
    setCart((prev) => {
      const next = { ...prev };

      for (const productId of productIds) {
        next[productId] = Math.min((next[productId] ?? 0) + 1, 10);
      }

      return next;
    });
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

      window.localStorage.setItem(CHECKOUT_CONTEXT_KEY, 'merch');
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

      {hasMembership === null ? (
        <main className="member-gate-page">
          <section className="member-gate-shell">
            <div className="container">
              <div className="member-gate-card">
                <p className="eyebrow">Checking Access</p>
                <h1>Verifying your membership…</h1>
                <p className="member-gate-copy">Please wait while FSA ELITE confirms your member store access.</p>
              </div>
            </div>
          </section>
        </main>
      ) : hasMembership === false ? (
        <main className="member-gate-page">
          <section className="member-gate-shell">
            <div className="container">
              <div className="member-gate-card">
                <p className="eyebrow">Members Only</p>
                <h1>The FSA clothing store unlocks after the {formatUsd(SUBSCRIPTION_PRICE_CENTS)} membership payment.</h1>
                <p className="member-gate-copy">
                  Complete the one-time FSA ELITE membership purchase first. After payment, the member store opens and
                  you can shop merch with its own product-specific pricing.
                </p>
                <div className="member-gate-actions">
                  <Link href="/checkout-preview" className="btn-primary">
                    Unlock Membership Access
                  </Link>
                  <Link href="/" className="btn-secondary">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
      <main className="store-page">
        <section className="store-hero">
          <div className="container">
            <Link href="/" className="store-back-link">
              ← Back to Home
            </Link>
            <div className="home-dual-logos" style={{ marginBottom: '0.8rem' }}>
              <img className="home-brand-logo" src="/logo.png" alt="FSA ELITE Performance logo" style={{ width: '3.2rem' }} />
              <img className="home-brand-badge" src="/logo-badge.jpg" alt="FSA ELITE badge" style={{ width: '2.8rem' }} />
            </div>
            <p className="eyebrow">FSA ELITE Member Store</p>
            <h1 className="store-title">Self-logo products and clean gear for salespeople building a real presence.</h1>
            <p className="store-copy">
              This marketplace is for reps in any industry who want to train, come back, and buy products that support
              their own image, team identity, and personal sales brand.
            </p>
            <p className="store-coming-soon-pill">Store checkout is live for member merch and branded products.</p>
            <p className="store-cart-count">Items in cart: {cartCount}</p>
            <p className="store-support-line">
              Operated by {BUSINESS_NAME} · Support: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> · {SUPPORT_PHONE}
            </p>
            <p className="policy-inline-links policy-inline-links-left">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <span>•</span>
              <Link href="/refund-policy">Refund Policy</Link>
              <span>•</span>
              <Link href="/terms">Terms</Link>
            </p>
            <div style={{ marginTop: '1rem', padding: '0.8rem', borderRadius: '10px', background: 'var(--color-bg-soft)', border: '1px solid var(--color-border)' }}>
              <strong>Store integration:</strong> We currently host an internal store placeholder. We can integrate Shopify (or another provider) later - I can add a Shopify cart/connect flow when you're ready.
            </div>

            <div className="store-signal-grid" aria-label="Member store highlights">
              {STORE_SIGNAL_ITEMS.map((item) => (
                <article className="store-signal-card" key={item.value}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="store-section">
          <div className="container store-layout">
            <div className="store-main-column">
              <section className="store-showcase" aria-label="Featured member drop">
                <article className="store-feature-card">
                  <div className={`store-feature-media store-feature-media-${featuredProduct.category}`}>
                    <img src={featuredProduct.image} alt={featuredProduct.name} />
                    <span className="store-feature-badge">{featuredProduct.badge}</span>
                  </div>
                  <div className="store-feature-copy">
                    <p className="eyebrow">Featured Drop</p>
                    <h2>{featuredProduct.name}</h2>
                    <p className="store-feature-label">{featuredProduct.shortLabel}</p>
                    <p>{featuredProduct.description}</p>
                    <ul className="store-feature-list">
                      {featuredProduct.featureList.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                    <div className="store-feature-footer">
                      <div>
                        <strong>{formatUsd(featuredProduct.priceCents)}</strong>
                        <span>{featuredProduct.leadTime}</span>
                      </div>
                      <button type="button" className="btn-primary" onClick={() => addToCart(featuredProduct.id)}>
                        Add Featured Drop
                      </button>
                    </div>
                  </div>
                </article>

                <article className="store-member-card">
                  <p className="eyebrow">Why Members Buy</p>
                  <h2>Products that reinforce the closer identity after the training session ends.</h2>
                  <ul className="store-member-list">
                    {MEMBER_STORE_POINTS.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              </section>

              <section className="store-product-focus" aria-label="Product detail focus">
                <article className="store-detail-card">
                  <div className={`store-detail-media store-card-media-${selectedProduct.category}`}>
                    <img src={selectedProduct.image} alt={selectedProduct.name} />
                    <span className="store-feature-badge">{selectedProduct.badge}</span>
                  </div>
                  <div className="store-detail-copy">
                    <p className="eyebrow">Product Focus</p>
                    <h2>{selectedProduct.name}</h2>
                    <p className="store-feature-label">{selectedProduct.shortLabel}</p>
                    <p>{selectedProduct.description}</p>
                    <p className="store-card-best-for">Best for: {selectedProduct.bestFor}</p>
                    <ul className="store-feature-list">
                      {selectedProduct.featureList.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                    <div className="store-feature-footer">
                      <div>
                        <strong>{formatUsd(selectedProduct.priceCents)}</strong>
                        <span>{selectedProduct.leadTime}</span>
                      </div>
                      <button type="button" className="btn-primary" onClick={() => addToCart(selectedProduct.id)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </article>

                {recommendedProduct && (
                  <article className="store-detail-sidecard">
                    <p className="eyebrow">Recommended Next</p>
                    <h2>{recommendedProduct.name}</h2>
                    <p>{recommendedProduct.bestFor}</p>
                    <div className="store-detail-sidecard-footer">
                      <strong>{formatUsd(recommendedProduct.priceCents)}</strong>
                      <button type="button" className="btn-secondary" onClick={() => addToCart(recommendedProduct.id)}>
                        Add Recommended Item
                      </button>
                    </div>
                  </article>
                )}
              </section>

              <section className="store-bundle-grid" aria-label="Recommended bundles">
                {bundles.map((bundle) => (
                  <article className="store-bundle-card" key={bundle.id}>
                    <p className="store-card-label">{bundle.label}</p>
                    <h2>{bundle.title}</h2>
                    <p>{bundle.description}</p>
                    <p className="store-bundle-products">Includes: {bundle.products.map((product) => product.name).join(' · ')}</p>
                    <div className="store-bundle-footer">
                      <div>
                        <strong>{formatUsd(bundle.totalCents)}</strong>
                        <span>{bundle.products.length} products</span>
                      </div>
                      <button type="button" className="btn-secondary" onClick={() => addBundleToCart(bundle.productIds)}>
                        Add Bundle
                      </button>
                    </div>
                  </article>
                ))}
              </section>

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
                    <div className={`store-card-media store-card-media-${product.category}`}>
                      <img src={product.image} alt={product.name} />
                      <span className="store-card-badge">{product.badge}</span>
                    </div>
                    <div className="store-card-body">
                      <p className="store-card-label">{product.shortLabel}</p>
                      <h2>{product.name}</h2>
                      <p>{product.description}</p>
                      <ul className="store-card-points">
                        {product.featureList.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                      <p className="store-card-best-for">Best for: {product.bestFor}</p>
                      <div className="store-card-footer">
                        <div className="store-card-pricing">
                          <strong>{formatUsd(product.priceCents)}</strong>
                          <span>{product.leadTime}</span>
                        </div>
                        <div className="store-card-actions">
                          <button type="button" className="store-card-detail-btn" onClick={() => openProductDetails(product.id)}>
                            View Details
                          </button>
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
                    </div>
                  </article>
                );
              })}
            </div>
            </div>

            <aside className="store-cart-panel">
              <h2>Cart</h2>
              <p className="store-cart-subtitle">Your FSA ELITE drop selection</p>
              <div className="store-cart-summary-row">
                <span>{cartProductCount} product type{cartProductCount === 1 ? '' : 's'}</span>
                <span>{cartCount} total item{cartCount === 1 ? '' : 's'}</span>
              </div>

              {cartItems.length === 0 ? (
                <>
                  <p className="store-empty">Add items to begin checkout.</p>
                  <ul className="store-cart-empty-points">
                    <li>Start with a business-card product for the fastest image upgrade</li>
                    <li>Add a daily-wear piece to make the brand visible beyond training</li>
                    <li>Use bundles if you want the strongest identity jump fastest</li>
                  </ul>
                </>
              ) : (
                <ul className="store-cart-list">
                  {cartItems.map((item) => {
                    const product = MERCH_PRODUCTS.find((p) => p.id === item.productId);
                    if (!product) return null;

                    return (
                      <li key={item.productId}>
                        <div className="store-cart-line-copy">
                          <strong>{product.name}</strong>
                          <span>{formatUsd(product.priceCents)} each</span>
                        </div>
                        <div className="store-cart-line-meta">
                          <span>x{item.quantity}</span>
                          <strong>{formatUsd(product.priceCents * item.quantity)}</strong>
                        </div>
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
                disabled={cartItems.length === 0 || checkoutLoading || STORE_COMING_SOON}
              >
                {STORE_COMING_SOON ? 'Checkout Coming Soon' : checkoutLoading ? 'Starting Checkout...' : 'Checkout Merch'}
              </button>

              {checkoutError && <p className="store-error">{checkoutError}</p>}

              <p className="store-note">
                Membership is required for this area. Secure Stripe checkout for merch is active.
              </p>
              <p className="store-note">
                Questions before you order? Reach out for support, order updates, or delivery clarification before checkout.
              </p>
              {bundles.length > 0 && (
                <div className="store-cart-upsell">
                  <p className="eyebrow">Quick Add</p>
                  <h3>Need a faster decision?</h3>
                  <button type="button" className="btn-secondary store-cart-upsell-btn" onClick={() => addBundleToCart(bundles[0].productIds)}>
                    Add {bundles[0].title}
                  </button>
                </div>
              )}

              {recommendedProduct && (
                <div className="store-cart-upsell">
                  <p className="eyebrow">Suggested Add-On</p>
                  <h3>{recommendedProduct.name}</h3>
                  <p className="store-note">Pairs well with your current cart and selected product focus.</p>
                  <button type="button" className="btn-secondary store-cart-upsell-btn" onClick={() => addToCart(recommendedProduct.id)}>
                    Add {recommendedProduct.shortLabel}
                  </button>
                </div>
              )}
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
                  FSA ELITE sells member-focused identity products for sales professionals, including branded business cards,
                  creator bundles, caps, hoodies, and other self-promotion tools that support a stronger public presence.
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
      <footer className="site-footer">
        <p>
          Need policy details before ordering? <Link href="/privacy-policy">Privacy Policy</Link> · <Link href="/refund-policy">Refund Policy</Link> · <Link href="/terms">Terms of Service</Link>
        </p>
      </footer>
      </main>
      )}
    </>
  );
}
