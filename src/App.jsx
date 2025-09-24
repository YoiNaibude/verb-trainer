import React, { useMemo, useState, useEffect } from "react";


// ---------- French verbs dataset ----------
const FR_DATA = {
  parler: {
    irregular: false,
    present: { "je": "parle", "tu": "parles", "il/elle/on": "parle", "nous": "parlons", "vous": "parlez", "ils/elles": "parlent" },
    "passé composé": { "je": "ai parlé" },
    imparfait: { "je": "parlais", "tu": "parlais", "il/elle/on": "parlait", "nous": "parlions", "vous": "parliez", "ils/elles": "parlaient" },
    subjonctif: { "que je": "parle", "que tu": "parles", "qu'il/elle/on": "parle", "que nous": "parlions", "que vous": "parliez", "qu'ils/elles": "parlent" },
    impératif: { "(tu)": "parle", "(nous)": "parlons", "(vous)": "parlez" },
  },
  être: {
    irregular: true,
    present: { "je": "suis", "tu": "es", "il/elle/on": "est", "nous": "sommes", "vous": "êtes", "ils/elles": "sont" },
    "passé composé": { "je": "ai été" },
    imparfait: { "je": "étais", "tu": "étais", "il/elle/on": "était", "nous": "étions", "vous": "étiez", "ils/elles": "étaient" },
    subjonctif: { "que je": "sois", "que tu": "sois", "qu'il/elle/on": "soit", "que nous": "soyons", "que vous": "soyez", "qu'ils/elles": "soient" },
    impératif: { "(tu)": "sois", "(nous)": "soyons", "(vous)": "soyez" },
  },
  avoir: {
    irregular: true,
    present: { "j'/je": "ai", "tu": "as", "il/elle/on": "a", "nous": "avons", "vous": "avez", "ils/elles": "ont" },
    "passé composé": { "je": "ai eu" },
    imparfait: { "je": "avais", "tu": "avais", "il/elle/on": "avait", "nous": "avions", "vous": "aviez", "ils/elles": "avaient" },
    subjonctif: { "que je": "aie", "que tu": "aies", "qu'il/elle/on": "ait", "que nous": "ayons", "que vous": "ayez", "qu'ils/elles": "aient" },
    impératif: { "(tu)": "aie", "(nous)": "ayons", "(vous)": "ayez" },
  },
  aller: {
    irregular: true,
    present: { "je": "vais", "tu": "vas", "il/elle/on": "va", "nous": "allons", "vous": "allez", "ils/elles": "vont" },
    "passé composé": { "je": "suis allé(e)" },
    imparfait: { "je": "allais", "tu": "allais", "il/elle/on": "allait", "nous": "allions", "vous": "alliez", "ils/elles": "allaient" },
    subjonctif: { "que je": "aille", "que tu": "ailles", "qu'il/elle/on": "aille", "que nous": "allions", "que vous": "alliez", "qu'ils/elles": "aillent" },
    impératif: { "(tu)": "va", "(nous)": "allons", "(vous)": "allez" },
  },
  partir: {
    irregular: true,
    present: { "je": "pars", "tu": "pars", "il/elle/on": "part", "nous": "partons", "vous": "partez", "ils/elles": "partent" },
    "passé composé": { "je": "suis parti(e)" },
    imparfait: { "je": "partais", "tu": "partais", "il/elle/on": "partait", "nous": "partions", "vous": "partiez", "ils/elles": "partaient" },
    subjonctif: { "que je": "parte", "que tu": "partes", "qu'il/elle/on": "parte", "que nous": "partions", "que vous": "partiez", "qu'ils/elles": "partent" },
    impératif: { "(tu)": "pars", "(nous)": "partons", "(vous)": "partez" },
  },
  lire: {
    irregular: true,
    present: { "je": "lis", "tu": "lis", "il/elle/on": "lit", "nous": "lisons", "vous": "lisez", "ils/elles": "lisent" },
    "passé composé": { "je": "ai lu" },
    imparfait: { "je": "lisais", "tu": "lisais", "il/elle/on": "lisait", "nous": "lisions", "vous": "lisiez", "ils/elles": "lisaient" },
    subjonctif: { "que je": "lise", "que tu": "lises", "qu'il/elle/on": "lise", "que nous": "lisions", "que vous": "lisiez", "qu'ils/elles": "lisent" },
    impératif: { "(tu)": "lis", "(nous)": "lisons", "(vous)": "lisez" },
  },
  écrire: {
    irregular: true,
    present: { "j'/je": "écris", "tu": "écris", "il/elle/on": "écrit", "nous": "écrivons", "vous": "écrivez", "ils/elles": "écrivent" },
    "passé composé": { "je": "ai écrit" },
    imparfait: { "je": "écrivais", "tu": "écrivais", "il/elle/on": "écrivait", "nous": "écrivions", "vous": "écriviez", "ils/elles": "écrivaient" },
    subjonctif: { "que je": "écrive", "que tu": "écrives", "qu'il/elle/on": "écrive", "que nous": "écrivions", "que vous": "écriviez", "qu'ils/elles": "écrivent" },
    impératif: { "(tu)": "écris", "(nous)": "écrivons", "(vous)": "écrivez" },
  },
  mettre: {
    irregular: true,
    present: { "je": "mets", "tu": "mets", "il/elle/on": "met", "nous": "mettons", "vous": "mettez", "ils/elles": "mettent" },
    "passé composé": { "je": "ai mis" },
    imparfait: { "je": "mettais", "tu": "mettais", "il/elle/on": "mettait", "nous": "mettions", "vous": "mettiez", "ils/elles": "mettaient" },
    subjonctif: { "que je": "mette", "que tu": "mettes", "qu'il/elle/on": "mette", "que nous": "mettions", "que vous": "mettiez", "qu'ils/elles": "mettent" },
    impératif: { "(tu)": "mets", "(nous)": "mettons", "(vous)": "mettez" },
  },
  connaître: {
    irregular: true,
    present: { "je": "connais", "tu": "connais", "il/elle/on": "connaît", "nous": "connaissons", "vous": "connaissez", "ils/elles": "connaissent" },
    "passé composé": { "je": "ai connu" },
    imparfait: { "je": "connaissais", "tu": "connaissais", "il/elle/on": "connaissait", "nous": "connaissions", "vous": "connaissiez", "ils/elles": "connaissaient" },
    subjonctif: { "que je": "connaisse", "que tu": "connaisses", "qu'il/elle/on": "connaisse", "que nous": "connaissions", "que vous": "connaissiez", "qu'ils/elles": "connaissent" },
    impératif: { "(tu)": "connais", "(nous)": "connaissons", "(vous)": "connaissez" },
  },
  voir: {
    irregular: true,
    present: { "je": "vois", "tu": "vois", "il/elle/on": "voit", "nous": "voyons", "vous": "voyez", "ils/elles": "voient" },
    "passé composé": { "je": "ai vu" },
    imparfait: { "je": "voyais", "tu": "voyais", "il/elle/on": "voyait", "nous": "voyions", "vous": "voyiez", "ils/elles": "voyaient" },
    subjonctif: { "que je": "voie", "que tu": "voies", "qu'il/elle/on": "voie", "que nous": "voyions", "que vous": "voyiez", "qu'ils/elles": "voient" },
    impératif: { "(tu)": "vois", "(nous)": "voyons", "(vous)": "voyez" },
  },
  savoir: {
    irregular: true,
    present: { "je": "sais", "tu": "sais", "il/elle/on": "sait", "nous": "savons", "vous": "savez", "ils/elles": "savent" },
    "passé composé": { "je": "ai su" },
    imparfait: { "je": "savais", "tu": "savais", "il/elle/on": "savait", "nous": "savions", "vous": "saviez", "ils/elles": "savaient" },
    subjonctif: { "que je": "sache", "que tu": "saches", "qu'il/elle/on": "sache", "que nous": "sachions", "que vous": "sachiez", "qu'ils/elles": "sachent" },
    impératif: { "(tu)": "sache", "(nous)": "sachons", "(vous)": "sachez" },
  },
  boire: {
    irregular: true,
    present: { "je": "bois", "tu": "bois", "il/elle/on": "boit", "nous": "buvons", "vous": "buvez", "ils/elles": "boivent" },
    "passé composé": { "je": "ai bu" },
    imparfait: { "je": "buvais", "tu": "buvais", "il/elle/on": "buvait", "nous": "buvions", "vous": "buviez", "ils/elles": "buvaient" },
    subjonctif: { "que je": "boive", "que tu": "boives", "qu'il/elle/on": "boive", "que nous": "buvions", "que vous": "buviez", "qu'ils/elles": "boivent" },
    impératif: { "(tu)": "bois", "(nous)": "buvons", "(vous)": "buvez" },
  },
  devoir: {
    irregular: true,
    present: { "je": "dois", "tu": "dois", "il/elle/on": "doit", "nous": "devons", "vous": "devez", "ils/elles": "doivent" },
    "passé composé": { "je": "ai dû" },
    imparfait: { "je": "devais", "tu": "devais", "il/elle/on": "devait", "nous": "devions", "vous": "deviez", "ils/elles": "devaient" },
    subjonctif: { "que je": "doive", "que tu": "doives", "qu'il/elle/on": "doive", "que nous": "devions", "que vous": "deviez", "qu'ils/elles": "doivent" },
    // Imperative is rare; providing forms for practice completeness
    impératif: { "(tu)": "dois", "(nous)": "devons", "(vous)": "devez" },
  },
  pouvoir: {
    irregular: true,
    present: { "je": "peux", "tu": "peux", "il/elle/on": "peut", "nous": "pouvons", "vous": "pouvez", "ils/elles": "peuvent" },
    "passé composé": { "je": "ai pu" },
    imparfait: { "je": "pouvais", "tu": "pouvais", "il/elle/on": "pouvait", "nous": "pouvions", "vous": "pouviez", "ils/elles": "pouvaient" },
    subjonctif: { "que je": "puisse", "que tu": "puisses", "qu'il/elle/on": "puisse", "que nous": "puissions", "que vous": "puissiez", "qu'ils/elles": "puissent" },
    // Imperative commonly avoided; omit so trainer skips it
  },
  prendre: {
    irregular: true,
    present: { "je": "prends", "tu": "prends", "il/elle/on": "prend", "nous": "prenons", "vous": "prenez", "ils/elles": "prennent" },
    "passé composé": { "je": "ai pris" },
    imparfait: { "je": "prenais", "tu": "prenais", "il/elle/on": "prenait", "nous": "prenions", "vous": "preniez", "ils/elles": "prenaient" },
    subjonctif: { "que je": "prenne", "que tu": "prennes", "qu'il/elle/on": "prenne", "que nous": "prenions", "que vous": "preniez", "qu'ils/elles": "prennent" },
    impératif: { "(tu)": "prends", "(nous)": "prenons", "(vous)": "prenez" },
  },
  recevoir: {
    irregular: true,
    present: { "je": "reçois", "tu": "reçois", "il/elle/on": "reçoit", "nous": "recevons", "vous": "recevez", "ils/elles": "reçoivent" },
    "passé composé": { "je": "ai reçu" },
    imparfait: { "je": "recevais", "tu": "recevais", "il/elle/on": "recevait", "nous": "recevions", "vous": "receviez", "ils/elles": "recevaient" },
    subjonctif: { "que je": "reçoive", "que tu": "reçoives", "qu'il/elle/on": "reçoive", "que nous": "recevions", "que vous": "receviez", "qu'ils/elles": "reçoivent" },
    impératif: { "(tu)": "reçois", "(nous)": "recevons", "(vous)": "recevez" },
  },
  venir: {
    irregular: true,
    present: { "je": "viens", "tu": "viens", "il/elle/on": "vient", "nous": "venons", "vous": "venez", "ils/elles": "viennent" },
    "passé composé": { "je": "suis venu(e)" },
    imparfait: { "je": "venais", "tu": "venais", "il/elle/on": "venait", "nous": "venions", "vous": "veniez", "ils/elles": "venaient" },
    subjonctif: { "que je": "vienne", "que tu": "viennes", "qu'il/elle/on": "vienne", "que nous": "venions", "que vous": "veniez", "qu'ils/elles": "viennent" },
    impératif: { "(tu)": "viens", "(nous)": "venons", "(vous)": "venez" },
  },
  vouloir: {
    irregular: true,
    present: { "je": "veux", "tu": "veux", "il/elle/on": "veut", "nous": "voulons", "vous": "voulez", "ils/elles": "veulent" },
    "passé composé": { "je": "ai voulu" },
    imparfait: { "je": "voulais", "tu": "voulais", "il/elle/on": "voulait", "nous": "voulions", "vous": "vouliez", "ils/elles": "voulaient" },
    subjonctif: { "que je": "veuille", "que tu": "veuilles", "qu'il/elle/on": "veuille", "que nous": "voulions", "que vous": "vouliez", "qu'ils/elles": "veuillent" },
    impératif: { "(tu)": "veuille", "(nous)": "veuillons", "(vous)": "veuillez" },
  },
};

// ---------- Portuguese dataset ----------
const PT_DATA = {
  // falar: { irregular: false, present: { "eu": "falo", "tu": "falas", "ele/ela/você": "fala", "nós": "falamos", "eles/elas/vocês": "falam" } },
  // ser: { irregular: true, present: { "eu": "sou", "tu": "és", "ele/ela/você": "é", "nós": "somos", "eles/elas/vocês": "são" } },
  // estar: { irregular: false, present: { "eu": "estou", "tu": "estás", "ele/ela/você": "está", "nós": "estamos", "eles/elas/vocês": "estão" } },
  ler: { irregular: true, present: { "eu": "leio", "tu": "lês", "ele/ela/você": "lê", "nós": "lemos", "eles/elas/vocês": "leem" } },
  ver: { irregular: true, present: { "eu": "vejo", "tu": "vês", "ele/ela/você": "vê", "nós": "vemos", "eles/elas/vocês": "veem" } },
  ter: { irregular: true, present: { "eu": "tenho", "tu": "tens", "ele/ela/você": "tem", "nós": "temos", "eles/elas/vocês": "têm" } },
  fazer: { irregular: true, present: { "eu": "faço", "tu": "fazes", "ele/ela/você": "faz", "nós": "fazemos", "eles/elas/vocês": "fazem" } },
  ir: { irregular: true, present: { "eu": "vou", "tu": "vais", "ele/ela/você": "vai", "nós": "vamos", "eles/elas/vocês": "vão" } },
  poder: { irregular: true, present: { "eu": "posso", "tu": "podes", "ele/ela/você": "pode", "nós": "podemos", "eles/elas/vocês": "podem" } },
  querer: { irregular: true, present: { "eu": "quero", "tu": "queres", "ele/ela/você": "quer", "nós": "queremos", "eles/elas/vocês": "querem" } },
  saber: { irregular: true, present: { "eu": "sei", "tu": "sabes", "ele/ela/você": "sabe", "nós": "sabemos", "eles/elas/vocês": "sabem" } },
  "chamar-se": { irregular: false, present: { "eu": "me chamo", "tu": "te chamas", "ele/ela/você": "se chama", "nós": "nos chamamos", "eles/elas/vocês": "se chamam" } },
  dizer: { irregular: true, present: { "eu": "digo", "tu": "dizes", "ele/ela/você": "diz", "nós": "dizemos",  "eles/elas/vocês": "dizem" } },
  dar: { irregular: true, present: { "eu": "dou", "tu": "dás", "ele/ela/você": "dá", "nós": "damos", "eles/elas/vocês": "dão" } },
  subir: { irregular: false, present: { "eu": "subo", "tu": "sobes", "ele/ela/você": "sobe", "nós": "subimos", "eles/elas/vocês": "sobem" } },
  pôr: { irregular: true, present: { "eu": "ponho", "tu": "pões", "ele/ela/você": "põe", "nós": "pomos", "eles/elas/vocês": "põem" } },
  trazer: { irregular: true, present: { "eu": "trago", "tu": "trazes", "ele/ela/você": "traz", "nós": "trazemos", "eles/elas/vocês": "trazem" } },
  vir: { irregular: true, present: { "eu": "venho", "tu": "vens", "ele/ela/você": "vem", "nós": "vimos", "eles/elas/vocês": "vêm" } },
  haver: { irregular: true, present: { "eu": "hei", "tu": "hás", "ele/ela/você": "há", "nós": "havemos", "eles/elas/vocês": "hão" } },
  dormir: { irregular: false, present: { "eu": "durmo", "tu": "dormes", "ele/ela/você": "dorme", "nós": "dormimos", "eles/elas/vocês": "dormem" } },
  ouvir: { irregular: false, present: { "eu": "ouço", "tu": "ouves", "ele/ela/você": "ouve", "nós": "ouvimos", "eles/elas/vocês": "ouvem" } },
  preferir: { irregular: false, present: { "eu": "prefiro", "tu": "preferes", "ele/ela/você": "prefere", "nós": "preferimos", "eles/elas/vocês": "preferem" } },
  // sair: { irregular: true, present: { "eu": "saio", "tu": "sais", "ele/ela/você": "sai", "nós": "saímos",  "eles/elas/vocês": "saem" } },
  // rir: { irregular: true, present: { "eu": "rio", "tu": "ris", "ele/ela/você": "ri", "nós": "rimos", "eles/elas/vocês": "riem" } },
  // cair: { irregular: true, present: { "eu": "caio", "tu": "cais", "ele/ela/você": "cai", "nós": "caímos", "eles/elas/vocês": "caem" } },
  // perder: { irregular: true, present: { "eu": "perco", "tu": "perdes", "ele/ela/você": "perde", "nós": "perdemos", "eles/elas/vocês": "perdem" } },
  // servir: { irregular: false, present: { "eu": "sirvo", "tu": "serves", "ele/ela/você": "serve", "nós": "servimos",  "eles/elas/vocês": "servem" } },
  // pedir: { irregular: false, present: { "eu": "peço", "tu": "pedes", "ele/ela/você": "pede", "nós": "pedimos", "eles/elas/vocês": "pedem" } },
  // passear: { irregular: true, present: { "eu": "passeio", "tu": "passeias", "ele/ela/você": "passeia", "nós": "passeamos", "eles/elas/vocês": "passeiam" } },
};

// ---------- People per tense ----------
const PERSONS = {
  fr: {
    present: ["je", "tu", "il/elle/on", "nous", "vous", "ils/elles"],
    "passé composé": ["je"],
    imparfait: ["je", "tu", "il/elle/on", "nous", "vous", "ils/elles"],
    subjonctif: ["que je", "que tu", "qu'il/elle/on", "que nous", "que vous", "qu'ils/elles"],
    impératif: ["(tu)", "(nous)", "(vous)"],
  },
  pt: {
    present: ["eu", "tu", "ele/ela/você", "nós", "eles/elas/vocês"],
  },
};

// ---------- French tense options (UI labels) ----------
const TENSE_OPTIONS_FR = [
  { id: "present", label: "Present (6 forms)" },
  { id: "passé composé", label: "Passé composé (1 form)" },
  { id: "imparfait", label: "Imparfait (6 forms)" },
  { id: "subjonctif", label: "Subjunctive (6 forms)" },
  { id: "impératif", label: "Imperative (up to 3)" },
];

// ---------- Utilities ----------
const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/’/g, "'").replace(/\s+/g, " ").trim();
const cardId = (lang, inf, tense, person) => `${lang}|${inf}|${tense}|${person}`;

// SM-2-ish review update
function reviewUpdate(card, q) {
  if (card.reps == null) { card.reps = 0; card.interval = 0; card.ease = 2.3; card.new = true; }
  if (q >= 3) {
    if (card.reps === 0) card.interval = 1; // 1 day
    else if (card.reps === 1) card.interval = 3; // 3 days
    else card.interval = Math.round(card.interval * card.ease);
    card.reps += 1;
    card.ease = Math.max(1.3, card.ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  } else {
    card.reps = 0; card.interval = 1; card.ease = Math.max(1.3, (card.ease || 2.3) - 0.2);
  }
  card.dueAt = Date.now() + card.interval * 24*60*60*1000;
  card.new = false;
}

// ---------- Storage ----------
const loadLS = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch { return d; } };
const saveLS = (k, v) => localStorage.setItem(k, JSON.stringify(v));

// ---------- Main component ----------
export default function App() {
  const [phase, setPhase] = useState("landing");
  const [lang, setLang] = useState(null); // 'fr' | 'pt'
  const [tensesFR, setTensesFR] = useState(["present"]);
  const [irregularOnly, setIrregularOnly] = useState(false);
  const [sessionSize, setSessionSize] = useState(() => loadLS("vt_sessionSize", 10));

  // Persisted SRS store
  const [cards, setCards] = useState(() => loadLS("vt_cards_v1", {}));
  useEffect(() => saveLS("vt_cards_v1", cards), [cards]);
  useEffect(() => saveLS("vt_sessionSize", sessionSize), [sessionSize]);

  // Session state
  const [deck, setDeck] = useState([]); // array of Card
  const [current, setCurrent] = useState(null); // current Card
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [doneCount, setDoneCount] = useState(0);

  // Build verb list based on language & filters
  const verbs = useMemo(() => { if (lang === "fr") return FR_DATA; if (lang === "pt") return PT_DATA; return {}; }, [lang]);

  function startSession() {
    const selectedTenses = lang === "fr" ? tensesFR : ["present"]; // PT MVP present only

    // Build potential cards
    const all = [];
    Object.entries(verbs).forEach(([inf, data]) => {
      if (irregularOnly && !data.irregular) return;
      selectedTenses.forEach((tense) => {
        const persons = PERSONS[lang]?.[tense] || [];
        persons.forEach((person) => {
          const forms = data[tense];
          if (!forms) return; // skip if verb lacks this tense
          const answer = forms[person];
          if (!answer) return; // skip if person missing
          const id = cardId(lang, inf, tense, person);
          const base = cards[id] || {
            id,
            meta: { lang, inf, tense, person, irregular: !!data.irregular },
            new: true,
            reps: 0, lapses: 0, ease: 2.3, interval: 0, dueAt: Date.now(), want: false,
          };
          all.push({ ...base, answer });
        });
      });
    });

    // Prioritize due & harder, but shuffle within groups for randomness
    const now = Date.now();
    const due = all.filter(c => c.dueAt <= now && !c.new);
    const news = all.filter(c => c.new);

    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
    const pool = [...shuffle(due), ...shuffle(news)].slice(0, sessionSize);

    setDeck(pool);
    setDoneCount(0);
    setChecked(false);
    setCorrect(false);
    setInput("");
    setPhase("session");
    setCurrent(pool[0] || null);
  }

  function nextCard() {
    if (!current) return;
    const idx = deck.findIndex(d => d.id === current.id);
    const next = deck[idx + 1];
    setCurrent(next || null);
    setChecked(false);
    setCorrect(false);
    setInput("");
    setDoneCount((n) => Math.min(deck.length, n + 1));
  }

  function onCheck() {
    if (!current) return;
    const good = norm(input) === norm(current.answer);
    setChecked(true);
    setCorrect(good);
  }

  function applyGrade(grade) {
    if (!current) return;
    // grade: "known" -> q=4, "more" -> q=2 (+mark want & make immediately due), "continue" -> no SRS change
    if (grade === "continue") { nextCard(); return; }

    const copy = { ...cards };
    const base = copy[current.id] || { ...current };

    if (grade === "known") {
      base.want = false;
      reviewUpdate(base, 4);
    } else if (grade === "more") {
      base.want = true;
      reviewUpdate(base, 2);
      // Prioritize sooner: make it immediately due
      base.dueAt = Date.now() - 1;
    }

    copy[current.id] = base;
    setCards(copy);
    nextCard();
  }

  // -------------- Self-tests (console) --------------
  useEffect(() => {
    try {
      const assert = (cond, msg) => { if (!cond) throw new Error(msg); };
      // norm tests
      assert(norm("Êtes") === "etes", "norm: diacritics removal failed");
      assert(norm("  Je  suis  ") === "je suis", "norm: whitespace normalize failed");
      // reviewUpdate tests
      const c = { reps: 0, interval: 0, ease: 2.3, dueAt: 0, new: true };
      reviewUpdate(c, 4); // first good -> 1 day
      assert(c.interval >= 1, "reviewUpdate: first good should set interval >=1");
      const prevDue = c.dueAt; reviewUpdate(c, 4);
      assert(c.interval >= 3, "reviewUpdate: second good should set interval >=3");
      assert(c.dueAt > prevDue, "reviewUpdate: dueAt should move forward");
      // cardId test
      assert(cardId("fr","parler","present","nous") === "fr|parler|present|nous", "cardId format");
      // PERSONS coverage sanity
      assert(PERSONS.fr.present.length === 6, "French present should have 6 persons");
      // dataset spot-check
      assert(FR_DATA.être.present["je"] === "suis", "être present je");
      console.log("✅ Verb Trainer self-tests passed");
    } catch (e) {
      console.warn("⚠️ Self-test failed:", e.message);
    }
  }, []);

  // -------------- UI Blocks --------------
  const Page = ({ children }) => (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Verb Conjugation Trainer</h1>
          <p className="text-slate-400">French & Portuguese • Guest mode</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl shadow-lg p-5 md:p-8">
          {children}
        </div>
        <div className="mt-4 text-center text-xs text-slate-500">
          Data is stored locally on this device. You can add accounts later to sync.
        </div>
      </div>
    </div>
  );

  if (phase === "landing") {
    return (
      <Page>
        <div className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-3">
            <button disabled className="rounded-xl border border-slate-600 py-3 px-4 opacity-50 cursor-not-allowed">Login</button>
            <button disabled className="rounded-xl border border-slate-600 py-3 px-4 opacity-50 cursor-not-allowed">Register</button>
            <button onClick={() => setPhase("language")} className="rounded-xl bg-indigo-500 hover:bg-indigo-400 py-3 px-4 font-medium">Continue as Guest</button>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-300">
            <div>Session size</div>
            <div className="flex items-center gap-2">
              <input type="range" min={5} max={30} step={1} value={sessionSize} onChange={(e)=>setSessionSize(parseInt(e.target.value))} />
              <span className="tabular-nums w-8 text-right">{sessionSize}</span>
            </div>
          </div>
        </div>
      </Page>
    );
  }

  if (phase === "language") {
    return (
      <Page>
        <div className="grid gap-6">
          <div>
            <div className="text-sm text-slate-300 mb-2">Choose your language</div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => { setLang("fr"); setPhase("tenses"); }} className={`rounded-xl py-3 px-4 border border-slate-600 hover:border-slate-500 ${lang==='fr'?'bg-slate-700':''}`}>French</button>
              <button onClick={() => { setLang("pt"); setPhase("practiceSet"); }} className={`rounded-xl py-3 px-4 border border-slate-600 hover:border-slate-500 ${lang==='pt'?'bg-slate-700':''}`}>Portuguese</button>
            </div>
          </div>
          <div className="flex justify-between">
            <button onClick={()=>setPhase("landing")} className="rounded-xl border border-slate-600 py-2 px-4">Back</button>
            {lang && (
              <button onClick={()=> setPhase(lang==='fr'?"tenses":"practiceSet")} className="rounded-xl bg-indigo-500 hover:bg-indigo-400 py-2 px-4">Next</button>
            )}
          </div>
        </div>
      </Page>
    );
  }

  if (phase === "tenses") {
    const toggle = (id) => setTensesFR((prev) => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
    return (
      <Page>
        <div className="grid gap-6">
          <div>
            <div className="text-sm text-slate-300 mb-2">French tenses (choose one, several, or all)</div>
            <div className="grid sm:grid-cols-2 gap-2">
              {TENSE_OPTIONS_FR.map(t => (
                <label key={t.id} className={`flex items-center gap-2 rounded-xl border border-slate-600 px-3 py-2 cursor-pointer ${tensesFR.includes(t.id)?'bg-slate-700/60':''}`}>
                  <input type="checkbox" checked={tensesFR.includes(t.id)} onChange={()=>toggle(t.id)} />
                  <span>{t.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <button onClick={()=>setPhase("language")} className="rounded-xl border border-slate-600 py-2 px-4">Back</button>
            <button onClick={()=>setPhase("practiceSet")} className="rounded-xl bg-indigo-500 hover:bg-indigo-400 py-2 px-4">Next</button>
          </div>
        </div>
      </Page>
    );
  }

  if (phase === "practiceSet") {
    return (
      <Page>
        <div className="grid gap-6">
          <div className="text-sm text-slate-300">Practice set</div>
          <div className="grid sm:grid-cols-2 gap-3">
            <button onClick={()=>{ setIrregularOnly(false); startSession(); }} className="rounded-xl border border-slate-600 hover:border-slate-500 py-3 px-4">All verbs</button>
            <button onClick={()=>{ setIrregularOnly(true); startSession(); }} className="rounded-xl border border-slate-600 hover:border-slate-500 py-3 px-4">Irregular only</button>
          </div>
          <div className="flex justify-between">
            <button onClick={()=> setPhase(lang==='fr'?"tenses":"language")} className="rounded-xl border border-slate-600 py-2 px-4">Back</button>
          </div>
        </div>
      </Page>
    );
  }

  if (phase === "session") {
    const total = deck.length;
    const remaining = Math.max(0, total - doneCount - (current?1:0));
    return (
      <Page>
        {current ? (
          <div className="grid gap-5">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <div>Mode: {irregularOnly?"Irregular":"All"} • Lang: {lang?.toUpperCase()} {lang==='fr' && `• Tenses: ${tensesFR.join(', ')}`}</div>
              <div>Cards: <span className="tabular-nums">{doneCount+1}</span> / {total}</div>
            </div>

            <div className="rounded-2xl bg-slate-900/60 border border-slate-700 p-5">
              <div className="text-slate-400 mb-1">Infinitive</div>
              <div className="text-2xl font-semibold">{current.meta.inf}</div>
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div><span className="text-slate-400">Tense</span><div className="font-medium">{current.meta.tense}</div></div>
                <div><span className="text-slate-400">Person</span><div className="font-medium">{current.meta.person}</div></div>
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  value={input}
                  onChange={(e)=>setInput(e.target.value)}
                  onKeyDown={(e)=>{ if(e.key==='Enter' && !checked) onCheck(); }}
                  placeholder="Type the correct form…"
                  autoFocus
                  className="w-full rounded-xl bg-slate-800 border border-slate-600 px-3 py-2 outline-none focus:border-indigo-400"
                />
                <button onClick={onCheck} disabled={checked} className="rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 px-4">Check</button>
              </div>

              {checked && (
                <div className="mt-3">
                  {correct ? (
                    <div className="text-emerald-400 font-medium">✓ Correct!</div>
                  ) : (
                    <div className="text-rose-400 font-medium">✗ Not quite.</div>
                  )}
                  <div className="mt-1 text-slate-300">Answer: <code className="bg-slate-800/80 px-2 py-1 rounded">{current.answer}</code></div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button onClick={()=>applyGrade("known")} className="rounded-xl border border-slate-600 px-3 py-2">Learned / Known</button>
                    <button onClick={()=>applyGrade("more")} className="rounded-xl border border-slate-600 px-3 py-2">Learn more</button>
                    <button onClick={()=>applyGrade("continue")} className="rounded-xl bg-slate-700 px-3 py-2">Continue</button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-slate-400">
              <div>Remaining this session: {remaining}</div>
              <div>
                <button onClick={()=> setPhase("practiceSet")} className="rounded-xl border border-slate-600 px-3 py-1">Quit</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid place-items-center gap-4">
            <div className="text-lg">Session complete 🎉</div>
            <div className="flex gap-2">
              <button onClick={()=> startSession()} className="rounded-xl bg-indigo-500 hover:bg-indigo-400 px-4 py-2">Repeat</button>
              <button onClick={()=> setPhase("practiceSet")} className="rounded-xl border border-slate-600 px-4 py-2">Change settings</button>
            </div>
          </div>
        )}
      </Page>
    );
  }

  return null;
}
