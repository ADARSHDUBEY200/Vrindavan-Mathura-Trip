import type { Faq } from "./types";

export type FaqGroup = { id: string; title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    id: "planning",
    title: "Planning your trip",
    items: [
      {
        q: "How many days are enough for Vrindavan and Mathura?",
        a: "Two days is ideal for a first visit — one for Mathura and one for Vrindavan. Add a third day for Govardhan, Barsana and Nandgaon. A single long day trip is possible but rushed.",
      },
      {
        q: "What is the best time to visit?",
        a: "October to March is the most comfortable. Holi week (February–March) and Kartik (October–November) are the most atmospheric but also the busiest.",
      },
      {
        q: "Can you plan a trip for elderly parents?",
        a: "Yes — senior-friendly pacing is one of the things we care about most. We plan fewer temples per day, afternoon rest, drop-offs as close as permitted, and avoid the worst crowds.",
      },
      {
        q: "Do you organise trips for groups?",
        a: "Yes. Tell us the group size and we will suggest the right vehicles — from sedans and SUVs to tempo travellers — and plan the itinerary around your group.",
      },
    ],
  },
  {
    id: "booking",
    title: "Booking & prices",
    items: [
      {
        q: "How much does a Mathura Vrindavan tour cost?",
        a: "It depends on the starting city, number of days, vehicle and hotels. We don’t publish one-size-fits-all prices — send us your dates and group size and we will share a clear, itemised quote.",
      },
      {
        q: "How do I book?",
        a: "Send an enquiry on WhatsApp, call us, or use the enquiry form. We will confirm the plan and quote, and explain the booking and cancellation terms before you pay anything.",
      },
      {
        q: "Are hotels included?",
        a: "We can include hotels in your budget, or plan only transport and darshan if you prefer to book your own stay. Your quote will say clearly what is and isn’t included.",
      },
    ],
  },
  {
    id: "darshan",
    title: "Temples & darshan",
    items: [
      {
        q: "Are temple timings fixed?",
        a: "No. Timings change between summer and winter, on festivals and sometimes at short notice. The timings on our site are approximate — we check them for your travel dates.",
      },
      {
        q: "Can you arrange VIP or special darshan?",
        a: "We don’t sell ‘VIP darshan’. Where a temple runs its own official arrangements, we will tell you about them. Mostly, good timing is what makes darshan peaceful.",
      },
      {
        q: "Is there a dress code?",
        a: "Modest clothing covering shoulders and knees is respectful everywhere. Shoes are removed at temples, and some temples restrict leather items.",
      },
      {
        q: "Can I carry my phone into temples?",
        a: "In most temples yes, though photography inside the sanctum is often not allowed. Krishna Janmabhoomi does not permit phones, bags or many other items at all.",
      },
    ],
  },
  {
    id: "on-trip",
    title: "During the trip",
    items: [
      {
        q: "Will the car take us right up to Banke Bihari?",
        a: "Cars cannot enter the old-town lanes around Banke Bihari. We drop you at the closest permitted point and you walk or take an e-rickshaw for the last stretch.",
      },
      {
        q: "Is the food in Vrindavan vegetarian?",
        a: "Yes — Braj is a vegetarian region, and many eateries cook without onion and garlic. We can suggest clean, trusted places to eat.",
      },
      {
        q: "Is Vrindavan safe for women and solo travellers?",
        a: "Generally yes, with normal care in crowds. During Holi, stay with a group or a trusted local contact and avoid the most crowded lanes.",
      },
    ],
  },
];

/** A short selection for the home page. */
export const homeFaqs: Faq[] = [
  faqGroups[0].items[0],
  faqGroups[0].items[1],
  faqGroups[1].items[0],
  faqGroups[2].items[0],
  faqGroups[3].items[0],
  faqGroups[0].items[2],
];
