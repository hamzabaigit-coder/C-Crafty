/**
 * Homepage hero slides. Each slide points at an offer by id; slides whose
 * offer is missing or expired are skipped automatically.
 */
export const heroSlides: { offerId: string; eyebrow: string; title: string; subtitle: string }[] = [
  {
    offerId: 'dd-first-order',
    eyebrow: 'Save more on your favorite brands',
    title: 'Take 30% Off Your First DoorDash Order',
    subtitle: 'New customers can save on a first delivery order. Fees, taxes and tip are separate.',
  },
  {
    offerId: 'bby-laptops',
    eyebrow: 'Today’s best online deals',
    title: 'Save up to $300 on Select Laptops',
    subtitle: 'Windows laptops and Chromebooks for school, work and gaming.',
  },
  {
    offerId: 'nike-extra-20',
    eyebrow: 'Trending US store coupons',
    title: 'Extra 20% Off Nike Sale Styles',
    subtitle: 'Member code for an extra discount on select shoes and apparel.',
  },
  {
    offerId: 'exp-packages',
    eyebrow: 'Plan your next getaway',
    title: '25% Off Select Vacation Packages',
    subtitle: 'Bundle a flight and hotel on Expedia to unlock package savings.',
  },
]
