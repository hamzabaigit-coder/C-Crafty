import type { Season } from '../types'

export const seasons: Season[] = [
  {
    slug: 'halloween',
    name: 'Halloween',
    when: 'Saturday, October 31, 2026',
    intro:
      'Costumes, candy and decorations sell fast in the last two weeks of October. Shopping earlier gives you more sizes to choose from, while the days right after Halloween bring the deepest clearance on decor for next year.',
    tips: [
      'Order costumes at least a week ahead to avoid paying for expedited shipping.',
      'Buy decorations on November 1 for next year — clearance prices are often the lowest of the season.',
      'Check sizing charts carefully; costume returns may be restricted once opened.',
    ],
  },
  {
    slug: 'black-friday',
    name: 'Black Friday',
    when: 'Friday, November 27, 2026',
    intro:
      'Black Friday falls on the day after Thanksgiving, but many US retailers now start their sales weeks earlier. Electronics, appliances, toys and home goods are the categories most commonly discounted.',
    tips: [
      'Make a list and set a budget before sales start, so limited-time pressure doesn’t drive extra purchases.',
      'Track the prices of items you want for a few weeks to recognise a genuine discount.',
      'Read return and price-adjustment policies — some retailers extend holiday return windows.',
      'Compare the exact model number; some doorbuster products are special versions made for the sale.',
    ],
  },
  {
    slug: 'cyber-monday',
    name: 'Cyber Monday',
    when: 'Monday, November 30, 2026',
    intro:
      'Cyber Monday focuses on online shopping, and it is often a strong day for software subscriptions, VPNs, online courses and tech accessories.',
    tips: [
      'Annual software plans are frequently discounted — note the renewal price before buying.',
      'Use a password manager or saved payment method to check out quickly on limited deals.',
      'Watch for free-shipping thresholds that make small add-on items worth it.',
    ],
  },
  {
    slug: 'holiday-gifts',
    name: 'Holiday Gifts',
    when: 'November – December 2026',
    intro:
      'Holiday gift shopping spans from early November to the last shipping cutoff before December 25. Gift sets, toys, electronics and experiences are the most popular categories.',
    tips: [
      'Note each retailer’s holiday shipping cutoff date and the latest date for store pickup.',
      'Ask for gift receipts so recipients can exchange items without seeing the price.',
      'Gift sets in beauty and fragrance often cost less than buying the items separately.',
    ],
  },
]
