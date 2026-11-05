import { FOUNDER, YEARS } from "@/config/site";
import { BEST_TIME_GUIDE, TIP, founderLine, heroLede, packagePrice, price, seasons, tellMe, trackRecord, whatsappFor } from "./common";
import type { BrajGuide, Rich } from "./types";

/*
 * /govardhan copy, from "Govardhan Content.pdf" in the founder's voice. The PDF's "Quick Notes for Your Web
 * Team" are not published (as they advise, Govardhan Eco Village is left out). The Parikrama chapter has its
 * own shape, so it lives in `govardhanParikrama` below and has its own section component.
 */

export const govardhan: BrajGuide = {
  slug: "govardhan",
  name: "Govardhan",
  path: "/govardhan",
  updated: "2026-11-05",
  meta: {
    title: "Govardhan Travel Guide: Parikrama Route & Best Places",
    description: `Govardhan travel guide by Braj-born expert ${FOUNDER.name}: the 21 km Parikrama route, Radha Kund, Kusum Sarovar, Mansi Ganga, how to reach. Packages from ${price}.`,
    imageAlt: "Pilgrims walking the Govardhan Parikrama path at dawn beside Giriraj Hill, Govardhan travel guide",
  },
  geo: { latitude: 27.4975, longitude: 77.4655 },
  hero: {
    image: "kusum-sarovar",
    imagePosition: "50% 55%",
    scriptWord: "गोवर्धन",
    sub: "Best Places to Visit, Parikrama Route & Local Secrets",
    lede: heroLede,
    whatsappMessage: whatsappFor("Govardhan"),
  },
  nav: [
    { id: "glance", label: "At a Glance" },
    { id: "story", label: "Giriraj" },
    { id: "parikrama", label: "Parikrama" },
    { id: "places", label: "Places to Visit" },
    { id: "things-to-do", label: "Things to Do" },
    { id: "best-time", label: "Best Time" },
    { id: "reach", label: "How to Reach" },
    { id: "stay", label: "Where to Stay" },
    { id: "faq", label: "FAQ" },
    { id: "book", label: "Book" },
  ],
  intro: {
    greeting: "Radhe Radhe, dear traveller.",
    paragraphs: [
      "Every pilgrim to Braj eventually asks the same question: \"Harsh bhai, should we go to Govardhan?\" My answer is always the same: **yes, and go with time and a good pair of legs.** This **Govardhan travel guide** covers the **places to visit in Govardhan**, the full route of the sacred Parikrama and the small local secrets that turn a tiring walk into a deeply moving day.",
      `${founderLine("Mathura, Vrindavan and Govardhan")} After **${YEARS} years of guiding**, I have walked the Parikrama in the cool of winter dawns, in monsoon drizzle and in summer nights lit by a full moon. This page holds what those walks taught me.`,
    ],
    note: "**A note on distances and timings:** Parikrama distances, temple timings and local arrangements vary a little by source, season and where you begin. I give the figures as I know them from experience. We reconfirm details with every guest before the trip.",
  },
  glance: {
    title: "Govardhan at a Glance",
    rows: [
      { label: "Known for", value: "Giriraj Hill, the 21 km Parikrama, Radha Kund, Annakut" },
      { label: "Parikrama length", value: "About 21 km (7 kos)" },
      { label: "Distance from Mathura", value: "About 21 to 26 km" },
      { label: "Best time", value: "October to March" },
      { label: "Walking time", value: "About 5 to 6 hours at a steady pace" },
      { label: "E-rickshaw / car time", value: "About 1.5 to 2 hours (with stops, longer)" },
      { label: "Biggest festival", value: "Govardhan Puja (Annakut), the day after Diwali" },
    ],
  },
  story: {
    title: "The Story of Giriraj: Why Govardhan Is So Sacred",
    eyebrow: "The story",
    image: "govardhan-hill",
    caption: "Giriraj, the sandstone ridge",
    paragraphs: [
      "Govardhan is not a temple. It is a **hill**, a long, low ridge of sandstone rising out of the flat plains of Braj, reported to be around **80 feet (about 25 metres)** at its highest point. Brijwasis do not call it a hill at all. We call it **Giriraj Maharaj**, the King of Mountains, and we treat it as a living form of Krishna.",
      "The story goes that the people of Braj once prepared to worship **Indra**, the king of the gods, for rain. Young Krishna gently suggested they honour Govardhan instead, the hill that fed their cattle and gave them grass, water and shade. Indra, insulted, sent a terrible storm. Krishna lifted the entire hill on the **little finger of his left hand**, and the people and their cows sheltered beneath it for seven days, until Indra relented and bowed.",
      "Brijwasis also say the hill is slowly shrinking, a gentle reminder of an old curse and of the weight of devotion pressing on it. Whatever you believe, you will feel it when you walk here. Old women touch the stones to their foreheads, and young men chant \"Giriraj Maharaj ki Jai\" with eyes closed.",
    ],
    highlight: "The **Govardhan Parikrama** is the way pilgrims show love to that hill, by walking around it.",
  },
  places: {
    title: "Best Places to Visit in Govardhan",
    lede: "These are the **best places to visit in Govardhan**, and each one is also a natural stop on the Parikrama.",
    items: [
      {
        id: "daan-ghati",
        name: "Daan Ghati Temple",
        href: "/temples/daan-ghati-govardhan",
        image: "daan-ghati",
        caption: "Daan Ghati, beside the main road",
        layout: "split",
        paragraphs: [
          "**Significance: Daan Ghati** is the traditional starting point for many pilgrims. The word *daan* means \"toll,\" and the legend is delightful: here, Krishna and his friends playfully blocked the path of the gopis carrying butter, milk and curd to Mathura, and demanded a toll. The gopis protested, the boys teased and the \"toll\" was paid in laughter and love. Today, the temple stands on this spot beside the main road, and a Giriraj shila (stone) is worshipped here with offerings of milk.",
        ],
        timings: { label: "Timings (approximate)", text: "Open from early morning until evening, with a midday break. Confirm before you go." },
        tip: {
          label: TIP,
          text: "Begin your Parikrama here, **before sunrise**, with a short prayer and an offering of a little milk or flowers. Buy offerings only from the shops near the temple, and agree the price first. On crowded days, the area around the temple gets very busy, so arrive early and keep your valuables close.",
        },
      },
      {
        id: "radha-kund",
        name: "Radha Kund and Shyam Kund",
        image: "radha-kund",
        caption: "Radha Kund",
        layout: "feature",
        paragraphs: [
          "**Significance: Radha Kund and Shyam Kund** are the two holiest water bodies in **Gaudiya Vaishnavism**, and many Braj devotees regard them as the most sacred waters in all of Braj. The Gaudiya tradition tells that Krishna slew the demon Arishtasura here, and that Radha and the gopis insisted he purify himself by bathing in all the holy rivers. Krishna struck the ground with his heel and brought forth Shyam Kund, and the pilgrims' waters entered it. Radha and the gopis then dug their own pond, Radha Kund, and the waters of Shyam Kund flowed in to join it. The two ponds lie side by side, connected by a narrow channel, and they are surrounded by ghats, small temples and the samadhis of saints, including Raghunatha Dasa Goswami.",
          "The most famous night is **Ahoi Ashtami**, when thousands of couples, and especially those praying for children, bathe in Radha Kund at **midnight**.",
        ],
        timings: { label: "Timings", text: "The kunds are open at all hours. Nearby temples have their own morning and evening sessions." },
        tip: {
          label: TIP,
          text: "Go in the **early morning or at dusk**, when the water is still and the ghats are quiet. Sit on the steps and take a few minutes of silence. The area is busy and lively on festival days. Ask before photographing people, and be mindful of the water's condition. If you prefer not to bathe, simply sprinkle a little water on your head, which is the way many pilgrims do it.",
        },
      },
      {
        id: "kusum-sarovar",
        name: "Kusum Sarovar",
        image: "kusum-sarovar",
        layout: "split",
        paragraphs: [
          "**Significance: Kusum Sarovar Govardhan** is the most photogenic place on the Parikrama. A large, stepped sandstone tank is fringed by a grand series of arches, pavilions and domes. The architecture is largely credited to the **Jat rulers of Bharatpur** in the eighteenth century, and the cenotaph (*chhatri*) complex beside the lake is associated with them. In the devotional story, this is where Radha and the gopis picked flowers (*kusum*), and where Radha is said to have waited for Krishna, making it a place of tender, romantic devotion.",
        ],
        timings: { label: "Timings (approximate)", text: "Open in daylight hours. Entry rules and any small fees can vary, so confirm." },
        tip: {
          label: TIP,
          text: "Reach in the **late afternoon**, in time for **sunset**. The warm sandstone turns gold and pink, the water reflects the arches and the whole place becomes still. It is one of my favourite places to sit after a long walk. Wear comfortable shoes for the steps, carry water and keep your phone safe from monkeys.",
        },
      },
      {
        id: "mansi-ganga",
        name: "Mansi Ganga",
        image: "mansi-ganga",
        layout: "split",
        paragraphs: [
          "**Significance: Mansi Ganga** is the large sacred lake at the heart of Govardhan town. *Mansi* means \"born of the mind.\" The tradition says that when Krishna and his companions were about to go on a pilgrimage to the Ganga, Krishna said there was no need, and he brought the Ganga into Braj by the power of his mind. The lake is bordered by ghats, shrines and the grand **Haridev Temple** nearby. Around **Diwali** and **Govardhan Puja**, thousands of lamps are set afloat at dusk, a sight I will never tire of.",
        ],
        timings: { label: "Timings", text: "The ghats are open at all hours, with the busiest times at dawn and dusk." },
        tip: {
          label: TIP,
          text: "Visit at **dusk**, especially in Kartik, for the lamps. Pilgrims often begin the Parikrama with a prayer at Mansi Ganga. Use the main, well-maintained ghat steps, and avoid slippery edges. Politely decline anyone insisting on paid rituals.",
        },
      },
      {
        id: "mukharvind",
        name: "Mukharvind (Jatipura)",
        href: "/temples/mukharvind-govardhan",
        icon: "flower",
        layout: "card",
        paragraphs: [
          "**Significance: Mukharvind** in the village of **Jatipura** is revered as the \"face\" of Giriraj, the place where the hill is said to show its lotus-like face (*mukh-aravinda*). In Braj tradition, this is the spot closely associated with Krishna's lifting of the hill. Devotees come to offer **milk** (the *abhishek*), and the place has a deeply rural, tender atmosphere, with cows, peacocks and fields around.",
        ],
        timings: { label: "Timings", text: "Generally open from morning to evening. Confirm before you go." },
        tip: {
          label: TIP,
          text: "I always take guests here in the **morning**, when the village is quiet. Bring a little milk for the offering if you can, and sit under the trees for a few minutes. It is one of those places where you feel the hill is not scenery but a presence.",
        },
      },
      {
        id: "punchari",
        name: "Punchari ka Lautha Baba Temple",
        icon: "mountain",
        layout: "card",
        paragraphs: [
          "**Significance: Punchari** sits on the far side of the Parikrama, near the Rajasthan border, where the hill's tail sweeps down to the plain. The **Lautha Baba** temple here is known as the shrine of \"eternal waiting.\" The story speaks of a devoted saint who waited and waited for the Lord's return, and the shrine has become a symbol of patient, unwavering love. The place is quieter and more rustic than the town stops, and the walk to it feels like a journey into old Braj.",
        ],
        timings: { label: "Timings", text: "Open in daylight hours, generally. Confirm if you plan to visit at a specific time." },
        tip: {
          label: TIP,
          text: "This is the farthest stretch, and the point at which many walkers get tired. Rest here, drink water and eat a little. If you are tiring, this is a good place to meet your vehicle. Carry small notes for offerings and snacks.",
        },
      },
    ],
    more: {
      title: "More Places Worth Your Time in Govardhan",
      items: [
        { name: "Haridev Temple", text: "One of the important old temples near Mansi Ganga, associated with the Giriraj worship tradition." },
        { name: "Anyor", text: "A village on the route with its own small shrines and a gentle, rural feel." },
        { name: "Sacred stones (Giriraj shilas)", text: "Along the path you will see stones painted with names of Krishna and offerings of flowers and sweets." },
      ],
    },
  },
  things: {
    title: "Top Things to Do in Govardhan",
    lede: "Beyond the Parikrama, these are the **things to do in Govardhan** that I recommend.",
    items: [
      {
        id: "holy-dip",
        title: "Take a Holy Dip in Mansi Ganga or Radha Kund",
        layout: "split",
        image: "mansi-ganga",
        paragraphs: [
          "In the Braj tradition, bathing in **Mansi Ganga** or **Radha Kund** is believed to purify the heart and bring the blessings of Radha and Krishna. Devotees also see it as a way of surrendering fatigue and ego before beginning or after finishing the Parikrama. Many pilgrims treat it as a moment of prayer rather than a swim.",
        ],
        tip: {
          label: "My honest advice",
          text: "Water levels and cleanliness vary through the year. If you are uncomfortable bathing, a gentle **sprinkle of the holy water on your head** is perfectly accepted, and nobody will think less of you. If you do bathe, go early, use the main ghat steps, take care with slippery edges, keep valuables with a family member and avoid swallowing water.",
        },
      },
      {
        id: "aarti",
        title: "Attend the Evening Aarti at Daan Ghati",
        eyebrow: "At dusk",
        layout: "feature",
        image: "daan-ghati",
        inset: "kartik-lamps",
        paragraphs: [
          "As the light fades, bells begin to ring and the temple courtyard fills with the sound of conch shells and drums. Devotees line up with small pots and bowls of **milk**, which are poured over the Giriraj shila in a stream of white. The smell of incense, ghee lamps, marigold and warm milk rises together. It is a simple, powerful scene, and a lovely way to end a day on the Parikrama.",
        ],
        close: "Arrive **at least half an hour before the aarti** for a place, and keep your belongings secure in the crowd.",
      },
      {
        title: "Spend Time in Braj's Cow Seva Culture",
        layout: "card",
        paragraphs: [
          "The Govardhan area is closely tied to cow protection and care, because Krishna is remembered as *Govinda*, the protector of cows. You will see many cows and calves along the Parikrama, and some gaushalas welcome respectful visitors. I recommend asking us or a trusted local to introduce you to a reputable gaushala, rather than handing money to strangers on the road. Offering green fodder (*chara*) at a recognised gaushala is a simple and lovely seva.",
        ],
      },
      {
        title: "Sit Quietly with the Hill",
        layout: "card",
        paragraphs: [
          "Do not underestimate the value of simply sitting. Many of my guests say the most powerful moment of their day was a quiet ten minutes near a stone, a kund or a tree, away from the road, with the hill beside them. Build such a pause into your day.",
        ],
      },
    ],
  },
  bestTime: {
    title: "Best Time to Visit Govardhan Hill",
    image: "govardhan-dham",
    text: "The **best time to visit Govardhan Hill** is **October to March**. The weather is pleasant, mornings are cool and the long walk is far more comfortable. Winter dawns can be cold and sometimes foggy, so carry a shawl, but afternoons are mild.",
    seasons: seasons("Cool, pleasant walking, Kartik, Govardhan Puja", "Very hot, so start well before sunrise or walk at night with local guidance", "Green and lovely, but slippery paths, mud and humidity"),
    festivals: { 6: "Guru Purnima", 9: "Govardhan Puja", 10: "Govardhan Puja" },
    peaks: [
      {
        title: "Govardhan Puja (Annakut)",
        image: "govardhan-puja",
        paragraphs: [
          "**Govardhan Puja**, also called **Annakut**, is celebrated on the **day after Diwali**, in the month of Kartik (usually October or November, so please check this year's date). *Annakut* means \"mountain of grain.\" Temples and homes arrange enormous mounds of food as an offering to Krishna, remembering the day he lifted the hill. The offering is traditionally **56 bhog**: rice, kadhi, many sabzis, pooris, sweets, kheer, laddus, fruit and more. The scent of simmering milk, saffron and ghee fills the temple courtyards. A Giriraj figure is often shaped from cow dung and decorated with flowers in homes.",
          "It is a beautiful but **extremely crowded** time, and the Parikrama roads fill with walkers. If you wish to come, **book your stay several weeks ahead**, and start your walk very early. For a quieter experience, choose a weekday in Kartik rather than the main day.",
        ],
      },
      {
        title: "Guru Purnima",
        paragraphs: ["**Guru Purnima** (usually July) is another major occasion at Govardhan, when huge numbers of devotees gather to walk the Parikrama and honour their gurus. The roads and temples are very crowded, the weather is humid and the paths can be slippery, so plan carefully and travel with a guide if you can."],
      },
      {
        title: "Can the Parikrama be done at night?",
        paragraphs: ["Yes, and many devotees do, especially in summer and on full-moon nights, because the heat is far milder after dark. But it needs preparation. **Carry a torch, wear reflective or light-coloured clothing, walk in a group and keep to the roadside,** since vehicles share the road. Women and elders should travel with a trusted group or guide. We can arrange safe night Parikramas with vehicle support."],
      },
    ],
    close: `For a month-by-month view of the whole region, see our guide to the [best time to visit Mathura Vrindavan](${BEST_TIME_GUIDE}).`,
  },
  reach: {
    title: "How to Reach Govardhan",
    lede: "Govardhan is roughly **21 to 26 km from Mathura and Vrindavan**, depending on the route, and takes about **40 to 60 minutes** by road. Many pilgrims visit as a day trip from Mathura or Vrindavan, though I strongly recommend giving the Parikrama its own full day.",
    modes: [
      {
        key: "air",
        title: "By Air",
        points: [
          "**Agra (Kheria) Airport** is the nearest, but flights are limited.",
          "**Delhi's Indira Gandhi International Airport** is the main gateway, around 160 to 170 km away, with a drive of about **3.5 to 4 hours**.",
          "A newer airport serving the Delhi-NCR region near Jewar may offer another route. Please check current flights.",
        ],
        note: "We arrange airport pick-ups from Delhi and Agra.",
      },
      {
        key: "train",
        title: "By Train",
        text: "**Mathura Junction** is the best railhead, on the busy Delhi-Mumbai and Delhi-Chennai corridors, with excellent connections from across India. Govardhan itself has limited rail services, so most pilgrims come via Mathura and then continue by road.",
      },
      {
        key: "road",
        title: "By Road: from Mathura",
        points: [
          "**Private cab or taxi:** The most comfortable, especially for families and elders. You can set your own timings and stops.",
          "**UPSRTC and local buses:** Regular buses run between Mathura and Govardhan. They are cheap but can be crowded and slow.",
          "**Sharing auto-rickshaws and vehicles:** A budget option that runs along the Mathura-Govardhan road. Agree the fare first and keep valuables close.",
          "**From Vrindavan:** Travel by cab via Mathura, a journey of about an hour or a little more.",
        ],
      },
    ],
    note: { label: `${FOUNDER.name}'s tip`, text: "On Purnima days, weekends and festivals, roads to Govardhan can be extremely busy. Leave early, and arrange your return vehicle in advance, since it can be hard to find one late in the evening." },
  },
  carry: {
    title: "What to Carry for the Parikrama",
    items: [
      "**Water** (one to two litres), electrolyte sachets and dry snacks",
      "**Comfortable, light footwear,** slip-ons or sandals, even if you plan to go barefoot at times",
      "**Cap, cotton scarf or umbrella** for sun protection",
      "**Sunscreen and sunglasses,** with a strap or secure case",
      "**Warm shawl** in winter mornings",
      "**A small cross-body bag,** zipped, with small notes for offerings and snacks",
      "**Basic medicines,** pain relief, plasters for blisters and hand sanitiser",
      "**Light rain cover** in monsoon",
    ],
    close: "Keep glasses, phones and snacks inside your bag, as monkeys exist here too.",
  },
  stay: {
    title: "Where to Stay near Govardhan",
    paragraphs: [
      "Govardhan has simple guesthouses, ashrams and dharamshalas, and many pilgrims prefer to rest in **Mathura or Vrindavan**, where the choice is wider.",
      "After a 21 km walk, a clean bed, a hot shower and air conditioning are not luxuries. They are how your body recovers. We arrange **curated premium bookings at top 4 and 5-star hotels** in Mathura and Vrindavan for a comfortable, stress-free stay, along with simpler options for those who prefer them. During Govardhan Puja, Diwali and Guru Purnima, good rooms disappear early, so book ahead.",
    ],
  },
  faqTitle: "Frequently Asked Questions About Govardhan",
  faqs: [
    { q: "How long does the Govardhan Parikrama take?", a: "About 5 to 6 hours on foot at a steady pace for the full 21 km, and longer with stops. By e-rickshaw or car, about 1.5 to 2 hours of travel, though temple and kund stops stretch the day." },
    { q: "How long is the Govardhan Parikrama?", a: "About 21 km (7 kos). Locals sometimes describe it in two parts, a longer stretch of roughly 12 km and a shorter stretch of roughly 9 km." },
    { q: "Which direction should we do the Govardhan Parikrama?", a: "Clockwise, keeping Giriraj Hill on your right." },
    { q: "Can the Parikrama be done at night?", a: "Yes, many devotees do it at night, especially in summer and on full-moon nights. Carry a torch, wear light or reflective clothing, walk in a group and keep to the roadside." },
    { q: "What is the difference between the Badi and Chhoti Parikrama?", a: "Locals speak of a longer circuit (about 12 km) that takes you to the far side of the hill, and a shorter one (about 9 km) that covers fewer stops. The exact boundaries and distances differ by source, so tell your guide which stops you want to reach." },
    { q: "Can I do the Parikrama barefoot?", a: "Yes, many devotees do. But the path has sharp stones, thorns and hot tar. Start in the cool dawn hours, and carry light footwear for rough stretches." },
    { q: "What is the best time to visit Govardhan Hill?", a: "October to March for pleasant weather. Govardhan Puja (the day after Diwali) and Guru Purnima are spiritually special but very crowded." },
    { q: "How far is Govardhan from Mathura?", a: "About 21 to 26 km, roughly 40 to 60 minutes by road." },
    { q: "How far is Govardhan from Vrindavan?", a: "About 25 to 30 km, usually around an hour or a little more by road." },
    { q: "How do I reach Govardhan from Mathura?", a: "By private cab, UPSRTC bus or sharing auto-rickshaw. A cab is the most comfortable and flexible." },
    { q: "Is the Govardhan Parikrama suitable for senior citizens?", a: "With planning, yes. We arrange vehicle support between key stops, rest breaks and shorter circuits, so elders can receive the blessing without exhaustion." },
    { q: "Where can I find safe drinking water on the route?", a: "Carry your own, and buy sealed branded bottles from established shops near stops like Daan Ghati, Radha Kund and Kusum Sarovar. Avoid loose water and ice if your stomach is sensitive." },
    { q: "What is Govardhan Puja (Annakut)?", a: "Celebrated the day after Diwali, it honours Krishna lifting Govardhan Hill. Temples offer mountains of food (often 56 bhog), and thousands walk the Parikrama." },
    { q: "Is it safe for women and solo travellers?", a: "Main areas are generally safe in daylight. I advise travelling in a group or with a trusted guide, avoiding isolated stretches after dark and keeping valuables out of sight." },
    { q: "How much does a Govardhan package cost?", a: packagePrice },
  ],
  book: {
    title: "Book Your Govardhan Package with Local Experts",
    paragraphs: [
      "The Parikrama is not a walk you finish. It is a walk that finishes something in you. I have seen tired grandmothers laugh on the last stretch, and strong young men sit down and weep at Radha Kund. I would be honoured to guide your walk, plan the hours, arrange the vehicle, find the quiet corners and make sure you have a comfortable bed at the end.",
      `${trackRecord}. Our **customised Govardhan packages start from just ${price}**, with clear quotes and no hidden charges, and we offer **curated premium bookings at top 4 and 5-star hotels** so you can rest properly after a long day of walking.`,
      tellMe,
    ],
    closing: "Giriraj does not ask you to be strong. He only asks you to come, and to take the first step.",
    formTitle: `Tell ${FOUNDER.name} about your Govardhan trip`,
  },
  continuePlanning: [
    { label: "Barsana", text: "Radha Rani's hilltop home, 20 to 25 km away", href: "/barsana" },
    { label: "Nandgaon", text: "Nand Bhavan and the reverse Lathmar Holi", href: "/nandgaon" },
    { label: "Mathura", text: "Krishna's birthplace and the Vishram Ghat aarti", href: "/mathura" },
    { label: "Govardhan Puja", text: "Annakut, the day after Diwali", href: "/festivals" },
  ],
};

/** The Parikrama chapter, in the PDF's order. */
export const govardhanParikrama = {
  title: "The Sacred Govardhan Parikrama",
  intro:
    "This is the heart of any visit. The **Govardhan Parikrama** is a **21 km (7 kos)** circumambulation of the hill, walked **clockwise**, keeping Giriraj on your right. In the Braj tradition, walking around something sacred is an act of surrender: you place it at the centre of your life and move around it in love.",
  routeTitle: "Govardhan Parikrama route map: the circuit in words",
  routeLede: "Because the path is long and has many stops, I describe it for guests as a loop of sacred places. The exact order depends on where you begin, but the circuit usually passes:",
  route: [
    { stretch: "Around Govardhan town", stops: "Daan Ghati Temple, Mansi Ganga, Haridev Temple" },
    { stretch: "The eastern stretch", stops: "Mukharvind at Jatipura, then onward through Anyor" },
    { stretch: "The far side", stops: "Punchari ka Lautha Baba Temple, close to the Rajasthan border" },
    { stretch: "The Radha Kund side", stops: "Radha Kund and Shyam Kund, then **Kusum Sarovar**" },
    { stretch: "Back to the start", stops: "The path returns toward Govardhan town" },
  ] as { stretch: string; stops: Rich }[],
  badiTitle: "Badi Parikrama vs Chhoti Parikrama",
  badi: [
    "This is the question I get most, and I want to answer it honestly. Locals often speak of the Parikrama in **two parts**, a longer stretch of roughly **12 km** and a shorter stretch of roughly **9 km**, which together make up the full **21 km**. The shorter route is what many people mean by **Chhoti Parikrama**, and the longer one is the **Badi Parikrama**, which takes you out to the far side of the hill, including Punchari.",
    "Here is the honest part: the exact kilometre counts and the exact boundary between the two differ depending on who you ask, where they start and which road they take. Guides and temples sometimes describe a \"short\" circuit that skips the farthest stretch. So when you plan, do not rely only on the names. **Tell your guide or driver which stops you want to reach** (for example, \"Radha Kund and Kusum Sarovar\" or \"the full circuit including Punchari\"), and plan your time around those.",
  ],
  chooseTitle: "How I advise guests to choose",
  choose: [
    { name: "Full 21 km", text: "For fit pilgrims, in cool weather, with a full day and an early start." },
    { name: "A shorter circuit", text: "For seniors, families with small children, those short on time or anyone walking in warm weather. You can also combine a short walk with vehicle support for the rest." },
    { name: "Mix of both", text: "Walk the parts that call to you, such as Daan Ghati to Mansi Ganga, then use a vehicle for the long dry stretches. The Giriraj does not keep score. Your devotion matters more than your distance." },
  ],
  factsTitle: "Govardhan Parikrama distance and timings",
  facts: [
    { label: "Distance", value: "About 21 km", note: "7 kos around Giriraj" },
    { label: "Walking", value: "5 to 6 hours", note: "At a steady pace, and more if you stop for darshan, tea and rests. Many families take 7 to 8 hours." },
    { label: "By e-rickshaw or car", value: "1.5 to 2 hours", note: "Of driving, though with temple stops it becomes a half-day." },
    { label: "Best time to start", value: "Before sunrise", note: "Explained below." },
  ],
  secretTitle: "My insider secret: start at Daan Ghati before sunrise",
  secret:
    "If you remember one tip from this page, make it this one. **Begin at Daan Ghati before sunrise.** The road is cool and quiet, the temple bells are just starting and you can walk the hardest stretches before the sun rises high. In summer especially, a 4 a.m. start is the difference between a blessed walk and a miserable one. By midday, the tar road becomes hot and the shadeless stretches are punishing.",
  walkingTitle: `Walking vs e-rickshaw: ${FOUNDER.name}'s practical advice`,
  walking: [
    "**Walking:** The most beloved way, but demanding. Carry water, wear a cap or cloth for your head and take small rests.",
    "**E-rickshaw or car:** A very good choice for seniors, children and anyone with a knee or heart problem. **A pilgrim's love matters more than the distance.** We arrange vehicles that wait at key stops so you can walk some stretches and ride others.",
    "**Navigating sharp stones if walking barefoot:** Many devotees walk barefoot as an act of humility, and I respect it deeply. But the path has **sharp stones, broken glass, thorns and hot tar**, and feet can blister badly. If you plan to go barefoot, start with the cooler dawn hours, **walk on the soft, sandy edge** where it exists, and carry **light slip-on footwear** in your bag for rough or hot stretches. Do not be ashamed to wear thin socks or sandals. Giriraj Maharaj welcomes every step.",
  ],
  waterTitle: "Where to find safe drinking water along the route",
  waterLede: "This is something a guidebook rarely tells you, so let me be direct.",
  water: [
    "**Carry at least one or two litres** yourself. Do not depend entirely on finding it.",
    "**Buy sealed, branded bottled water** from established shops near the major stops such as Daan Ghati, the market around Radha Kund and the shops near Kusum Sarovar. Check that the seal is intact.",
    "**Be wary of loose water and ice,** especially in warm weather, if your stomach is sensitive.",
    "**Carry electrolyte sachets** in summer, and a few dry snacks like nuts or biscuits.",
    "Local volunteers and temples sometimes set up free water, juice and tea stalls, especially around festivals. These are a kindness, but I still suggest carrying your own supply.",
  ],
  dandavatTitle: "Dandavat Parikrama (prostration)",
  dandavat:
    "Some devotees walk the entire route in **dandavat** form, lying flat with arms outstretched, marking the ground with a stone or hand, rising and repeating the movement for the whole distance. It can take **many days, sometimes weeks**, and it is often performed as a vow, in gratitude for a prayer answered or in love for the hill. When you pass a dandavat pilgrim on the road, step aside gently, speak softly and, if you wish, offer a little water. It is one of the most humbling sights in Braj, and it shows how deeply Giriraj is revered.",
  etiquetteTitle: "Parikrama etiquette",
  etiquette: [
    "**Keep Giriraj to your right.** Walk clockwise.",
    "**Do not litter.** Carry your bottles and wrappers until you find a bin.",
    "**Do not disturb or climb the hill's stones.** Treat them as sacred.",
    "**Keep your voice low** at shrines, and follow temple rules.",
    "**Stay alert on the road.** Vehicles share the path in many places.",
  ],
};
