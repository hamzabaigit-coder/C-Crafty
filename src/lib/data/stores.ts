import type { Store } from '../types'

/**
 * Central store catalog. Replace or extend with records from your database or
 * CMS — every page reads stores through `src/lib/queries.ts`, so the source can
 * change without touching components.
 *
 * Descriptions are intentionally general. Add affiliateUrl only once a real
 * tracked link exists; outbound clicks fall back to the retailer homepage.
 */
export const stores: Store[] = [
  {
    slug: 'amazon',
    name: 'Amazon',
    domain: 'amazon.com',
    url: 'https://www.amazon.com/',
    brandColor: '#131921',
    brandText: '#FF9900',
    logoText: 'amazon',
    categories: ['electronics', 'home-garden', 'fashion', 'entertainment'],
    popular: true,
    summary: 'Find Amazon promo codes, digital coupons and deals on electronics, home goods and everyday essentials.',
    about: [
      'Amazon sells millions of products across nearly every shopping category, from electronics and household essentials to books, apparel and groceries. Many items are sold by third-party sellers, so prices, shipping speed and return terms can differ from listing to listing.',
      'Unlike many stores, Amazon rarely uses sitewide promo codes. Savings usually come from clippable coupons on product pages, limited-time deals, Subscribe & Save discounts and seasonal events.',
    ],
    howToRedeem: [
      'Click “Get Code” or “Get Deal” to open Amazon in a new tab.',
      'For clippable coupons, select the coupon checkbox on the product page before adding the item to your cart.',
      'For promo codes, enter the code in the “Gift cards & promotional codes” field at checkout and click Apply.',
      'Review the order summary to confirm the discount before placing the order.',
    ],
    faqs: [
      {
        question: 'Does Amazon offer sitewide promo codes?',
        answer:
          'Rarely. Most Amazon savings come from product-specific clippable coupons, Lightning Deals and seasonal sale events rather than codes that work on every item.',
      },
      {
        question: 'Where do I enter an Amazon promo code?',
        answer:
          'On the checkout page, look for “Gift cards & promotional codes” (sometimes under the payment method), enter the code and click Apply.',
      },
      {
        question: 'Why didn’t my Amazon coupon apply?',
        answer:
          'Coupons are often limited to specific sellers, quantities or accounts. Check that the item is sold by the seller named in the offer and that the coupon box was clipped before checkout.',
      },
    ],
    updatedAt: '2026-10-13',
  },
  {
    slug: 'walmart',
    name: 'Walmart',
    domain: 'walmart.com',
    url: 'https://www.walmart.com/',
    brandColor: '#0071CE',
    brandText: '#FFC220',
    logoText: 'Walmart',
    categories: ['electronics', 'home-garden', 'fashion'],
    popular: true,
    summary: 'Walmart deals and promo codes on groceries, electronics, home essentials and more.',
    about: [
      'Walmart is one of the largest retailers in the United States, selling groceries, electronics, home goods, toys and apparel online and in stores. Online orders can usually be shipped, delivered locally or picked up in store.',
      'Walmart relies mostly on everyday low prices and rollbacks rather than promo codes. Occasional codes target first-time app or delivery orders.',
    ],
    howToRedeem: [
      'Open the deal or copy the code from CouponCrafty.',
      'Add eligible items to your Walmart cart.',
      'At checkout, enter the code in the promo code field and click Apply.',
      'Confirm the savings in the order summary before you pay.',
    ],
    faqs: [
      {
        question: 'Does Walmart accept promo codes?',
        answer:
          'Yes, but they are uncommon and usually tied to specific services such as a first grocery delivery or pickup order. Most savings come from rollback and clearance prices.',
      },
      {
        question: 'Can I get free shipping at Walmart?',
        answer:
          'Walmart offers free shipping on many orders above a minimum amount, and membership programs may remove the minimum. Check the current threshold in your cart.',
      },
      {
        question: 'Does Walmart price match?',
        answer:
          'Price-match policies change over time. Check Walmart’s current policy page before relying on a price match.',
      },
    ],
    updatedAt: '2026-10-12',
  },
  {
    slug: 'target',
    name: 'Target',
    domain: 'target.com',
    url: 'https://www.target.com/',
    brandColor: '#CC0000',
    brandText: '#FFFFFF',
    logoText: 'TARGET',
    categories: ['home-garden', 'fashion', 'beauty', 'electronics'],
    popular: true,
    summary: 'Target promo codes, Target Circle offers and deals on home, style and everyday essentials.',
    about: [
      'Target sells home goods, apparel, beauty products, groceries and electronics online and in stores across the US, including many exclusive in-house brands.',
      'Target’s free loyalty program delivers personalized offers that you add to your account. Promo codes also appear around seasonal events, and orders can often be picked up in store or via drive up.',
    ],
    howToRedeem: [
      'Click through to Target from CouponCrafty.',
      'If the offer is a loyalty deal, sign in and add it to your account before checkout.',
      'For promo codes, enter the code in the “Promo code” field in your cart.',
      'Confirm the discount is applied before placing the order.',
    ],
    faqs: [
      {
        question: 'How do Target Circle offers work?',
        answer:
          'Target Circle is Target’s free loyalty program. You add offers to your account and they apply automatically to eligible items in store or online.',
      },
      {
        question: 'Can I combine Target promo codes?',
        answer:
          'Target generally allows one promo code per order, but loyalty offers and manufacturer coupons may stack with it. Check the terms on each offer.',
      },
      {
        question: 'Does Target offer free shipping?',
        answer:
          'Free shipping is usually available above a minimum order total or with certain memberships and cards. The current threshold is shown in your cart.',
      },
    ],
    updatedAt: '2026-10-11',
  },
  {
    slug: 'best-buy',
    name: 'Best Buy',
    domain: 'bestbuy.com',
    url: 'https://www.bestbuy.com/',
    brandColor: '#0046BE',
    brandText: '#FFE000',
    logoText: 'BEST BUY',
    categories: ['electronics', 'entertainment'],
    popular: true,
    summary: 'Best Buy deals on laptops, TVs, appliances, headphones and smart home tech.',
    about: [
      'Best Buy is a US consumer electronics retailer selling computers, TVs, appliances, phones, gaming gear and smart home devices online and in stores.',
      'Best Buy uses weekly sales, open-box discounts and seasonal events far more often than promo codes. Membership tiers can add perks such as extended return windows.',
    ],
    howToRedeem: [
      'Open the deal from CouponCrafty to land on the sale page.',
      'Add the item to your cart and choose shipping or store pickup.',
      'Sale prices apply automatically — no code is needed for most Best Buy deals.',
      'Review the order summary before checking out.',
    ],
    faqs: [
      {
        question: 'Does Best Buy have promo codes?',
        answer:
          'Occasionally, but most Best Buy savings are automatic sale prices, open-box discounts and member-only deals.',
      },
      {
        question: 'What is open-box at Best Buy?',
        answer:
          'Open-box items were returned or used as displays. They are inspected and sold at a discount, with condition ratings shown on the listing.',
      },
      {
        question: 'When are the biggest Best Buy sales?',
        answer:
          'Large electronics sales typically happen around Black Friday, back-to-school season and major holiday weekends.',
      },
    ],
    updatedAt: '2026-10-12',
  },
  {
    slug: 'doordash',
    name: 'DoorDash',
    domain: 'doordash.com',
    url: 'https://www.doordash.com/',
    brandColor: '#FF3008',
    brandText: '#FFFFFF',
    logoText: 'DoorDash',
    categories: ['food-delivery'],
    popular: true,
    summary: 'DoorDash promo codes and deals for restaurant delivery, groceries and convenience orders.',
    about: [
      'DoorDash is a delivery platform for restaurants, grocery stores, convenience stores and other local merchants across the US.',
      'DoorDash promotions are usually aimed at new customers or tied to specific merchants. Its subscription program, DashPass, removes delivery fees on eligible orders above a minimum subtotal.',
    ],
    howToRedeem: [
      'Copy the code and open DoorDash.',
      'Build your order and go to checkout.',
      'Tap “Promo code” (or “Add promo code”), paste the code and apply it.',
      'Check that the discount appears before placing the order.',
    ],
    faqs: [
      {
        question: 'Do DoorDash promo codes work for existing customers?',
        answer:
          'Some do, but many DoorDash codes are limited to a first order or to specific restaurants. Restrictions are shown when you apply the code.',
      },
      {
        question: 'Can I use more than one DoorDash promo code?',
        answer: 'Generally only one promo code can be applied per order.',
      },
      {
        question: 'Does a promo code cover fees and tip?',
        answer:
          'It depends on the code. Many apply only to the food subtotal, while service fees, taxes and the Dasher tip are charged separately.',
      },
    ],
    updatedAt: '2026-10-14',
  },
  {
    slug: 'expedia',
    name: 'Expedia',
    domain: 'expedia.com',
    url: 'https://www.expedia.com/',
    brandColor: '#191E3B',
    brandText: '#FDDB32',
    logoText: 'Expedia',
    categories: ['travel'],
    popular: true,
    summary: 'Expedia coupon codes and deals on hotels, flights, vacation packages and car rentals.',
    about: [
      'Expedia is an online travel agency for booking hotels, vacation rentals, flights, car rentals, cruises and activities.',
      'Expedia often discounts bundled flight-and-hotel packages and offers member pricing to signed-in users. Hotel coupon codes typically apply to participating properties only.',
    ],
    howToRedeem: [
      'Copy the code and open Expedia in a new tab.',
      'Sign in, then search for eligible hotels or packages.',
      'On the payment page, enter the code in the coupon field and apply it.',
      'Confirm the final total, including taxes and fees, before booking.',
    ],
    faqs: [
      {
        question: 'Do Expedia coupons work on flights?',
        answer: 'Most Expedia codes apply to hotels or packages rather than standalone flights. Check the offer terms.',
      },
      {
        question: 'Can I use an Expedia code on a refundable rate?',
        answer:
          'Often yes, but some codes exclude certain rate types or properties. The coupon field will reject ineligible bookings.',
      },
      {
        question: 'Are Expedia member prices real discounts?',
        answer:
          'Member prices are lower rates shown to signed-in users on participating properties. Compare the final price with other booking options.',
      },
    ],
    updatedAt: '2026-10-08',
  },
  {
    slug: 'nike',
    name: 'Nike',
    domain: 'nike.com',
    url: 'https://www.nike.com/',
    brandColor: '#111111',
    brandText: '#FFFFFF',
    logoText: 'NIKE',
    categories: ['sports-outdoors', 'fashion'],
    popular: true,
    summary: 'Nike promo codes and sale deals on shoes, apparel and gear.',
    about: [
      'Nike sells athletic footwear, apparel and equipment for running, basketball, training and lifestyle wear.',
      'Nike Members get free shipping on qualifying orders and receive member-only promotions. Sale sections are updated frequently with previous-season styles.',
    ],
    howToRedeem: [
      'Copy the code and sign in to your Nike Member account.',
      'Add eligible items to your bag.',
      'Enter the code in the “Promo code” field in the bag or at checkout.',
    ],
    faqs: [
      {
        question: 'Do Nike promo codes work on sale items?',
        answer: 'Sometimes. Some codes apply an extra discount to sale styles, while others exclude them. Check the terms.',
      },
      {
        question: 'Are Nike codes limited to members?',
        answer: 'Many promotions require a free Nike Member account.',
      },
    ],
    updatedAt: '2026-10-11',
  },
  {
    slug: 'sephora',
    name: 'Sephora',
    domain: 'sephora.com',
    url: 'https://www.sephora.com/',
    brandColor: '#000000',
    brandText: '#FFFFFF',
    logoText: 'SEPHORA',
    categories: ['beauty'],
    popular: true,
    summary: 'Sephora promo codes, sale events and beauty deals.',
    about: [
      'Sephora sells makeup, skincare, fragrance and hair care from a wide range of brands.',
      'Its Beauty Insider program offers points, birthday gifts and tiered seasonal savings events.',
    ],
    howToRedeem: [
      'Copy the code and open Sephora.',
      'Sign in to your Beauty Insider account if the offer requires it.',
      'Enter the code in your basket and apply it.',
    ],
    faqs: [
      {
        question: 'When is the Sephora sale event?',
        answer: 'Sephora typically holds tiered savings events for loyalty members a few times a year. Dates vary.',
      },
      {
        question: 'Can I use a Sephora promo code with points?',
        answer: 'Rewards and promo codes may be combined in many cases, but check the offer terms.',
      },
    ],
    updatedAt: '2026-10-10',
  },
]
