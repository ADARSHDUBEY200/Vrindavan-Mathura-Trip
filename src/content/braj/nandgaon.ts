import { FOUNDER, YEARS } from "@/config/site";
import { BEST_TIME_GUIDE, TIP, founderLine, heroLede, packagePrice, price, seasons, tellMe, trackRecord, whatsappFor } from "./common";
import type { BrajGuide } from "./types";

/*
 * /nandgaon copy, from "Nandgaon Content.pdf" in the founder's voice. The PDF's "Quick Notes for Your Web
 * Team" are not published; the points they ask the team to verify are listed in the hand-over, not here.
 */

export const nandgaon: BrajGuide = {
  slug: "nandgaon",
  name: "Nandgaon",
  path: "/nandgaon",
  updated: "2026-11-05",
  meta: {
    title: "Nandgaon Travel Guide: Nand Bhavan & Lathmar Holi",
    description: `Nandgaon travel guide by Braj-born expert ${FOUNDER.name}: Nand Bhavan, Pavan Sarovar, Lathmar Holi, Barsana to Nandgaon distance. Packages from ${price}.`,
    imageAlt: "Nand Bhavan temple on Nandisvara Hill in Nandgaon with village rooftops below, Nandgaon travel guide",
  },
  geo: { latitude: 27.7157, longitude: 77.3853 },
  hero: {
    image: "nandgaon-hill-temple",
    imagePosition: "50% 45%",
    scriptWord: "नंदगाँव",
    sub: "Best Places to Visit, Lathmar Holi & Local Secrets",
    lede: heroLede,
    whatsappMessage: whatsappFor("Nandgaon"),
  },
  nav: [
    { id: "glance", label: "At a Glance" },
    { id: "story", label: "Why Nandgaon" },
    { id: "places", label: "Places to Visit" },
    { id: "things-to-do", label: "Things to Do" },
    { id: "best-time", label: "Best Time" },
    { id: "reach", label: "How to Reach" },
    { id: "plan", label: "Sample Day" },
    { id: "stay", label: "Where to Stay" },
    { id: "faq", label: "FAQ" },
    { id: "book", label: "Book" },
  ],
  intro: {
    greeting: "Radhe Radhe, dear traveller.",
    paragraphs: [
      "Some villages you visit. Nandgaon you are *welcomed into*. This **Nandgaon travel guide** covers the **places to visit in Nandgaon**, from the hilltop home of Nand Baba to the quiet lake where Krishna watered his cows. I wrote it the way I would talk to you on the drive there, one Brijwasi to a fellow devotee.",
      `${founderLine("Mathura, Vrindavan, Govardhan, Barsana, Gokul and Nandgaon")} Nandgaon is a quaint village at the foot of **Nandisvara Hill**, home to Krishna's foster parents, **Yashoda Maiyya and Shri Nand Baba**. After **${YEARS} years of guiding**, I can tell you that this is the place where many pilgrims put their phones away without being asked.`,
    ],
    note: "**A note on timings and dates:** Temple timings change with season and festivals, and festival dates shift every year with the lunar calendar. Braj also holds several local traditions about exactly where a leela happened. I share what I have learned and what guides here commonly say. We reconfirm details with every guest before travel.",
  },
  glance: {
    title: "Nandgaon at a Glance",
    rows: [
      { label: "Known for", value: "Krishna's boyhood home, Nand Bhavan, Lathmar Holi" },
      { label: "Hill", value: "Nandisvara Hill (Nandishwar)" },
      { label: "Distance from Mathura", value: "About 50 km (roughly 1 to 1.5 hours)" },
      { label: "Barsana to Nandgaon distance", value: "About 8 to 10 km" },
      { label: "Best time", value: "October to March" },
      { label: "Time needed", value: "Half a day (a full day with Barsana)" },
      { label: "Biggest festival", value: "Holi, in Phalgun (February or March)" },
      { label: "Mood", value: "Rustic, peaceful, devotional" },
    ],
  },
  story: {
    title: "Why Nandgaon Matters: Krishna's Boyhood Home",
    eyebrow: "The story",
    image: "nandgaon-holi",
    paragraphs: [
      "After Vasudev carried the newborn Krishna across the Yamuna to Gokul, the Braj tradition tells us that Nand Baba later moved his people, his cows and his household to a safer, higher place, in the face of Kamsa's demons and Gokul's growing troubles. That place was **Nandgaon**, the \"village of Nanda,\" on the slopes of the hill that bears his name, **Nandisvara**. Here Krishna grew from a baby into a cowherd boy. Here Yashoda scolded him for stealing butter, and here he drove his cows out to graze every morning with his friends.",
      "Another popular Braj tradition also holds that the hill itself is a form of **Lord Shiva**, who took the form of the hill to be near the child he loved. I tell it to guests as a story that Brijwasis cherish, and it explains why many devotees bow to the hill as they enter the village.",
      "And then there is Barsana, only a few kilometres away. In Braj we do not tell the story of Krishna without Radha, and we do not tell the story of Nandgaon without Barsana. The two villages treat each other like in-laws to this day, with teasing, gifts, songs and a very special kind of Holi. You will see exactly how in a moment.",
    ],
    highlight: "Nandgaon is Krishna's home, and [Barsana](/barsana) is Radha's home.",
  },
  places: {
    title: "Best Places to Visit in Nandgaon",
    lede: "These are the **best places to visit in Nandgaon**. Together they make a gentle, complete half-day.",
    items: [
      {
        id: "nand-bhavan",
        name: "Nand Bhavan (Nand Bhavan Nandgaon)",
        href: "/temples/nand-bhawan-nandgaon",
        image: "nandgaon-hill-temple",
        caption: "Nandisvara Hill at Holi",
        layout: "feature",
        paragraphs: [
          "**Spiritual significance: Nand Bhavan Nandgaon**, also called **Nand Mahal** or **Nandrai Temple**, is the crown of the village. It stands on top of **Nandisvara Hill**, and the temple is dedicated to the family of Krishna's childhood: **Krishna, Balaram, Nand Baba and Yashoda Maiyya**, worshipped together. Locals call it the \"Nand Bhavan\" because for them it is not a temple so much as a home, the house where the Lord was raised. The present building is a handsome structure of **red sandstone** in the style of Rajasthani and Braj temple architecture, commonly described as a later-period construction (often given as eighteenth or nineteenth century) on a much more ancient devotional site.",
          "**The climb and the view:** You reach the temple by a **long stone stairway** up the hill, typically a few hundred steps, broad and with resting landings, shaded in parts. The climb is part of the experience, and at the top the **courtyard opens onto a panoramic view of the Braj countryside**, with the village rooftops below, wheat fields, peacocks and, on a clear winter morning, the distant outlines of the neighbouring hills.",
        ],
        note: "*A small clarification, since pilgrims often confuse the two:* the 84-pillar hall known as **Chaurasi Khamba** is traditionally associated with Nand Baba's house at **Gokul (Mahavan)**, across the Yamuna. Some local lists and travel sites also use the \"Chaurasi Khamba\" name loosely for Nandgaon's temple. I mention both places to my guests and let them enjoy each for what it is.",
        timings: {
          label: "Typical timings (approximate)",
          text: "Morning darshan from early (around 6 a.m.) until late morning, a midday closing, and an evening session from the afternoon until about 8 or 8:30 p.m. Timings change with the season and on festival days, so please confirm before you go.",
        },
        tip: {
          label: TIP,
          points: [
            "**The best time to visit Nand Bhavan for peaceful darshan is early morning**, soon after opening, on a weekday. The stairs are quiet, the stone is cool and the temple courtyard rings with a single bell. Tour buses and day-trippers arrive from late morning, and festival days are packed.",
            "**Pace the climb.** Stop at the landings, sip water and let the village fall away below you. Wear **slip-on footwear**, since you will leave your shoes at the foot of the steps. Keep them in a small bag, or have your driver watch them.",
            "**For seniors and those with knee trouble,** ask about local **palanquin (doli) bearers**. Agree on the price beforehand. We can help arrange this.",
            "**Phones and bags:** Rules vary, and phones and cameras are often restricted close to the sanctum. Keep valuables in your vehicle or hotel.",
            "**Bring a small offering,** such as **makhan mishri** (butter with sugar crystals), which is what the child Krishna loved. Buy it from a shop near the temple, and agree the price first.",
            "**Sit for ten minutes in the courtyard** after darshan. The wind, the view and the calls of peacocks are why people come back.",
          ],
        },
      },
      {
        id: "pavan-sarovar",
        name: "Pavan Sarovar (Pan Sarovar)",
        icon: "water",
        layout: "card",
        paragraphs: [
          "**Spiritual significance: Pavan Sarovar**, which you will also hear called **Pan Sarovar** locally, is one of the most beautiful and sacred lakes in this part of Braj. The tradition says that **Krishna brought his cows here to drink**, and that he and his friends played on its banks. The lake is surrounded by **stepped ghats, small shrines and old trees**, and it is said that the water was once so clear and sweet that even the cows were reluctant to leave. In the Braj tradition, this sarovar is also associated with **Yashoda**, who is said to have come here to bathe, and with the **Nand Baba's** household.",
        ],
        timings: { label: "Timings", text: "The lake and ghats are open through the day. Nearby shrines keep their own hours." },
        tip: {
          label: TIP,
          text: "Go in the **early morning or late afternoon**, when the light is soft and the water is still. I take guests to sit on the ghat steps for a few quiet minutes. Water levels and cleanliness vary with the season, so many pilgrims simply sprinkle a little on their heads rather than bathing. Take care on the steps, which may be slippery, and keep your belongings secure. In winter, you will often see **migratory birds and peacocks** by the water.",
        },
      },
      {
        id: "charan-pahari",
        name: "Charan Pahari",
        icon: "footprints",
        layout: "card",
        paragraphs: [
          "**Spiritual significance: Charan Pahari** is the \"hill of the footprints.\" The Braj tradition tells that when Krishna played his **flute**, its music was so enchanting that the very **rocks softened and melted**, and as he walked across them he left **impressions of his feet and the hoofs of his cows** in the stone. Pilgrims visit to see these marks and to bow to them. Several places in Braj carry stories of footprints and melting rocks, and local lists differ on exactly where the best-known impressions are, which is why I always say \"ask your guide\" for this one. Whatever the debate, the setting is lovely: a low rocky hill, quiet fields, peacocks and wind.",
        ],
        timings: { label: "Timings", text: "Open through daylight hours, as a natural site." },
        tip: {
          label: TIP,
          text: "Wear **sturdy shoes** for the rocky ground, and carry water. This is a place where a local guide earns his keep, because the signage is limited and the exact spot can be hard to find. Tell your driver or guide that you want the \"Charan Pahari\" site, and ask him to take you to the footprint rocks. Be careful of loose stones, and stay away from the edges. Go in the morning or late afternoon for the light, and avoid midday heat in summer.",
        },
      },
      {
        id: "vrinda-kund",
        name: "Vrinda Kund",
        icon: "leaf",
        layout: "card",
        paragraphs: [
          "**Spiritual significance: Vrinda Kund** is a sacred grove and pond dedicated to **Tulsi Devi (Vrinda)**, and it is especially revered by **Gaudiya Vaishnavas**, for whom Vrinda is the divine presence of the tulsi plant, a beloved servant of Radha and Krishna. In Braj tradition, the **tulsi** is not just a plant. She is a goddess, a devotee and a protector, and the name *Vrindavan* itself means \"the forest of Vrinda.\" The kund and its grove are quiet and shaded, a place to sit in prayer. They lie a short distance from the main village.",
        ],
        timings: { label: "Timings", text: "Generally open in daylight hours. Confirm locally." },
        tip: {
          label: TIP,
          text: "The route to the grove runs along **village roads**, and signage is limited. Hire a local driver or take a guide. Bring a small tulsi leaf or garland for the offering, which you can buy near the temple. Visit in the **early morning**, when the grove is quiet and the light filters through the trees. Keep your voice low and your phone away. As elsewhere in Braj, be mindful of monkeys.",
        },
      },
    ],
    more: {
      title: "More Places Worth Your Time in Nandgaon",
      items: [
        { name: "Yashoda Kund", text: "A small sacred pond associated with Yashoda's daily rituals." },
        { name: "Nritya Gopal Mandir and smaller village temples", text: "Simple, heartfelt shrines in the lanes, best discovered on foot." },
        { name: "Kokilavan", text: "A nearby grove, also known for its **Shani Dev** temple, a short drive from Nandgaon, where devotees come on Saturdays." },
        { name: "The village lanes of Nandgaon", text: "Walk them slowly. The old havelis, the courtyards where women grind spices and the sound of bhajans from open doorways are as much a part of the visit as any temple." },
      ],
    },
  },
  things: {
    title: "Top Things to Do in Nandgaon",
    lede: "Beyond temple darshan, these are the **things to do in Nandgaon** that I recommend.",
    items: [
      {
        id: "lathmar-holi",
        title: "Experience the Thrill of Lathmar Holi",
        eyebrow: "Phalgun, February or March",
        image: "nandgaon-holi-crowd",
        inset: "lathmar-holi",
        layout: "feature",
        paragraphs: [
          "**Lathmar Holi in Nandgaon** is the second act of the most famous Holi in the world, and I say that with all the pride of a Brijwasi. Many travellers have heard of Barsana's Lathmar Holi. Far fewer know that the story continues **the very next day** in Nandgaon, with the roles reversed.",
          "**The legend:** The tradition says that Krishna, the young prince of Nandgaon, used to come to Barsana at Holi with his friends to tease Radha and her companions. The women of Barsana chased the boys away with sticks. That playful chase became a custom, and Braj has been celebrating it, in the same spirit, for centuries.",
          "**How it unfolds:** In the days before the main events, the **men of Nandgaon** travel to Barsana, as though to invite the women of Radha's village to play, and the exchange of Holi invitations is part of the ritual. Then comes the main **Lathmar Holi in Barsana**, when the Nandgaon men are playfully beaten with sticks by the Barsana women. **The next day, the tradition reverses.** The **men of Barsana** (often called the *holiyaars* or *hurayare*) come to **Nandgaon**, dressed colourfully, carrying shields and singing teasing Holi songs. The **women of Nandgaon** (the *hurinaare*) greet them with **bamboo lathis**, and playfully beat them as the men shield themselves and answer back with songs. It is the same joyful chase, now in Krishna's village. The centre of the celebration is around the **Nand Bhavan temple** and the lanes below it. The air fills with **pink, yellow and red gulal**, the thunder of drums and the high voices of women singing Braj folk songs.",
          "It is not violence, whatever it looks like. It is love, laughter and a very old rule book that everyone present understands. The two villages treat it as a family reunion, and in a sense it is one.",
        ],
        tip: {
          label: `${FOUNDER.name}'s survival and safety tips, and how to enjoy the reverse Lathmar Holi safely`,
          points: [
            "**Plan the two days together.** If possible, visit **Barsana one day and Nandgaon the next**, since the festival moves from one village to the other. Many guests find that the second day is a touch calmer, but it is still very crowded.",
            "**Book early.** Rooms in Mathura and Vrindavan fill up fast. Book at least **six to eight weeks ahead**, and arrange your vehicle and guide too.",
            "**Reach early and expect to walk.** Roads near the main events are often restricted, and you may need to walk a couple of kilometres from the parking point.",
            "**Stay in the viewing areas.** Do not step into the play zone unless you are a participant. Spectators who wander into the lathi area can get hit.",
            "**Wear old white clothes** that you do not mind ruining, a cap or cloth to cover your hair, and shoes you can discard. Apply coconut or mustard oil on your skin and hair beforehand, so the colours wash off more easily.",
            "**Protect your eyes and your phone.** Wear glasses or sunglasses, and put your phone in a waterproof pouch. Better still, leave valuables at the hotel.",
            "**Use skin-safe herbal gulal** if you can, and keep colour out of your eyes and mouth.",
            "**Be careful with thandai.** Some street thandai is mixed with bhang, so ask clearly before you drink.",
            "**Women, seniors and families with small children:** Go as a group or with us, and choose a safe spot away from the densest crowd. A raised terrace or a guided viewing area is a good choice.",
            "**Ask before photographing people,** especially women.",
            "**Carry water,** a small cross-body bag with minimal cash and a meeting-point plan, because mobile networks often fail in huge crowds.",
            "**If the crowd feels too thick, step back.** No photograph is worth a crush.",
          ],
        },
        close: "Lathmar Holi dates change every year with the lunar calendar, so please confirm them before booking. For the full Braj Holi picture, including Phoolon ki Holi in Vrindavan, see our [festivals guide](/festivals).",
      },
      {
        id: "parikrama",
        title: "Take the Parikrama of Nandisvara Hill",
        layout: "split",
        paragraphs: [
          "A **Parikrama of Nandisvara Hill** is a quiet, intimate walk around the base of the hill where the main temple stands. It is much shorter and gentler than the Govardhan Parikrama, and far less crowded. Pilgrims walk **clockwise**, keeping the hill on their right, often chanting softly or singing a few lines of a bhajan. The path passes small shrines, village fields and the lake, and you will meet farmers, cows and children along the way.",
        ],
        tip: {
          label: TIP,
          points: [
            "**Go early in the morning,** when the air is cool and the fields smell of wet earth. In summer, start at dawn, as the sun gets strong by mid-morning.",
            "**Wear comfortable footwear,** and carry water.",
            "**Decide whether to walk barefoot or not.** Some devotees do, but village paths can have thorns, stones and animal droppings. Light slip-ons are perfectly acceptable.",
            "**Ask the length and route locally,** because paths and distances vary by how pilgrims choose to walk. If you are short on time, a partial walk is fine.",
            "**Stay alert,** since village paths are shared with cattle, motorbikes and tractors.",
          ],
        },
      },
      {
        id: "samaj",
        title: "Attend the Evening Samaj Kirtan",
        layout: "split",
        image: "nandgaon-samaj",
        paragraphs: [
          "In the evening, the temple courtyards of Nandgaon come alive with **samaj gayan**, the traditional group singing in **Braj Bhasha**. Singers sit in a circle with harmoniums, drums and cymbals, and sing devotional verses by the old saint-poets, often with a call-and-response that gathers more voices as it goes on. The tunes are old, the words are tender and the effect is deeply soulful. Incense drifts across the courtyard, the lamps are lit and the sound carries out over the village.",
        ],
        tip: {
          label: TIP,
          text: "Arrange to be there in the **late afternoon and early evening**, since many temples have their evening darshan and singing at that time. Sit at the edge of the courtyard, keep your voice low and, if the singers invite you, clap along. You do not need to understand every word. Let the melody do its work. Timings vary, so ask locally.",
        },
      },
      {
        title: "Feel the Rustic Charm of the Village",
        layout: "card",
        image: "braj-haveli",
        paragraphs: [
          "Do not underestimate the value of simply walking Nandgaon's lanes. You will see cow dung cakes stacked on rooftops, women in bright veils carrying brass pots, boys playing cricket with a plank and a rubber ball and shopkeepers who greet every stranger with \"Radhe Radhe.\" If your schedule allows, leave an hour **unplanned**. Sit with a glass of fresh lassi or a plate of hot kachori-sabzi and watch the village go about its day.",
        ],
      },
      {
        title: "Taste Simple Village Sweets",
        layout: "card",
        image: "kachori-sabzi",
        paragraphs: [
          "Look for **fresh pedas, laddus, jalebi, kachori-sabzi and kulhad lassi** in the small shops near the temple. Choose busy stalls with high turnover and hot, freshly made items, and drink bottled or filtered water if your stomach is sensitive.",
        ],
      },
    ],
  },
  bestTime: {
    title: "Best Time to Visit Nandgaon",
    text: "The **best time to visit Nandgaon** is **October to March**. The days are pleasant, the air is dry and the climb to Nand Bhavan and the walks around the village are a pleasure. Winter mornings can be cold and sometimes foggy, so carry a shawl.",
    seasons: seasons("Pleasant weather, Kartik, Diwali, Basant, Holi", "Very hot, so climb at dawn and avoid midday", "Green and lovely, with slippery stairs, humidity and Janmashtami"),
    festivals: { 1: "Holi", 2: "Holi" },
    peaks: [
      {
        title: "The Holi peak: book early",
        paragraphs: ["The big festival peak is **Holi, in the month of Phalgun (February or March)**, when the village hosts its own Lathmar Holi on the day after Barsana's. This is the busiest time of the year, and I urge you, from long experience:"],
        points: [
          "**Book your stay, vehicle and guide well in advance,** ideally six to eight weeks.",
          "**Arrange your transport in both directions.** Return vehicles are very hard to find late in the evening, and roads are restricted.",
          "**Travel with a local driver or a package** that handles parking and walking routes.",
        ],
      },
    ],
    close: `If you prefer **quiet, peaceful darshan**, choose a **winter weekday outside festival weeks**, and go early. Our dedicated guide on the [best time to visit Mathura Vrindavan](${BEST_TIME_GUIDE}) has a full month-by-month breakdown.`,
  },
  reach: {
    title: "How to Reach Nandgaon",
    lede: "Nandgaon is roughly **50 km from Mathura** and about **8 to 10 km from Barsana**, so it sits in the northwest part of the Braj region. The drive from Mathura takes about **1 to 1.5 hours**, depending on traffic. It is not as quick to reach as Gokul or Vrindavan, which is why most pilgrims plan it as a day trip.",
    modes: [
      {
        key: "air",
        title: "By Air",
        points: [
          "**Agra (Kheria) Airport** is the nearest, though flights are limited.",
          "**Delhi's Indira Gandhi International Airport** is the main gateway, around 130 to 150 km away, a drive of about **3 to 3.5 hours**.",
          "A newer airport serving the Delhi-NCR region near Jewar may offer another route. Please check current flights.",
        ],
        note: "We arrange pick-ups from Delhi and Agra.",
      },
      {
        key: "train",
        title: "By Train",
        points: [
          "**Mathura Junction** is the main railhead, on the Delhi-Mumbai and Delhi-Chennai corridors, with excellent connections from across India. From there, continue by road.",
          "**Kosi Kalan** is a closer railhead on the same corridor, but fewer major trains stop there. Distances quoted online vary by route, with some sources saying 10 to 12 km and others considerably more, so please check with your driver or booking source before relying on it. If your train does stop at Kosi Kalan, it can save time.",
        ],
      },
      {
        key: "road",
        title: "By Road and Taxi: How to reach Nandgaon from Mathura",
        points: [
          "**Private cab:** The best choice, especially for families and seniors. You can plan your own timings and stops. The route runs through the Braj countryside, past fields and small villages, and is a pleasant drive in good weather.",
          "**Local buses and shared vehicles:** Some services run between Mathura, Kosi Kalan, Barsana and Nandgaon, but they are slow, crowded and infrequent, especially in the evening.",
          "**From Vrindavan:** About 55 to 65 km, roughly 1.5 hours by road.",
          "**Combine Barsana and Nandgaon in one day trip.** The two villages are only about 8 to 10 km apart, so a **private cab or a guided package** is the smart way to do both in a single, relaxed day. It also saves you the trouble of finding rides between the villages.",
        ],
      },
    ],
    note: { label: "Why a local driver matters", text: "Village roads can be narrow and confusing, and **on festival days, diversions, one-way arrangements and long walks from parking** are the norm. A driver who knows local arrangements saves you hours and keeps you out of trouble." },
  },
  day: {
    title: "A Sample Day: Nandgaon and Barsana",
    lede: "Here is how I usually plan it for guests who want to see both villages.",
    stops: [
      { time: "5:30 a.m.", text: "Leave Mathura or Vrindavan." },
      { time: "7:00 a.m.", text: "Arrive in **Barsana**. Climb to **Ladli Ji** for the early darshan, and visit **Kirti Mandir**." },
      { time: "10:30 a.m.", text: "Drive to **Nandgaon** (about 8 to 10 km)." },
      { time: "11:00 a.m.", text: "**Nand Bhavan.** Climb the hill, enjoy the view and take darshan." },
      { time: "12:30 p.m.", text: "Lunch and rest in the village." },
      { time: "2:00 p.m.", text: "**Pavan Sarovar**, **Charan Pahari** and, if time allows, **Vrinda Kund**." },
      { time: "4:00 p.m.", text: "A walk through the lanes, or a short Parikrama." },
      { time: "5:30 p.m.", text: "Evening kirtan if the timing works, then return." },
    ],
    close: "If you prefer a slower pace, do Nandgaon alone in a half-day and Barsana on another day.",
  },
  carry: {
    title: "What to Carry and Wear",
    items: [
      "**Modest, comfortable clothes** covering shoulders and knees",
      "**Slip-on footwear,** as you will remove it at the temple steps",
      "**Water bottle, cap or scarf and sunscreen**",
      "**A warm shawl** for winter mornings",
      "**A small cross-body bag with a zip,** with small notes for offerings",
      "**Sturdy shoes** if you plan to visit Charan Pahari or walk the Parikrama",
      "**Basic medicines** and hand sanitiser",
      "**For Holi:** old white clothes, hair covering, oil, a waterproof phone pouch and glasses",
      "**In monsoon:** a light raincoat and non-slip footwear",
    ],
    close: "Keep glasses, phones and snacks inside a zipped bag. Monkeys live here too.",
  },
  stay: {
    title: "Where to Stay for Nandgaon",
    paragraphs: [
      "Nandgaon has only a handful of simple guesthouses and ashram stays, which can be lovely for a quiet devotional experience. Most pilgrims, though, prefer to base themselves in **Mathura or Vrindavan**, where the choice of rooms is far wider, and make Nandgaon a day trip.",
      "After a long drive, a climb to the temple and a day in the sun, a clean bed, hot water and air conditioning are not luxuries. They are how your body recovers. We arrange **curated premium bookings at top 4 and 5-star hotels** in Mathura and Vrindavan, and handle the day-trip logistics, so your visit is comfortable and stress-free. During Holi, good rooms vanish early, so book well ahead.",
    ],
  },
  faqTitle: "Frequently Asked Questions About Nandgaon",
  faqs: [
    { q: "What is the distance between Barsana and Nandgaon?", a: "About 8 to 10 km, a drive of roughly 20 to 30 minutes, depending on the road and the crowds." },
    { q: "Why is Nandgaon famous?", a: "Because it is the village where Krishna was raised by Nand Baba and Yashoda, and because of its Lathmar Holi, played the day after Barsana's. Its hilltop Nand Bhavan temple is one of the most beloved shrines in Braj." },
    { q: "How is Lathmar Holi played in Nandgaon?", a: "The men of Barsana come to Nandgaon with shields and sing teasing songs, and the women of Nandgaon playfully strike them with bamboo lathis amid gulal, drums and folk music. It happens the day after Barsana's Lathmar Holi." },
    { q: "When is Lathmar Holi in Nandgaon?", a: "In Phalgun (February or March), usually the day after Barsana's Lathmar Holi. Exact dates change every year with the lunar calendar, so please check before you book." },
    { q: "How much time is needed to visit Nandgaon?", a: "Half a day (3 to 4 hours) is usually enough for Nand Bhavan, Pavan Sarovar and a quick look around. Add more time for Charan Pahari, Vrinda Kund and the Parikrama, or combine with Barsana for a full day." },
    { q: "What is the distance from Mathura to Nandgaon?", a: "About 50 km, roughly 1 to 1.5 hours by road." },
    { q: "What is the best time to visit Nandgaon?", a: "October to March for pleasant weather. Holi (February or March) is the festival peak and is very crowded." },
    { q: "How many steps are there to Nand Bhavan?", a: "Commonly quoted figures run to a few hundred steps, broad, with resting landings. Most people take 15 to 30 minutes at an easy pace. Doli bearers are available for those who cannot climb." },
    { q: "Which deities are worshipped at Nand Bhavan?", a: "Krishna, Balaram, Nand Baba and Yashoda Maiyya, shown together as a family." },
    { q: "What is Pavan Sarovar (Pan Sarovar)?", a: "A sacred lake in Nandgaon where, tradition says, Krishna brought his cows to drink water. It has ghats, small shrines and old trees around it." },
    { q: "What is Charan Pahari?", a: "The \"hill of the footprints,\" where tradition says the rocks softened at the sound of Krishna's flute and kept impressions of his feet and his cows' hoofs." },
    { q: "How do I reach Nandgaon from Mathura?", a: "By private cab (the most comfortable and flexible), or by local bus and shared vehicle. Hiring a cab or booking a package to cover Barsana and Nandgaon together is the simplest option." },
    { q: "Is Nandgaon suitable for senior citizens?", a: "Yes, with planning. The climb to Nand Bhavan is the main challenge, and palanquin bearers, slow pacing and rest stops make it possible. We plan gentler routes for elders." },
    { q: "Is Lathmar Holi safe for tourists?", a: "Yes, with preparation. Stay in the viewing areas, protect your eyes and phone, wear old clothes, keep valuables at the hotel and go as a group or with a guide. Women and families should choose safer spots away from the densest crowd." },
    { q: "How much does a Nandgaon trip package cost?", a: packagePrice },
  ],
  book: {
    title: "Book Your Nandgaon Trip with Local Experts",
    paragraphs: [
      `Nandgaon is not a place you tick off. It is a place where you sit on a stone step, look at a hill that a village has loved for centuries and feel, perhaps for the first time in a long while, that you have arrived home. I would be honoured to guide you there. ${trackRecord}, and we plan every day the way a Brijwasi would plan it for his own family.`,
      `Our **customised Nandgaon packages start from just ${price}**, with clear quotes and no hidden charges. We can arrange **curated premium stays at top 4 and 5-star hotels** in Mathura or Vrindavan, which make an ideal base, with smooth combined day trips to Barsana and Nandgaon, so you return each evening to rest. If you plan to come for Holi, please call early, since good rooms and vehicles disappear weeks ahead.`,
      tellMe,
    ],
    closing: "Nandgaon does not ask you to be perfect. It only asks you to come, and to bring a little joy.",
    formTitle: `Tell ${FOUNDER.name} about your Nandgaon trip`,
  },
  continuePlanning: [
    { label: "Barsana", text: "Radha Rani's hilltop home, 8 to 10 km away", href: "/barsana" },
    { label: "Govardhan", text: "Giriraj, the 21 km Parikrama and Radha Kund", href: "/govardhan" },
    { label: "Gokul", text: "Raman Reti and Krishna's infancy", href: "/gokul" },
    { label: "Festivals of Braj", text: "Lathmar Holi, Janmashtami and more", href: "/festivals" },
  ],
};
