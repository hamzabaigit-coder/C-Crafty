import type { BlogPost } from '../types'

/**
 * Blog articles. Inline links use [text](/path) syntax and are rendered by
 * `src/components/RichText.tsx`. The byline is the editorial team — add real
 * author profiles only for real people with their permission.
 */
export const posts: BlogPost[] = [
  {
    slug: 'how-to-find-and-use-coupon-codes',
    title: 'How to Find and Use Coupon Codes Online (Step by Step)',
    description:
      'A practical guide to finding promo codes, applying them at checkout and understanding why a code is rejected.',
    excerpt:
      'Where promo codes come from, how to apply them at checkout, and what to check when a code doesn’t work.',
    theme: 'software-vpn',
    imageAlt: 'Illustration of a coupon tag next to a checkout screen',
    author: 'CouponCrafty Editorial Team',
    publishedAt: '2026-10-06',
    updatedAt: '2026-10-12',
    readingMinutes: 6,
    tags: ['Coupon basics', 'How-to'],
    relatedStores: ['doordash', 'target'],
    body: [
      {
        type: 'p',
        text: 'A coupon code (also called a promo code or discount code) is a short word or string of characters that a retailer accepts at checkout in exchange for a discount, free shipping or a gift. Codes are one of the simplest ways to save money online, but they come with rules — and knowing those rules is what separates a successful checkout from a frustrating one.',
      },
      { type: 'h2', text: 'Where coupon codes come from' },
      {
        type: 'p',
        text: 'Retailers create codes for specific purposes: to win new customers, reward loyal ones, clear inventory or promote a sale event. They then distribute them through a few common channels:',
      },
      {
        type: 'ul',
        items: [
          'Email and SMS sign-ups — many stores offer a welcome code for new subscribers.',
          'Loyalty programs and member accounts, which often unlock member-only codes.',
          'Affiliate and coupon websites such as CouponCrafty, which collect offers in one place.',
          'Social media posts, influencer partnerships and printed inserts.',
        ],
      },
      { type: 'h2', text: 'How to apply a promo code at checkout' },
      {
        type: 'ol',
        items: [
          'Find the offer you want on a store page, such as our [DoorDash promo codes](/stores/doordash).',
          'Click “Get Code”. The code appears on screen and is copied to your clipboard, and the store opens in a new tab.',
          'Add eligible items to your cart. Read the offer terms first so you know about minimum spend or excluded items.',
          'Look for a field labeled “Promo code”, “Discount code”, “Coupon” or “Gift cards & promotional codes”. It may be in the cart or on the payment step.',
          'Paste the code and select Apply. Check that the order total actually drops before you pay.',
        ],
      },
      {
        type: 'tip',
        text: 'Codes are usually not case-sensitive, but extra spaces copied before or after a code can cause it to fail. If a pasted code is rejected, try typing it manually.',
      },
      { type: 'h2', text: 'Why a coupon code might not work' },
      {
        type: 'p',
        text: 'Most rejected codes fail for one of a handful of reasons. The error message at checkout usually points to which one applies:',
      },
      {
        type: 'ul',
        items: [
          'The code has expired or reached its usage limit.',
          'Your cart is below the minimum order value.',
          'The items in your cart are excluded — clearance, gift cards and certain brands are common exclusions.',
          'The code is for new customers only, or has already been used on your account.',
          'The offer is limited to the retailer’s app, a specific region or a membership tier.',
          'Another promotion is already applied and the store allows only one per order.',
        ],
      },
      { type: 'h2', text: 'Coupon codes vs. deals' },
      {
        type: 'p',
        text: 'On CouponCrafty, a **code** is something you must enter at checkout, while a **deal** is a discount that applies automatically through a link — a sale price, a bundle offer or a free trial. Deals don’t need a code, but they still have terms, so it’s worth reading them before you buy.',
      },
      { type: 'h2', text: 'A quick checklist before you check out' },
      {
        type: 'ul',
        items: [
          'Read the terms: minimum spend, exclusions, end date.',
          'Compare the discounted total with other stores, including shipping and tax.',
          'Check the return policy for items bought on sale.',
          'Confirm the discount appears in the order summary before paying.',
        ],
      },
      {
        type: 'p',
        text: 'Want to know what makes an offer trustworthy? Read [how we check offers](/how-we-verify) and our guide on [how to tell whether a promo code works](/blog/how-to-check-if-a-promo-code-works).',
      },
    ],
  },
  {
    slug: 'black-friday-shopping-tips',
    title: 'Black Friday 2026: Practical Shopping Tips to Save More',
    description:
      'How to prepare for Black Friday 2026, spot a real discount, and avoid common mistakes when shopping holiday sales in the US.',
    excerpt:
      'Black Friday is November 27, 2026. Here’s how to plan ahead, compare prices and avoid buying things you don’t need.',
    theme: 'electronics',
    imageAlt: 'Illustration of shopping bags and a laptop for Black Friday shopping',
    author: 'CouponCrafty Editorial Team',
    publishedAt: '2026-10-01',
    updatedAt: '2026-10-10',
    readingMinutes: 7,
    tags: ['Black Friday', 'Seasonal'],
    relatedStores: ['best-buy', 'walmart', 'target'],
    body: [
      {
        type: 'p',
        text: 'Black Friday 2026 falls on **Friday, November 27**, the day after Thanksgiving, and Cyber Monday follows on **November 30**. In recent years many US retailers have started their sales well before the weekend itself, which gives careful shoppers more time to compare prices.',
      },
      { type: 'h2', text: 'Start with a list and a budget' },
      {
        type: 'p',
        text: 'Sale events are designed to create urgency. Writing down what you need — and what you are willing to spend on each item — makes it easier to ignore offers that aren’t on your list.',
      },
      { type: 'h2', text: 'Know the normal price' },
      {
        type: 'p',
        text: 'A discount is only meaningful compared with the price you would otherwise pay. Check the price of the items on your list a few weeks before the sales start. If the “sale” price is the same as it was in October, it isn’t a Black Friday deal.',
      },
      { type: 'h2', text: 'Categories that are commonly discounted' },
      {
        type: 'ul',
        items: [
          'Electronics such as TVs, laptops and headphones — see [Best Buy deals](/stores/best-buy).',
          'Large appliances, tools and home goods at big-box retailers — see [Walmart](/stores/walmart) and [Target](/stores/target).',
        ],
      },
      { type: 'h2', text: 'Read the fine print on doorbusters' },
      {
        type: 'p',
        text: 'Doorbusters are deeply discounted items with limited stock. Some are special model numbers made for the sale, with slightly different specifications from the regular version. Compare the full model number and specs, not just the product name.',
      },
      { type: 'h2', text: 'Check return and price-adjustment policies' },
      {
        type: 'p',
        text: 'Many retailers extend their return window for holiday purchases, but the details vary. Some stores also offer a price adjustment if the price drops within a set period after purchase. Knowing these policies ahead of time lets you buy early with less risk.',
      },
      {
        type: 'tip',
        text: 'Follow our [Black Friday deals page](/seasonal/black-friday) for offers as they are added, and check each offer’s end date before you plan around it.',
      },
    ],
  },
  {
    slug: 'amazon-vs-walmart-where-to-save',
    title: 'Amazon vs. Walmart: Where Can You Save More?',
    description:
      'Compare how Amazon and Walmart approach discounts, memberships, shipping and returns so you can decide where to shop.',
    excerpt:
      'Both retailers compete on price, but they save you money in different ways. Here’s how their discounts, memberships and shipping compare.',
    theme: 'home-garden',
    imageAlt: 'Illustration of two shopping carts side by side',
    author: 'CouponCrafty Editorial Team',
    publishedAt: '2026-09-22',
    updatedAt: '2026-09-30',
    readingMinutes: 6,
    tags: ['Comparisons', 'Everyday savings'],
    relatedStores: ['amazon', 'walmart', 'target'],
    body: [
      {
        type: 'p',
        text: 'Amazon and Walmart are two of the largest retailers in the US, and both sell nearly everything. Which one saves you more depends less on a single price and more on what you buy, how often you shop and whether a membership makes sense for you.',
      },
      { type: 'h2', text: 'How each retailer discounts' },
      {
        type: 'p',
        text: '**Amazon** rarely offers sitewide promo codes. Savings come from clippable coupons on individual product pages, limited-time deals, Subscribe & Save on repeat purchases and large sale events. See current offers on our [Amazon coupons page](/stores/amazon).',
      },
      {
        type: 'p',
        text: '**Walmart** focuses on everyday low prices and rollbacks, with occasional promo codes for first-time grocery delivery or pickup orders. See [Walmart deals](/stores/walmart).',
      },
      { type: 'h2', text: 'Memberships' },
      {
        type: 'p',
        text: 'Both retailers offer paid memberships that include faster or free shipping and other perks. Membership is worth it only if the perks you actually use exceed the fee. Add up a few months of shipping costs and the extras you would use before deciding.',
      },
      { type: 'h2', text: 'Third-party sellers' },
      {
        type: 'p',
        text: 'Both marketplaces include items sold by independent sellers. Prices, shipping speeds and return policies can differ from items sold by the retailer itself, so check who the seller is before comparing prices.',
      },
      { type: 'h2', text: 'Which should you choose?' },
      {
        type: 'ul',
        items: [
          'For groceries and household basics with store pickup, Walmart is often convenient.',
          'For a wide selection and repeat deliveries, Amazon’s Subscribe & Save can help.',
          'For any big purchase, compare the exact item at both — plus [Target](/stores/target) — including shipping and tax.',
        ],
      },
      {
        type: 'tip',
        text: 'The cheapest store changes item by item. Comparing the final total, not the sticker price, is the most reliable way to save.',
      },
    ],
  },
  {
    slug: 'save-money-on-food-delivery',
    title: 'How to Save Money on Food Delivery',
    description:
      'Practical ways to lower the cost of DoorDash, Uber Eats and Grubhub orders, from promo codes to pickup orders and memberships.',
    excerpt:
      'Delivery fees, service fees and tips add up quickly. These strategies help you keep the total down.',
    theme: 'food-delivery',
    imageAlt: 'Illustration of a takeout bag and a phone showing a delivery app',
    author: 'CouponCrafty Editorial Team',
    publishedAt: '2026-09-15',
    updatedAt: '2026-10-02',
    readingMinutes: 5,
    tags: ['Food delivery', 'Everyday savings'],
    relatedStores: ['doordash'],
    body: [
      {
        type: 'p',
        text: 'The menu price is only part of what you pay for food delivery. Delivery fees, service fees, small-order fees, taxes and tips can all appear at checkout. Here are the most effective ways to reduce the total.',
      },
      { type: 'h2', text: '1. Understand every fee on the receipt' },
      {
        type: 'p',
        text: 'Before you apply a code, look at the order breakdown. Many promo codes reduce only the food subtotal, so a code worth $10 may still leave you paying several dollars in fees.',
      },
      { type: 'h2', text: '2. Use first-order and app-specific offers' },
      {
        type: 'p',
        text: 'Delivery platforms compete for new customers, so first-order discounts are common. Check the current offers on our [DoorDash](/stores/doordash) page and compare them with other delivery apps you use.',
      },
      { type: 'h2', text: '3. Choose pickup when you can' },
      {
        type: 'p',
        text: 'Pickup orders usually skip delivery and service fees. If the restaurant is on your way home, pickup can be the single biggest saving.',
      },
      { type: 'h2', text: '4. Do the math on memberships' },
      {
        type: 'p',
        text: 'Subscriptions like DashPass, Uber One and Grubhub+ remove delivery fees on eligible orders above a minimum. Count how many qualifying orders you place in a typical month and compare the fees you’d save with the membership cost.',
      },
      { type: 'h2', text: '5. Order once, not often' },
      {
        type: 'p',
        text: 'Small-order fees apply below a minimum subtotal. Combining orders with roommates or ordering enough for leftovers can avoid them.',
      },
      {
        type: 'tip',
        text: 'Tips go to the delivery driver. Reducing fees is a better way to save than reducing the tip.',
      },
    ],
  },
  {
    slug: 'best-travel-discount-tips',
    title: 'How to Find Travel Discounts on Hotels and Vacation Packages',
    description:
      'Where travel discounts come from and how to compare hotel, flight and package prices across booking sites.',
    excerpt:
      'Booking sites, member prices and bundles can all lower the cost of a trip — if you compare the right numbers.',
    theme: 'travel',
    imageAlt: 'Illustration of a suitcase, airplane and hotel',
    author: 'CouponCrafty Editorial Team',
    publishedAt: '2026-09-08',
    updatedAt: '2026-09-20',
    readingMinutes: 6,
    tags: ['Travel'],
    relatedStores: ['expedia'],
    body: [
      {
        type: 'p',
        text: 'Travel prices change with demand, so the same room or flight can cost very different amounts depending on when and where you book. These habits help you find a lower price without sacrificing flexibility.',
      },
      { type: 'h2', text: 'Compare the total, not the nightly rate' },
      {
        type: 'p',
        text: 'Hotel listings often show a nightly rate before taxes and resort or cleaning fees. Always compare the final total for your full stay.',
      },
      { type: 'h2', text: 'Sign in for member prices' },
      {
        type: 'p',
        text: 'Booking sites such as [Expedia](/stores/expedia) show lower rates on participating properties to signed-in members. Creating a free account costs nothing and may reveal a better price.',
      },
      { type: 'h2', text: 'Try bundling' },
      {
        type: 'p',
        text: 'Booking a flight and hotel together as a package can unlock savings that aren’t available separately. It doesn’t always work out cheaper, so price the trip both ways.',
      },
      { type: 'h2', text: 'Weigh refundable vs. non-refundable' },
      {
        type: 'p',
        text: 'Non-refundable rates are cheaper, but you lose the money if plans change. For trips far in the future, a refundable rate can be worth the extra cost.',
      },
      { type: 'h2', text: 'Read coupon restrictions carefully' },
      {
        type: 'ul',
        items: [
          'Many hotel codes apply only to participating properties.',
          'Codes may require a minimum stay or booking value.',
          'Some codes exclude taxes and fees from the discount.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-check-if-a-promo-code-works',
    title: 'How to Check Whether a Promo Code Works Before You Buy',
    description:
      'Simple ways to test a promo code, read its terms and confirm the discount before you pay.',
    excerpt:
      'Avoid surprises at checkout: how to confirm a code works, what its terms mean and what to do if it fails.',
    theme: 'entertainment',
    imageAlt: 'Illustration of a coupon with a checkmark',
    author: 'CouponCrafty Editorial Team',
    publishedAt: '2026-08-28',
    updatedAt: '2026-09-18',
    readingMinutes: 4,
    tags: ['Coupon basics', 'How-to'],
    relatedStores: ['nike', 'sephora'],
    body: [
      {
        type: 'p',
        text: 'The only reliable test of a promo code is applying it to a real cart. The good news: you can do that without paying, because the discount appears in the order summary before you place the order.',
      },
      { type: 'h2', text: 'Test it in the cart' },
      {
        type: 'ol',
        items: [
          'Add the items you actually plan to buy.',
          'Enter the code in the promo field and apply it.',
          'Look for a line in the order summary showing the discount.',
          'If it’s missing, read the error message — it usually tells you why.',
        ],
      },
      { type: 'h2', text: 'Read the terms before you test' },
      {
        type: 'p',
        text: 'Offer terms explain who can use a code and on what. On CouponCrafty, terms appear under “Details” on each offer. Look for minimum spend, excluded brands, customer eligibility and the end date.',
      },
      { type: 'h2', text: 'What “verified” should mean' },
      {
        type: 'p',
        text: 'A verified label should mean someone actually tested the code on the retailer’s site on a stated date. CouponCrafty only shows a verified badge with that date. Learn more in [how we check offers](/how-we-verify).',
      },
      { type: 'h2', text: 'If the code fails' },
      {
        type: 'ul',
        items: [
          'Remove any other promotions — one-code-per-order rules are common.',
          'Check that you’re signed in if the code is member-only.',
          'Try another current offer from the same [store page](/stores).',
        ],
      },
    ],
  },
]
