import type { Category } from '../types'

export const categories: Category[] = [
  {
    slug: 'electronics',
    name: 'Electronics',
    tagline: 'Laptops, TVs, audio and smart home',
    intro:
      'Electronics prices move often, so the best savings usually come from timing a purchase rather than from a single code. Retailers run category-wide sales around major holidays, product launches and the end of a model year, and many offer open-box or refurbished options with a warranty.',
    tips: [
      'Compare the exact model number across retailers — similar names can hide different specs.',
      'Check whether a price-match or price-adjustment policy applies if the price drops after you buy.',
      'Open-box and certified refurbished items can be cheaper; confirm the warranty and return window first.',
      'Codes on electronics often exclude major brands like Apple, so read the exclusions before checkout.',
    ],
  },
  {
    slug: 'fashion',
    name: 'Fashion',
    tagline: 'Clothing, shoes and accessories',
    intro:
      'Fashion retailers frequently offer first-order discounts, end-of-season clearance and free-shipping thresholds. Combining a sitewide code with items already on sale is sometimes allowed, but many codes exclude clearance — the fine print decides.',
    tips: [
      'Sign-up offers for new customers are common; check whether they apply to sale items.',
      'End-of-season clearance is usually the deepest discount of the year for a given style.',
      'Look up the return policy before using a final-sale discount.',
      'Free-shipping minimums can make adding a small item cheaper than paying for delivery.',
    ],
  },
  {
    slug: 'home-garden',
    name: 'Home & Garden',
    tagline: 'Furniture, decor, tools and outdoor',
    intro:
      'Home improvement and furniture purchases tend to be large, so a percentage-off code or a seasonal event can make a real difference. Many stores also offer store-pickup options that avoid freight delivery fees on bulky items.',
    tips: [
      'Holiday weekends such as Memorial Day, Labor Day and Black Friday commonly bring appliance and furniture sales.',
      'Ask about delivery and haul-away fees before comparing prices across stores.',
      'Store pickup can remove shipping costs on heavy items.',
      'Check if a retailer offers a military, first-responder or trade discount program.',
    ],
  },
  {
    slug: 'travel',
    name: 'Travel',
    tagline: 'Hotels, flights, cars and vacation packages',
    intro:
      'Travel savings depend heavily on dates, flexibility and cancellation terms. Booking-site codes are often limited to specific properties, minimum stays or app bookings, so it pays to compare the final price including taxes and fees.',
    tips: [
      'Always compare the total price with taxes and resort fees, not the nightly rate.',
      'Refundable rates cost more but protect you if your plans change.',
      'Bundling a flight and hotel can be cheaper than booking each separately — compare both ways.',
      'Member or app-only prices are common; signing in may reveal a lower rate.',
    ],
  },
  {
    slug: 'food-delivery',
    name: 'Food Delivery',
    tagline: 'Restaurant delivery, groceries and meal kits',
    intro:
      'Delivery apps compete for new customers with first-order credits and fee-free trials. For regular users, subscription programs that remove delivery fees on eligible orders can be worth more than one-off codes — if you order often enough.',
    tips: [
      'Promotions frequently apply only to a first order or to specific restaurants.',
      'Service fees and tips are usually separate from delivery fees — check the full breakdown.',
      'Pickup orders often avoid delivery and service fees entirely.',
      'Compare a subscription’s monthly cost with how many orders you actually place.',
    ],
  },
  {
    slug: 'beauty',
    name: 'Beauty',
    tagline: 'Skincare, makeup, fragrance and hair care',
    intro:
      'Beauty retailers run loyalty programs, seasonal sale events and gift-with-purchase offers. Discounts on prestige brands are less frequent, so sitewide events are often the best time to restock.',
    tips: [
      'Loyalty points and member events can stack with some promotions — check the program terms.',
      'Gift-with-purchase offers have value only if you would use the included products.',
      'Some brands are excluded from most codes; look for a list of exclusions.',
      'Travel and mini sizes are a low-cost way to test a product before buying full size.',
    ],
  },
  {
    slug: 'sports-outdoors',
    name: 'Sports & Outdoors',
    tagline: 'Activewear, footwear, fitness and camping',
    intro:
      'Athletic brands and sporting goods stores rotate sales on footwear, apparel and equipment throughout the year. Member programs often unlock extra discounts, early access and free shipping.',
    tips: [
      'Previous-season colorways of shoes and apparel are frequently marked down.',
      'Free membership programs often include free shipping and member-only pricing.',
      'Check whether codes exclude specific brands or new releases.',
      'Outdoor gear sales tend to follow the seasons — buy winter gear in spring and vice versa.',
    ],
  },
  {
    slug: 'entertainment',
    name: 'Entertainment',
    tagline: 'Streaming, tickets, games and events',
    intro:
      'Entertainment savings come mostly from bundles, annual plans and limited-time trial offers. Ticket prices vary with demand, so flexibility on date and seat location matters more than codes.',
    tips: [
      'Annual streaming plans are usually cheaper than paying monthly for a full year.',
      'Bundles can save money if you would subscribe to each service anyway.',
      'Set a reminder before a free trial converts to a paid plan.',
      'Compare ticket fees across platforms — the face value is rarely the final price.',
    ],
  },
]
