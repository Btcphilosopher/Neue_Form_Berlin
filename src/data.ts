import { Product, JournalArticle } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'signal-tischleuchte',
    name: 'SIGNAL TISCHLEUCHTE',
    category: 'BELEUCHTUNG',
    priceEUR: 179.00,
    image: '/src/assets/images/bestseller_lamp_1783688674996.jpg',
    designer: 'Christian Dell (Inspiration)',
    origin: 'Berlin, Deutschland',
    material: 'Pulverbeschichteter Stahl, massives Messing',
    dimensions: 'H: 45 cm, Schirm Ø: 30 cm, Basis Ø: 18 cm',
    weight: '3.4 kg',
    description: 'Eine ikonische Silhouette, die den Höhepunkt des deutschen Funktionalismus der Jahrhundertmitte repräsentiert. Die Signal Tischleuchte ist so konzipiert, dass sie als architektonisches Highlight in jedem Arbeits- oder Wohnbereich dient. Der verstellbare Reflektorschirm ermöglicht eine präzise Lichtlenkung.',
    features: [
      'Rotierbarer Schirm für direkte und indirekte Beleuchtung',
      'Klassischer Kippschalter an der massiven Basis',
      'Textilummanteltes Stromkabel (2.5m) in Tiefschwarz',
      'Echtheitszertifikat mit eingeprägter Seriennummer'
    ]
  },
  {
    id: 'raum-koffer-aluminium',
    name: 'RAUM KOFFER – ALUMINIUM',
    category: 'REISE',
    priceEUR: 349.00,
    image: '/src/assets/images/bestseller_suitcase_1783688689271.jpg',
    designer: 'Dieter Rams Studio (Inspiration)',
    origin: 'Köln, Deutschland',
    material: 'Hochwertige Aluminium-Magnesium-Legierung',
    dimensions: '55 x 40 x 23 cm (Handgepäckgröße)',
    weight: '4.2 kg',
    description: 'Entwickelt für moderne Reisende, die Wert auf präzise Technik und langlebige Handwerkskunst legen. Die gerippte Aluminiumschale des Raum Koffers absorbiert Stöße, während sie im Laufe der Zeit eine wunderschöne, architektonische Patina entwickelt, die Ihre Reisen erzählt.',
    features: [
      'Geräuschloses 360°-Multiwheel-System für müheloses Gleiten',
      'Doppeltes TSA-Zahlenschloss für maximale Sicherheit',
      'Stufenlos ausziehbare Teleskopstange aus gehärtetem Aluminium',
      'Durchdachtes Innenleben mit flexiblen Packplatten'
    ]
  },
  {
    id: 'zeitgeist-automatik',
    name: 'ZEITGEIST AUTOMATIK',
    category: 'ACCESSOIRES',
    priceEUR: 299.00,
    image: '/src/assets/images/bestseller_watch_1783688700660.jpg',
    designer: 'Max Bill (Inspiration)',
    origin: 'Glashütte, Deutschland',
    material: '316L Chirurgenstahl, entspiegeltes Saphirglas',
    dimensions: 'Gehäuse Ø: 38 mm, Höhe: 9.8 mm',
    weight: '82 g',
    description: 'Eine Feier der modernen Bauhaus-Uhrmacherei. Die Zeitgeist Automatik verbindet ein klares, puristisches Zifferblatt mit einem flüsterleisen mechanischen Automatikwerk. Ein zeitloses Statement am Handgelenk für den bewussten Ästheten.',
    features: [
      'Automatisches Kaliber mit 42 Stunden Gangreserve',
      'Feingliedriges Milanaise-Armband mit Sicherheitsverschluss',
      'Kratzfestes, bombiertes Saphirglas auf Front und Gehäuseboden',
      'Wasserdicht bis 5 ATM (Händewaschen und Duschen geeignet)'
    ]
  },
  {
    id: 'struktur-vase-schwarz',
    name: 'STRUKTUR VASE – SCHWARZ',
    category: 'WOHNEN',
    priceEUR: 89.00,
    image: '/src/assets/images/bestseller_vase_1783688715861.jpg',
    designer: 'Gisela Schimmelpfennig',
    origin: 'Dresden, Deutschland',
    material: 'Handgedrehtes Steinzeug, matte Spezialglasur',
    dimensions: 'H: 28 cm, Durchmesser: 14 cm',
    weight: '1.8 kg',
    description: 'Die Struktur Vase erforscht das Zusammenspiel von architektonischer Geometrie und organischem Steinzeug. Ihre tiefschwarze, matte Oberfläche absorbiert das Umgebungslicht und betont so die minimalistische Silhouette, ob mit oder ohne Blumen.',
    features: [
      'Von Hand gedreht in einem sächsischen Traditionsbetrieb',
      'Einzigartige haptische Oberflächenstruktur',
      'Vollständig wasserdichte Innen-Spezialglasur',
      'Geprägter Studio-Stempel auf der Unterseite'
    ]
  }
];

export const TRANSLATIONS_EN: Record<string, string> = {
  'SIGNAL TISCHLEUCHTE': 'SIGNAL TABLE LAMP',
  'RAUM KOFFER – ALUMINIUM': 'RAUM SUITCASE – ALUMINUM',
  'ZEITGEIST AUTOMATIK': 'ZEITGEIST AUTOMATIC',
  'STRUKTUR VASE – SCHWARZ': 'STRUKTUR VASE – BLACK',
  'BELEUCHTUNG': 'LIGHTING',
  'REISE': 'TRAVEL',
  'ACCESSOIRES': 'ACCESSORIES',
  'WOHNEN': 'LIVING',
  'PRODUKTE': 'PRODUCTS',
  'KATEGORIEN': 'CATEGORIES',
  'DESIGNPHILOSOPHIE': 'PHILOSOPHY',
  'JOURNAL': 'JOURNAL',
  'ÜBER UNS': 'ABOUT US',
  'KONTO': 'ACCOUNT',
  'WARENKORB': 'CART',
  'Deutsches Design. Zeitlose Qualität.': 'German design. Timeless quality.',
  'FUNKTION. KLARHEIT. ZUKUNFT.': 'FUNCTION. CLARITY. FUTURE.',
  'Minimalistische Produkte für einen bewussten Lebensstil.': 'Minimalist products for a conscious lifestyle.',
  'PRODUKTE ENTDECKEN': 'EXPLORE PRODUCTS',
  'SCROLLEN': 'SCROLL',
  'KOSTENLOSER VERSAND': 'FREE SHIPPING',
  'Ab 100 € Bestellwert': 'On orders over €100',
  '30 TAGE RÜCKGABERECHT': '30-DAY RETURN',
  'Einfach & unkompliziert': 'Simple & straightforward',
  'SICHERE ZAHLUNG': 'SECURE PAYMENT',
  'SSL-Verschlüsselt': 'SSL Encrypted',
  'NACHHALTIGE PRODUKTION': 'SUSTAINABLE PRODUCTION',
  'Verantwortung für morgen': 'Responsibility for tomorrow',
  'AUSGEWÄHLT': 'CURATED',
  'BESTSELLER': 'BESTSELLERS',
  'ALLE ANZEIGEN': 'VIEW ALL',
  'GEDANKEN. DESIGN. FORTSCHRITT.': 'THOUGHTS. DESIGN. PROGRESS.',
  'Ein Journal über Ideen, Materialien und die Zukunft des Designs.': 'A journal about ideas, materials, and the future of design.',
  'ARTIKEL LESEN': 'READ ARTICLE',
  'Wir gestalten Produkte, die Funktion, Ästhetik und Verantwortung vereinen.': 'We design products that unite function, aesthetics, and responsibility.',
  'FOLGE UNS': 'FOLLOW US',
  'SHOP': 'SHOP',
  'Alle Produkte': 'All Products',
  'Neuheiten': 'New Arrivals',
  'Geschenkideen': 'Gift Ideas',
  'Sale': 'Sale',
  'SERVICE': 'SERVICE',
  'Versand & Lieferung': 'Shipping & Delivery',
  'Rückgabe': 'Returns',
  'Zahlungsmöglichkeiten': 'Payment Methods',
  'FAQ': 'FAQ',
  'Kontakt': 'Contact',
  'UNTERNEHMEN': 'COMPANY',
  'Nachhaltigkeit': 'Sustainability',
  'Karriere': 'Careers',
  'Presse': 'Press',
  'NEWSLETTER': 'NEWSLETTER',
  'Bleiben Sie inspiriert.': 'Stay inspired.',
  'E-Mail Adresse': 'Email address',
  'Ich stimme der Datenschutzerklärung zu.': 'I agree to the privacy policy.',
  'Impressum': 'Legal Notice',
  'Datenschutz': 'Privacy',
  'AGB': 'T&C',
  'In den Warenkorb': 'Add to Cart',
  'Größe': 'Size',
  'Material': 'Material',
  'Abmessungen': 'Dimensions',
  'Gewicht': 'Weight',
  'Designer': 'Designer',
  'Herkunft': 'Origin',
  'Details & Spezifikationen': 'Details & Specifications',
  'Beschreibung': 'Description',
  'Warenkorb leer': 'Your cart is empty',
  'Artikel': 'item',
  'Artikel_plural': 'items',
  'Zur Kasse': 'Proceed to Checkout',
  'Zwischensumme': 'Subtotal',
  'MwSt. inkl.': 'incl. VAT',
  'Suche': 'Search',
  'Produkte suchen...': 'Search products...',
  'Keine Produkte gefunden': 'No products found',
  'Erfolgreich abonniert!': 'Successfully subscribed!',
  'Vielen Dank für Ihr Abonnement.': 'Thank you for your subscription.',
  'Bitte akzeptieren Sie die Datenschutzerklärung.': 'Please accept the privacy policy.',
  'Geben Sie eine gültige E-Mail-Adresse ein.': 'Please enter a valid email address.',
  'Schnelle Ansicht': 'Quick View',
  'Kostenloser Versand': 'Free Shipping',
  'Entworfen in Deutschland — Für die Zukunft': 'Designed in Germany — For the Future'
};

export const JOURNAL_POST: JournalArticle = {
  id: 'journal-1',
  title: 'GEDANKEN. DESIGN. FORTSCHRITT.',
  category: 'JOURNAL',
  image: '/src/assets/images/journal_architecture_1783688728452.jpg',
  readTime: '6 Min. Lesezeit',
  date: '10. Juli 2026',
  content: `Wie sieht die Zukunft des Wohnens aus? In einer Welt der Reizüberflutung sehnen wir uns nach Klarheit. 

Wir glauben, dass gutes Design kein Selbstzweck ist. Es ist ein stiller Begleiter, der durch maximale Reduktion die eigene Konzentration stärkt. Bei NEUE FORM BERLIN verbinden wir das Erbe des Bauhauses mit zukunftsorientierten Fertigungstechnologien.

Unsere Materialien werden sorgfältig nach Langlebigkeit und Kreislauffähigkeit ausgewählt. Ein Koffer aus Aluminium, der Generationen übersteht, eine Lampe, die reparierbar bleibt – das ist unsere Antwort auf die Wegwerfkultur. Gutes Design ist nicht nur schön für den Augenblick. Es übernimmt Verantwortung für morgen.`
};

export const JOURNAL_POST_EN = {
  title: 'THOUGHTS. DESIGN. PROGRESS.',
  readTime: '6 Min. Read',
  date: 'July 10, 2026',
  content: `What does the future of living look like? In a world of sensory overload, we long for clarity.

We believe that good design is not an end in itself. It is a silent companion that enhances personal focus through maximum reduction. At NEUE FORM BERLIN, we merge the heritage of Bauhaus with future-oriented manufacturing technologies.

Our materials are chosen carefully based on durability and circularity. An aluminum suitcase that lasts for generations, a lamp that remains fully repairable – this is our answer to throwaway culture. Good design isn't just beautiful for the moment. It takes responsibility for tomorrow.`
};
