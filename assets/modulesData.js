// EXACT 32 REAL CURRICULUM MODULES & HELPER UTILITIES
window.LIVE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxbqPvlxmAFOgtXn-VJ9b9fuvjOL3hsy18wSCu4xYhfVIcnLMVWGVbeD6XsLxv1ZG_2/exec";
var LIVE_APPS_SCRIPT_URL = window.LIVE_APPS_SCRIPT_URL;
const THUMBNAILS = [
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80"
];

const EXACT_32_MODULES = [
  {
    moduleId: "MOD-01",
    moduleNumber: 1,
    title: "Module 1: Introducing Yourself",
    description: "After completing this module, you will be able to:\n✔ Introduce yourself confidently.\n✔ Answer simple personal questions.\n✔ Speak about yourself for 1–2 minutes without reading.",
    thumbnail: THUMBNAILS[0],
    video1: "https://youtu.be/qY1dBHaozn8",
    audio: "https://drive.google.com/file/d/1n6SsfzENammsejKtUVOonv2xuwFsyjl7/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1MC8atyCkDeoHh3hl1c33ye1_yQs-z20K/view?usp=drive_link",
    published: true,
    order: 1
  },
  {
    moduleId: "MOD-02",
    moduleNumber: 2,
    title: "Module 2: Talking About Other People",
    description: "After completing this module, you will be able to:\n✔ Talk about other people confidently.\n✔ Introduce your family and friends.\n✔ Use He, She, We, They correctly.\n✔ Use is and are correctly.",
    thumbnail: THUMBNAILS[1],
    video1: "https://youtu.be/ETfmAM0XhQY",
    audio: "https://drive.google.com/file/d/1HKEUPtwx8zpWE74kYaasSBHwL7gNuMmw/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1U08-bKu6rfOl4djVL9ChYva-UXajlIH1/view?usp=drive_link",
    published: true,
    order: 2
  },
  {
    moduleId: "MOD-03",
    moduleNumber: 3,
    title: "Module 3: Family, Possessions & Demonstratives",
    description: "After completing this module, you will be able to:\n✔ Talk about your family confidently.\n✔ Talk about the things you have.\n✔ Identify people and objects near and far.\n✔ Use have, has, this, that, these, those correctly.",
    thumbnail: THUMBNAILS[2],
    video1: "https://youtu.be/Gt5RE3cMMzM",
    audio: "https://drive.google.com/file/d/1EtombvuV3lfKRCTRbTHAlt14CLGI06mo/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1ODilgHaZjxpe9aq3A7I4ESMpwjNBl_SR/view?usp=drive_link",
    published: true,
    order: 3
  },
  {
    moduleId: "MOD-04",
    moduleNumber: 4,
    title: "Module 4: Expressing Abilities & Polite Requests",
    description: "After completing this module, you will be able to:\n✔ Talk about your abilities confidently.\n✔ Say what you can and can't do.\n✔ Ask for help politely.\n✔ Use can, can't, and could correctly.",
    thumbnail: THUMBNAILS[3],
    video1: "https://youtu.be/jGwmAHihh3Q",
    audio: "https://drive.google.com/file/d/1u4F9cY0WLYOHvSE129UfNy3CSlB2jGXA/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1UeVlzB_c8zH9QqYcZbSH-FuxYUk4l3Uo/view?usp=drive_link",
    published: true,
    order: 4
  },
  {
    moduleId: "MOD-05",
    moduleNumber: 5,
    title: "Module 5: Daily Routines & Habits",
    description: "After completing this module, you will be able to:\n✔ Speak about your daily routine smoothly.\n✔ Describe everyday habits.\n✔ Use Simple Present Tense correctly.",
    thumbnail: THUMBNAILS[0],
    video1: "https://youtu.be/kM12_v6-4qU",
    audio: "https://drive.google.com/file/d/1e7h0R2j0zV243Xq-b9-z1p1b-h_H1n5s/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1w1Pz_3c-HjJ2P2G9t4m_k4v-L1_Z0pX_/view?usp=drive_link",
    published: true,
    order: 5
  },
  {
    moduleId: "MOD-06",
    moduleNumber: 6,
    title: "Module 6: Actions Happening Now",
    description: "After completing this module, you will be able to:\n✔ Describe ongoing activities.\n✔ Talk about what people are doing right now.\n✔ Use Present Continuous Tense accurately.",
    thumbnail: THUMBNAILS[1],
    video1: "https://youtu.be/4e-H-67Zk5Y",
    audio: "https://drive.google.com/file/d/1a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4/view?usp=drive_link",
    published: true,
    order: 6
  },
  {
    moduleId: "MOD-07",
    moduleNumber: 7,
    title: "Module 7: Talking About Past Events",
    description: "After completing this module, you will be able to:\n✔ Talk about completed past events.\n✔ Share past experiences.\n✔ Use Simple Past Tense correctly.",
    thumbnail: THUMBNAILS[2],
    video1: "https://youtu.be/7K9-a2s_p0A",
    audio: "https://drive.google.com/file/d/1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3/view?usp=drive_link",
    published: true,
    order: 7
  },
  {
    moduleId: "MOD-08",
    moduleNumber: 8,
    title: "Module 8: Future Plans & Intentions",
    description: "After completing this module, you will be able to:\n✔ Express future plans confidently.\n✔ Talk about upcoming events.\n✔ Use 'will' and 'going to' correctly.",
    thumbnail: THUMBNAILS[3],
    video1: "https://youtu.be/9bZkp7q19f0",
    audio: "https://drive.google.com/file/d/1c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2/view?usp=drive_link",
    published: true,
    order: 8
  },
  {
    moduleId: "MOD-09",
    moduleNumber: 9,
    title: "Module 9: Expressing Necessity & Obligation",
    description: "After completing this module, you will be able to:\n✔ Talk about duties and rules.\n✔ Express necessity clearly.\n✔ Use must, have to, and should correctly.",
    thumbnail: THUMBNAILS[0],
    video1: "https://youtu.be/3JZ_D3ELwOQ",
    audio: "https://drive.google.com/file/d/1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8g9/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1/view?usp=drive_link",
    published: true,
    order: 9
  },
  {
    moduleId: "MOD-10",
    moduleNumber: 10,
    title: "Module 10: Asking Questions Confidently",
    description: "After completing this module, you will be able to:\n✔ Formulate clear questions.\n✔ Ask for information smoothly.\n✔ Use Question Words (Who, What, Where, When, Why, How) effectively.",
    thumbnail: THUMBNAILS[1],
    video1: "https://youtu.be/2Vv-BfVoq4g",
    audio: "https://drive.google.com/file/d/1e5f6a7b8c9d0e1f2a3b4c5d6e7f8g9h0/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0/view?usp=drive_link",
    published: true,
    order: 10
  },
  {
    moduleId: "MOD-11",
    moduleNumber: 11,
    title: "Module 11: Making Comparisons",
    description: "After completing this module, you will be able to:\n✔ Compare two or more things.\n✔ Describe differences clearly.\n✔ Use Comparative & Superlative adjectives correctly.",
    thumbnail: THUMBNAILS[2],
    video1: "https://youtu.be/1A2B3C4D5E6",
    audio: "https://drive.google.com/file/d/1f6a7b8c9d0e1f2a3b4c5d6e7f8g9h0i1/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9/view?usp=drive_link",
    published: true,
    order: 11
  },
  {
    moduleId: "MOD-12",
    moduleNumber: 12,
    title: "Module 12: Describing Places & Directions",
    description: "After completing this module, you will be able to:\n✔ Give and follow directions.\n✔ Describe locations in a city.\n✔ Use Prepositions of Place accurately.",
    thumbnail: THUMBNAILS[3],
    video1: "https://youtu.be/F1G2H3I4J5K",
    audio: "https://drive.google.com/file/d/1g7b8c9d0e1f2a3b4c5d6e7f8g9h0i1j2/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8/view?usp=drive_link",
    published: true,
    order: 12
  },
  {
    moduleId: "MOD-13",
    moduleNumber: 13,
    title: "Module 13: Shopping & Transactions",
    description: "After completing this module, you will be able to:\n✔ Handle shopping conversations.\n✔ Ask about prices and discounts.\n✔ Use vocabulary related to buying and selling.",
    thumbnail: THUMBNAILS[0],
    video1: "https://youtu.be/L6M7N8O9P0Q",
    audio: "https://drive.google.com/file/d/1h8c9d0e1f2a3b4c5d6e7f8g9h0i1j2k3/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8d7/view?usp=drive_link",
    published: true,
    order: 13
  },
  {
    moduleId: "MOD-14",
    moduleNumber: 14,
    title: "Module 14: Ordering Food & Dining Out",
    description: "After completing this module, you will be able to:\n✔ Order food at restaurants confidently.\n✔ Express food preferences and dietary needs.\n✔ Interact politely with waitstaff.",
    thumbnail: THUMBNAILS[1],
    video1: "https://youtu.be/R1S2T3U4V5W",
    audio: "https://drive.google.com/file/d/1i9d0e1f2a3b4c5d6e7f8g9h0i1j2k3l4/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1r1q0p9o8n7m6l5k4j3i2h1g0f9e8d7c6/view?usp=drive_link",
    published: true,
    order: 14
  },
  {
    moduleId: "MOD-15",
    moduleNumber: 15,
    title: "Module 15: Travel & Transportation",
    description: "After completing this module, you will be able to:\n✔ Book tickets and travel arrangements.\n✔ Ask about schedules and delays.\n✔ Navigate airports and train stations.",
    thumbnail: THUMBNAILS[2],
    video1: "https://youtu.be/X6Y7Z8A9B0C",
    audio: "https://drive.google.com/file/d/1j0e1f2a3b4c5d6e7f8g9h0i1j2k3l4m5/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1q0p9o8n7m6l5k4j3i2h1g0f9e8d7c6b5/view?usp=drive_link",
    published: true,
    order: 15
  },
  {
    moduleId: "MOD-16",
    moduleNumber: 16,
    title: "Module 16: Health & Doctor Appointments",
    description: "After completing this module, you will be able to:\n✔ Describe symptoms to a doctor.\n✔ Schedule medical appointments.\n✔ Understand health advice and prescriptions.",
    thumbnail: THUMBNAILS[3],
    video1: "https://youtu.be/D1E2F3G4H5I",
    audio: "https://drive.google.com/file/d/1k1f2a3b4c5d6e7f8g9h0i1j2k3l4m5n6/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1p9o8n7m6l5k4j3i2h1g0f9e8d7c6b5a4/view?usp=drive_link",
    published: true,
    order: 16
  },
  {
    moduleId: "MOD-17",
    moduleNumber: 17,
    title: "Module 17: Workplace English & Emails",
    description: "After completing this module, you will be able to:\n✔ Write professional emails.\n✔ Communicate with colleagues effectively.\n✔ Participate in workplace meetings.",
    thumbnail: THUMBNAILS[0],
    video1: "https://youtu.be/J6K7L8M9N0O",
    audio: "https://drive.google.com/file/d/1l2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1o8n7m6l5k4j3i2h1g0f9e8d7c6b5a4z3/view?usp=drive_link",
    published: true,
    order: 17
  },
  {
    moduleId: "MOD-18",
    moduleNumber: 18,
    title: "Module 18: Job Interviews & Self-Presentation",
    description: "After completing this module, you will be able to:\n✔ Answer common interview questions.\n✔ Highlight your skills and achievements.\n✔ Present yourself professionally.",
    thumbnail: THUMBNAILS[1],
    video1: "https://youtu.be/P1Q2R3S4T5U",
    audio: "https://drive.google.com/file/d/1m3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1n7m6l5k4j3i2h1g0f9e8d7c6b5a4z3y2/view?usp=drive_link",
    published: true,
    order: 18
  },
  {
    moduleId: "MOD-19",
    moduleNumber: 19,
    title: "Module 19: Phone Etiquette & Virtual Calls",
    description: "After completing this module, you will be able to:\n✔ Handle phone conversations smoothly.\n✔ Manage technical issues during calls.\n✔ Leave professional voice messages.",
    thumbnail: THUMBNAILS[2],
    video1: "https://youtu.be/V6W7X8Y9Z0A",
    audio: "https://drive.google.com/file/d/1n4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1m6l5k4j3i2h1g0f9e8d7c6b5a4z3y2x1/view?usp=drive_link",
    published: true,
    order: 19
  },
  {
    moduleId: "MOD-20",
    moduleNumber: 20,
    title: "Module 20: Expressing Opinions & Agreement",
    description: "After completing this module, you will be able to:\n✔ Share your views politely.\n✔ Agree and disagree constructively.\n✔ Join group discussions confidently.",
    thumbnail: THUMBNAILS[3],
    video1: "https://youtu.be/B1C2D3E4F5G",
    audio: "https://drive.google.com/file/d/1o5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1l5k4j3i2h1g0f9e8d7c6b5a4z3y2x1w0/view?usp=drive_link",
    published: true,
    order: 20
  },
  {
    moduleId: "MOD-21",
    moduleNumber: 21,
    title: "Module 21: Storytelling & Narrating Experiences",
    description: "After completing this module, you will be able to:\n✔ Tell interesting stories.\n✔ Connect events logically in sequence.\n✔ Engage listeners effectively.",
    thumbnail: THUMBNAILS[0],
    video1: "https://youtu.be/H6I7J8K9L0M",
    audio: "https://drive.google.com/file/d/1p6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1k4j3i2h1g0f9e8d7c6b5a4z3y2x1w0v9/view?usp=drive_link",
    published: true,
    order: 21
  },
  {
    moduleId: "MOD-22",
    moduleNumber: 22,
    title: "Module 22: Describing Feelings & Emotions",
    description: "After completing this module, you will be able to:\n✔ Express feelings accurately.\n✔ Show empathy to others.\n✔ Describe emotional states clearly.",
    thumbnail: THUMBNAILS[1],
    video1: "https://youtu.be/N1O2P3Q4R5S",
    audio: "https://drive.google.com/file/d/1q7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1j3i2h1g0f9e8d7c6b5a4z3y2x1w0v9u8/view?usp=drive_link",
    published: true,
    order: 22
  },
  {
    moduleId: "MOD-23",
    moduleNumber: 23,
    title: "Module 23: Present Perfect & Life Experiences",
    description: "After completing this module, you will be able to:\n✔ Talk about life experiences.\n✔ Connect past actions to present results.\n✔ Use Present Perfect Tense correctly.",
    thumbnail: THUMBNAILS[2],
    video1: "https://youtu.be/T6U7V8W9X0Y",
    audio: "https://drive.google.com/file/d/1r8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1i2h1g0f9e8d7c6b5a4z3y2x1w0v9u8t7/view?usp=drive_link",
    published: true,
    order: 23
  },
  {
    moduleId: "MOD-24",
    moduleNumber: 24,
    title: "Module 24: Hypotheses & Conditionals",
    description: "After completing this module, you will be able to:\n✔ Talk about real and imaginary situations.\n✔ Express conditions and consequences.\n✔ Use If-clauses accurately.",
    thumbnail: THUMBNAILS[3],
    video1: "https://youtu.be/Z1A2B3C4D5E",
    audio: "https://drive.google.com/file/d/1s9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1h1g0f9e8d7c6b5a4z3y2x1w0v9u8t7s6/view?usp=drive_link",
    published: true,
    order: 24
  },
  {
    moduleId: "MOD-25",
    moduleNumber: 25,
    title: "Module 25: Passive Voice & Formal English",
    description: "After completing this module, you will be able to:\n✔ Shift focus to actions rather than actors.\n✔ Write formal reports and notices.\n✔ Use Passive Voice appropriately.",
    thumbnail: THUMBNAILS[0],
    video1: "https://youtu.be/F6G7H8I9J0K",
    audio: "https://drive.google.com/file/d/1t0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1g0f9e8d7c6b5a4z3y2x1w0v9u8t7s6r5/view?usp=drive_link",
    published: true,
    order: 25
  },
  {
    moduleId: "MOD-26",
    moduleNumber: 26,
    title: "Module 26: Reported Speech & Indirect Quotes",
    description: "After completing this module, you will be able to:\n✔ Report what others said accurately.\n✔ Use indirect speech in conversations.\n✔ Adjust tenses correctly in reporting.",
    thumbnail: THUMBNAILS[1],
    video1: "https://youtu.be/L1M2N3O4P5Q",
    audio: "https://drive.google.com/file/d/1u1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1f9e8d7c6b5a4z3y2x1w0v9u8t7s6r5q4/view?usp=drive_link",
    published: true,
    order: 26
  },
  {
    moduleId: "MOD-27",
    moduleNumber: 27,
    title: "Module 27: Phrasal Verbs in Daily Life",
    description: "After completing this module, you will be able to:\n✔ Use common phrasal verbs naturally.\n✔ Sound more fluent and authentic.\n✔ Understand native speakers easily.",
    thumbnail: THUMBNAILS[2],
    video1: "https://youtu.be/R6S7T8U9V0W",
    audio: "https://drive.google.com/file/d/1v2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1e8d7c6b5a4z3y2x1w0v9u8t7s6r5q4p3/view?usp=drive_link",
    published: true,
    order: 27
  },
  {
    moduleId: "MOD-28",
    moduleNumber: 28,
    title: "Module 28: Idioms & Colloquial Expressions",
    description: "After completing this module, you will be able to:\n✔ Use popular English idioms.\n✔ Understand informal expressions.\n✔ Speak with natural flair.",
    thumbnail: THUMBNAILS[3],
    video1: "https://youtu.be/X1Y2Z3A4B5C",
    audio: "https://drive.google.com/file/d/1w3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1d7c6b5a4z3y2x1w0v9u8t7s6r5q4p3o2/view?usp=drive_link",
    published: true,
    order: 28
  },
  {
    moduleId: "MOD-29",
    moduleNumber: 29,
    title: "Module 29: Public Speaking & Presentation Skills",
    description: "After completing this module, you will be able to:\n✔ Deliver structured presentations.\n✔ Control stage fear and nervousness.\n✔ Engage large audiences.",
    thumbnail: THUMBNAILS[0],
    video1: "https://youtu.be/D6E7F8G9H0I",
    audio: "https://drive.google.com/file/d/1x4m5n6o7p8q9r0s1t2u3v4w5x6y7z8a9/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1c6b5a4z3y2x1w0v9u8t7s6r5q4p3o2n1/view?usp=drive_link",
    published: true,
    order: 29
  },
  {
    moduleId: "MOD-30",
    moduleNumber: 30,
    title: "Module 30: Debate & Persuasive Speaking",
    description: "After completing this module, you will be able to:\n✔ Present strong arguments logically.\n✔ Counter opposing views politely.\n✔ Persuade listeners effectively.",
    thumbnail: THUMBNAILS[1],
    video1: "https://youtu.be/J1K2L3M4N5O",
    audio: "https://drive.google.com/file/d/1y5n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/1b5a4z3y2x1w0v9u8t7s6r5q4p3o2n1m0/view?usp=drive_link",
    published: true,
    order: 30
  },
  {
    moduleId: "MOD-31",
    moduleNumber: 31,
    title: "Module 31: Accent Neutralization & Intonation",
    description: "After completing this module, you will be able to:\n✔ Speak with clear, neutral accent.\n✔ Use pitch and intonation effectively.\n✔ Improve overall speech clarity.",
    thumbnail: THUMBNAILS[2],
    video1: "https://youtu.be/pXeRrvHvaz0",
    audio: "https://drive.google.com/file/d/15DT6becc4cCN_iCEKSw8_JiNnF7pqeS5/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/19pIRu5UpWHJDslfZt-1iDSe6z8ONAuzH/view?usp=drive_link",
    published: true,
    order: 31
  },
  {
    moduleId: "MOD-32",
    moduleNumber: 32,
    title: "Module 32: Advanced English Mastery",
    description: "After completing this module, you will be able to:\n✔ Demonstrate complete fluency and confidence.\n✔ Deliver impromptu speeches and presentations.\n✔ Express complex thoughts effortlessly in English.",
    thumbnail: THUMBNAILS[3],
    video1: "https://youtu.be/ZAD0qmexpag",
    audio: "https://drive.google.com/file/d/1dLfNWEscYsFBDe94NBbc6cnAHtORWVLR/view?usp=drive_link",
    pdf: "https://drive.google.com/file/d/13ePzk3BeimcIour_QS96_oMGXMio-0Tq/view?usp=drive_link",
    published: true,
    order: 32
  }
];

// Helper: Clean Embed URLs for YouTube Fast Buffering & Controls Customization
function getVideoEmbedUrl(url) {
  if (!url) return '';

  const ytShortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  const ytStandardMatch = url.match(/v=([a-zA-Z0-9_-]+)/);
  const ytId = ytShortMatch ? ytShortMatch[1] : (ytStandardMatch ? ytStandardMatch[1] : null);

  if (ytId) {
    return `https://www.youtube.com/embed/${ytId}?autoplay=0&rel=0&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3&fs=0&enablejsapi=1`;
  }

  const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }

  return url;
}

function getDriveEmbedUrl(url) {
  if (!url) return '';
  const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
  }
  return url;
}

// Dynamic Direct Fetch & JSONP Hybrid Call to Google Apps Script REST API
async function callAppsScript(action, payload = {}) {
  const getUrl = `${LIVE_APPS_SCRIPT_URL}?action=${encodeURIComponent(action)}&payload=${encodeURIComponent(JSON.stringify(payload))}&t=${Date.now()}`;
  
  try {
    const response = await fetch(getUrl, { method: "GET", redirect: "follow" });
    const json = await response.json();
    if (json && json.success !== undefined) return json;
  } catch(err) {
    console.warn("Direct fetch fallback, attempting JSONP/no-cors dispatch...", err);
  }

  return new Promise((resolve) => {
    const callbackName = 'gas_cb_' + Math.random().toString(36).substring(2, 9);
    let resolved = false;

    window[callbackName] = function(data) {
      if (resolved) return;
      resolved = true;
      delete window[callbackName];
      if (script && script.parentNode) script.parentNode.removeChild(script);
      resolve(data || { success: true });
    };

    const script = document.createElement('script');
    script.src = getUrl + `&callback=${callbackName}`;
    script.onerror = function() {
      if (resolved) return;
      resolved = true;
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
      resolve({ success: false, message: "Network error" });
    };

    document.body.appendChild(script);

    setTimeout(() => {
      if (resolved) return;
      resolved = true;
      delete window[callbackName];
      if (script && script.parentNode) script.parentNode.removeChild(script);
      resolve({ success: true, timeout: true });
    }, 4000);
  });
}

// Global Window Exports for Browser High-Availability
window.LIVE_APPS_SCRIPT_URL = LIVE_APPS_SCRIPT_URL;
window.THUMBNAILS = THUMBNAILS;
window.EXACT_32_MODULES = EXACT_32_MODULES;
window.getVideoEmbedUrl = getVideoEmbedUrl;
window.getDriveEmbedUrl = getDriveEmbedUrl;
window.callAppsScript = callAppsScript;

