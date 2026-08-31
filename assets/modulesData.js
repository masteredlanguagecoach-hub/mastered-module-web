// EXACT 32 REAL CURRICULUM MODULES & HELPER UTILITIES
window.LIVE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzOKO05chNfJPD65-gHSLQ8y-Mv1GOTalpsTwGfUqmWy-jpI9rx01nibRSppYy22UwL/exec";
var LIVE_APPS_SCRIPT_URL = window.LIVE_APPS_SCRIPT_URL;
const THUMBNAILS = [
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80"
];

const EXACT_32_MODULES = [
  {
    "moduleId": "MOD-01",
    "moduleNumber": 1,
    "title": "Module 1: Self Introduction",
    "description": "After completing this module, you will be able to:\n✔ Master Self Introduction concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/qY1dBHaozn8",
    "audio": "https://drive.google.com/file/d/1n6SsfzENammsejKtUVOonv2xuwFsyjl7/view",
    "pdf": "https://drive.google.com/file/d/1MC8atyCkDeoHh3hl1c33ye1_yQs-z20K/view",
    "published": true,
    "order": 1
  },
  {
    "moduleId": "MOD-02",
    "moduleNumber": 2,
    "title": "Module 2: Talking About Other People",
    "description": "After completing this module, you will be able to:\n✔ Master Talking About Other People concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/ETfmAM0XhQY",
    "audio": "https://drive.google.com/file/d/1HKEUPtwx8zpWE74kYaasSBHwL7gNuMmw/view",
    "pdf": "https://drive.google.com/file/d/1U08-bKu6rfOl4djVL9ChYva-UXajlIH1/view",
    "published": true,
    "order": 2
  },
  {
    "moduleId": "MOD-03",
    "moduleNumber": 3,
    "title": "Module 3: Family, Possessions & Demonstratives",
    "description": "After completing this module, you will be able to:\n✔ Master Family, Possessions & Demonstratives concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/Gt5RE3cMMzM",
    "audio": "https://drive.google.com/file/d/1EtombvuV3lfKRCTRbTHAlt14CLGI06mo/view",
    "pdf": "https://drive.google.com/file/d/1ODilgHaZjxpe9aq3A7I4ESMpwjNBl_SR/view",
    "published": true,
    "order": 3
  },
  {
    "moduleId": "MOD-04",
    "moduleNumber": 4,
    "title": "Module 4: Expressing Abilities & Polite Requests",
    "description": "After completing this module, you will be able to:\n✔ Master Expressing Abilities & Polite Requests concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/jGwmAHihh3Q",
    "audio": "https://drive.google.com/file/d/1u4F9cY0WLYOHvSE129UfNy3CSlB2jGXA/view",
    "pdf": "https://drive.google.com/file/d/1UeVlzB_c8zH9QqYcZbSH-FuxYUk4l3Uo/view",
    "published": true,
    "order": 4
  },
  {
    "moduleId": "MOD-05",
    "moduleNumber": 5,
    "title": "Module 5: Daily Routines & Habits",
    "description": "After completing this module, you will be able to:\n✔ Master Daily Routines & Habits concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/EN1xR1Ls18o",
    "audio": "https://drive.google.com/file/d/1tIRct9SAqVvn6wNaCgB8pshuywv2HIrg/view",
    "pdf": "https://drive.google.com/file/d/1WiVma-RG7arjb9jY3GUlfO2Q_PrWXPUu/view",
    "published": true,
    "order": 5
  },
  {
    "moduleId": "MOD-06",
    "moduleNumber": 6,
    "title": "Module 6: Actions Happening Now",
    "description": "After completing this module, you will be able to:\n✔ Master Actions Happening Now concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/CgB90wh1Cd0",
    "audio": "https://drive.google.com/file/d/1kPrs0QsehrhXA_xToocMW4z9NjJLIlUu/view",
    "pdf": "https://drive.google.com/file/d/127y_t0WNp7JQCP1t1BhzxG7wN-K2jFkG/view",
    "published": true,
    "order": 6
  },
  {
    "moduleId": "MOD-07",
    "moduleNumber": 7,
    "title": "Module 7: Talking About Past Events",
    "description": "After completing this module, you will be able to:\n✔ Master Talking About Past Events concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/8LNvDVDi07c",
    "audio": "https://drive.google.com/file/d/1ffTYpvhkBaRxb22G0lsJlcviw1o81iPx/view",
    "pdf": "https://drive.google.com/file/d/1_NOOxcCZ2W8qX9X2Fc4qUXT1_C7IsdeT/view",
    "published": true,
    "order": 7
  },
  {
    "moduleId": "MOD-08",
    "moduleNumber": 8,
    "title": "Module 8: Future Plans & Intentions",
    "description": "After completing this module, you will be able to:\n✔ Master Future Plans & Intentions concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/UNlX2illWA4",
    "audio": "https://drive.google.com/file/d/1NsZte7_9TnY-9kyopzg_XvTqz1JsWWWE/view",
    "pdf": "https://drive.google.com/file/d/1zFChwG8AdX5iAENWKiyCAGW1qUW1xdAl/view",
    "published": true,
    "order": 8
  },
  {
    "moduleId": "MOD-09",
    "moduleNumber": 9,
    "title": "Module 9: Simple Present Mastery",
    "description": "After completing this module, you will be able to:\n✔ Master Simple Present Mastery concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/9b85gxkJyC4",
    "audio": "https://drive.google.com/file/d/1WLf6XpRb5Ay6Iog_ay4Lj-l7IvMklhtW/view",
    "pdf": "https://drive.google.com/file/d/1Sp0fO5iperm6UcNYDNqgElYty59XgN7z/view",
    "published": true,
    "order": 9
  },
  {
    "moduleId": "MOD-10",
    "moduleNumber": 10,
    "title": "Module 10: Simple Present Playbook",
    "description": "After completing this module, you will be able to:\n✔ Master Simple Present Playbook concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/hZ7zIa-F80A",
    "audio": "https://drive.google.com/file/d/1i8at0jfbokN4PJgQeH7wXt3R0kgYcDMR/view",
    "pdf": "https://drive.google.com/file/d/1pvk6IcCwGCr1A9u54csNrpI6jDten41H/view",
    "published": true,
    "order": 10
  },
  {
    "moduleId": "MOD-11",
    "moduleNumber": 11,
    "title": "Module 11: Simple Present Mastery Dashboard",
    "description": "After completing this module, you will be able to:\n✔ Master Simple Present Mastery Dashboard concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/XS8uVg_v_Oc",
    "audio": "https://drive.google.com/file/d/1iDqcg2EMutwurymHTESsSaEr_zjgqXiV/view",
    "pdf": "https://drive.google.com/file/d/1ELhCRjIB0GLZI108GBP4YPMTxgaBzBfT/view",
    "published": true,
    "order": 11
  },
  {
    "moduleId": "MOD-12",
    "moduleNumber": 12,
    "title": "Module 12: Present Continuous Mastery",
    "description": "After completing this module, you will be able to:\n✔ Master Present Continuous Mastery concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/sQ5Nr8Bn6RM",
    "audio": "https://drive.google.com/file/d/1ItzSSMg5_bu7fhk3AApQlW-iDIfG4Nvq/view",
    "pdf": "https://drive.google.com/file/d/1hFa_uFankpX-_xyuIPS4muAr7sjH6vsA/view",
    "published": true,
    "order": 12
  },
  {
    "moduleId": "MOD-13",
    "moduleNumber": 13,
    "title": "Module 13: Present Continuous Playbook",
    "description": "After completing this module, you will be able to:\n✔ Master Present Continuous Playbook concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/vAGZCnyIDK8",
    "audio": "https://drive.google.com/file/d/1m5DAjfdPJjyz0SlmBf9Y_nG_UNaB_JHP/view",
    "pdf": "https://drive.google.com/file/d/1YkqjP5qYbUqtEim2QylTfVHjh9G-TBKK/view",
    "published": true,
    "order": 13
  },
  {
    "moduleId": "MOD-14",
    "moduleNumber": 14,
    "title": "Module 14: Past Tense Mastery",
    "description": "After completing this module, you will be able to:\n✔ Master Past Tense Mastery concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/7JbA5yfFsow",
    "audio": "https://drive.google.com/file/d/1dsenRRLevrXBi2-99ydG0crxNHtP1paB/view",
    "pdf": "https://drive.google.com/file/d/1Y5L8Dcqah9X8CHjx92oYls94eHLyoLjg/view",
    "published": true,
    "order": 14
  },
  {
    "moduleId": "MOD-15",
    "moduleNumber": 15,
    "title": "Module 15: Simple Past Mastery",
    "description": "After completing this module, you will be able to:\n✔ Master Simple Past Mastery concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/MNmfhTX0ewE",
    "audio": "https://drive.google.com/file/d/11eBiEamRPBXBs7s7ywEPxRCL7SZoGH_l/view",
    "pdf": "https://drive.google.com/file/d/1mCAgesjByIJIxjirWJ24nQl4lPASHxTc/view",
    "published": true,
    "order": 15
  },
  {
    "moduleId": "MOD-16",
    "moduleNumber": 16,
    "title": "Module 16: Storytelling",
    "description": "After completing this module, you will be able to:\n✔ Master Storytelling concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/XQ8HONOLkbc",
    "audio": "https://drive.google.com/file/d/1HSQCk0bsdyZukk1CvgFpEKvapUmmlBu8/view",
    "pdf": "https://drive.google.com/file/d/1UK7mr1MM40QDKQwYFqOFn6BkWhRbiws6/view",
    "published": true,
    "order": 16
  },
  {
    "moduleId": "MOD-17",
    "moduleNumber": 17,
    "title": "Module 17: Interrupted Actions",
    "description": "After completing this module, you will be able to:\n✔ Master Interrupted Actions concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/q2910xQMbkY",
    "audio": "https://drive.google.com/file/d/13bpfqAzsEuviZ3I3AUd6h4xuAu6USWJv/view",
    "pdf": "https://drive.google.com/file/d/1PBmK9UXxsEe5pZEJL5sBfllVz8ihlx-X/view",
    "published": true,
    "order": 17
  },
  {
    "moduleId": "MOD-18",
    "moduleNumber": 18,
    "title": "Module 18: Present Perfect Mastery",
    "description": "After completing this module, you will be able to:\n✔ Master Present Perfect Mastery concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/1kLBlmHHPIo",
    "audio": "https://drive.google.com/file/d/1hWXMwFG0K9PrwnOQmXWgw-UsXnDRvvVJ/view",
    "pdf": "https://drive.google.com/file/d/1Ztsg0ApRux5QEyfF_62kQ0eROeXBWHp2/view",
    "published": true,
    "order": 18
  },
  {
    "moduleId": "MOD-19",
    "moduleNumber": 19,
    "title": "Module 19: Present Perfect Blueprint",
    "description": "After completing this module, you will be able to:\n✔ Master Present Perfect Blueprint concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/x1zBRtcnnAI",
    "audio": "https://drive.google.com/file/d/15ysZpuzSqp1PcVlFt4KX9bRozgVUaDWk/view",
    "pdf": "https://drive.google.com/file/d/1-pFrMUhQzIcxidvkGCrigdHfkbF2ONFk/view",
    "published": true,
    "order": 19
  },
  {
    "moduleId": "MOD-20",
    "moduleNumber": 20,
    "title": "Module 20: Future Plans Blueprint",
    "description": "After completing this module, you will be able to:\n✔ Master Future Plans Blueprint concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/HZklzyQQBCY",
    "audio": "https://drive.google.com/file/d/1LtMFUv0uk0OszGlflDgE5SseLZAxp1w_/view",
    "pdf": "https://drive.google.com/file/d/1j39oU6LBQDYdrv14-gEJ1m5Tc4g1JnL6/view",
    "published": true,
    "order": 20
  },
  {
    "moduleId": "MOD-21",
    "moduleNumber": 21,
    "title": "Module 21: Future Tense Mastery",
    "description": "After completing this module, you will be able to:\n✔ Master Future Tense Mastery concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/p1v0HCwen88",
    "audio": "https://drive.google.com/file/d/1V0MMkFPmjAd_-qDMjH78MwVf_Sj375RB/view",
    "pdf": "https://drive.google.com/file/d/1T87MGUXx00nkIDMKM9U86UEJzcFRw3H4/view",
    "published": true,
    "order": 21
  },
  {
    "moduleId": "MOD-22",
    "moduleNumber": 22,
    "title": "Module 22: Future Continuous Mastery",
    "description": "After completing this module, you will be able to:\n✔ Master Future Continuous Mastery concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/HwinSDbMlRk",
    "audio": "https://drive.google.com/file/d/1WqMGaUem1G9ZBcXuDmrQqWS8iIVcshMc/view",
    "pdf": "https://drive.google.com/file/d/1KobexEJO4nSIzcz6jOeYy7soSJyZfeJz/view",
    "published": true,
    "order": 22
  },
  {
    "moduleId": "MOD-23",
    "moduleNumber": 23,
    "title": "Module 23: Ongoing Actions",
    "description": "After completing this module, you will be able to:\n✔ Master Ongoing Actions concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/p8jJvRPavbE",
    "audio": "https://drive.google.com/file/d/1ck1BEGBFbcazBmVzPMpDCPi7PlnMbPrn/view",
    "pdf": "https://drive.google.com/file/d/1d3mkyZtDQejyR3hkq8dJfKoiZpwAiAhy/view",
    "published": true,
    "order": 23
  },
  {
    "moduleId": "MOD-24",
    "moduleNumber": 24,
    "title": "Module 24: Shopping and Retail English",
    "description": "After completing this module, you will be able to:\n✔ Master Shopping and Retail English concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/UYK-6kPfWrw",
    "audio": "https://drive.google.com/file/d/1lhezZjKYyLqVzoIpmzQy67M57BMhDFA8/view",
    "pdf": "https://drive.google.com/file/d/1rVbxvFV4y1hvbScyHRnMKVgMDrjjAxtX/view",
    "published": true,
    "order": 24
  },
  {
    "moduleId": "MOD-25",
    "moduleNumber": 25,
    "title": "Module 25: Restaurant English",
    "description": "After completing this module, you will be able to:\n✔ Master Restaurant English concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/s5ulqv6XLY8",
    "audio": "https://drive.google.com/file/d/1IEdDIZPhm0CbSDq4vsfa4iMFNCB3jjIl/view",
    "pdf": "https://drive.google.com/file/d/1dm2tlDF1ppnwJxTJ-H1fUeG1GKB1X99l/view",
    "published": true,
    "order": 25
  },
  {
    "moduleId": "MOD-26",
    "moduleNumber": 26,
    "title": "Module 26: Travel English",
    "description": "After completing this module, you will be able to:\n✔ Master Travel English concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/XQumCcYT2Rg",
    "audio": "https://drive.google.com/file/d/1zCN2tKF3AAZ8PKC9fbEy2hwNIO51qGoA/view",
    "pdf": "https://drive.google.com/file/d/1yBC2mylpNrykB6Yi24bm_Bkr8h1Yh_TB/view",
    "published": true,
    "order": 26
  },
  {
    "moduleId": "MOD-27",
    "moduleNumber": 27,
    "title": "Module 27: Telephone Conversations",
    "description": "After completing this module, you will be able to:\n✔ Master Telephone Conversations concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/SmpktyPjUlc",
    "audio": "https://drive.google.com/file/d/1pvPMA9-vyEgRZPrsW8B3lnxLQRLV-S3e/view",
    "pdf": "https://drive.google.com/file/d/13Zop5qOEm9YOHxouqvoYbgy1OBeZXRl4/view",
    "published": true,
    "order": 27
  },
  {
    "moduleId": "MOD-28",
    "moduleNumber": 28,
    "title": "Module 28: Job Interview English",
    "description": "After completing this module, you will be able to:\n✔ Master Job Interview English concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/RT-9o84kPVg",
    "audio": "https://drive.google.com/file/d/1ExeVodos8Vu4HSffxKJF4FcOz5xjuvN3/view",
    "pdf": "https://drive.google.com/file/d/18SPQp9WjzI-yGpSnv1aHR7yCpqtkLBqA/view",
    "published": true,
    "order": 28
  },
  {
    "moduleId": "MOD-29",
    "moduleNumber": 29,
    "title": "Module 29: Corporate English",
    "description": "After completing this module, you will be able to:\n✔ Master Corporate English concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/sEhS25UO5rM",
    "audio": "https://drive.google.com/file/d/1vYybO_LxdoX9cUsNQBQZwIJDBQ1QO9U3/view",
    "pdf": "https://drive.google.com/file/d/15P_RhEqw3qKbhwCUkj_1HCOASQfn4P-B/view",
    "published": true,
    "order": 29
  },
  {
    "moduleId": "MOD-30",
    "moduleNumber": 30,
    "title": "Module 30: English Mastery",
    "description": "After completing this module, you will be able to:\n✔ Master English Mastery concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/Rs0nFb1YIRM",
    "audio": "https://drive.google.com/file/d/1hpZLrsxOHzP3p01GNB_9V85UyN-_nvwm/view",
    "pdf": "https://drive.google.com/file/d/1w2B9OiMwVg8WW78tlNzYzCL3e9nbUwzU/view",
    "published": true,
    "order": 30
  },
  {
    "moduleId": "MOD-31",
    "moduleNumber": 31,
    "title": "Module 31: Natural Fluency Upgrade",
    "description": "After completing this module, you will be able to:\n✔ Master Natural Fluency Upgrade concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/pXeRrvHvaz0",
    "audio": "https://drive.google.com/file/d/15DT6becc4cCN_iCEKSw8_JiNnF7pqeS5/view",
    "pdf": "https://drive.google.com/file/d/19pIRu5UpWHJDslfZt-1iDSe6z8ONAuzH/view",
    "published": true,
    "order": 31
  },
  {
    "moduleId": "MOD-32",
    "moduleNumber": 32,
    "title": "Module 32: Professional English Mastery",
    "description": "After completing this module, you will be able to:\n✔ Master Professional English Mastery concepts.\n✔ Speak fluently and confidently in real-world scenarios.\n✔ Apply practical English skills daily.",
    "thumbnail": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    "video1": "https://youtu.be/ZAD0qmexpag",
    "audio": "https://drive.google.com/file/d/1dLfNWEscYsFBDe94NBbc6cnAHtORWVLR/view",
    "pdf": "https://drive.google.com/file/d/13ePzk3BeimcIour_QS96_oMGXMio-0Tq/view",
    "published": true,
    "order": 32
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
