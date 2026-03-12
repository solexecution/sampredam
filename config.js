/* =====================================================================
   PROPERTY LISTING CONFIGURATION
   =====================================================================
   This file is your checklist. Fill in each field below.

   Rules:
   - Empty string ""  → that element will be HIDDEN on the website
   - Filled value     → shown normally on the website
   - If you forget to update a placeholder, it will be HIGHLIGHTED
     with an orange border so you can spot it immediately

   After editing, just refresh the browser to see changes.
   ===================================================================== */

window.CONFIG = {
  site: { url: "https://40sheridan.xyz", umamiWebsiteId: "" },
  property: {
    streetAddress: "40 Sheridan Avenue",
    locality: "Caversham, Reading",
    postcode: "RG4 7QD",
    propertyType: "Detached",
    price: "525,000",
    bedrooms: "3",
    bathrooms: "1",
    receptionRooms: "1",
    floorAreaSqFt: "860",
    floorAreaSqM: "80",
    garden: "Sunny rear garden",
    gardenFacing: "Sunny",
    parking: "2 cars",
    walkToStation: "",
    epcRating: "D",
    councilTaxBand: "D",
    broadband: "Full fibre (FTTP) — up to 1 Gbps available",
    tenure: "Freehold",
    yearBuilt: "1960s",
    chainStatus: "No chain",
    priceContext: "Homes on Sheridan Avenue regularly sell above asking — <strong>24 Sheridan Ave</strong> sold for <strong>£592,500</strong> in 2023 and <strong>76 Sheridan Ave</strong> sold for <strong>£650,000</strong> in March 2025. At £525,000 this home — with a garden office, no chain, and no agent fees — represents exceptional value.",
  },
  description: [
    "Step through the front door into a welcoming, light-filled hallway — the kind that immediately makes you feel at home. This beautifully presented family house offers generous, well-proportioned rooms across every floor.",
    "The heart of the home is a stunning open-plan kitchen-diner fitted with contemporary units and quality built-in appliances. French doors open directly onto a sun terrace, seamlessly bringing the garden inside — perfect for weekend BBQs and lazy summer evenings.",
    "Upstairs, three spacious bedrooms offer peaceful retreats. The south-facing primary bedroom floods with morning light and overlooks the garden. The family bathroom is neat and modern.",
    "Outside, the large private rear garden has a sunny aspect with mature planting, a lawned area ideal for children, and a generous paved patio made for al fresco dining.",
    "The standout feature is a <strong>fully insulated garden office with floor-to-ceiling double glazing</strong> across two rooms — a rare and versatile space equally suited to remote working, a gym, studio, or creative retreat. The private driveway accommodates two cars with ease.",
  ],
  features: [
    {
      title: "Garden Office (2 rooms)",
      description: "Fully insulated, floor-to-ceiling double-glazed garden office — two rooms ideal for remote working, a studio or a gym. A rare find in this area.",
      icon: "glazing",
    },
    {
      title: "Sunny Garden & Patio",
      description: "Large private garden with a sunny aspect, mature planting and fruit trees, plus a generous paved patio — ideal for al fresco dining and summer entertaining.",
      icon: "garden",
    },
    {
      title: "No Chain · Motivated Sellers",
      description: "Private, chain-free sale — no agent fees built into the price. Deal directly with the owners for a faster, simpler transaction.",
      icon: "parking",
    },
  ],
  rooms: [
    { name: "Hallway", dimensions: "", description: "Welcoming entrance flooded with natural light" },
    { name: "Living Room", dimensions: "", description: "Spacious reception room with a characterful multi-fuel stove" },
    {
      name: "Kitchen/Diner",
      dimensions: "",
      description: "Open-plan with L-shaped countertop, built-in hob, oven and fridge. French doors to the garden",
    },
    { name: "Primary Bedroom", dimensions: "", description: "South-facing master bedroom with serene garden views" },
    { name: "Bedroom 2", dimensions: "", description: "Well-proportioned double bedroom overlooking the garden" },
    { name: "Bedroom 3", dimensions: "", description: "South-facing third bedroom, ideal as a child's room or home office" },
    { name: "Bathroom", dimensions: "", description: "Modern family bathroom serving all three bedrooms" },
    { name: "Patio", dimensions: "", description: "Generous paved sun terrace — ideal for BBQs and summer evenings" },
    {
      name: "Garden",
      dimensions: "",
      description: "Large private rear garden with sunny aspect, mature planting, lawn and fruit trees",
    },
    { name: "Front Garden", dimensions: "", description: "Landscaped front garden with south-facing seating area" },
    {
      name: "Driveway",
      dimensions: "",
      description: "Private driveway fitting two cars comfortably, with a roofed storage area for bikes and sports equipment",
    },
    {
      name: "Garden Office — Room 1",
      dimensions: "2.5m × 3m",
      description: "Focus room for desk work. Fully insulated, floor-to-ceiling double glazing, peaceful garden setting",
    },
    {
      name: "Garden Office — Room 2",
      dimensions: "3.4m × 3m",
      description: "Meeting or creative room. Fully insulated, floor-to-ceiling double glazing, with entrance doors",
    },
  ],
  gallery: [
    { src: "images/gallery/balmore_walk_1.jpg", alt: "Front Exterior — View 1" },
    { src: "images/gallery/balmore_walk_2.jpg", alt: "Front Exterior — View 2" },
    { src: "images/gallery/back_garden.png", alt: "Rear Garden" },
    { src: "images/gallery/patio_bbq.png", alt: "Patio & BBQ Area" },
    { src: "images/gallery/bugs_bottom_1.jpg", alt: "Bugs Bottom — View 1" },
    { src: "images/gallery/bugs_bottom_2.jpg", alt: "Bugs Bottom — View 2" },
    { src: "images/gallery/hall_staircase.jpg", alt: "Entrance Hall & Staircase" },
    { src: "images/gallery/dining_living_rooms.png", alt: "Dining & Living Room" },
    { src: "images/gallery/living_room.png", alt: "Living Room" },
    { src: "images/gallery/garden_office_front.png", alt: "Garden Office — Exterior" },
    { src: "images/gallery/office_room_1.jpg", alt: "Garden Office — Room 1" },
    { src: "images/gallery/office_room_1a.jpg", alt: "Garden Office — Room 2" },
  ],
  heroImages: [
    "images/gallery/balmore_walk_2.jpg",
    "images/gallery/back_garden.png",
    "images/gallery/patio_bbq.png",
    "images/gallery/dining_living_rooms.png",
    "images/gallery/garden_office_front.png",
    "images/gallery/hall_staircase.jpg",
  ],
  floorPlans: [
    { label: "Ground Floor", src: "images/gallery/Caversham_plans.jpg" },
    { label: "First Floor", src: "images/gallery/Caversham_plans_f2.jpg" },
    { label: "Garden Office", src: "images/gallery/garden_office_plan.svg" },
  ],
  openHouse: [
    { date: "Saturday 1 March 2026", time: "11:00 – 14:00" },
    { date: "Sunday 2 March 2026", time: "11:00 – 13:00" },
  ],
  socialProof: { viewingsBooked: 3, showWidget: true },
  galleryPlaceholders: [
    "Front Exterior",
    "Living Room",
    "Kitchen",
    "Primary Bedroom",
    "Second Bedroom",
    "Bathroom",
    "Garden",
    "Street View",
  ],
  contact: {
    phone: "+447879773260",
    phoneDisplay: "07879773260",
    whatsapp: "447879773260",
    email: "vupointt@gmail.com",
  },
  runningCosts: { councilTaxYearly: "2,100", energyBillsMonthly: "150", waterBillsYearly: "400" },
  faq: {
    askingPrice: "",
    tenure: "",
    epc: "The property has an energy rating of D. You can <a href='https://find-energy-certificate.service.gov.uk/energy-certificate/8583-6625-4040-1504-7922' target='_blank' rel='noopener'>view the official government EPC certificate here</a>.",
    viewings: "",
    privateSale: "",
    included: "",
    chain: "",
    runningCosts: "",
    survey: "",
    makingOffer: "",
  },
  epcCertificateUrl: "https://find-energy-certificate.service.gov.uk/energy-certificate/8583-6625-4040-1504-7922",
  auction: {
    enabled: true,
    deadline: "2026-03-31T18:00:00",
    label: "Best Offers By",
    guidePrice: "525,000",
    guidePriceLabel: "Offers in excess of",
    heroBadge: "No Chain · Best Offers By 31 March",
    ctaText: "Submit Your Best Offer",
    smallPrint: "All offers considered. Sellers reserve the right to accept any offer at any time before the deadline.",
  },
  referral: {
    enabled: true,
    reward: "100",
    whatsapp: "447879773260",
    terms: [
      "Share must be made before the sale completes.",
      "You must provide a screenshot of your share post with a visible date/timestamp proving you shared before the buyer made contact.",
      "The buyer must confirm in writing (WhatsApp or email to the sellers) that they discovered the property via your specific share.",
      "Only the first confirmed referral source per buyer is eligible.",
      "Reward of £100 is paid within 14 days of sale completion.",
      "Sellers reserve the right to verify and decline ineligible claims at their sole discretion.",
      "No cash alternative is offered in advance of completion.",
    ],
  },
};


/* =====================================================================
   WHERE TO POST YOUR LISTING
   =====================================================================
   This is your marketing checklist. Work through each tier.
   Tick them off as you go (change status to "done").
   ===================================================================== */

window.WHERE_TO_POST = {

  // ----- TIER 1: FREE LISTING SITES (do these first) -----
  tier1_free_listings: [
    {
      name: "Strike (free Rightmove/Zoopla listing)",
      url: "https://strike.co.uk",
      notes: "FREE. Gets you on Rightmove, Zoopla & PrimeLocation. Includes photos & floorplan.",
      status: "todo",
    },
    {
      name: "Facebook Marketplace",
      url: "https://www.facebook.com/marketplace",
      notes: "Free. Massive local audience. Post with best photos and link to your site.",
      status: "todo",
    },
    {
      name: "Gumtree",
      url: "https://www.gumtree.com",
      notes: "Free classifieds. Post in Property For Sale > Reading.",
      status: "todo",
    },
    {
      name: "TheHouseShop",
      url: "https://www.thehouseshop.com",
      notes: "Free property marketplace for private sellers.",
      status: "todo",
    },
    {
      name: "NoAgent.Properties",
      url: "https://www.noagent.properties",
      notes: "Free FSBO platform. Professional listing tools.",
      status: "todo",
    },
    {
      name: "Listed By Owners",
      url: "https://listedbyowners.co.uk",
      notes: "Free private seller listings.",
      status: "todo",
    },
  ],

  // ----- TIER 2: LOCAL COMMUNITY (maximum local reach) -----
  tier2_local_community: [
    {
      name: "Nextdoor - Caversham",
      url: "https://nextdoor.co.uk",
      notes: "Free neighbourhood network. Post in Caversham/Caversham Heights area. Very effective for local reach.",
      status: "todo",
    },
    {
      name: "Facebook: Caversham & Emmer Green Buy, Sell & Free Stuff",
      url: "https://www.facebook.com/groups/",
      notes: "Search for this group on Facebook. Request to join, then post listing.",
      status: "todo",
    },
    {
      name: "Facebook: Caversham Community Group",
      url: "https://www.facebook.com/groups/",
      notes: "General Caversham community group. Check posting rules first.",
      status: "todo",
    },
    {
      name: "Facebook: Reading Buy and Sell",
      url: "https://www.facebook.com/groups/",
      notes: "Wider Reading buy/sell group.",
      status: "todo",
    },
    {
      name: "Facebook: Reading Property / Houses for Sale Reading",
      url: "https://www.facebook.com/groups/",
      notes: "Property-specific Reading groups. Search Facebook for current active groups.",
      status: "todo",
    },
    {
      name: "VarageSale - Reading UK",
      url: "https://www.varagesale.com/reading-uk-buy-and-sell",
      notes: "Free verified marketplace. Hundreds of Reading families active.",
      status: "todo",
    },
    {
      name: "Reading Forum",
      url: "https://reading-forum.co.uk",
      notes: "Community forum for Reading. Check if property posts are allowed.",
      status: "todo",
    },
    {
      name: "Caversham.org.uk",
      url: "https://caversham.org.uk",
      notes: "Local Caversham community site with directory/bulletin.",
      status: "todo",
    },
  ],

  // ----- TIER 3: SOCIAL MEDIA (amplify reach) -----
  tier3_social_media: [
    {
      name: "Instagram Post & Reels",
      url: "https://www.instagram.com",
      notes: "Post carousel of best photos + video Reel tour. Use hashtags: #UKProperty #PropertyForSale #Caversham #Reading #Berkshire #HouseForSale #JustListed #HouseTour",
      status: "todo",
    },
    {
      name: "Twitter/X",
      url: "https://twitter.com",
      notes: "Post with photos. Use: #CavershamProperty #ReadingHomes #PropertyForSale #ReadingUK #RG4. Tag @rdgchronicle",
      status: "todo",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com",
      notes: "Great for London commuter audience. Post as a personal update with property link. Use: #UKProperty #Reading #Berkshire",
      status: "todo",
    },
    {
      name: "TikTok Video Tour",
      url: "https://www.tiktok.com",
      notes: "Short walkthrough video. Use: #UKProperty #HouseTour #PropertyForSale #Reading #HouseForSale #FirstTimeHomeowner",
      status: "todo",
    },
    {
      name: "WhatsApp Groups",
      url: "",
      notes: "Share the link in any relevant local WhatsApp groups you're in.",
      status: "todo",
    },
    {
      name: "Reddit r/HousingUK",
      url: "https://www.reddit.com/r/HousingUK/",
      notes: "467k members. Frame as sharing experience of private selling, not hard sell. Check rules first.",
      status: "todo",
    },
  ],

  // ----- TIER 4: LOCAL MEDIA -----
  tier4_local_media: [
    {
      name: "Reading Chronicle (classified ad)",
      url: "https://www.readingchronicle.co.uk",
      notes: "Weekly newspaper (Thursdays). Email news@readingchronicle.co.uk or call 0118 955 3311 for classified rates.",
      status: "todo",
    },
    {
      name: "Berkshire Live / Get Reading",
      url: "https://www.getreading.co.uk",
      notes: "Online news for Reading. Check if they have a classifieds section.",
      status: "todo",
    },
    {
      name: "Reading Today Online",
      url: "https://rdg.today",
      notes: "Local online news. May have community board.",
      status: "todo",
    },
  ],

  // ----- BUDGET PAID OPTION -----
  paid_options: [
    {
      name: "Yopa (hybrid estate agent)",
      url: "https://www.yopa.co.uk",
      notes: "From £999. Includes local agent, Rightmove/Zoopla, photography, viewings management. Good if you want professional support.",
      status: "todo",
    },
  ],
};
