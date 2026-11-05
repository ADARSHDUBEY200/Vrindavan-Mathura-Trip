import { FOUNDER, YEARS } from "@/config/site";
import { BEST_TIME_GUIDE, TIP, founderLine, heroLede, packagePrice, price, seasons, tellMe, trackRecord, whatsappFor } from "./common";
import type { BrajGuide } from "./types";

/*
 * /gokul copy, from "Gokul Content.pdf" in the founder's voice. The PDF's "Quick Notes for Your Web Team"
 * are not published. As they ask, the unconfirmed "Mud Temple" section is left out until its name and
 * location are confirmed.
 */

export const gokul: BrajGuide = {
  slug: "gokul",
  name: "Gokul",
  path: "/gokul",
  updated: "2026-11-05",
  meta: {
    title: "Gokul Travel Guide: Raman Reti, Nand Bhawan & Brahmand Ghat",
    description: `Gokul travel guide by Braj-born expert ${FOUNDER.name}: Raman Reti, Nand Bhawan (Chaurasi Khamba), Brahmand Ghat, Nandotsav tips. Packages from ${price}.`,
    imageAlt: "Pilgrims at Raman Reti Gokul with soft sacred sand and trees, Gokul travel guide by Harsh Sharma",
  },
  geo: { latitude: 27.4385, longitude: 77.7205 },
  hero: {
    image: "raman-reti-temple",
    imagePosition: "50% 40%",
    scriptWord: "गोकुल",
    sub: "Best Places to Visit & the Magic of Krishna's Childhood",
    lede: heroLede,
    whatsappMessage: whatsappFor("Gokul"),
  },
  nav: [
    { id: "glance", label: "At a Glance" },
    { id: "story", label: "The Story" },
    { id: "places", label: "Places to Visit" },
    { id: "things-to-do", label: "Things to Do" },
    { id: "best-time", label: "Best Time" },
    { id: "reach", label: "How to Reach" },
    { id: "plan", label: "Half-Day Plan" },
    { id: "stay", label: "Where to Stay" },
    { id: "faq", label: "FAQ" },
    { id: "book", label: "Book" },
  ],
  intro: {
    greeting: "Radhe Radhe, dear traveller.",
    paragraphs: [
      "If Vrindavan is Krishna's grand stage, **Gokul is his cradle.** This **Gokul travel guide** covers the **places to visit in Gokul**, the quiet villages, sandy groves and river steps where the baby Lord crawled, stole butter and was scolded by his mother. I have written it as I would speak to a guest riding beside me in the car.",
      `${founderLine("Mathura, Vrindavan, Govardhan, Barsana and Gokul")} After **${YEARS} years of guiding**, I can tell you something I tell almost everyone: Gokul is where many pilgrims finally slow down. It is simpler, slower and softer than anywhere else in Braj, and it asks you to feel like a child again.`,
    ],
    note: "**A note on timings and traditions:** Temple timings change with season and festivals, and Braj's sacred geography has several local traditions about which exact spot hosted which leela. I share what I have learned and what guides here commonly say. We reconfirm details with every guest before the trip.",
  },
  glance: {
    title: "Gokul at a Glance",
    rows: [
      { label: "Known for", value: "Krishna's infancy, Raman Reti, Nand Bhawan, Brahmand Ghat" },
      { label: "Distance from Mathura", value: "About 10 to 15 km (roughly 30 minutes)" },
      { label: "Distance from Vrindavan", value: "About 25 to 30 km" },
      { label: "Best time", value: "October to March" },
      { label: "Time needed", value: "Half a day is usually enough" },
      { label: "Biggest festival", value: "Janmashtami, and Nandotsav the next day" },
      { label: "Mood", value: "Rustic, peaceful, village-like" },
    ],
  },
  story: {
    title: "The Story: A Midnight Crossing of the Yamuna",
    eyebrow: "The story",
    image: "gokul-temple-1848",
    caption: "The great temple at Gokul, engraved in 1848",
    paragraphs: [
      "Every child in Braj knows how Gokul entered the story. **Kamsa**, the tyrant king of Mathura, had imprisoned his sister **Devaki** and her husband **Vasudev**, because a prophecy said her eighth child would end his rule. He killed their first six children. The seventh was transferred to the womb of Rohini, and the eighth was **Krishna**, born at midnight in the prison on a night of thunder and rain.",
      "That night, the chains fell loose and the guards fell asleep. Vasudev placed the newborn in a basket and walked out into the storm toward the **Yamuna**, which was in full flood. As he stepped into the water, the river is said to have parted to let him through, while the serpent **Shesha** spread his hood above the basket to shield the child from rain. On the far side lay **Gokul**, where **Nand Baba** and **Yashoda** lived. Vasudev quietly placed Krishna beside the sleeping Yashoda, took her newborn daughter instead and returned to the prison before dawn.",
    ],
    highlight: "From that night, Gokul became Krishna's home. Here he was raised as a village child, loved by everyone and a little too clever for his own good. Here the stories began that all of Braj still tells: Putana, the butter pots, the mortar and the mud.",
  },
  callout: {
    title: "Gokul vs Mahavan: A Local Clarification",
    text: "Pilgrims sometimes get confused, so let me clear this up early. Locals speak of **Gokul** (the main town, on the river, with the ghats and the Pushtimarg temples) and **Mahavan** or **Old Gokul** (a short distance away, with Nand Bhawan and the Chaurasi Khamba). On a pilgrim's map, both are usually grouped together as \"Gokul,\" and nearly all visits cover both. Some traditions say the true Gokul of Nand Baba's time is the Mahavan area, while the riverfront town carries the memory of later saints. I do not ask you to settle the argument. I only ask you to visit both, and to listen with an open heart.",
  },
  places: {
    title: "Best Places to Visit in Gokul",
    lede: "These are the **best places to visit in Gokul**, and together they map out many of the **Lord Krishna childhood places** every devotee longs to see.",
    items: [
      {
        id: "nand-bhawan",
        name: "Nand Bhawan (Chaurasi Khamba / 84 Pillars)",
        href: "/temples/gokul",
        icon: "temple",
        layout: "dark",
        paragraphs: [
          "**Spiritual significance: Nand Bhawan**, also known as **Chaurasi Khamba** (the 84-pillar hall), is traditionally honoured as the house of **Nand Maharaj**, where Krishna spent his early childhood. The long hall is held up by **84 pillars**, and the tradition says they represent the **84 lakh (8.4 million) species of life** in Hindu thought, as if the whole cycle of existence stands under one roof where the Lord played as a child. Locals also say that the pillars cannot be counted properly, with the total always seeming off by one, which is a charming story rather than a fact I would swear to.",
          "The present structure is often described as an old stone building of later date, standing on a far more ancient site. Devotees believe the **Yamalarjun** (twin trees) leela and the **Trinavart** episode are also tied to this area.",
        ],
        timings: { label: "Timings (approximate)", text: "Generally open from morning to evening, with a midday break. Confirm before you go." },
        tip: {
          label: TIP,
          points: [
            "**Walk the hall slowly.** Touch a pillar if you wish, and imagine the child running between them. The hall is simple and unadorned, and that is exactly why it works on you.",
            "**Come in the morning,** when the place is quiet and the light falls across the stone.",
            "**Bring something small to offer,** like butter and sugar (*makhan mishri*), which is a fitting gift for a boy who loved butter. Buy it from a nearby shop, and agree the price first.",
            "**Dress modestly and remove footwear** at the entrance. A small bag with a zip is enough.",
          ],
        },
      },
      {
        id: "raman-reti",
        name: "Raman Reti",
        image: "raman-reti-temple",
        inset: "raman-reti-sand",
        caption: "The temple at Raman Reti",
        layout: "feature",
        paragraphs: [
          "**Spiritual significance: Raman Reti Gokul** is the most beloved spot in the town for many pilgrims. The name means \"the playful sands.\" Tradition says that this is where baby Krishna and his brother **Balarama** crawled, rolled and played in the soft sand as children. The ground here is fine, warm and almost powdery, quite unlike the hard earth around it. For devotees, this is not ordinary sand. It is the dust where the Lord's tiny feet and hands touched the earth.",
          "**The tradition of rolling in the sand:** Pilgrims come here to **roll in the sand**, to sit in it, to rub it on their foreheads, arms and hearts, and to take a pinch home in a cloth or small box. Some do it quietly and some do it with tears. The idea behind it is simple and beautiful: for a moment, you let go of every adult pride and play as a child on the earth where the Lord played. It is a lesson in humility that no lecture can teach. I have watched retired army officers, senior bankers and shy teenagers roll in this sand without a trace of embarrassment, and then rise with clean, shining faces.",
        ],
        timings: { label: "Timings (approximate)", text: "The area is open through the day. The ashram and surrounding temples have their own morning and evening sessions. Confirm before you go." },
        tip: {
          label: TIP,
          points: [
            "**Wear clothes you do not mind getting sandy.** Light cotton is best. Carry a change of clothes if you plan to roll fully, and a towel or cloth to brush off.",
            "**Remove your footwear** and feel the sand under your feet first. It is lovely in the cool of morning and gets hot in the afternoon, so go early or late in the day in summer.",
            "**Take a small cloth or box** if you want to carry a little sand home for your prayer room. Take only a pinch, and leave the place clean.",
            "**Keep your phone and glasses in a zipped bag.** Sand and monkeys are an unfortunate combination.",
            "**Do not rush.** Sit under a tree for a few minutes. It is one of the most peaceful spots in Braj.",
          ],
        },
      },
      {
        id: "brahmand-ghat",
        name: "Brahmand Ghat",
        icon: "sun",
        layout: "card",
        paragraphs: [
          "**Spiritual significance: Brahmand Ghat Gokul** sits on the bank of the Yamuna and is linked with one of the most famous childhood stories of Krishna. The tale goes that little Krishna and his friends were playing on the riverbank, and the boys complained to Yashoda that Krishna had **eaten mud**. Yashoda scolded him and demanded that he open his mouth. When he did, she saw within it **the entire universe**, with the sun, moon, stars, oceans, mountains and all the worlds, including Gokul and herself. Overwhelmed, she wondered if she was dreaming. Krishna's *yogmaya* then drew a veil over her memory, and she held him again as her ordinary little boy.",
          "The name *Brahmand* means \"the cosmos,\" and the ghat is named for that vision. You will also hear the **Damodar leela** told in this area: when Krishna broke the butter pots, mother Yashoda tried to tie him to a **wooden mortar (ulukhal)**, and the rope always came up two fingers short, until his love for her finally allowed her to bind him. Several places in the Gokul and Mahavan region carry the memory of this story, and local traditions differ on the exact spot, so I tell guests about it with respect for those differences.",
        ],
        timings: { label: "Timings", text: "The ghat is open at all hours. The morning and evening are best." },
        tip: {
          label: TIP,
          text: "I take guests here in the **late afternoon**, when the light is soft and the ghat is quiet. Sit on the steps, listen to the water and ask yourself: what if the whole universe lived inside someone you loved? Agree on any boat ride price first, and politely decline anyone insisting on paid rituals. Be careful on the steps, which can be slippery, and avoid swallowing river water.",
        },
      },
      {
        id: "thakurani-ghat",
        name: "Shri Thakurani Ghat",
        icon: "water",
        layout: "card",
        paragraphs: [
          "**Spiritual significance: Thakurani Ghat** is deeply revered by followers of the **Pushtimarg** tradition. According to the tradition, **Shri Vallabhacharya** came to Gokul and, here at the ghat, received the **Brahma Sambandha mantra** in a divine experience of Krishna himself. This is the initiation that sits at the heart of the Pushtimarg path of loving devotion, and it explains why Gokul is such an important seat of the tradition. The ghat is named for **Yamuna Maharani**, whom devotees address as Thakurani (the Lady), and it is associated with the worship of the Yamuna as a divine mother.",
        ],
        timings: { label: "Timings", text: "The ghat is open all day, with the morning and evening being the quietest times." },
        tip: {
          label: TIP,
          text: "This is a **gentle, quiet place**, best for a few minutes of silence. Many pilgrims simply bow to the Yamuna, sprinkle a little water on the head and sit. You will also find the **Gokulnath Temple** and other Pushtimarg shrines nearby, where the deity is served like a beloved child. I like to pair this ghat with Gokulnath Ji in a single, calm hour.",
        },
      },
    ],
    more: {
      title: "More Places Worth Your Time in Gokul",
      items: [
        { name: "Gokulnath Ji Temple", text: "An important **Pushtimarg** seat, where the Lord is served as a beloved child with seasonal clothing and carefully planned offerings." },
        { name: "Raja Thakur Temple", text: "A temple associated with Krishna's childhood worship in the town." },
        { name: "Chinta Haran Mahadev", text: "A quiet Shiva temple, where devotees pray for relief from worries." },
        { name: "Govind Ghat and the riverside lanes", text: "Gentle walks with a lovely view of the Yamuna." },
      ],
    },
  },
  things: {
    title: "Top Things to Do in Gokul",
    lede: "Beyond the temples, these are the **things to do in Gokul** that I recommend.",
    items: [
      {
        id: "roll-in-the-sand",
        title: "Roll in the Sacred Sands at Raman Reti",
        image: "raman-reti-sand",
        layout: "split",
        paragraphs: [
          "Let me talk about this the way I do with guests who are shy about it. Nobody is watching you. Everyone else is busy with their own prayer, and the people who see you will smile, not laugh. The experience has a spiritual logic: in Braj, **humility is the highest form of worship**, and rolling in the dust of a holy place is one of its oldest expressions. Lie down, feel the sand under your back and let your arms fall open. For a few seconds, you are not a manager, a parent or a patient. You are just a child, on the earth where a Child played.",
          "If you cannot roll because of age or injury, **sit in the sand, touch it to your forehead and offer a prayer**. Your devotion counts exactly the same.",
        ],
      },
      {
        id: "feed-the-cows",
        title: "Feed the Cows and Deer at Raman Reti Ashram",
        image: "raman-reti-ashram",
        layout: "split",
        paragraphs: [
          "Near Raman Reti, you will find ashram-style grounds where **cows and calves** are cared for, and where, depending on the season and the ashram, you may also see **deer, peacocks and other gentle animals** wandering the trees. Feeding them with green fodder (*chara*) or fruit is a simple, quiet **seva** that fits the place perfectly, since Krishna is remembered as *Govinda*, the protector and friend of cows. I always suggest buying fodder from the official counters or a recognised gaushala, rather than handing money to strangers on the road, and keeping to the rules the ashram sets for visitors. Please check what animals are present and what feeding is permitted, because arrangements change.",
        ],
      },
      {
        id: "ghats",
        title: "Visit the Yamuna Ghats of Gokul",
        layout: "split",
        paragraphs: [
          "In Mathura, [Vishram Ghat](/temples/vishram-ghat) is a lively, crowded riverfront, with priests, boatmen, flower sellers and tourists all moving at once. Gokul's ghats are different. They feel like a village on the edge of a river: a woman washing clothes, an old man in a white dhoti reciting a verse, children skipping stones, a cow drinking at the water's edge. The pace is slow, and the silence is real.",
        ],
        tip: {
          label: "Here are some tips",
          points: [
            "**Visit at sunrise or sunset** for the best light and the quietest atmosphere.",
            "**Be mindful of the water.** Level and cleanliness vary through the year, so many pilgrims simply sprinkle a little on their heads.",
            "**Watch your step.** Old steps can be slippery.",
            "**Sit for a while.** The reward of Gokul's ghats is not what you do, but how you feel.",
          ],
        },
      },
      {
        title: "Experience Gokul's Rustic Peace",
        layout: "card",
        image: "gokul",
        paragraphs: [
          "Many of my guests, tired from the crowds of Vrindavan and Mathura, tell me that Gokul was the part of the trip that made them breathe. You can walk down a lane and hear nothing but a bell, a calf and a woman humming. If your schedule allows, **leave an hour of Gokul unplanned**. Sit in a courtyard, drink a glass of fresh lassi and watch the village go about its day.",
        ],
      },
      {
        title: "Taste Simple Village Sweets",
        layout: "card",
        image: "mathura-peda",
        paragraphs: [
          "Gokul's food is humble, and honest. Look for **fresh makhan mishri** (butter with sugar crystals), **pedas, kachori-sabzi, jalebi** and **kulhad lassi** in the small shops near the temples. Choose busy stalls with high turnover and hot, freshly prepared items.",
        ],
      },
    ],
  },
  bestTime: {
    title: "Best Time to Visit Gokul",
    image: "raman-reti-ashram",
    text: "The **best time to visit Gokul** is **October to March**. The days are pleasant, the air is dry and walking through the sandy groves and village lanes is a pleasure. Winter mornings can be cold and sometimes foggy, so carry a shawl.",
    seasons: seasons("Pleasant weather, Kartik, Diwali, Holi", "Very hot, so visit early morning or late afternoon", "Green and lovely, but humid and muddy, and Janmashtami falls here"),
    festivals: { 7: "Janmashtami and Nandotsav", 8: "Janmashtami and Nandotsav" },
    peaks: [
      {
        title: "Janmashtami and Nandotsav: the festival peak",
        paragraphs: [
          "The great festival peak in Gokul comes at **Janmashtami (August or September)**, and most especially the **day after Janmashtami, celebrated as Nandotsav**. The tradition is that Krishna was born at midnight in Mathura, and that in Gokul the next morning, **Nand Baba and Yashoda celebrated the arrival of their son**. The village erupted in joy, with drums, dance and gifts for everyone.",
          "That joy is recreated every year. On Nandotsav, temples and lanes fill with devotees chanting **\"Nand ke anand bhayo, jai Kanhaiya Lal ki!\"**, and **toys, sweets, clothes and small gifts are showered and shared** among the crowd, in the spirit of Nand Baba's generosity. Songs, dance and a village-fair mood fill the day. It is wonderful, and it is **very crowded**.",
        ],
        tipLabel: `${FOUNDER.name}'s tip for Nandotsav`,
        points: [
          "**Book several weeks ahead.** Good rooms in Mathura and Vrindavan vanish early, and vehicles are scarce.",
          "**Reach early and plan to walk.** Roads near the temples are often restricted.",
          "**Keep valuables at the hotel.** Pickpockets love festival crowds.",
          "**Hold hands with children and elders,** and agree on a meeting point.",
          "**Be ready for rain.** This is the monsoon season. Carry a light raincoat and wear non-slip footwear.",
          "**If you want the spirit without the crush,** visit a day or two before or after the main days.",
        ],
        close: "Festival dates change every year with the lunar calendar, so please confirm them before you book. For a broader view of Braj's celebrations, see our [festivals guide](/festivals).",
      },
    ],
    close: `For a month-by-month view of the whole region, see our guide to the [best time to visit Mathura Vrindavan](${BEST_TIME_GUIDE}).`,
  },
  reach: {
    title: "How to Reach Gokul",
    lede: "Gokul is very close to Mathura, roughly **10 to 15 km** away across the **Yamuna River**, and a drive takes about **30 minutes** in normal traffic. Most pilgrims visit as a half-day trip from Mathura or Vrindavan.",
    modes: [
      {
        key: "air",
        title: "By Air",
        points: [
          "**Agra (Kheria) Airport** is the nearest, though flights are limited.",
          "**Delhi's Indira Gandhi International Airport** is the main gateway, around 150 to 160 km away, a drive of about **3 to 3.5 hours**.",
          "A newer airport serving the Delhi-NCR region near Jewar may offer another route. Please check current flights.",
        ],
        note: "We arrange pick-ups from Delhi and Agra.",
      },
      {
        key: "train",
        title: "By Train",
        text: "**Mathura Junction** is the main railhead, on the Delhi-Mumbai and Delhi-Chennai corridors, with excellent connections from across India. From the station, Gokul is a short ride by road.",
      },
      {
        key: "road",
        title: "By Road and Taxi: How to reach Gokul from Mathura",
        points: [
          "**Private cab:** The most comfortable and flexible, especially for families and seniors. You can set your own timings and stops, and combine Gokul with Mathura sightseeing on the same day.",
          "**Local auto-rickshaws:** Convenient for the short hop. Agree on the fare first, and confirm whether it includes waiting time if you want to return in the same vehicle.",
          "**Local buses and shared vehicles:** Available, but crowded and infrequent in the evening.",
          "**From Vrindavan:** Travel via Mathura, a journey of about an hour or so, depending on traffic.",
        ],
      },
    ],
    note: { label: `${FOUNDER.name}'s tip`, text: "Roads between Mathura and Gokul can be congested on **Janmashtami, Nandotsav and Purnima days**, and local arrangements and diversions can change. A local driver saves you hours. Also keep a return vehicle arranged, because rides back can be hard to find late in the evening." },
  },
  day: {
    title: "A Sample Half-Day Itinerary for Gokul",
    stops: [
      { time: "7:00 a.m.", text: "Leave Mathura or Vrindavan." },
      { time: "7:45 a.m.", text: "**Nand Bhawan (Chaurasi Khamba)**. Quiet morning darshan." },
      { time: "9:00 a.m.", text: "**Raman Reti**. Sit and roll in the sand, and visit the ashram grounds." },
      { time: "10:30 a.m.", text: "**Brahmand Ghat** and **Thakurani Ghat**. A calm hour by the river." },
      { time: "11:30 a.m.", text: "**Gokulnath Ji Temple** (check its darshan window)." },
      { time: "12:30 p.m.", text: "Lunch and rest." },
      { time: "2:00 p.m.", text: "Return to Mathura. Add Vishram Ghat, or head to [Govardhan](/govardhan) or [Barsana](/barsana) the next day." },
    ],
    close: "Gokul pairs beautifully with [Mathura](/mathura), since both are close, and with [Baldeo (Dauji)](/temples/dauji-baldeo), a short drive away.",
  },
  carry: {
    title: "What to Carry and Wear",
    items: [
      "**Modest, comfortable clothes** covering shoulders and knees",
      "**A change of clothes and a small towel** if you plan to roll in the sand",
      "**Slip-on footwear,** as you will remove it often",
      "**Water bottle, cap or scarf and sunscreen**",
      "**A small cross-body bag with a zip,** with small notes for offerings",
      "**A small cloth or box** for carrying a pinch of sand home",
      "**Basic medicines** and hand sanitiser",
      "**Light raincoat** in monsoon and a shawl on winter mornings",
    ],
  },
  stay: {
    title: "Where to Stay for Gokul",
    paragraphs: [
      "Gokul has only a few simple stays and ashram guesthouses, which can be lovely for a quiet devotional experience. Most pilgrims, though, prefer to base themselves in **Mathura**, which is close, and has a wide range of hotels, and make Gokul a day trip.",
      "We arrange **curated premium bookings at top 4 and 5-star hotels** in Mathura and Vrindavan, and handle the day-trip logistics, so your visit is comfortable and stress-free. During Janmashtami, Nandotsav and Holi, good rooms disappear early, so book well ahead.",
    ],
  },
  faqTitle: "Frequently Asked Questions About Gokul",
  faqs: [
    { q: "How much time is required to visit Gokul?", a: "Half a day is usually enough to see the main places, about 3 to 4 hours. Add extra time if you want to sit quietly at Raman Reti or visit the ashram and the Pushtimarg temples." },
    { q: "How far is Gokul from Mathura?", a: "About 10 to 15 km, roughly 30 minutes by road, depending on traffic." },
    { q: "What is the difference between Gokul and Vrindavan?", a: "Gokul is where Krishna spent his infancy, with the story of Vasudev's crossing, the butter pots, Putana and the mortar. It is rustic, quiet and village-like. Vrindavan is where Krishna's childhood and youth unfolded, with the Raas, the flute and Radha, and it is a busy, temple-filled town with large crowds." },
    { q: "Why is Raman Reti famous?", a: "Because tradition says baby Krishna and Balarama played and crawled in its soft sand. Devotees roll in it, touch it to their foreheads and take a pinch home as a blessing." },
    { q: "What is special about Chaurasi Khamba (Nand Bhawan)?", a: "It is the hall traditionally linked with Nand Baba's house, held by 84 pillars, which devotees take to represent the 84 lakh species of life. It is one of the oldest and most atmospheric sites in the region." },
    { q: "What is Brahmand Ghat famous for?", a: "It is linked with the story in which little Krishna opened his mouth and showed Yashoda the whole universe (brahmand) after the other children said he had eaten mud." },
    { q: "What is Thakurani Ghat known for?", a: "It is a sacred Yamuna ghat in the Pushtimarg tradition, linked with Shri Vallabhacharya receiving the Brahma Sambandha mantra." },
    { q: "What is the best time to visit Gokul?", a: "October to March for pleasant weather. Janmashtami and Nandotsav (August or September) are the festival peaks, and they are very crowded." },
    { q: "What is Nandotsav?", a: "The celebration on the day after Janmashtami, remembering the joy of Nand Baba and Yashoda at Krishna's arrival in Gokul. Sweets, toys and gifts are shared, and temples ring with \"Nand ke anand bhayo!\"." },
    { q: "How do I reach Gokul from Mathura?", a: "By private cab (the most comfortable) or local auto-rickshaw, in about 30 minutes. Buses and shared vehicles also run, but are slower and more crowded." },
    { q: "Is Gokul crowded like Vrindavan?", a: "Usually much less. Gokul feels peaceful and rustic for most of the year. It becomes crowded at Janmashtami, Nandotsav and major festivals." },
    { q: "Is Gokul suitable for senior citizens?", a: "Yes. Most sites are on flat ground with short walks. The sand at Raman Reti can be uneven, so we plan rest stops and easy routes." },
    { q: "Can I take sand from Raman Reti?", a: "Many devotees take a small pinch as prasad. Take only a little, and leave the place clean. Please follow any local rules." },
    { q: "What should I wear to Gokul?", a: "Modest, comfortable clothes covering shoulders and knees. Wear slip-on footwear, and carry a change of clothes if you plan to roll in the sand." },
    { q: "How much does a Gokul trip package cost?", a: packagePrice },
  ],
  book: {
    title: "Book Your Gokul Trip with Local Experts",
    paragraphs: [
      `Gokul does not shout. It whispers. It is a place where an old woman shows you where she believes Krishna's cradle stood, where a village boy runs beside the car shouting "Radhe Radhe," where the sand warms your feet and your heart for no reason you can explain. I would be honoured to guide you there. ${trackRecord}, and we plan every day the way a Brijwasi would plan it for his own family.`,
      `Our **customised Gokul packages start from just ${price}**, with clear quotes and no hidden charges. We can arrange **curated premium stays at top 4 and 5-star hotels** in Mathura, which makes an excellent base, with smooth day trips to Gokul so you return each evening to rest. If you plan to come for Janmashtami or Nandotsav, please call early, since good rooms and vehicles disappear weeks ahead.`,
      tellMe,
    ],
    closing: "Gokul does not ask you to be wise. It only asks you to come, and to play a little.",
    formTitle: `Tell ${FOUNDER.name} about your Gokul trip`,
  },
  continuePlanning: [
    { label: "Mathura", text: "Krishna's birthplace, 10 to 15 km away", href: "/mathura" },
    { label: "Baldeo (Dauji)", text: "The temple of Krishna's elder brother", href: "/temples/dauji-baldeo" },
    { label: "Vrindavan", text: "Banke Bihari, Prem Mandir and the ghats", href: "/vrindavan" },
    { label: "Janmashtami", text: "Midnight in Mathura, Nandotsav in Gokul", href: "/festivals/janmashtami" },
  ],
};
