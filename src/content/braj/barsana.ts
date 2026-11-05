import { FOUNDER, YEARS } from "@/config/site";
import { BEST_TIME_GUIDE, TIP, founderLine, heroLede, packagePrice, price, seasons, tellMe, trackRecord, whatsappFor } from "./common";
import type { BrajGuide } from "./types";

/*
 * /barsana copy, from "Barsana Content.pdf" in the founder's voice. The PDF's "Quick Notes for Your Web
 * Team" are not published; the points they ask the team to verify are listed in the hand-over, not here.
 */

export const barsana: BrajGuide = {
  slug: "barsana",
  name: "Barsana",
  path: "/barsana",
  updated: "2026-11-05",
  meta: {
    title: "Barsana Travel Guide: Radha Rani Temple & Lathmar Holi",
    description: `Barsana travel guide by Braj-born expert ${FOUNDER.name}: Radha Rani Temple stairs and timings, Lathmar Holi tips, Kirti Mandir, Nandgaon. Packages from ${price}.`,
    imageAlt: "Hilltop Radha Rani Temple Ladli Ji in Barsana seen from the stairs at sunrise, Barsana travel guide",
  },
  geo: { latitude: 27.6497, longitude: 77.3786 },
  hero: {
    image: "barsana-radharani",
    imagePosition: "50% 55%",
    scriptWord: "बरसाना",
    sub: "Best Places to Visit, Lathmar Holi & Local Secrets",
    lede: heroLede,
    whatsappMessage: whatsappFor("Barsana"),
  },
  nav: [
    { id: "glance", label: "At a Glance" },
    { id: "story", label: "Why Barsana" },
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
      "Where I come from, there is a saying that Vrindavan is Krishna's playground, but **Barsana is Radha's home**. This **Barsana travel guide** is for anyone planning the **places to visit in Barsana**, from the long climb to Ladli Ji to the beautiful madness of Lathmar Holi, written by someone who has walked these hills for more than a decade.",
      `${founderLine("Mathura, Vrindavan, Govardhan and Barsana")} Barsana is the hometown of Goddess Radha, set against the **Brahma and Vishnu hills**, and in **${YEARS} years of guiding** I have never taken a guest there who did not leave quieter than they arrived. Everything I have learned is here: the best hour for darshan, how to manage the stairs, how to survive Lathmar Holi with a smile and why Barsana and Nandgaon belong together.`,
    ],
    note: "**A note on timings and dates:** Temple timings change with season and festivals, and festival dates shift every year with the lunar calendar. I share the usual patterns I have seen. We reconfirm everything with each guest before travel.",
  },
  glance: {
    title: "Barsana at a Glance",
    rows: [
      { label: "Known for", value: "Radha Rani's hometown, Ladli Ji Temple, Lathmar Holi" },
      { label: "Hills", value: "Brahma Hill (Brahmanchal) and Vishnu Hill" },
      { label: "Distance from Mathura", value: "About 45 to 55 km" },
      { label: "Distance from Vrindavan", value: "About 55 to 60 km" },
      { label: "Barsana to Nandgaon", value: "About 8 to 10 km" },
      { label: "Best time", value: "October to March" },
      { label: "Biggest festivals", value: "Lathmar Holi (Phalgun), Radhashtami (Bhadrapada)" },
      { label: "Time needed", value: "Half a day for temples, a full day with Nandgaon" },
    ],
  },
  story: {
    title: "Why Barsana Is Special: The Hometown of Radha Rani",
    eyebrow: "The story",
    image: "barsana-view",
    caption: "Barsana from the temple hill",
    paragraphs: [
      "Braj tradition says that Radha was the beloved daughter of **Vrishabhanu Maharaj** and **Kirti Maiya** (Kirti Devi), and that Barsana was their kingdom. The name is often linked with the village's connection to **Brahma**, who is said to have performed austerities here and taken the form of a hill so that he could witness Radha's leelas. That hill is the **Brahma Hill** on which the main temple stands. A second hill nearby is known as **Vishnu Hill**, and the town sits tucked between them.",
      "Radha was no ordinary princess in the devotional story. In Braj, we call her **Shri Radha Rani**, the queen who rules Krishna's heart, and many devotees say you cannot reach Krishna except through her grace. In Barsana, you feel this as soon as you step off the road. People greet you with **\"Radhe Radhe\"** instead of \"hello.\" Women sing *badhai* songs for no reason at all. Children chase peacocks. Even the old stones feel as if they remember her name.",
    ],
    highlight: "Mathura is where Krishna was born, and Vrindavan is where he played. Barsana is where **he came, again and again, to see her.**",
  },
  places: {
    title: "Best Places to Visit in Barsana",
    lede: "These are the **best places to visit in Barsana**. Together they make a complete, unhurried visit.",
    items: [
      {
        id: "ladli-ji",
        name: "Shri Radha Rani Temple (Ladli Ji Mandir)",
        href: "/temples/radha-rani-temple-barsana",
        image: "barsana-radharani",
        inset: "radha-rani-barsana",
        caption: "Ladli Ji on Brahma Hill",
        layout: "feature",
        paragraphs: [
          "**Spiritual significance: Shri Radha Rani Temple Barsana**, known to locals as **Ladli Ji Mandir** (\"the beloved daughter's temple\"), is the crown jewel of the town. It stands on the summit of Brahma Hill, on the old site traditionally called **Bhanugarh** after Radha's father, Vrishabhanu (also called Bhanu). The present red and pink sandstone building is traditionally credited to the **sixteenth-century** devotional patronage of **Raja Bir Singh Deo of Orchha**, though the place has been worshipped since much older times. Inside, Radha is worshipped as Ladli Ji, the beloved daughter of Braj, richly dressed and adorned. To Brijwasis, this is not a temple *about* Radha. It is **her home**, and you have come to visit her.",
          "**The climb:** You reach the temple by a long stone stairway. Commonly quoted figures run to **a couple of hundred steps (often 200 to 250)**. The steps are broad and not steep, with resting landings and shaded spots, and the climb is part of the devotion. Pilgrims sing, children race ahead and old women stop to rest and chant. At the top, the terrace opens onto **a lovely view over Barsana, its kunds, the neighbouring hills, temple spires and green fields**.",
        ],
        timings: {
          label: "Typical timings (approximate)",
          text: "Morning darshan from early (around 5:30 to 6 a.m.) until around noon, a midday break, and an evening session from the afternoon until about 8:30 or 9 p.m. Timings shift with the season and on festival days, so please confirm before you go.",
        },
        tip: {
          label: TIP,
          points: [
            "**Visit early in the morning to beat the rush.** I take my guests up soon after the temple opens, when the air is cool, the stairs are quiet and the courtyard is peaceful. By mid-morning on weekends, tour buses arrive and the queue thickens.",
            "**Pace the climb.** Do not race. Stop at the landings, sip water and let your breath settle. Wear **comfortable slip-on footwear**, since you will leave your shoes below.",
            "**Seniors and those with knee trouble:** Local porters offer **palanquin (doli) carrying services** on the stairs for a fee. Agree the price before you start. We can help arrange this.",
            "**Phones and bags:** Rules vary, and phones and cameras are often restricted near the sanctum. Check on the day, and keep valuables in your vehicle or hotel.",
            "**Mind the monkeys.** Keep glasses, snacks and prasad inside a zipped bag.",
            "**Offerings:** Simple flowers, tulsi or sweets are plenty. Politely decline anyone who pressures you for money.",
            "**Take your time at the top.** After darshan, sit on the terrace for ten quiet minutes, looking over the town. It is one of the most peaceful moments in Braj.",
          ],
        },
      },
      {
        id: "kirti-mandir",
        name: "Kirti Mandir",
        image: "kirti-mandir",
        imagePosition: "50% 40%",
        layout: "split",
        paragraphs: [
          "**Spiritual significance: Kirti Mandir Barsana** is a magnificent modern temple dedicated to **Kirti Maiya**, Radha Rani's mother. It is often described as one of the very few temples in the world dedicated to her, and it carries a tender message: before Radha was Krishna's beloved, she was a mother's daughter. The temple is built of gleaming white marble, with elegant domes, delicately carved panels and beautifully kept gardens. Inside, Kirti Maiya is shown with Radha, and the atmosphere feels warm and homely. It is associated with the same devotional movement that built [Prem Mandir](/temples/prem-mandir) in Vrindavan, and you will notice a similar love for craftsmanship.",
        ],
        timings: { label: "Timings (approximate)", text: "Generally open from morning until evening with a break at midday. Confirm before visiting." },
        tip: {
          label: TIP,
          text: "I recommend visiting **in the late afternoon**, when the marble glows warmly and the crowds are thinner. It makes a perfect, easy stop after your climb to Ladli Ji, with flat ground and shade for elders and children. Mobile phones may be restricted inside, so use the lockers if provided.",
        },
      },
      {
        id: "maan-mandir",
        name: "Maan Mandir (Maan Garh)",
        icon: "mountain",
        layout: "card",
        paragraphs: [
          "**Spiritual significance: Maan Mandir**, also called **Maan Garh**, sits on a hill in Barsana and is tied to one of the sweetest stories in Braj. The word *maan* means a lover's pique, the playful anger of Radha when Krishna had displeased her. The tradition tells that Radha, in her loving sulk, would retreat to this spot and refuse to speak to Krishna, and that Krishna would come, with all his charm, to coax her back. Here, even the Lord must win her heart. The temple is quieter than Ladli Ji, and it offers wide views over the countryside.",
        ],
        timings: { label: "Timings (approximate)", text: "Open through the morning and evening, with a break at midday. Confirm before you go." },
        tip: {
          label: TIP,
          text: "I take guests here at **dusk or in the early morning**, when the hill is peaceful and the peacocks are calling. Wear sturdy footwear and carry water, as the access is on a hillside path. It is also a lovely place to sit and listen to the wind while you think about the idea that love in Braj includes playful quarrels.",
        },
      },
      {
        id: "sankari-khor",
        name: "Sankari Khor",
        icon: "footprints",
        layout: "card",
        paragraphs: [
          "**Spiritual significance: Sankari Khor** is a **narrow passage between the hills**, with a path barely wide enough for a few people at once. In the Braj story, this is where Krishna and his cowherd friends would block the way of the gopis carrying milk, curd and butter to Mathura, playfully demanding a \"toll\" (*dan*) of butter and sweets. The gopis would scold and tease, and the boys would laugh and run. It is one of the most loved **dan leelas** in Braj, and standing here you can almost hear the laughter echoing off the stones. Sankari Khor is also near the area associated with the **Dan Bihari** shrine, which celebrates this same tradition.",
        ],
        timings: { label: "Timings", text: "Open at all times as a walking path. Nearby shrines keep their own hours." },
        tip: {
          label: TIP,
          text: "Go in **daylight** and watch your footing, because the path is uneven and rocky in places. In festival season it can be crowded. I always tell the story out loud as we walk through, and I invite guests to imagine the whole scene, including the butter pots. Keep valuables close, and be mindful of monkeys.",
        },
      },
      {
        id: "dan-bihari",
        name: "Dan Bihari Temple",
        icon: "temple",
        layout: "card",
        paragraphs: [
          "**Spiritual significance:** The **Dan Bihari Temple** is associated with the same **dan leela** as Sankari Khor, and it is one of the old shrines linked with Krishna's playful tolls in Barsana. The deity here honours Krishna as the *Dan Bihari*, the playful collector of the gopis' \"tax.\" Many pilgrims treat a visit as a pair with Sankari Khor, hearing the story and then receiving the darshan of the deity who lived it.",
        ],
        timings: { label: "Timings (approximate)", text: "Open morning and evening, with a midday break. Confirm before you go." },
        tip: {
          label: TIP,
          text: "The temple is simple and heartfelt rather than grand. Spend a few minutes sitting in the courtyard, and offer something small, like a bit of butter-and-sugar (*makhan mishri*), which is a fitting gift for the Lord of the dan leela. Dress modestly and keep your voice low.",
        },
      },
    ],
    more: {
      title: "More Places Worth Your Time in Barsana",
      items: [
        { name: "Mor Kutir", text: "A quiet corner associated with the story of Krishna dancing as a peacock, where devotees often see real peacocks." },
        { name: "Kundal Kund and other sacred ponds", text: "Barsana has several small kunds linked with Radha's pastimes. They are best visited in the morning when the water is still." },
        { name: "Radha Bagh", text: "A garden area associated with Radha's childhood play." },
        { name: "The lanes of old Barsana", text: "Walk them slowly. The old havelis, the flower sellers, the sweet shops piled with laddus and the sound of bhajans from open doorways are as much a part of the visit as any temple." },
      ],
    },
  },
  things: {
    title: "Top Things to Do in Barsana",
    lede: "Beyond temple darshan, these are the **things to do in Barsana** that I recommend.",
    items: [
      {
        id: "lathmar-holi",
        title: "Experience the World-Famous Lathmar Holi",
        eyebrow: "Phalgun, late February or March",
        image: "lathmar-holi",
        inset: "flower-holi",
        layout: "feature",
        paragraphs: [
          "**Lathmar Holi in Barsana** is one of the most extraordinary cultural events in India, and I say that with all the pride of a Brijwasi. It is a bucket-list celebration that has to be felt to be understood.",
          "**The legend:** The story goes that Krishna, the young prince of Nandgaon, once came to Barsana with his friends during Holi to tease Radha and her friends. The women of Barsana, in loving annoyance, chased the boys away with sticks. The tradition was born, and it has been celebrated ever since.",
          "**How it unfolds:** Every year in the month of **Phalgun (usually late February or March)**, the **men of Nandgaon** (the *hurairas*) come to Barsana, carrying shields, dressed in colourful clothes and singing teasing Holi songs. The **women of Barsana** (the *hurariyas*) greet them with **wooden sticks (lathis)** and playfully beat them. The men shield themselves, shout back witty songs and sometimes beat a retreat. The air fills with **gulal (coloured powder) in pink, yellow and red**, with the thunder of drums and the high voices of women singing Braj folk songs. The centre of the action is around the **Ladli Ji temple and the lanes below it**. The day before, you may also see **Laddu Holi**, when laddus are thrown and shared in celebration. The next day, the play moves to [Nandgaon](/nandgaon), where the women of Barsana visit and the roles are reversed in spirit.",
          "It is not violent, whatever it looks like. It is love, laughter and tradition, and the participants know the rules.",
        ],
        tip: {
          label: "Survival and safety tips for tourists",
          points: [
            "**Book early.** Rooms in Mathura and Vrindavan fill up fast. Book at least **six to eight weeks ahead**, and arrange your vehicle too.",
            "**Reach early and expect to walk.** Roads are often restricted near the main events, so you may need to walk a couple of kilometres. Leave your vehicle at the designated point.",
            "**Stay in the viewing areas.** Do not step into the play zone unless you are a participant. Spectators who wander into the lathi area can get hit.",
            "**Wear old white clothes** that you do not mind ruining, a cap or cloth for your hair, and shoes you can discard. Apply coconut or mustard oil on your skin and hair beforehand, so the colours wash off more easily.",
            "**Protect your eyes and phone.** Wear glasses or sunglasses, and put your phone in a waterproof pouch. Better still, leave valuables at the hotel.",
            "**Use skin-safe, herbal gulal** when you can, and keep colour away from your eyes and mouth.",
            "**Women, seniors and families with small children:** Go as a group, or with us, and choose a safe spot away from the densest crowd.",
            "**Be careful with thandai.** Some street thandai is mixed with bhang, so ask clearly before you drink.",
            "**Ask before photographing people,** especially women.",
            "**Carry water,** a small cross-body bag with minimal cash and a meeting point plan, since mobile networks often fail in huge crowds.",
            "**If the crowd feels too thick, step back.** No photograph is worth a crush.",
          ],
        },
        close: "For the full picture of Braj's celebrations, including Phoolon ki Holi in Vrindavan, see our [festivals guide](/festivals). Lathmar Holi dates change every year, so please confirm before booking.",
      },
      {
        id: "radhashtami",
        title: "Attend Radhashtami Celebrations",
        layout: "split",
        image: "radha-rani-barsana",
        paragraphs: [
          "**Radhashtami** is Radha Rani's birthday, celebrated about two weeks after Janmashtami, on the **ashtami of the bright fortnight of Bhadrapada (usually August or September)**. For many Brijwasis, this is the spiritual peak of the year, and nowhere is it felt more strongly than in Barsana.",
          "The Ladli Ji temple is decorated with flowers and lights, and pilgrims climb the stairs with songs on their lips. Women sing *badhai* songs congratulating Radha's parents on her birth. Inside the temple, Radha Rani is bathed in a ceremonial **abhishek with milk, curd, ghee, honey and sugar**, then dressed in new garments and fresh ornaments. Devotional dances and peacock-themed performances fill the courtyard, and many devotees fast and pray through the day.",
        ],
        tip: {
          label: TIP,
          points: [
            "**Arrive very early.** Climb before the crowd builds, and carry water.",
            "**Base yourself in Mathura or Vrindavan** for better rooms, as stays in Barsana are simpler.",
            "**Consider also visiting Raval**, a village near Gokul regarded in one tradition as Radha's birthplace.",
            "**Keep a quiet hour** after darshan to sit and absorb it. Radhashtami is less thunderous than Janmashtami and more tender.",
          ],
        },
      },
      {
        id: "nandgaon",
        title: "Explore the Twin Town of Nandgaon",
        layout: "split",
        image: "nandgaon-hill-temple",
        paragraphs: [
          "A trip to Barsana is **incomplete without** [Nandgaon](/nandgaon), Krishna's childhood village, just **8 to 10 km away**. The **Barsana to Nandgaon distance** is short enough for a gentle 20 to 30 minute drive, and the two towns are bound together in Braj tradition like two halves of one love story. Barsana is Radha's home. Nandgaon is where Krishna was raised by **Nanda Baba and Yashoda**.",
          "The bond between the two towns is alive today. On Lathmar Holi, **the men of Nandgaon go to Barsana**, and the next day the **women of Barsana go to Nandgaon**, so the families of Krishna and Radha visit each other every spring, as they did in the old stories. Locals still speak of each other as relatives.",
        ],
        list: {
          title: "What to see in Nandgaon",
          items: [
            "**Nand Bhavan (Nand Mahal):** The main temple, on a hilltop, reached by a flight of steps, where Krishna, Balarama, Nanda and Yashoda are worshipped. The view over the village is lovely.",
            "**Pavan Sarovar:** A sacred pond associated with Krishna's cows and games.",
            "**Yashoda Kund:** Linked with Yashoda's daily rituals.",
          ],
        },
        tip: { label: TIP, text: "I recommend doing both on the same day: Barsana in the morning for the early Ladli Ji darshan and Kirti Mandir, then Nandgaon after lunch. In the evening, return to your hotel in Mathura or Vrindavan." },
      },
      {
        title: "Listen to Braj folk songs",
        layout: "card",
        paragraphs: ["In festival season, and on many evenings, you will hear *rasiya* and *samaj gayan* in the lanes. Stand still and listen."],
      },
      {
        title: "Taste local sweets",
        layout: "card",
        image: "jalebi-rabri",
        paragraphs: ["Fresh laddus, pedas and malpua in the small shops near the temple are excellent. Choose busy shops with a high turnover."],
      },
      {
        title: "Sit by a kund at dawn",
        layout: "card",
        paragraphs: ["Barsana's ponds are quiet, and the light is lovely."],
      },
    ],
  },
  bestTime: {
    title: "Best Time to Visit Barsana",
    image: "barsana-temple-facade",
    text: "The **best time to visit Barsana** for comfortable sightseeing is **October to March**. The air is cool, humidity is low and climbing the stairs is much more pleasant. Winter mornings can be cold and foggy in December and January, so carry a shawl.",
    seasons: seasons("Cool, pleasant, Kartik, Basant, Holi at the end", "Very hot, so climb at dawn, avoid midday", "Green and lovely, with slippery stairs and humidity"),
    festivals: { 1: "Lathmar Holi", 2: "Lathmar Holi", 7: "Radhashtami", 8: "Radhashtami" },
    peaks: [
      {
        title: "The two big festival peaks",
        points: [
          "**February or March (Phalgun): Holi season**, including Lathmar Holi. Intense, joyful and extremely crowded.",
          "**August or September (Bhadrapada): Radhashtami**, the spiritual peak for devotees.",
        ],
      },
    ],
    close: `If you want **quiet darshan**, choose a **winter weekday outside festival weeks**. If you want **devotion at its loudest**, come for Holi or Radhashtami, and book early. We have a full guide to the [best time to visit Mathura Vrindavan](${BEST_TIME_GUIDE}) if you would like more detail.`,
  },
  reach: {
    title: "How to Reach Barsana",
    image: "barsana-gate",
    lede: "Barsana is roughly **40 to 55 km from Mathura and about 55 to 60 km from Vrindavan**, depending on the route, and takes about **1 to 1.5 hours** by road. It is not as easy to reach as Mathura or Vrindavan, which is why most pilgrims make it a day trip from one of those two towns.",
    modes: [
      {
        key: "air",
        title: "By Air",
        points: [
          "**Agra (Kheria) Airport** is the nearest, with limited flights.",
          "**Delhi's Indira Gandhi International Airport** is the main gateway, around 130 to 150 km away, a drive of about **3 to 3.5 hours**.",
          "A newer airport serving the Delhi-NCR region near Jewar may offer another route. Please check current flights.",
        ],
        note: "We arrange pick-ups from Delhi and Agra.",
      },
      {
        key: "train",
        title: "By Train",
        points: [
          "**Mathura Junction** is the best railhead, on the Delhi-Mumbai and Delhi-Chennai corridors, with excellent connections from across India. From there, continue by road.",
          "**Kosi Kalan** is a closer railhead, roughly 20 km from Barsana, but fewer major trains stop there. It can be convenient if your train does halt there. Check schedules before relying on it.",
        ],
      },
      {
        key: "road",
        title: "By Road and Taxi",
        points: [
          "**Private cab:** The best choice, especially for families and seniors. From Mathura or Vrindavan, you can plan your own timings and stops. The route runs through the Braj countryside, past fields and small villages, and is a pleasant drive in good weather.",
          "**Local buses and shared vehicles:** Some run between Mathura, Kosi Kalan and Barsana. They are cheap but slow, crowded and infrequent, particularly late in the day.",
          "**From Govardhan:** Barsana is roughly 20 to 25 km away, so the two combine well in one long day.",
        ],
      },
    ],
    note: { label: "Why I strongly recommend a local driver", text: "Roads near Barsana can be narrow and confusing, and **on festival days, police diversions, one-way arrangements and long walks from parking** are the norm. A driver who knows the local arrangements saves you hours and keeps you out of trouble. It is also much easier to find a return vehicle late in the evening when it is your own." },
  },
  day: {
    title: "A Sample Day: Barsana and Nandgaon",
    lede: "Here is how I usually plan it for guests.",
    stops: [
      { time: "5:30 a.m.", text: "Leave Mathura or Vrindavan." },
      { time: "7:00 a.m.", text: "Arrive in Barsana. Climb to **Ladli Ji** for the early darshan." },
      { time: "9:00 a.m.", text: "Sit on the terrace, then visit **Kirti Mandir**." },
      { time: "10:30 a.m.", text: "**Sankari Khor, Dan Bihari** and a walk through the old lanes." },
      { time: "12:00 noon", text: "Lunch, and a rest." },
      { time: "1:30 p.m.", text: "**Maan Mandir** or a sacred kund." },
      { time: "3:00 p.m.", text: "Drive to **Nandgaon** for Nand Bhavan and Pavan Sarovar." },
      { time: "5:30 p.m.", text: "Return to Mathura or Vrindavan." },
    ],
    close: "Add [Govardhan](/govardhan) and Radha Kund the next day, and you have a full Braj circuit.",
  },
  carry: {
    title: "What to Carry and Wear",
    items: [
      "**Modest, comfortable clothes** covering shoulders and knees",
      "**Slip-on footwear,** as you will remove it at every temple",
      "**A water bottle,** cap or scarf and sunscreen",
      "**Warm shawl** in winter mornings",
      "**A small cross-body bag with a zip,** with small cash for offerings",
      "**Basic medicines** and hand sanitiser",
      "**For Holi:** old white clothes, hair covering, oil, a waterproof phone pouch and glasses",
      "**In monsoon:** a light raincoat and non-slip footwear",
    ],
  },
  stay: {
    title: "Where to Stay for Barsana",
    paragraphs: [
      "Barsana itself has simple guesthouses and ashram stays, which can be lovely for a quiet devotional experience. Most pilgrims, though, prefer to base themselves in **Mathura or Vrindavan**, where the choice of rooms is far wider, and make Barsana a day trip.",
      "After climbing 200-plus steps and a long day on the road, a clean bed, hot water and air conditioning are not luxuries. They are how your body recovers. We arrange **curated premium bookings at top 4 and 5-star hotels** in Mathura and Vrindavan, and we handle the day-trip logistics, so your visit is comfortable and stress-free. During Holi and Radhashtami, good rooms vanish early, so book well ahead.",
    ],
  },
  faqTitle: "Frequently Asked Questions About Barsana",
  faqs: [
    { q: "How many stairs are there in Radha Rani Temple Barsana?", a: "The commonly quoted figure is around 200 to 250 steps. The stairway is broad with resting landings, and most people take 15 to 30 minutes, depending on pace." },
    { q: "Is there any ropeway or lift in Barsana temple?", a: "To my knowledge, there is no regular ropeway or lift in operation for pilgrims, though ideas have been discussed over the years. Please confirm before you travel. For those who cannot climb, local palanquin (doli) bearers carry passengers up for a fee, which you should agree on in advance." },
    { q: "What is the distance between Vrindavan and Barsana?", a: "About 55 to 60 km, roughly 1.5 hours by road, depending on traffic." },
    { q: "What is the distance between Mathura and Barsana?", a: "About 45 to 55 km, roughly 1 to 1.5 hours by road." },
    { q: "What is the Barsana to Nandgaon distance?", a: "About 8 to 10 km, a drive of 20 to 30 minutes." },
    { q: "How is Lathmar Holi played?", a: "The men of Nandgaon visit Barsana with shields and sing teasing songs, and the women of Barsana playfully strike them with wooden sticks (lathis) amid clouds of gulal, drums and folk music. The next day, the celebration continues in Nandgaon." },
    { q: "When is Lathmar Holi celebrated?", a: "In Phalgun (usually late February or March), a few days before the main Holi day. The exact dates change every year with the lunar calendar, so please check before you book." },
    { q: "Is Lathmar Holi safe for tourists?", a: "Yes, with preparation. Stay in the viewing areas, protect your eyes and phone, wear old clothes, keep valuables at the hotel and go as a group or with a guide. Women and families should choose safer spots away from the densest crowd." },
    { q: "What is the best time to visit Barsana?", a: "October to March for pleasant weather. Holi (February or March) and Radhashtami (August or September) are the festival peaks, and they are very crowded." },
    { q: "How long does it take to see Barsana?", a: "About 3 to 4 hours for the main temples and spots. Add Nandgaon, and a full day makes the visit relaxed." },
    { q: "What are the Radha Rani Temple Barsana timings?", a: "Generally from early morning until around noon, and then from the afternoon until about 8:30 or 9 p.m. Timings change with the season and festivals, so always reconfirm." },
    { q: "What is Kirti Mandir Barsana known for?", a: "It is a modern white marble temple dedicated to Kirti Maiya, Radha's mother, known for its elegant architecture and peaceful gardens." },
    { q: "How do I reach Barsana from Mathura?", a: "By private cab, which is the most comfortable and flexible, or by local bus and shared vehicle. The drive takes about 1 to 1.5 hours." },
    { q: "Is Barsana suitable for senior citizens?", a: "Yes, with planning. The stairs are the main challenge, and palanquin carriers, slow pacing and rest stops make it possible. We plan gentler routes and timings for elders." },
    { q: "How much does a Barsana trip package cost?", a: packagePrice },
  ],
  book: {
    title: "Book Your Barsana Trip with Local Experts",
    paragraphs: [
      `Barsana is not a place for rushing. It is a place for climbing slowly, for listening to old women sing, for watching the morning light fall across a hill that remembers a girl named Radha. I would be honoured to guide you there. ${trackRecord}, and we plan every day the way a Brijwasi would plan it for his own family.`,
      `Our **customised Barsana packages start from just ${price}**, with clear quotes and no hidden charges. We can arrange **curated premium stays at top 4 and 5-star hotels** in Mathura or Vrindavan, with comfortable day trips to Barsana and Nandgaon, so you return each evening to rest. If you plan to come for Lathmar Holi or Radhashtami, please call early, since good rooms and vehicles disappear weeks ahead.`,
      tellMe,
    ],
    closing: "Radha Rani does not ask you to be perfect. She only asks you to come, and to bring a little love.",
    formTitle: `Tell ${FOUNDER.name} about your Barsana trip`,
  },
  continuePlanning: [
    { label: "Nandgaon", text: "Krishna's boyhood home, 8 to 10 km away", href: "/nandgaon" },
    { label: "Govardhan", text: "Giriraj, the 21 km Parikrama and Radha Kund", href: "/govardhan" },
    { label: "Vrindavan", text: "Banke Bihari, Prem Mandir and the ghats", href: "/vrindavan" },
    { label: "Festivals of Braj", text: "Lathmar Holi, Radhashtami and more", href: "/festivals" },
  ],
};
