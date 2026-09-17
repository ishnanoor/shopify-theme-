/**
 * LUMORA - Global Data Store
 * Catalog, Categories, FAQs, and Articles
 */

const LUMORA_DATA = {
  products: [
    {
      id: 'luxe-handbag',
      name: 'Luxe Structured Handbag',
      slug: 'product.html',
      price: 129.00,
      originalPrice: 169.00,
      category: 'Accessories',
      rating: 4.9,
      reviewsCount: 128,
      badge: 'Bestseller',
      image: 'assets/images/luxe-handbag.jpg',
      description: 'Handcrafted from supple Italian full-grain leather, the Luxe Handbag merges architectural precision with effortless everyday utility. Featuring polished gold-tone hardware, a secure turn-lock clasp, and a versatile detachable crossbody strap.',
      swatches: [
        { name: 'Oat Beige', hex: '#D6C6B2', selected: true },
        { name: 'Sage Olive', hex: '#637564', selected: false },
        { name: 'Dusty Rose', hex: '#D99C94', selected: false },
        { name: 'Noir Black', hex: '#1E2320', selected: false }
      ],
      details: {
        dimensions: '9.5" W x 7.2" H x 3.8" D (24cm x 18cm x 10cm)',
        material: '100% Certified Italian Full-Grain Leather & Organic Cotton Twill Lining',
        strapDrop: '2.5" Top handle; 19"-23" Detachable adjustable shoulder strap',
        origin: 'Handmade in Florence, Italy'
      }
    },
    {
      id: 'linen-shirt',
      name: 'Relaxed Linen Shirt',
      slug: 'product.html',
      price: 49.00,
      originalPrice: 65.00,
      category: 'Men',
      rating: 4.8,
      reviewsCount: 94,
      badge: 'New Season',
      image: 'assets/images/linen-shirt.jpg',
      description: 'Spun from breathable French flax, our Relaxed Linen Shirt offers an airy drape that softens gracefully with every wash. Designed for effortless tailoring from sunlit coastal afternoons to tranquil evening dinners.',
      swatches: [
        { name: 'Olive Sage', hex: '#627052', selected: true },
        { name: 'Ivory Cream', hex: '#F0ECE1', selected: false },
        { name: 'Navy Slate', hex: '#2C3E50', selected: false }
      ]
    },
    {
      id: 'minimal-sneakers',
      name: 'Minimalist Leather Sneakers',
      slug: 'product.html',
      price: 79.00,
      originalPrice: 99.00,
      category: 'Accessories',
      rating: 4.9,
      reviewsCount: 112,
      badge: 'Popular',
      image: 'assets/images/sneakers.jpg',
      description: 'Crafted with premium chrome-free calfskin leather and cushioned natural rubber soles for featherlight, all-day stride support.',
      swatches: [
        { name: 'Pure White', hex: '#FFFFFF', selected: true },
        { name: 'Oat Cream', hex: '#EBE5D8', selected: false },
        { name: 'Matte Onyx', hex: '#262626', selected: false }
      ]
    },
    {
      id: 'scented-candle',
      name: 'Bohemian Amber Scented Candle',
      slug: 'product.html',
      price: 26.00,
      originalPrice: 32.00,
      category: 'Home & Living',
      rating: 4.9,
      reviewsCount: 68,
      badge: 'Clean Soy',
      image: 'assets/images/candle.jpg',
      description: 'Hand-poured coconut-soy wax infused with comforting notes of golden amber, smoky bourbon vanilla, and wild bergamot.',
      swatches: [
        { name: 'Amber Glow', hex: '#EBD8B8', selected: true },
        { name: 'Smoked Vanilla', hex: '#C7B199', selected: false }
      ]
    },
    {
      id: 'straw-hat',
      name: 'Woven Straw Ribbon Boater',
      slug: 'product.html',
      price: 35.00,
      originalPrice: 48.00,
      category: 'Accessories',
      rating: 4.7,
      reviewsCount: 53,
      badge: 'Handwoven',
      image: 'assets/images/straw-hat.jpg',
      description: 'Woven by hand using sustainably harvested natural wheat straw, crowned with a timeless grosgrain ribbon.',
      swatches: [
        { name: 'Natural Straw', hex: '#D8C3A5', selected: true },
        { name: 'Honey Wheat', hex: '#C2A378', selected: false }
      ]
    },
    {
      id: 'gold-hoops',
      name: '18k Chunky Gold Hoops',
      slug: 'product.html',
      price: 19.00,
      originalPrice: 28.00,
      category: 'Accessories',
      rating: 5.0,
      reviewsCount: 184,
      badge: 'Waterproof',
      image: 'assets/images/gold-hoops.jpg',
      description: 'Lustrous, hollow lightweight hoops crafted in recycled 18k gold vermeil. Hypoallergenic, tarnish-resistant, and comfortable enough to sleep in.',
      swatches: [
        { name: 'Yellow Gold', hex: '#E6C466', selected: true },
        { name: 'Sterling Silver', hex: '#DFE2E2', selected: false }
      ]
    }
  ],

  categories: [
    { name: 'Women', count: '120+ items', image: 'assets/images/cat-women.jpg', link: 'product.html' },
    { name: 'Men', count: '98+ items', image: 'assets/images/cat-men.jpg', link: 'product.html' },
    { name: 'Home & Living', count: '150+ items', image: 'assets/images/cat-home.jpg', link: 'product.html' },
    { name: 'Beauty', count: '80+ items', image: 'assets/images/cat-beauty.jpg', link: 'product.html' },
    { name: 'Accessories', count: '70+ items', image: 'assets/images/cat-accessories.jpg', link: 'product.html' }
  ],

  faqs: [
    {
      q: 'What are your delivery times and shipping costs?',
      a: 'We offer complimentary express shipping on all domestic orders over $50. Standard orders typically arrive within 2–4 business days. Expedited next-day courier delivery is available at checkout for $15.',
      category: 'shipping'
    },
    {
      q: 'What is your return & exchange policy?',
      a: 'We are delighted to provide 30-day hassle-free returns on all unworn, unaltered items in their original packaging. Simply initiate a prepaid digital shipping label through your account portal.',
      category: 'returns'
    },
    {
      q: 'Are Lumora materials sustainably sourced?',
      a: 'Yes, 100%. Every piece in our collection is crafted from OEKO-TEX® certified linen, organic cotton, chrome-free vegetable tanned leathers, and recycled 18k gold vermeil. We prioritize planet-first stewardship.',
      category: 'sustainability'
    },
    {
      q: 'How do I care for my leather bags and shoes?',
      a: 'Store your leather accessories in the complimentary breathable cotton dust bag provided. Avoid prolonged direct sunlight and moisture. Condition every 6 months with a mild natural leather balm.',
      category: 'care'
    },
    {
      q: 'Can I track my order in real time?',
      a: 'Once your order is thoughtfully packed and leaves our studio, you will instantly receive an SMS and email notification containing your live courier tracking link.',
      category: 'shipping'
    }
  ],

  blogArticles: [
    {
      id: 'mindful-capsule-wardrobe',
      title: 'The Art of Mindful Dressing: Building a Timeless Capsule Wardrobe for Spring',
      date: 'March 14, 2026',
      readTime: '6 min read',
      author: 'Clara Delacroix',
      tag: 'Style Philosophy',
      image: 'assets/images/spring-sale.jpg',
      excerpt: 'How investing in 12 versatile, high-integrity essentials unlocks infinite daily styling while cultivating genuine calm in your morning routine.'
    },
    {
      id: 'sustainable-linen-story',
      title: 'From French Flax Fields to Slow Fashion Atelier: The Linen Lifecycle',
      date: 'February 28, 2026',
      readTime: '4 min read',
      author: 'Julian Thorne',
      tag: 'Craftsmanship',
      image: 'assets/images/linen-shirt.jpg',
      excerpt: 'Discover why linen remains nature’s most enduring, zero-waste textile and why its texture breathes deeper with each passing season.'
    },
    {
      id: 'warm-minimalist-living',
      title: 'Curating Warm Minimalist Spaces: Tactile Ceramics & Natural Light',
      date: 'January 22, 2026',
      readTime: '5 min read',
      author: 'Maya Lin',
      tag: 'Living Well',
      image: 'assets/images/cat-home.jpg',
      excerpt: 'Transform your living sanctuary with sculptural ribbed pottery, calming eucalyptus foliage, and soft ambient textures.'
    }
  ]
};
