// All site content lives here. Replace placeholders in [BRACKETS] with real data.
// Translatable fields are { en, te } objects — read them with `tx()` from useLang().

export const org = {
  shortName: 'APGEA',
  nameEn: 'Andhra Pradesh Govt. Employees Association',
  nameTe: 'ఆంధ్రప్రదేశ్ ప్రభుత్వ ఉద్యోగుల సంఘం',
  // Brand slogans — shown in Telugu in both languages, exactly as on the official masthead.
  taglineLeft: 'భజనతో కాదు - బాధ్యతతో',
  taglineRight: 'పార్టీతో కాదు - ప్రభుత్వంతో',
  regd: '(Regd. Govt. 578/2010)',
  recognition: '{ Recognised by the Govt. of A.P. Vide G.O. Ms. No. 103, G.A. (Sw) Dept, Dt. 16-08-2019 }',
  membership: 'Permanent member in APCS JSC (SL) vide G.O.Ms.No.35 & 36, GA(SW) Dept., dt.27-04-2020',
  phones: ['88973 41616', '88973 51616'],
  phonesIntl: ['+918897341616', '+918897351616'],
  emails: ['info@apgea.org', 'apgea.ap@gmail.com'],
  whatsapp: 'https://api.whatsapp.com/send?phone=918897341616',
  address: {
    en: ['D.No. 1-3/18-7, Tulluri Vari Street,', 'Vidyadhara Puram, Kummaripalem Centre,', 'Vijayawada – 520012, Andhra Pradesh'],
    te: ['ఇం.నెం. 1-3/18-7, తుళ్ళూరి వారి వీధి,', 'విద్యాధరపురం, కుమ్మరిపాలెం సెంటర్,', 'విజయవాడ – 520012, ఆంధ్రప్రదేశ్'],
  },
  mapLink: 'https://maps.app.goo.gl/AvX8M',
  social: {
    facebook: 'https://www.facebook.com/apgea.ap',
    twitter: 'https://twitter.com/apgea_ap',
    youtube: 'https://www.youtube.com/results?search_query=apgea',
  },
}

export const nav = [
  { label: { en: 'Home', te: 'హోమ్' }, to: '/' },
  {
    label: { en: 'About', te: 'మా గురించి' }, to: '/about',
    children: [
      { label: { en: 'About APGEA', te: 'APGEA గురించి' }, desc: { en: 'Who we are and why we formed', te: 'మేము ఎవరు, ఎందుకు ఏర్పడ్డాం' }, to: '/about' },
      { label: { en: 'Our Vision', te: 'మా దృక్పథం' }, desc: { en: 'Welfare and stress-free service', te: 'సంక్షేమం, ఒత్తిడి లేని సేవ' }, to: '/about#vision' },
      { label: { en: 'Our Mission', te: 'మా లక్ష్యం' }, desc: { en: 'Solving problems before they arise', te: 'సమస్యలను ముందుగానే పరిష్కరించటం' }, to: '/about#mission' },
    ],
  },
  {
    label: { en: 'Affiliated Associations', te: 'అనుబంధ సంఘాలు' }, to: '/affiliated',
    children: [
      { label: { en: 'VWSEA', te: 'VWSEA' }, desc: { en: 'Village & Ward Secretariat Employees', te: 'గ్రామ / వార్డు సచివాలయ ఉద్యోగులు' }, to: '/affiliated#vwsea' },
      { label: { en: 'APRESA', te: 'APRESA' }, desc: { en: 'A.P. Retired Employees Association', te: 'ఏపీ రిటైర్డ్ ఉద్యోగుల సంఘం' }, to: '/affiliated#apresa' },
    ],
  },
  {
    label: { en: 'Employees Services', te: 'ఉద్యోగుల సేవలు' }, to: '/services',
    children: [
      { label: { en: 'Employees Services', te: 'ఉద్యోగుల సేవలు' }, desc: { en: 'GOs, forms and help for members', te: 'జీవోలు, ఫారాలు, సభ్యులకు సహాయం' }, to: '/services' },
      { label: { en: 'RTI & Citizen Services', te: 'సమాచార హక్కు & పౌర సేవలు' }, desc: { en: 'RTI applications and formats', te: 'సమాచార హక్కు దరఖాస్తులు, నమూనాలు' }, to: '/services#rti' },
    ],
  },
  { label: { en: 'Gallery', te: 'గ్యాలరీ' }, to: '/gallery' },
]

export const news = [
  {
    id: 62,
    tag: { en: 'Part 3', te: 'భాగం 3' },
    series: true,
    title: {
      te: 'సంఘాలు – సమస్యలు… సంఘాలే సమస్యలా? ఆలోచించండి.. కే ఆర్',
      en: 'Associations & issues… are associations the issue? Think it over — K.R.',
    },
    excerpt: {
      te: 'ఉద్యోగ సంఘాల నాయకత్వం, ఫలితాలు, జవాబుదారీతనంపై ముగింపు భాగం.',
      en: 'The concluding part — on the leadership, results and accountability of employee associations.',
    },
    date: '2026-07-21',
    readTime: 6,
  },
  {
    id: 61,
    tag: { en: 'Part 2', te: 'భాగం 2' },
    series: true,
    title: {
      te: '"సంఘాలు – సమస్యలు… సంఘాలే… సమస్యా..!" ఆలోచించండి.. కే ఆర్',
      en: '"Associations & issues… associations themselves the issue!" Think it over — K.R.',
    },
    excerpt: {
      te: 'సంఘాల పనితీరు, ప్రభుత్వంతో సంప్రదింపుల వాస్తవ స్థితిపై రెండవ భాగం.',
      en: 'Part two — how associations really function and where talks with the government actually stand.',
    },
    date: '2026-07-02',
    readTime: 5,
  },
  {
    id: 60,
    tag: { en: 'Part 1', te: 'భాగం 1' },
    series: true,
    title: {
      te: '"సంఘాలు – సమస్యలు… సంఘాలే… సమస్యా..!" ఆలోచించండి.. కే ఆర్',
      en: '"Associations & issues… associations themselves the issue!" Think it over — K.R.',
    },
    excerpt: {
      te: 'ఉద్యోగ సంఘాలు ఎందుకు విఫలమవుతున్నాయి? ధారావాహిక మొదటి భాగం.',
      en: 'Why do employee associations fail? The first part of the series.',
    },
    date: '2026-06-22',
    readTime: 5,
  },
  {
    id: 59,
    tag: { en: 'Finance', te: 'ఆర్థికం' },
    title: {
      te: 'ఆర్థిక ప్రయోజనాలు చెల్లింపులు… వాస్తవ పరిస్థితులపై APGEA ఆలోచన (Part 2)',
      en: 'Payment of financial benefits… APGEA on the ground reality (Part 2)',
    },
    excerpt: {
      te: 'పెండింగ్ DA, PRC బకాయిలపై సంఘం విధానం.',
      en: "The association's position on pending DA and PRC arrears.",
    },
    date: '2026-05-10',
    readTime: 4,
  },
  {
    id: 50,
    tag: { en: 'Policy', te: 'విధానం' },
    title: {
      te: 'ఏపి అడ్మినిస్ట్రేటివ్ ట్రిబ్యునల్ పునరుద్ధరణ అత్యంత అవసరం',
      en: 'Restoring the A.P. Administrative Tribunal is urgently needed',
    },
    excerpt: {
      te: 'ఉద్యోగుల న్యాయపరమైన పరిష్కారాల కోసం ట్రిబ్యునల్ ఆవశ్యకతపై విశ్లేషణ.',
      en: 'Why employees need the tribunal for timely legal remedies.',
    },
    date: '2026-03-02',
    readTime: 4,
  },
]

export const events = [
  { id: 3, title: { en: 'AICCTA dharna at Jantar Mantar, New Delhi', te: 'న్యూఢిల్లీ జంతర్ మంతర్ వద్ద AICCTA ధర్నా' }, date: '2019-01-08', place: { en: 'New Delhi', te: 'న్యూఢిల్లీ' } },
  { id: 10, title: '[EVENT TITLE]', date: '2026-08-28', place: '[PLACE]' },
  { id: 11, title: '[EVENT TITLE]', date: '2026-08-28', place: '[PLACE]' },
]

export const gos = [
  { id: 1, title: { en: 'A.P. Leave Rules', te: 'ఏ.పి. సెలవు నిబంధనలు' }, dept: { en: 'Finance Dept.', te: 'ఆర్థిక శాఖ' }, date: '2015-12-06', file: '#' },
  { id: 2, title: '[GO TITLE]', dept: '[Department]', date: '2026-01-01', file: '#' },
  { id: 3, title: '[GO TITLE]', dept: '[Department]', date: '2026-01-01', file: '#' },
]

export const bearers = [
  {
    name: { en: 'K. Rama Suryanarayana', te: 'కె. రామ సూర్యనారాయణ' },
    role: { en: 'State President', te: 'రాష్ట్ర అధ్యక్షులు' },
    region: { en: 'Andhra Pradesh', te: 'ఆంధ్రప్రదేశ్' },
    phones: ['6305556139', '7382642599'],
    photo: '/bearers/president.jpg',
    initials: 'KR',
  },
  {
    name: { en: 'M. Ramesh Kumar', te: 'ఎం. రమేష్ కుమార్' },
    role: { en: 'General Secretary', te: 'ప్రధాన కార్యదర్శి' },
    region: { en: 'Andhra Pradesh', te: 'ఆంధ్రప్రదేశ్' },
    phones: ['9052972247'],
    photo: '/bearers/secretary.jpg',
    initials: 'MR',
  },
]

export const districts = [
  ['Srikakulam', 'శ్రీకాకుళం'], ['Vizianagaram', 'విజయనగరం'], ['Parvathipuram Manyam', 'పార్వతీపురం మన్యం'],
  ['Alluri Sitharama Raju', 'అల్లూరి సీతారామరాజు'], ['Visakhapatnam', 'విశాఖపట్నం'], ['Anakapalli', 'అనకాపల్లి'],
  ['Kakinada', 'కాకినాడ'], ['East Godavari', 'తూర్పు గోదావరి'], ['Konaseema', 'కోనసీమ'], ['West Godavari', 'పశ్చిమ గోదావరి'],
  ['Eluru', 'ఏలూరు'], ['Krishna', 'కృష్ణా'], ['NTR', 'ఎన్టీఆర్'], ['Guntur', 'గుంటూరు'], ['Palnadu', 'పల్నాడు'],
  ['Bapatla', 'బాపట్ల'], ['Prakasam', 'ప్రకాశం'], ['Nellore', 'నెల్లూరు'], ['Kurnool', 'కర్నూలు'], ['Nandyal', 'నంద్యాల'],
  ['Anantapur', 'అనంతపురం'], ['Sri Sathya Sai', 'శ్రీ సత్యసాయి'], ['YSR Kadapa', 'వైఎస్ఆర్ కడప'], ['Annamayya', 'అన్నమయ్య'],
  ['Tirupati', 'తిరుపతి'], ['Chittoor', 'చిత్తూరు'],
].map(([en, te]) => ({ en, te }))

export const affiliates = [
  { code: 'VWSEA', nameTe: 'గ్రామ / వార్డు సచివాలయ ఉద్యోగుల సంఘం', nameEn: 'Village & Ward Secretariat Employees Association', to: '/affiliated#vwsea' },
  { code: 'APRESA', nameTe: 'ఆంధ్రప్రదేశ్ రిటైర్డ్ ఉద్యోగుల సంఘం', nameEn: 'A.P. Retired Employees Association', to: '/affiliated#apresa' },
]

export const vision = {
  en: 'Andhra Pradesh Government Employees Association (APGEA) concentrates on the welfare and wellbeing of AP Govt Employees. The Association endeavours to guide the Govt suitably in order to enable the employees discharge their duties with due responsibility and with stress-free approach.',
  te: 'ఆంధ్రప్రదేశ్ ప్రభుత్వ ఉద్యోగుల సంక్షేమం, శ్రేయస్సుపై APGEA దృష్టి సారిస్తుంది. ఉద్యోగులు తమ విధులను బాధ్యతాయుతంగా, ఒత్తిడి లేకుండా నిర్వర్తించేలా ప్రభుత్వానికి తగిన సూచనలు అందించేందుకు సంఘం కృషి చేస్తుంది.',
}

export const mission = {
  en: 'Our mission is to estimate in advance the problems the employees are likely to face in discharge of their duties as they are directed to do, and submit the problems to the Govt sufficiently in advance.',
  te: 'విధి నిర్వహణలో ఉద్యోగులు ఎదుర్కోబోయే సమస్యలను ముందుగానే అంచనా వేసి, వాటిని తగినంత ముందుగానే ప్రభుత్వానికి నివేదించటమే మా లక్ష్యం.',
}

export const about = {
  te: 'ఆంధ్రప్రదేశ్ ప్రభుత్వ అన్ని శాఖలలోని, వివిధ కేడర్‌లకు సంబంధించిన ప్రభుత్వోద్యోగులను అందరినీ సమైక్య సంఘంగా ఏర్పరచటం ఒక చారిత్రక అవసరంగా గుర్తించి APGEA ఏర్పాటు చేయబడినది. రాష్ట్ర ప్రభుత్వ ఉద్యోగుల సమస్యలను, వారి మనోభావాలను సమిష్టిగా ప్రభుత్వానికి నివేదించి పరిష్కరింపచేయటమే లక్ష్యం.',
  en: 'APGEA was formed out of a historic need — to bring government employees of every department and every cadre in Andhra Pradesh together as one united association. Our aim is to present the issues and sentiments of state government employees to the government collectively, and see them resolved.',
}

export const stats = [
  { value: 26, label: { en: 'Districts organised', te: 'జిల్లాల్లో విస్తరణ' } },
  { value: null, label: { en: 'Enrolled members', te: 'నమోదైన సభ్యులు' }, placeholder: '[MEMBERS]' },
  { value: 2, label: { en: 'Affiliated associations', te: 'అనుబంధ సంఘాలు' } },
  { value: 2010, label: { en: 'Registered since', te: 'నమోదు సంవత్సరం' }, plain: true },
]

// ---------- Content carried over from apgea.org ----------

// Photos are served locally from /public. Original files on apgea.org (assets/uploads/…) → local name:
//   gallery/WhatsApp-Image-2025-08-15-at-16.13.30.jpeg                  → gallery/1.jpg
//   gallery/WhatsApp-Image-2019-09-04-at-19.59.15.jpeg20190909122742.jpeg → gallery/2.jpg
//   gallery/IMG-20200209-WA0128.jpg                                     → gallery/3.jpg
//   gallery/WhatsApp-Image-2024-12-01-at-15.22.36-(2).jpeg              → gallery/4.jpg
//   gallery/WhatsApp-Image-2024-12-01-at-15.22.40-(1).jpeg              → gallery/5.jpg
//   gallery/WhatsApp-Image-2024-12-01-at-15.22.31.jpeg                  → gallery/6.jpg
//   gallery/WhatsApp-Image-2025-08-15-at-15.57.47.jpeg                  → gallery/7.jpg
//   gallery/WhatsApp-Image-2025-08-15-at-15.57.46-(1).jpeg              → gallery/8.jpg
//   gallery/WhatsApp-Image-2025-11-15-at-15.44.24.jpeg                  → gallery/9.jpg
//   gallery/WhatsApp-Image-2025-11-15-at-15.44.24-(2).jpeg              → gallery/10.jpg
//   news/WhatsApp-Image-2026-07-21-at-12.01.42.jpeg                     → news/62.jpg
//   news/WhatsApp-Image-2026-06-23-at-12.22.01.jpeg                     → news/60.jpg
// A missing local file falls back to apgea.org, then to the branded placeholder (SafeImg).
export const photos = Array.from({ length: 10 }, (_, i) => `/gallery/${i + 1}.jpg`)

export const newsImages = {
  62: '/news/62.jpg',
  60: '/news/60.jpg',
}

// Until the local copies exist, SafeImg falls back to the original photo on apgea.org (same order as the list above).
const REMOTE = 'https://apgea.org/assets/uploads'
const remoteGallery = [
  'WhatsApp-Image-2025-08-15-at-16.13.30.jpeg',
  'WhatsApp-Image-2019-09-04-at-19.59.15.jpeg20190909122742.jpeg',
  'IMG-20200209-WA0128.jpg',
  'WhatsApp-Image-2024-12-01-at-15.22.36-(2).jpeg',
  'WhatsApp-Image-2024-12-01-at-15.22.40-(1).jpeg',
  'WhatsApp-Image-2024-12-01-at-15.22.31.jpeg',
  'WhatsApp-Image-2025-08-15-at-15.57.47.jpeg',
  'WhatsApp-Image-2025-08-15-at-15.57.46-(1).jpeg',
  'WhatsApp-Image-2025-11-15-at-15.44.24.jpeg',
  'WhatsApp-Image-2025-11-15-at-15.44.24-(2).jpeg',
]
export const photoFallbacks = {
  ...Object.fromEntries(remoteGallery.map((f, i) => [photos[i], `${REMOTE}/gallery/${f}`])),
  '/news/62.jpg': `${REMOTE}/news/WhatsApp-Image-2026-07-21-at-12.01.42.jpeg`,
  '/news/60.jpg': `${REMOTE}/news/WhatsApp-Image-2026-06-23-at-12.22.01.jpeg`,
}

// Full article index from the apgea.org headline ticker (newest first).
export const archive = [
  { te: 'సంఘాలు - సమస్యలు.., సంఘాలే సమస్యలా... ఆలోచించండి.. కే ఆర్ (Part 3)', en: 'Associations & issues… are associations the issue? Think it over — K.R. (Part 3)', to: '/news/62' },
  { te: '"సంఘాలు - సమస్యలు... సంఘాలే... సమస్యా..!" ఆలోచించండి.. కే ఆర్ (Part 2)', en: '"Associations & issues… associations themselves the issue!" — K.R. (Part 2)', to: '/news/61' },
  { te: '"సంఘాలు - సమస్యలు... సంఘాలే... సమస్యా..!" ఆలోచించండి.. కే ఆర్ (Part 1)', en: '"Associations & issues… associations themselves the issue!" — K.R. (Part 1)', to: '/news/60' },
  { te: 'ఆర్థిక ప్రయోజనాలు చెల్లింపులు... వాస్తవ పరిస్థితులపై APGEA ఆలోచన (Part 2)', en: 'Payment of financial benefits — APGEA on the ground reality (Part 2)', to: '/news/59' },
  { te: 'ఆర్థిక ప్రయోజనాలు చెల్లింపులు... వాస్తవ పరిస్థితులు — APGEA అధ్యక్షులు శ్రీ కె.ఆర్. సూర్యనారాయణ', en: 'Payment of financial benefits — the reality, by APGEA President Sri K.R. Suryanarayana', to: '/news' },
  { te: 'నేరము - శిక్ష... భారత శిక్షాస్మృతి... తప్పదు ఎవరికైనా...! (Part 5)', en: 'Crime and punishment — the Indian Penal Code spares no one (Part 5)', to: '/news' },
  { te: 'శాంతియుత నిరసన అంబేద్కర్ ప్రసాదించిన రాజ్యాంగబద్ధమైన హక్కు... కాదంటే అది నేరం (Part 4)', en: 'Peaceful protest is a constitutional right given by Ambedkar — denying it is the crime (Part 4)', to: '/news' },
  { te: 'నిడివి ఎక్కువైనా... రంగులు మార్చే ఊసరవెల్లులను చూడగలరు (Part 3)', en: 'Long, but worth it — see the chameleons who change colours (Part 3)', to: '/news' },
  { te: 'వాణిజ్య పన్నుల శాఖలో "ప్రమోషన్ ఎవరి బిక్ష కాదు.. అది హక్కు.." అంటున్న కె.ఆర్ (Part 2)', en: 'Commercial Taxes Dept.: "Promotion is nobody\'s charity — it is a right," says K.R. (Part 2)', to: '/news' },
  { te: 'వాణిజ్య పన్నుల శాఖలో కె.ఆర్. పునరాగమనం... రెట్టించిన బలంతో... ఇక న్యాయం తప్పదు (Part 1)', en: 'K.R. returns to the Commercial Taxes Dept. with double the strength — justice is due (Part 1)', to: '/news' },
  { te: 'ఉద్యోగుల గెజిటెడ్ స్టేటస్ హోదాపై APGEA విశ్లేషణ - విధానం', en: "APGEA's analysis and policy on gazetted status for employees", to: '/news' },
  { te: 'ఏపి అడ్మినిస్ట్రేటివ్ ట్రిబ్యునల్ పునరుద్ధరణ అత్యంత అవసరం', en: 'Restoring the A.P. Administrative Tribunal is urgently needed', to: '/news/50' },
  { te: 'కంటింజెంట్, కాంట్రాక్టు, ఔట్ సోర్సింగ్ ఉద్యోగుల వెతలు.. దుస్థితిపై', en: 'The plight of contingent, contract and outsourced employees', to: '/news' },
  { te: 'పి.ఆర్.సి.పై ఆంధ్రప్రదేశ్ ప్రభుత్వ ఉద్యోగుల సంఘం విధానం', en: "APGEA's position on the PRC", to: '/news' },
  { te: 'గ్రామ / వార్డు సచివాలయ ఉద్యోగుల సమస్యలు', en: 'Issues of Village & Ward Secretariat employees', to: '/news' },
  { te: 'పెండింగ్‌లో ఉన్న ఆర్థిక ప్రయోజనాలు', en: 'Pending financial benefits', to: '/news' },
]

// "About APGEA" — the four paragraphs from apgea.org, with English versions.
export const story = [
  {
    te: 'ఆంధ్రప్రదేశ్ ప్రభుత్వ అన్ని శాఖలలోని, వివిధ కేడర్‌లకు సంబంధించిన ప్రభుత్వోద్యోగులను అందరినీ సమైక్య సంఘంగా ఏర్పరచటం ఒక చారిత్రక అవసరంగా గుర్తించి ఆంధ్రప్రదేశ్ ప్రభుత్వ ఉద్యోగుల సంఘం ఏర్పాటు చేయబడినది.',
    en: 'Recognising it as a historic need to unite government employees of every department and every cadre in Andhra Pradesh into one association, the Andhra Pradesh Government Employees Association was formed.',
  },
  {
    te: 'రాష్ట్ర ప్రభుత్వ ఉద్యోగుల సమస్యలను, వారి మనోభావాలను సమిష్టిగా ప్రభుత్వానికి నివేదించి తద్వారా వారి సమస్యలను పరిష్కరింపచేయటమే లక్ష్యంగా "భజనతో కాదు - బాధ్యతతో, పార్టీతో కాదు - ప్రభుత్వంతో" అనే నినాదంతో APGEA ఏర్పడినది.',
    en: 'APGEA was founded with one aim — to present the issues and sentiments of state government employees to the government collectively and get them resolved — under the slogan "Not by flattery, by responsibility; not with a party, with the government."',
  },
  {
    te: '"సాంకేతికత మరియు ఆర్థిక సంస్కరణలు" ప్రభుత్వ ప్రాధాన్యంగా ఉన్న నేపధ్యంలో ఉద్యోగ సంఘాలు తమ ఆలోచనా విధానాన్ని, పనితీరును సమకాలీన పరిస్థితులకు అనుగుణంగా మార్చుకోవాల్సిన అవసరం ఉంది. మూసపోత విధానాల ద్వారా ఫలితాలు సాధించలేమని గ్రహించిన APGEA వినూత్న మేధో విధానాల ద్వారా ఉద్యోగుల సమస్యల పరిష్కారానికి కృషి చేస్తుంది.',
    en: 'With technology and economic reform now the government\'s priorities, employee associations must update how they think and work. Knowing that stale, routine methods no longer deliver results, APGEA works on employee issues through fresh, well-researched approaches.',
  },
  {
    te: 'ప్రస్తుత ఉద్యోగ సంఘాలు ఆశించిన అంచనాలను అందుకోలేక, నాయకుల అసమర్ధత, బలహీనతల వల్ల అనేక సమస్యల పరిష్కారంలో విఫలమైనాయి. ఆ బాధ్యతను తన భుజస్కందాలపై వేసుకుని నిజాయితీతో, అంకిత భావంతో, ఉద్యోగుల ఆత్మగౌరవాన్ని కాపాడాలనే ఉద్దేశ్యంతో పటిష్టమైన నాయకత్వంతో APGEA కృషి చేస్తుందని హామీ ఇస్తున్నాము.',
    en: 'Existing associations have fallen short — weak and ineffective leadership has left many problems unresolved. APGEA takes that responsibility on its own shoulders and promises to work with honesty, dedication and strong leadership to protect the self-respect of every employee.',
  },
]

export const intro = {
  en: 'The role of employees in government administration is very significant — at field level they implement the government\'s policies and welfare schemes for the poor and downtrodden. Simultaneously, their role at the policy-making level cannot be undermined.',
  te: 'ప్రభుత్వ పరిపాలనలో ఉద్యోగుల పాత్ర అత్యంత కీలకం — క్షేత్రస్థాయిలో పేదలు, బడుగు వర్గాల కోసం ప్రభుత్వ విధానాలను, సంక్షేమ పథకాలను అమలు చేసేది వారే. అదే సమయంలో విధాన రూపకల్పన స్థాయిలో వారి పాత్రను తక్కువ చేయలేము.',
}

export const resolve = {
  en: 'Accordingly, it resolved to form a new Association to protect the common interest of the employees, to work for their welfare and to achieve the aims and objects.',
  te: 'అందుకే ఉద్యోగుల ఉమ్మడి ప్రయోజనాలను కాపాడటానికి, వారి సంక్షేమం కోసం పనిచేయటానికి, లక్ష్యాలను సాధించటానికి ఒక కొత్త సంఘాన్ని ఏర్పాటు చేయాలని తీర్మానించబడింది.',
}
