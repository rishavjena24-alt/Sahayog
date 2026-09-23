import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean old data
  await prisma.user.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.provider.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.providerRequest.deleteMany({});
  await prisma.cooperativeGroup.deleteMany({});
  await prisma.review.deleteMany({});

  const defaultPasswordHash = await bcrypt.hash("demo1234", 10);

  // 1. Users
  await prisma.user.createMany({
    data: [
      {
        id: "CU-101",
        email: "ananya@example.com",
        password: defaultPasswordHash,
        name: "Ananya Sharma",
        role: "customer",
        location: "Bengaluru, KA",
        initials: "AS",
        phone: "+91 98765 43210",
        memberSince: "2025",
      },
      {
        id: "PR-201",
        email: "rekha@example.com",
        password: defaultPasswordHash,
        name: "Rekha Kumari",
        role: "provider",
        location: "Koramangala, Bengaluru",
        initials: "RK",
        phone: "+91 98765 43745",
        memberSince: "2023",
      },
      {
        id: "AD-001",
        email: "admin@sahayog.in",
        password: defaultPasswordHash,
        name: "Sahayog Admin",
        role: "admin",
        location: "Bengaluru",
        initials: "SA",
        phone: "+91 80123 45678",
        memberSince: "2022",
      },
      {
        id: "CU-102",
        email: "rahul@example.com",
        password: defaultPasswordHash,
        name: "Rahul Verma",
        role: "customer",
        location: "Indiranagar, Bengaluru",
        initials: "RV",
        phone: "+91 98765 43222",
        memberSince: "2025",
      },
      {
        id: "PR-202",
        email: "irfan@example.com",
        password: defaultPasswordHash,
        name: "Mohammed Irfan",
        role: "provider",
        location: "Indiranagar, Bengaluru",
        initials: "MI",
        phone: "+91 98765 43111",
        memberSince: "2024",
      },
    ],
  });

  // 2. Categories
  await prisma.category.createMany({
    data: [
      { id: "cleaning", label: "Cleaning", icon: "Sparkles" },
      { id: "plumbing", label: "Plumbing", icon: "Wrench" },
      { id: "electrical", label: "Electrical", icon: "PlugZap" },
      { id: "cooking", label: "Cooking", icon: "CookingPot" },
      { id: "repairs", label: "Home Repairs", icon: "Hammer" },
      { id: "gardening", label: "Gardening", icon: "Leaf" },
      { id: "painting", label: "Painting", icon: "Brush" },
      { id: "tutoring", label: "Tutoring", icon: "BookOpen" },
    ],
  });

  // 3. Providers
  await prisma.provider.createMany({
    data: [
      {
        id: 1,
        name: "Rekha Kumari",
        role: "Cleaning Specialist",
        category: "cleaning",
        avatar: "RK",
        color: "green",
        rating: 4.9,
        reviews: 142,
        jobs: 1450,
        price: 2499,
        experience: "6 yrs",
        cooperative: "Nari Shakti Cooperative",
        location: "Koramangala, Bengaluru",
        verified: true,
        available: true,
        skills: JSON.stringify(["Deep Cleaning", "Kitchen Sanitisation", "Floor Scrubbing"]),
        about: "Certified deep-cleaning specialist and founding member of Nari Shakti Cooperative. Specialised in organic, non-toxic products.",
      },
      {
        id: 2,
        name: "Mohammed Irfan",
        role: "Master Plumber",
        category: "plumbing",
        avatar: "MI",
        color: "blue",
        rating: 4.8,
        reviews: 98,
        jobs: 980,
        price: 399,
        experience: "8 yrs",
        cooperative: "Saathi Workers Collective",
        location: "Indiranagar, Bengaluru",
        verified: true,
        available: true,
        skills: JSON.stringify(["Pipe Fitting", "Geyser Repair", "Drain Unclogging"]),
        about: "Licensed master plumber with 8+ years experience across residential and commercial properties.",
      },
      {
        id: 3,
        name: "Meena W.",
        role: "Deep Cleaning Expert",
        category: "cleaning",
        avatar: "MW",
        color: "green",
        rating: 4.7,
        reviews: 64,
        jobs: 410,
        price: 1899,
        experience: "4 yrs",
        cooperative: "Nari Shakti Cooperative",
        location: "HSR Layout, Bengaluru",
        verified: true,
        available: true,
        skills: JSON.stringify(["Bathroom Deep Clean", "Balcony Cleaning", "Carpet Care"]),
        about: "Trained under Nari Shakti's eco-cleaning programme. Delivers spotless results with natural cleaners.",
      },
      {
        id: 4,
        name: "Vijay Salian",
        role: "Senior Electrician",
        category: "electrical",
        avatar: "VS",
        color: "violet",
        rating: 4.9,
        reviews: 112,
        jobs: 1120,
        price: 549,
        experience: "10 yrs",
        cooperative: "Saathi Workers Collective",
        location: "Whitefield, Bengaluru",
        verified: true,
        available: true,
        skills: JSON.stringify(["AC Servicing", "Wiring & MCB", "Appliance Repair"]),
        about: "ITI-certified senior electrician with a 100% safety record across split AC and home rewiring jobs.",
      },
      {
        id: 5,
        name: "Pushpa Rani",
        role: "Certified Home Chef",
        category: "cooking",
        avatar: "PR",
        color: "orange",
        rating: 4.9,
        reviews: 156,
        jobs: 420,
        price: 4500,
        experience: "7 yrs",
        cooperative: "Annapurna Cooks Co-op",
        location: "JP Nagar, Bengaluru",
        verified: true,
        available: true,
        skills: JSON.stringify(["North Indian Tiffin", "South Indian Meals", "Healthy Diet Food"]),
        about: "FSSAI-certified cook preparing wholesome, home-style meals with high hygiene standards.",
      },
      {
        id: 6,
        name: "Sunita Devi",
        role: "Organic Gardener",
        category: "gardening",
        avatar: "SD",
        color: "pink",
        rating: 4.8,
        reviews: 78,
        jobs: 310,
        price: 899,
        experience: "5 yrs",
        cooperative: "Green Valley Farmers",
        location: "Whitefield, Bengaluru",
        verified: true,
        available: true,
        skills: JSON.stringify(["Terrace Gardens", "Lawn Care", "Composting"]),
        about: "Passionate urban horticulturist helping families create productive terrace vegetable gardens.",
      },
    ],
  });

  // 4. Services
  await prisma.service.createMany({
    data: [
      {
        id: 1,
        name: "Full Home Cleaning",
        category: "cleaning",
        categoryLabel: "Cleaning",
        price: 2499,
        rating: 4.8,
        reviews: 342,
        duration: "4 hours",
        booked: 1290,
        verified: true,
        popular: true,
        description: "Deep cleaning of the entire home including bathrooms, kitchen, floors and appliances using eco-friendly products.",
        inclusions: JSON.stringify(["All rooms, kitchen and bathrooms", "Eco-friendly cleaning products", "Trained field staff", "Satisfaction guarantee"]),
        providerIds: JSON.stringify([1, 3]),
      },
      {
        id: 2,
        name: "Plumbing Repair",
        category: "plumbing",
        categoryLabel: "Plumbing",
        price: 399,
        rating: 4.7,
        reviews: 218,
        duration: "2 hours",
        booked: 870,
        verified: true,
        popular: true,
        description: "Fix leakages, blocked drains, faulty taps, geysers and WC fittings with guaranteed workmanship.",
        inclusions: JSON.stringify(["Final pricing before work starts", "Genuine spares only", "30-day work warranty"]),
        providerIds: JSON.stringify([2]),
      },
      {
        id: 3,
        name: "AC Servicing & Repair",
        category: "electrical",
        categoryLabel: "Electrical",
        price: 549,
        rating: 4.6,
        reviews: 156,
        duration: "1.5 hours",
        booked: 640,
        verified: true,
        popular: true,
        description: "AC gas top-up, deep cleaning, general servicing and repair for all major brands of split and window ACs.",
        inclusions: JSON.stringify(["All major brands covered", "Gas leak detection", "90-day spare warranty"]),
        providerIds: JSON.stringify([4]),
      },
      {
        id: 4,
        name: "Home Cook (Daily Tiffin)",
        category: "cooking",
        categoryLabel: "Cooking",
        price: 4500,
        rating: 4.9,
        reviews: 189,
        duration: "per month",
        booked: 420,
        verified: true,
        popular: true,
        description: "Hygienic home-style lunch and dinner cooked by verified local cooks with authentic regional taste.",
        inclusions: JSON.stringify(["Monthly tiffin service", "Customisable menu", "Hygiene-certified cooks", "Free delivery in 2 km radius"]),
        providerIds: JSON.stringify([5]),
      },
      {
        id: 5,
        name: "Carpentry & Furniture Repair",
        category: "repairs",
        categoryLabel: "Home Repairs",
        price: 499,
        rating: 4.7,
        reviews: 104,
        duration: "2 hours",
        booked: 380,
        verified: true,
        popular: false,
        description: "Door hinge fixes, modular furniture assembly, latch replacement and bespoke shelf installations.",
        inclusions: JSON.stringify(["Precision tools used", "Hardware sourcing assistance", "Clean up after job"]),
        providerIds: JSON.stringify([2]),
      },
      {
        id: 6,
        name: "Garden Maintenance",
        category: "gardening",
        categoryLabel: "Gardening",
        price: 899,
        rating: 4.8,
        reviews: 92,
        duration: "3 hours",
        booked: 290,
        verified: true,
        popular: false,
        description: "Pruning, weed removal, fertilising and potting mix replacement for balconies and terrace gardens.",
        inclusions: JSON.stringify(["Organic compost included", "Pest diagnosis", "Watering schedule plan"]),
        providerIds: JSON.stringify([6]),
      },
    ],
  });

  // 5. Bookings
  await prisma.booking.createMany({
    data: [
      {
        id: "BK-7840",
        customer: "Ananya Sharma",
        customerId: "CU-101",
        providerId: 1,
        serviceId: 1,
        date: "2026-09-18",
        time: "10:00 AM",
        price: 2499,
        status: "confirmed",
        address: "405, 4th Cross, Koramangala, Bengaluru",
        phone: "+91 98765 43210",
        notes: "Please bring bathroom scale-removal chemical.",
        payment: "UPI",
        rating: null,
      },
      {
        id: "BK-7841",
        customer: "Rahul Verma",
        customerId: "CU-102",
        providerId: 2,
        serviceId: 2,
        date: "2026-09-19",
        time: "02:00 PM",
        price: 399,
        status: "confirmed",
        address: "12, 100ft Road, Indiranagar, Bengaluru",
        phone: "+91 98765 43222",
        notes: "Main bathroom sink leak.",
        payment: "Card",
        rating: null,
      },
      {
        id: "BK-7842",
        customer: "Farhan Ali",
        customerId: "CU-103",
        providerId: 4,
        serviceId: 3,
        date: "2026-09-20",
        time: "04:00 PM",
        price: 549,
        status: "pending",
        address: "Flat 302, Palm Meadows, Whitefield",
        phone: "+91 98765 43333",
        notes: "Split AC cooling issue.",
        payment: "Cash",
        rating: null,
      },
      {
        id: "BK-7839",
        customer: "Ananya Sharma",
        customerId: "CU-101",
        providerId: 5,
        serviceId: 4,
        date: "2026-09-10",
        time: "01:00 PM",
        price: 4500,
        status: "completed",
        address: "405, 4th Cross, Koramangala, Bengaluru",
        phone: "+91 98765 43210",
        notes: "Vegetarian meals only.",
        payment: "UPI",
        rating: 5,
      },
    ],
  });

  // 6. Provider Requests
  await prisma.providerRequest.createMany({
    data: [
      {
        id: "REQ-501",
        customer: "Rahul Verma",
        service: "Plumbing Repair",
        date: "2026-09-16",
        time: "02:00 PM",
        price: 399,
        status: "pending",
        location: "Indiranagar, Bengaluru",
      },
      {
        id: "REQ-502",
        customer: "Sneha Kulkarni",
        service: "Full Home Cleaning",
        date: "2026-09-20",
        time: "09:00 AM",
        price: 2499,
        status: "pending",
        location: "HSR Layout, Bengaluru",
      },
      {
        id: "REQ-503",
        customer: "Farhan Ali",
        service: "AC Servicing & Repair",
        date: "2026-09-21",
        time: "04:00 PM",
        price: 549,
        status: "pending",
        location: "Whitefield, Bengaluru",
      },
    ],
  });

  // 7. Cooperatives
  await prisma.cooperativeGroup.createMany({
    data: [
      {
        id: 1,
        name: "Nari Shakti Cooperative",
        members: 140,
        type: "Women's Collective",
        city: "Koramangala",
        about: "Empowering women through professional cleaning and housekeeping services.",
        membersList: JSON.stringify(["Rekha Kumari", "Meena W.", "Lakshmi B."]),
        verified: true,
      },
      {
        id: 2,
        name: "Saathi Workers Collective",
        members: 85,
        type: "Skilled Workers",
        city: "Indiranagar",
        about: "Certified plumbers, carpenters and electricians with fair pricing.",
        membersList: JSON.stringify(["Mohammed Irfan", "Vijay Salian", "Ganesh K."]),
        verified: true,
      },
      {
        id: 3,
        name: "Annapurna Cooks Co-op",
        members: 120,
        type: "Food & Hospitality",
        city: "JP Nagar",
        about: "FSSAI-certified home cooks delivering healthy meals across the city.",
        membersList: JSON.stringify(["Pushpa Rani", "Kavya S.", "Devika R."]),
        verified: true,
      },
    ],
  });

  // 8. Reviews
  await prisma.review.createMany({
    data: [
      {
        id: 1,
        name: "Ananya S.",
        service: "Full Home Cleaning",
        provider: "Rekha Kumari",
        rating: 5,
        text: "Deep cleaning was spotless. The team was professional and polite.",
        date: "12 Sep 2026",
      },
      {
        id: 2,
        name: "Rahul V.",
        service: "Plumbing Repair",
        provider: "Mohammed Irfan",
        rating: 5,
        text: "Fixed the leak in 20 minutes. Fair price, no middleman.",
        date: "10 Sep 2026",
      },
      {
        id: 3,
        name: "Meera I.",
        service: "Home Cook (Daily Tiffin)",
        provider: "Pushpa Rani",
        rating: 4,
        text: "Tasty tiffin, consistent quality. A little more variety would be nice.",
        date: "06 Sep 2026",
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
