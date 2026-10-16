import type { PhotoKey } from "./images";

export type Town = "Vrindavan" | "Mathura" | "Govardhan" | "Barsana" | "Nandgaon" | "Gokul" | "Baldeo";

export const towns: Town[] = ["Vrindavan", "Mathura", "Govardhan", "Barsana", "Nandgaon", "Gokul", "Baldeo"];

export type TimingWindow = { label: string; time: string };

export type Temple = {
  slug: string;
  name: string;
  town: Town;
  image: PhotoKey;
  /** One-line card summary. */
  summary: string;
  /** Short timing note shown on cards. */
  timingNote: string;
  history: string[];
  timings: { season: string; windows: TimingWindow[] }[];
  dressCode: string;
  tips: string[];
  nearby: string[];
  /** Google Maps search query. */
  mapQuery: string;
  goodToKnow?: string;
};

export const TIMING_DISCLAIMER =
  "Timings are approximate and change with the season, festivals and temple decisions. Darshan can close at short notice — please confirm on the day, and we will check for you on your trip.";

export const temples: Temple[] = [
  {
    slug: "banke-bihari",
    name: "Shri Banke Bihari Temple",
    town: "Vrindavan",
    image: "banke-bihari",
    summary: "The beating heart of Vrindavan — an intimate, joyful darshan of Thakur ji in his tribhanga pose.",
    timingNote: "Morning & evening darshan; closed in the afternoon",
    history: [
      "The deity of Banke Bihari ji is said to have appeared to the saint-musician Swami Haridas in Nidhivan, in answer to his devotional singing. For many years Thakur ji was worshipped in the grove before the present temple was built in the 1860s by devotees of the Goswami community that still serves here.",
      "What makes darshan here unlike anywhere else is its tenderness. A curtain is drawn across the sanctum every few minutes, so that devotees do not gaze too long — the belief is that Bihari ji might be drawn away with a loving devotee. There are no bells and no conch; the mood is of a beloved child or friend rather than a distant king.",
      "On Janmashtami night the rare mangala aarti takes place, and in the summer months the temple is decorated with intricate flower palaces known as Phool Bangla.",
    ],
    timings: [
      { season: "Summer (approx. Holi to Diwali)", windows: [{ label: "Morning", time: "7:45 am – 12:00 noon" }, { label: "Evening", time: "5:30 pm – 9:30 pm" }] },
      { season: "Winter (approx. Diwali to Holi)", windows: [{ label: "Morning", time: "8:45 am – 1:00 pm" }, { label: "Evening", time: "4:30 pm – 8:30 pm" }] },
    ],
    dressCode: "Modest Indian or covered clothing. Footwear is left outside — use the paid stands nearby.",
    tips: [
      "Weekends, Ekadashi and festival days are extremely crowded; a weekday morning is calmest.",
      "Keep spectacles, phones and bags secure — the lanes are narrow and monkeys are bold.",
      "Seniors and children should avoid peak festival crowds; we can suggest quieter time slots.",
      "Phool Bangla decorations in summer evenings are worth timing your visit for.",
    ],
    nearby: ["nidhivan", "radha-vallabh", "seva-kunj"],
    mapQuery: "Shri Banke Bihari Temple Vrindavan",
  },
  {
    slug: "prem-mandir",
    name: "Prem Mandir",
    town: "Vrindavan",
    image: "prem-mandir-night",
    summary: "A shining white-marble temple of divine love, famous for its gardens and evening illumination.",
    timingNote: "Open morning & evening; lights after sunset",
    history: [
      "Prem Mandir — the Temple of Love — was established by Jagadguru Shri Kripalu Ji Maharaj and opened to devotees in 2012. Built from Italian marble over more than a decade, its walls are carved with scenes from the lives of Radha Krishna and Sita Ram.",
      "The surrounding gardens hold life-size tableaux of Krishna’s leelas: lifting Govardhan hill, the raas with the gopis, and the subduing of Kaliya naag. As dusk falls, the entire temple glows in slowly changing colours, and a musical fountain show is usually held in the evening.",
    ],
    timings: [
      { season: "Most of the year", windows: [{ label: "Morning", time: "5:30 am – 12:00 noon" }, { label: "Evening", time: "4:30 pm – 8:30 pm" }] },
    ],
    goodToKnow: "The evening light and fountain show timing shifts with sunset — usually around 7:00 pm in summer and earlier in winter.",
    dressCode: "Modest clothing. Shoes are deposited at the free counter near the entrance.",
    tips: [
      "Arrive about 30 minutes before sunset to see the temple in daylight and then lit up.",
      "Photography is generally allowed in the gardens but not inside the sanctum.",
      "It is a short drive from ISKCON on the Chhatikara road, so the two pair well in one evening.",
    ],
    nearby: ["iskcon-krishna-balaram", "banke-bihari", "rangji"],
    mapQuery: "Prem Mandir Vrindavan",
  },
  {
    slug: "iskcon-krishna-balaram",
    name: "ISKCON Krishna-Balaram Mandir",
    town: "Vrindavan",
    image: "iskcon",
    summary: "A serene temple of kirtan and aarti at Raman Reti, home to Krishna-Balaram and Radha-Shyamasundar.",
    timingNote: "Early mangala aarti; open till late evening",
    history: [
      "The Krishna-Balaram Mandir was opened in 1975 by A.C. Bhaktivedanta Swami Prabhupada, founder of the International Society for Krishna Consciousness. It stands at Raman Reti, the sandy forest where Krishna and Balaram are said to have played as children.",
      "Three altars hold Gaura-Nitai, Krishna-Balaram and Radha-Shyamasundar. The courtyard is filled with continuous kirtan, and the marble samadhi of Srila Prabhupada sits beside the temple.",
    ],
    timings: [
      { season: "Most of the year", windows: [{ label: "Morning", time: "4:30 am – 12:45 pm" }, { label: "Evening", time: "4:00 pm – 8:30 pm" }] },
    ],
    dressCode: "Modest clothing; shoes off at the counter. Bags may be checked at the gate.",
    tips: [
      "The early mangala aarti (around 4:30 am) is a beautiful, unhurried experience.",
      "The guesthouse restaurant serves simple sattvic meals.",
      "A good first stop for families — it is spacious and well organised.",
    ],
    nearby: ["prem-mandir", "rangji", "banke-bihari"],
    mapQuery: "ISKCON Sri Sri Krishna Balaram Mandir Vrindavan",
  },
  {
    slug: "nidhivan",
    name: "Nidhivan",
    town: "Vrindavan",
    image: "nidhivan",
    summary: "A mysterious tulsi grove where Radha Krishna are believed to perform raas leela every night.",
    timingNote: "Daytime only; closed after evening aarti",
    history: [
      "Nidhivan is a walled grove of short, twisted tulsi trees in the old part of Vrindavan. Local belief holds that Radha and Krishna come here each night for the raas leela, so the gates are closed after the evening aarti and no one stays inside.",
      "Inside is the Rang Mahal, where a bed and adornments are prepared for the divine couple every evening, and the spot where Banke Bihari ji appeared to Swami Haridas. The saint’s samadhi is also here.",
    ],
    timings: [
      { season: "Most of the year", windows: [{ label: "Open", time: "approx. 5:00 am – 8:00 pm (closes around dusk aarti)" }] },
    ],
    dressCode: "Modest clothing; shoes are left at the entrance.",
    tips: [
      "Hold on to spectacles and phones — the monkeys here are notorious.",
      "Local guides inside often ask for donations; it is fine to politely decline.",
      "It is a five-minute walk from Banke Bihari, so most people combine the two.",
    ],
    nearby: ["banke-bihari", "seva-kunj", "radha-vallabh"],
    mapQuery: "Nidhivan Vrindavan",
  },
  {
    slug: "seva-kunj",
    name: "Seva Kunj",
    town: "Vrindavan",
    image: "seva-kunj",
    summary: "A quiet sacred garden where Krishna is said to have served Radha — with Lalita Kund and the Rang Mahal.",
    timingNote: "Daytime only; closed at night",
    history: [
      "Also called Nikunjvan, Seva Kunj is a garden of dense, low trees where, according to tradition, Krishna lovingly served Radharani — combing her hair and pressing her feet. As at Nidhivan, the garden is closed at night out of respect for the divine pastimes believed to take place here.",
      "Within the grounds are the small Rang Mahal shrine and Lalita Kund, said to have been created by Krishna for the thirsty gopi Lalita.",
    ],
    timings: [
      { season: "Most of the year", windows: [{ label: "Open", time: "approx. 5:00 am – 8:00 pm (closes around dusk)" }] },
    ],
    dressCode: "Modest clothing; shoes off at the gate.",
    tips: [
      "Combine with Radha Vallabh temple, which is in the same lanes.",
      "Quieter in the late morning than right after opening.",
    ],
    nearby: ["radha-vallabh", "nidhivan", "radha-raman"],
    mapQuery: "Seva Kunj Vrindavan",
  },
  {
    slug: "radha-raman",
    name: "Shri Radha Raman Temple",
    town: "Vrindavan",
    image: "radha-raman",
    summary: "One of Vrindavan’s seven original Goswami temples, with a self-manifested shaligram deity.",
    timingNote: "Short morning & evening darshan windows",
    history: [
      "Radha Raman ji is believed to have manifested from a shaligram shila worshipped by Gopal Bhatta Goswami, one of the great saints of the Gaudiya tradition, in 1542. Unlike many early deities of Vrindavan, Radha Raman ji never left the town during times of upheaval and has been worshipped here continuously.",
      "The temple is also known for its kitchen hearth, which tradition says has been kept alight for close to five centuries. Seva is performed by descendants of the Goswami family in a refined, intimate style.",
    ],
    timings: [
      { season: "Summer", windows: [{ label: "Morning", time: "8:00 am – 12:30 pm" }, { label: "Evening", time: "6:00 pm – 8:30 pm" }] },
      { season: "Winter", windows: [{ label: "Morning", time: "8:30 am – 1:00 pm" }, { label: "Evening", time: "5:30 pm – 8:00 pm" }] },
    ],
    dressCode: "Modest Indian clothing is preferred; shoes off outside.",
    tips: [
      "Darshan windows are shorter than at bigger temples — plan this one first in the morning.",
      "Photography is usually not allowed inside.",
    ],
    nearby: ["radha-vallabh", "seva-kunj", "madan-mohan"],
    mapQuery: "Shri Radha Raman Temple Vrindavan",
  },
  {
    slug: "radha-vallabh",
    name: "Shri Radha Vallabh Temple",
    town: "Vrindavan",
    image: "radha-vallabh",
    summary: "The temple of the Radha Vallabh sampradaya, where Radha is worshipped through a crown beside Krishna.",
    timingNote: "Morning & evening darshan",
    history: [
      "Radha Vallabh ji was established in Vrindavan in the 16th century by Shri Hit Harivansh Mahaprabhu, founder of the Radha Vallabh tradition. In this tradition there is no separate murti of Radha; instead she is represented by a crown placed beside Krishna, emphasising their oneness.",
      "The old red-sandstone temple dates from the Mughal era, and the newer temple beside it continues daily seva with rich samaj gayan — the singing of devotional poetry.",
    ],
    timings: [
      { season: "Most of the year", windows: [{ label: "Morning", time: "5:30 am – 12:00 noon" }, { label: "Evening", time: "6:00 pm – 9:00 pm" }] },
    ],
    dressCode: "Modest clothing; shoes left outside.",
    tips: ["Evening samaj gayan is a lovely, lesser-known experience.", "Very close to Seva Kunj and Banke Bihari."],
    nearby: ["seva-kunj", "banke-bihari", "radha-raman"],
    mapQuery: "Shri Radha Vallabh Temple Vrindavan",
  },
  {
    slug: "govind-dev-ji",
    name: "Govind Dev Ji Temple",
    town: "Vrindavan",
    image: "govind-dev",
    summary: "A monumental red-sandstone temple from 1590 — one of the finest pieces of temple architecture in North India.",
    timingNote: "Morning & evening darshan",
    history: [
      "Built in 1590 by Raja Man Singh of Amber for the deity discovered by Rupa Goswami, Govind Dev Ji was once one of the largest temples in North India, said to have risen seven storeys. Its upper levels were lost during the late 17th century, and the original deity was taken to safety — today it is worshipped in Jaipur.",
      "What remains is a cathedral-like hall of red sandstone with a vaulted ceiling, a striking blend of Hindu and Mughal-era building styles. A replica deity continues to be worshipped here.",
    ],
    timings: [
      { season: "Most of the year", windows: [{ label: "Morning", time: "7:00 am – 12:00 noon" }, { label: "Evening", time: "5:00 pm – 8:00 pm" }] },
    ],
    dressCode: "Modest clothing; shoes off outside the hall.",
    tips: ["Bring a wide-angle view in mind — the interior is best appreciated by standing back.", "Usually less crowded than temples in the Banke Bihari lanes."],
    nearby: ["rangji", "madan-mohan", "radha-raman"],
    mapQuery: "Govind Dev Ji Temple Vrindavan",
  },
  {
    slug: "madan-mohan",
    name: "Shri Radha Madan Mohan Temple",
    town: "Vrindavan",
    image: "madan-mohan",
    summary: "Vrindavan’s oldest surviving temple, rising above the old bank of the Yamuna near Kali Ghat.",
    timingNote: "Morning & evening darshan",
    history: [
      "The tall, tapering spire of Madan Mohan temple stands on Dwadashaditya Tila, a small hill near Kali Ghat. The temple was established for the deity worshipped by Sanatana Goswami in the 16th century, and is considered the oldest surviving temple in Vrindavan.",
      "The original deity was later moved to Karauli in Rajasthan for safety, and a pratibhu (representative) deity is worshipped here. The hill offers a peaceful view over the old town.",
    ],
    timings: [
      { season: "Most of the year", windows: [{ label: "Morning", time: "7:00 am – 12:00 noon" }, { label: "Evening", time: "5:00 pm – 8:00 pm" }] },
    ],
    dressCode: "Modest clothing; shoes off at the steps.",
    tips: ["A short climb of steps — manageable for most seniors at an easy pace.", "Sunset from the hill is lovely in winter."],
    nearby: ["radha-raman", "govind-dev-ji", "nidhivan"],
    mapQuery: "Radha Madan Mohan Temple Vrindavan",
  },
  {
    slug: "rangji",
    name: "Shri Rangji Temple",
    town: "Vrindavan",
    image: "rangji",
    summary: "A grand South Indian-style temple to Shri Ranganath, with a towering gopuram and golden flag pillar.",
    timingNote: "Morning & evening darshan",
    history: [
      "Rangji Mandir was built in the mid-19th century by the Seth family of Mathura in the Dravidian style, with high gopuram gateways, a sacred tank and a tall gold-plated dhvaja stambha. It is dedicated to Shri Ranganath, a form of Vishnu, worshipped here in the tradition of the Sri Vaishnava saints.",
      "Its annual Brahmotsav in spring, with a grand wooden chariot procession, is one of Vrindavan’s most colourful festivals.",
    ],
    timings: [
      { season: "Most of the year", windows: [{ label: "Morning", time: "5:30 am – 11:00 am" }, { label: "Evening", time: "4:00 pm – 9:00 pm" }] },
    ],
    dressCode: "Modest clothing; leather items may be restricted inside — ask at the gate.",
    tips: ["Photography rules differ in the outer and inner courtyards.", "Close to Govind Dev Ji — see both in an hour."],
    nearby: ["govind-dev-ji", "iskcon-krishna-balaram", "prem-mandir"],
    mapQuery: "Shri Rangji Mandir Vrindavan",
  },
  {
    slug: "krishna-janmabhoomi",
    name: "Shri Krishna Janmabhoomi",
    town: "Mathura",
    image: "janmabhoomi",
    summary: "The sacred birthplace of Shri Krishna in Mathura, with the prison-cell shrine and Bhagavata Bhavan.",
    timingNote: "Long morning & evening hours; strict security",
    history: [
      "According to tradition, Shri Krishna was born to Devaki and Vasudeva in a prison cell of King Kamsa at this spot in Mathura. The complex today includes the Garbha Griha — a small shrine marking the birthplace — the Keshav Dev temple and the large Bhagavata Bhavan with its painted ceilings.",
      "Janmashtami here is one of the great celebrations of India, culminating in the midnight abhishek of the Lord.",
    ],
    timings: [
      { season: "Summer", windows: [{ label: "Morning", time: "5:00 am – 12:00 noon" }, { label: "Evening", time: "4:00 pm – 9:30 pm" }] },
      { season: "Winter", windows: [{ label: "Morning", time: "5:30 am – 12:00 noon" }, { label: "Evening", time: "3:00 pm – 8:30 pm" }] },
    ],
    goodToKnow: "Phones, cameras, bags, belts and many electronic items are not permitted inside. Lockers are available near the entrance, or leave items in the car.",
    dressCode: "Modest clothing; expect a security frisking.",
    tips: [
      "Carry as little as possible to move through security quickly.",
      "Allow 60–90 minutes for the full complex.",
      "On Janmashtami the queues can stretch for hours — plan with us well ahead.",
    ],
    nearby: ["dwarkadhish", "vishram-ghat"],
    mapQuery: "Shri Krishna Janmabhoomi Mathura",
  },
  {
    slug: "dwarkadhish",
    name: "Dwarkadhish Temple",
    town: "Mathura",
    image: "dwarkadhish",
    summary: "An ornate 19th-century haveli temple in old Mathura, famed for its monsoon jhula festival.",
    timingNote: "Short darshan windows; closed midday",
    history: [
      "The Dwarkadhish temple was built in 1814 by Seth Gokul Das Parikh, treasurer of the Gwalior state, in the style of a grand Rajasthani haveli. Worship follows the Pushti Marg tradition, where darshan opens for short periods through the day, timed to the Lord’s daily routine.",
      "In the monsoon month of Shravan (July–August), the temple is famous for its jhula (swing) festival, when Thakur ji is placed on swings of gold, silver and flowers.",
    ],
    timings: [
      { season: "Summer", windows: [{ label: "Morning", time: "6:30 am – 10:30 am" }, { label: "Evening", time: "4:00 pm – 7:00 pm" }] },
      { season: "Winter", windows: [{ label: "Morning", time: "6:30 am – 10:30 am" }, { label: "Evening", time: "3:30 pm – 6:30 pm" }] },
    ],
    dressCode: "Modest clothing; shoes off outside.",
    tips: [
      "Darshan opens in short slots, so we time this visit carefully on Mathura days.",
      "Walk down to Vishram Ghat afterwards — it is only a few minutes away.",
    ],
    nearby: ["vishram-ghat", "krishna-janmabhoomi"],
    mapQuery: "Dwarkadhish Temple Mathura",
  },
  {
    slug: "vishram-ghat",
    name: "Vishram Ghat",
    town: "Mathura",
    image: "vishram-ghat",
    summary: "Mathura’s principal ghat, where Krishna rested after defeating Kamsa — and home to the evening Yamuna aarti.",
    timingNote: "Open all day; aarti around sunset",
    history: [
      "Vishram means rest: tradition says that Shri Krishna rested at this spot on the Yamuna after defeating King Kamsa. It is the central ghat among the many that line Mathura’s riverfront and is the traditional start and end point of the Braj parikrama.",
      "Every evening, priests perform the Yamuna aarti with large brass lamps while devotees float leaf-cup diyas on the water.",
    ],
    timings: [
      { season: "Year-round", windows: [{ label: "Ghat", time: "Open all day" }, { label: "Evening aarti", time: "around sunset (approx. 6:00–7:00 pm in summer, earlier in winter)" }] },
    ],
    dressCode: "Modest clothing; the steps can be slippery — wear easy footwear until you reach the water.",
    tips: [
      "Reach 20–30 minutes before aarti to find a good spot on the steps.",
      "A short boat ride at dusk gives the best view of the aarti.",
      "Agree boat fares before boarding.",
    ],
    nearby: ["dwarkadhish", "krishna-janmabhoomi"],
    mapQuery: "Vishram Ghat Mathura",
  },
  {
    slug: "radha-rani-temple-barsana",
    name: "Shri Radha Rani Temple (Shriji Mandir)",
    town: "Barsana",
    image: "radha-rani-barsana",
    summary: "The hilltop palace-temple of Shri Radha in Barsana, centre of the famous Lathmar Holi.",
    timingNote: "Morning & evening darshan; steps or ropeway",
    history: [
      "Barsana is revered as the home of Shri Radha, daughter of King Vrishabhanu. The Shriji or Ladli ji temple crowns Bhanugarh hill, its red sandstone arches and domes visible from across the plain.",
      "Each spring, Barsana and neighbouring Nandgaon celebrate Lathmar Holi — a playful re-enactment of Krishna and his friends teasing the gopis, who chase them away with sticks.",
    ],
    timings: [
      { season: "Summer", windows: [{ label: "Morning", time: "5:00 am – 2:00 pm" }, { label: "Evening", time: "5:00 pm – 9:00 pm" }] },
      { season: "Winter", windows: [{ label: "Morning", time: "5:30 am – 2:00 pm" }, { label: "Evening", time: "5:00 pm – 8:30 pm" }] },
    ],
    goodToKnow: "The temple is reached by a long flight of stone steps. A ropeway has operated in recent years — check whether it is running on your date.",
    dressCode: "Modest clothing; comfortable footwear for the steps (removed at the temple).",
    tips: [
      "Go early in the morning to climb before the heat.",
      "On Radhashtami and Holi the town fills to capacity — book transport early.",
      "Pair with Nandgaon, just 8 km away.",
    ],
    nearby: ["nand-bhawan-nandgaon", "daan-ghati-govardhan"],
    mapQuery: "Shri Radha Rani Temple Barsana",
  },
  {
    slug: "nand-bhawan-nandgaon",
    name: "Nand Bhawan, Nandgaon",
    town: "Nandgaon",
    image: "nandgaon-holi",
    summary: "The hilltop home of Nanda Maharaj and Yashoda, where Krishna spent his childhood years.",
    timingNote: "Morning & evening darshan",
    history: [
      "Nandgaon sits on Nandishwar hill, a short drive from Barsana. Tradition says that Nanda Maharaj moved his family and herds here from Gokul, and that Krishna and Balaram grew up in this village.",
      "The Nand Bhawan temple honours Nanda, Yashoda, Krishna and Balaram together. The day after Barsana’s Lathmar Holi, the women of Nandgaon host their own celebration for the men of Barsana.",
    ],
    timings: [
      { season: "Most of the year", windows: [{ label: "Morning", time: "5:00 am – 1:00 pm" }, { label: "Evening", time: "4:30 pm – 8:30 pm" }] },
    ],
    dressCode: "Modest clothing; shoes off at the temple.",
    tips: ["Vehicles can get close to the top; a short climb remains.", "Visit together with Barsana on the same day."],
    nearby: ["radha-rani-temple-barsana", "daan-ghati-govardhan"],
    mapQuery: "Nand Bhawan Nandgaon",
  },
  {
    slug: "daan-ghati-govardhan",
    name: "Daan Ghati Temple, Govardhan",
    town: "Govardhan",
    image: "daan-ghati",
    summary: "The Giriraj ji temple where most pilgrims begin the 21 km Govardhan Parikrama.",
    timingNote: "Open from early morning; busiest on Purnima",
    history: [
      "Govardhan hill — Giriraj ji — is worshipped as a form of Krishna himself, who lifted it on his finger to shelter the people of Braj from Indra’s storms. The Daan Ghati temple stands where the main road crosses the hill and is the most common starting point for parikrama.",
      "Devotees offer milk abhishek to the sacred stone of Giriraj ji here before setting out.",
    ],
    timings: [
      { season: "Most of the year", windows: [{ label: "Morning", time: "approx. 5:00 am – 12:00 noon" }, { label: "Evening", time: "approx. 4:00 pm – 9:00 pm" }] },
    ],
    dressCode: "Modest clothing. Many devotees walk the parikrama barefoot.",
    tips: [
      "Purnima (full moon) and Guru Purnima draw very large crowds.",
      "If walking the parikrama, start before dawn to avoid the heat.",
    ],
    nearby: ["mukharvind-govardhan", "radha-rani-temple-barsana"],
    mapQuery: "Daan Ghati Temple Govardhan",
  },
  {
    slug: "mukharvind-govardhan",
    name: "Mukharvind & Mansi Ganga, Govardhan",
    town: "Govardhan",
    image: "mansi-ganga",
    summary: "The ‘lotus face’ of Giriraj ji, worshipped beside the sacred lake of Mansi Ganga.",
    timingNote: "Open most of the day",
    history: [
      "Mukharvind means ‘lotus face’. At the Mukharvind shrines — the best known at Mansi Ganga and at Jatipura — Giriraj ji is worshipped as the face of the Lord, and devotees offer milk, sweets and flowers.",
      "Mansi Ganga, the large stepped lake at the centre of Govardhan town, is said to have been manifested from Krishna’s mind. It is lined with temples and old chhatris.",
    ],
    timings: [
      { season: "Most of the year", windows: [{ label: "Open", time: "approx. 5:00 am – 9:00 pm (with short closures)" }] },
    ],
    dressCode: "Modest clothing; barefoot near the shrines.",
    tips: ["Evening deep daan on the lake during Kartik is especially beautiful.", "Easily reached by e-rickshaw from Daan Ghati."],
    nearby: ["daan-ghati-govardhan", "radha-rani-temple-barsana"],
    mapQuery: "Mukharvind Mansi Ganga Govardhan",
  },
  {
    slug: "gokul",
    name: "Gokul & Raman Reti",
    town: "Gokul",
    image: "gokul",
    summary: "The riverside village where baby Krishna was raised by Yashoda — with Raman Reti and Brahmand Ghat nearby.",
    timingNote: "Morning & evening darshan at most shrines",
    history: [
      "Across the Yamuna from Mathura lies Gokul, where Vasudeva carried the newborn Krishna to safety on the night of his birth. Here Krishna was raised by Nanda and Yashoda, and the village is full of shrines remembering his childhood pranks.",
      "Nearby are Raman Reti, a sandy grove where devotees roll in the sand where the Lord played, and Brahmand Ghat, where Yashoda is said to have seen the whole universe in little Krishna’s mouth.",
    ],
    timings: [
      { season: "Most of the year", windows: [{ label: "Morning", time: "6:00 am – 12:00 noon" }, { label: "Evening", time: "4:00 pm – 8:00 pm" }] },
    ],
    dressCode: "Modest clothing; shoes off at each shrine.",
    tips: ["Agree any priest or guide donation upfront.", "Combine with Dauji temple in Baldeo for a half-day circuit."],
    nearby: ["dauji-baldeo", "vishram-ghat"],
    mapQuery: "Gokul Mathura temple",
  },
  {
    slug: "dauji-baldeo",
    name: "Shri Dauji Temple, Baldeo",
    town: "Baldeo",
    image: "dauji",
    summary: "The temple of Balarama — Krishna’s elder brother — with his consort Revati, famous for the Huranga festival.",
    timingNote: "Morning & evening darshan",
    history: [
      "Baldeo, south-east of Mathura, is dedicated to Shri Balarama, lovingly called Dauji (elder brother). The temple houses a striking black stone deity of Dauji with Revati Maiya.",
      "The day after Holi, Baldeo celebrates Huranga — a boisterous festival in which women playfully drench and tear the shirts of the men, who sing and dance in reply.",
    ],
    timings: [
      { season: "Most of the year", windows: [{ label: "Morning", time: "6:00 am – 12:00 noon" }, { label: "Evening", time: "4:00 pm – 8:00 pm" }] },
    ],
    dressCode: "Modest clothing; shoes off at the gate.",
    tips: ["Try the famous makhan-mishri offered around the temple.", "Huranga day is extremely crowded and wet — dress accordingly."],
    nearby: ["gokul", "vishram-ghat"],
    mapQuery: "Dauji Temple Baldeo",
  },
];

export function getTemple(slug: string): Temple | undefined {
  return temples.find((t) => t.slug === slug);
}

export function getTemples(slugs: string[]): Temple[] {
  return slugs.map(getTemple).filter((t): t is Temple => Boolean(t));
}
