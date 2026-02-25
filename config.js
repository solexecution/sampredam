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

  // ==================================================================
  // SITE & SERVICES
  // ==================================================================
  site: {
    url: "https://40sheridan.xyz",  // Your live site URL
    umamiWebsiteId: "",   // Get from https://cloud.umami.is → Add website → Copy ID
  },

  // ==================================================================
  // PROPERTY DETAILS
  // ==================================================================
  property: {
    streetAddress: "40 Sheridan Avenue",           // e.g. "42 Sheridan Avenue"
    locality: "Caversham, Reading",
    postcode: "RG4 7QD",
    propertyType: "Detached",           // e.g. "Semi-Detached", "Detached", "Terraced", "Flat"
    price: "525,000",           // e.g. "550,000" (just the number, £ is added automatically)
    bedrooms: "3",           // e.g. "3"
    bathrooms: "1",           // e.g. "2"
    receptionRooms: "1",           // e.g. "2"
    floorAreaSqFt: "860",           // e.g. "1,200"
    floorAreaSqM: "80",           // e.g. "111"
    garden: "Sunny rear garden",             // e.g. "South-facing, rear"
    gardenFacing: "Sunny",           // shown in highlights strip — e.g. "South", "Sunny", "West"
    parking: "2 cars",               // keep short — shown in highlights strip
    walkToStation: "",               // e.g. "12 min" walk/drive to Reading station (leave "" to hide)
    epcRating: "D",           // e.g. "C"
    councilTaxBand: "D",           // e.g. "D"
    tenure: "Freehold",           // e.g. "Freehold" or "Leasehold"
    yearBuilt: "1960s",           // e.g. "1930s" (optional)
    chainStatus: "No chain",           // e.g. "No chain" or "Chain of 2"

    // Optional: override the price-context blurb in the Location section.
    // HTML allowed. Leave "" to use the default text.
    priceContext: "",
  },

  // ==================================================================
  // PROPERTY DESCRIPTION
  // ==================================================================
  // Each string is a separate paragraph. Remove or add as needed.
  // Leave the array empty [] to hide the description section.
  description: [
    "Step through the front door into a welcoming hallway flooded with natural light. This beautifully presented family home offers generous living space across well-proportioned rooms, perfect for modern family life.",
    "The heart of the home is the stunning open-plan kitchen-diner, fitted with contemporary units and quality appliances. French doors open onto the sunny garden, seamlessly connecting indoor and outdoor living.",
    "Upstairs, the spacious bedrooms provide restful retreats, complemented by a modern family bathroom. The primary bedroom benefits from built-in wardrobes and lovely garden views.",
    "Outside, the large private rear garden enjoys a sunny aspect and is a genuine highlight. A generous paved patio is perfect for al fresco dining and BBQs, while the lawn beyond offers space for children and gardening alike.",
    "A standout feature is the fully insulated garden office with floor-to-ceiling double glazing across two separate rooms — a rare and versatile space ideal for working from home, a studio, a gym, or a creative retreat. The private driveway easily fits two cars, with additional on-street parking right outside.",
  ],

  // ==================================================================
  // KEY FEATURES (shown as cards below property details)
  // ==================================================================
  // Each feature: { title, description, icon }
  // icon options: "kitchen", "garden", "glazing", "heating", "parking", "rooms"
  // Set to [] to hide the features section.
  features: [
    { title: "Garden Office (2 rooms)", description: "Fully insulated, floor-to-ceiling double-glazed garden office with two separate rooms — perfect for working from home", icon: "glazing" },
    { title: "Sunny Garden & Patio", description: "Large private garden with a sunny aspect, plus a generous paved patio — perfect for al fresco dining and BBQs", icon: "garden" },
    { title: "Easy Parking — 2 Cars", description: "Private driveway comfortably fits two cars, with on-street parking right outside too", icon: "parking" },
  ],

  // ==================================================================
  // ROOM-BY-ROOM BREAKDOWN
  // ==================================================================
  // Each room: { name, dimensions, description }
  // Leave dimensions "" to hide them. Leave the array [] to hide this section.
  rooms: [
    { name: "Hallway", dimensions: "", description: "Welcoming entrance filled with natural light" },
    { name: "Living Room", dimensions: "", description: "Spacious reception room with multi-fuel stove" },
    { name: "Kitchen/Diner", dimensions: "", description: "L-shaped countertop, kitchen hob and oven, sink and fridge" },
    { name: "Primary Bedroom", dimensions: "", description: "South-facing, large master bedroom" },
    { name: "Bedroom 2", dimensions: "", description: "Double bedroom with garden views" },
    { name: "Bedroom 3", dimensions: "", description: "South-facing, bedroom" },
    { name: "Bathroom", dimensions: "", description: "Functional family bathroom" },
    { name: "Garden Office — Room 1", dimensions: "", description: "For desk work, fully insulated, floor-to-ceiling double glazing" },
    { name: "Garden Office — Room 2", dimensions: "", description: "For meetings, fully insulated, floor-to-ceiling double glazing" },
    { name: "Patio", dimensions: "", description: "Large paved patio, ideal for BBQs and outdoor entertaining" },
    { name: "Garden", dimensions: "", description: "Large private rear garden with sunny aspect, fruit trees" },
    { name: "Front Garden", dimensions: "", description: "Front garden with south-facing seating area" },
    { name: "Driveway", dimensions: "", description: "Private driveway with space for two cars, roofed area for storage bikes and sports equipment" },
  ],

  // ==================================================================
  // GALLERY IMAGES
  // ==================================================================
  // Add your photos to the images/gallery/ folder, then list them here.
  // Each entry: { src: "images/gallery/filename.jpg", alt: "Description" }
  // Leave empty [] and placeholder boxes will show instead.
  gallery: [
    // Temporary park images as failsafe placeholders:
    { src: "images/gallery/balmore_walk_1.jpg", alt: "Balmore Walk - View 1" },
    { src: "images/gallery/balmore_walk_2.jpg", alt: "Balmore Walk - View 2" },
    { src: "images/gallery/bugs_bottom_1.jpg", alt: "Bugs Bottom - View 1" },
    { src: "images/gallery/bugs_bottom_2.jpg", alt: "Bugs Bottom - View 2" },
  ],

  // ==================================================================
  // FLOOR PLANS
  // ==================================================================
  // Each entry: { label, src }
  // src: path to image e.g. "images/floorplan-ground.jpg", or "" for placeholder.
  floorPlans: [
    { label: "Ground Floor", src: "images/gallery/balmore_walk_1.jpg" },
    { label: "First Floor", src: "images/gallery/balmore_walk_2.jpg" },
    { label: "Garden Office", src: "images/gallery/bugs_bottom_1.jpg" },
    { label: "Garden & Patio", src: "images/gallery/bugs_bottom_2.jpg" },
  ],

  // ==================================================================
  // OPEN HOUSE SLOTS
  // ==================================================================
  // Pre-set viewing slots shown as one-click WhatsApp buttons.
  // Each entry: { date: "Saturday 1 March 2026", time: "11:00 – 13:00" }
  // Leave empty [] to hide the section entirely.
  openHouse: [
    // { date: "Saturday 1 March 2026",  time: "11:00 – 13:00" },
    // { date: "Sunday 2 March 2026",    time: "10:00 – 12:00" },
  ],

  // Placeholder labels shown when no images are provided yet
  galleryPlaceholders: [
    "Front Exterior", "Living Room", "Kitchen", "Primary Bedroom",
    "Second Bedroom", "Bathroom", "Garden", "Street View",
  ],

  // ==================================================================
  // CONTACT DETAILS
  // ==================================================================
  contact: {
    phone: "+447879773260",   // e.g. "+447123456789" (used in tel: link)
    phoneDisplay: "07879773260",   // e.g. "07123 456 789" (shown on page)
    whatsapp: "447879773260",   // e.g. "447123456789" (no + or spaces, used in wa.me link)
    email: "vupointt@gmail.com",   // e.g. "john@example.com"
  },

  // ==================================================================
  // RUNNING COSTS (shown in FAQ)
  // ==================================================================
  runningCosts: {
    councilTaxYearly: "2,100",   // e.g. "2,100"
    energyBillsMonthly: "150",   // e.g. "150"
    waterBillsYearly: "400",   // e.g. "400"
  },

  // ==================================================================
  // FAQ OVERRIDES
  // ==================================================================
  // Leave empty "" to use default answer text.
  // Set to a string to override. Set to false to hide that question entirely.
  faq: {
    askingPrice: "",   // Override the asking price FAQ answer
    tenure: "",   // Override the tenure FAQ answer
    epc: "The property has an energy rating of D. You can <a href='https://find-energy-certificate.service.gov.uk/energy-certificate/8583-6625-4040-1504-7922' target='_blank' rel='noopener'>view the full EPC certificate online here</a>.",   // Override the EPC FAQ answer
    viewings: "",   // Override the viewings FAQ answer
    privateSale: "",   // Override the private sale FAQ answer
    included: "",   // Override the included items FAQ answer
    chain: "",   // Override the chain status FAQ answer
    runningCosts: "",   // Override the running costs FAQ answer (auto-generated if empty but runningCosts above are filled)
    survey: "",   // Override the survey FAQ answer
    makingOffer: "",   // Override the making an offer FAQ answer
  },

  // ==================================================================
  // EPC CERTIFICATE
  // ==================================================================
  epcCertificateUrl: "https://find-energy-certificate.service.gov.uk/energy-certificate/8583-6625-4040-1504-7922",   // e.g. "https://find-energy-certificate.service.gov.uk/energy-certificate/XXXX-XXXX-XXXX"

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
