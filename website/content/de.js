window.CONTENT = {

  nav: {
    links: [
      { href: '#leistungen', label: 'Leistungen' },
      { href: '#vorgehen',   label: 'Vorgehen' },
      { href: '#referenzen', label: 'Referenzen' },
      { href: '#team',       label: 'Team' },
    ],
    cta: 'Kontakt',
  },

  hero: {
    title: 'asdasdfasdfasf ',
    subtitle: 'Hallo Hallo Hallo.',
    ctaPrimary: 'Leistungen ansehen',
    ctaSecondary: 'Gespraech vereinbaren',
  },

  promises: {
    eyebrow: 'Was uns auszeichnet',
    heading: ['Weil Ihre Zufriedenheit', 'unser Antrieb ist.'],
    items: [
      'Wir finden gemeinsam Loesungen.',
      'Wir leben Termintreue.',
      'Wir sind fokussiert auf Ihr Ziel.',
      'Wir sind pragmatisch.',
    ],
  },

  tom: {
    eyebrow: 'Leistungen',
    heading: ['Vier Dimensionen.', 'Ein Target Operating Model.'],
    quadrants: [
      {
        title: 'Organisation & Governance',
        short: 'Organisation',
        sub: 'Struktur, Rollen, Steuerung.',
        body: 'Wer entscheidet, wer berichtet, wer eskaliert? Wir setzen das PMO auf, definieren Rollen und Steuergremien - bis aus einem Projektwust wieder eine gefuehrte Lieferung wird.',
        items: [
          'PMO und Projektorganisation aufsetzen',
          'Steuerung, Reporting, Eskalation',
          'Rollen und Verantwortung klaeren',
        ],
      },
      {
        title: 'Prozesse & Daten',
        short: 'Prozesse',
        sub: 'Methodik, Lieferung, Qualitaet.',
        body: 'Klassisch, hybrid oder agil - wir waehlen das Vorgehen, das zu Ihrem Vorhaben passt, und bauen die Quality Gates ein, die Sie schlafen lassen.',
        items: [
          'Projektmethodik - klassisch, hybrid, agil',
          'Daten- und Prozess-Health-Checks',
          'Betriebsuebergabe und Run-Modell',
        ],
      },
      {
        title: 'People & Skills',
        short: 'People',
        sub: 'Menschen, Wissen, Befaehigung.',
        body: 'Interim-Mandat, CIO-Sparring, Inhouse-Seminar - wir bringen Senior-Koepfe ins Team und transferieren Wissen, statt Abhaengigkeit aufzubauen.',
        items: [
          'Interim-Management',
          'Sparring fuer CIOs und IT-Leitung',
          'Seminare und Inhouse-Trainings',
        ],
      },
      {
        title: 'Infrastruktur & Technologie',
        short: 'Technologie',
        sub: 'Architektur, Stack, Integration.',
        body: 'Vom Enterprise-Zielbild bis zur Plattform-Wahl: wir bauen Architekturen, die nicht nur das naechste Vorhaben tragen, sondern die fuenf danach.',
        items: [
          'Enterprise- und Applikationsarchitektur',
          'Zielbild und Plattform-Strategie',
          'Vendor- und Tech-Stack-Reviews',
        ],
      },
    ],
    services: [
      { name: 'Projektleitung', body: 'Von der Planung bis zur Betriebsuebergabe - verlaesslich zum Ziel.' },
      { name: 'Health Check',   body: 'Klarheit in zwei bis vier Wochen, wenn ein Projekt wackelt.' },
      { name: 'Interim',        body: 'Verantwortung auf Zeit, mit klarem Mandat und Uebergabe.' },
      { name: 'PMO',            body: 'Aufbau und Betrieb eines wirkungsvollen Portfolio-Cockpits.' },
    ],
  },

  vorgehen: {
    eyebrow: 'Vorgehen',
    heading: ['Fuenf Schritte -', 'transparent vom ersten Tag.'],
    steps: [
      { n: '01', title: 'Aufnahme',  body: 'Erstanalyse: Zielbild, Stakeholder, Status, Risiken.' },
      { n: '02', title: 'Diagnose',  body: 'Lage entlang der TOM-Dimensionen, mit klaren Hypothesen.' },
      { n: '03', title: 'Mandat',    body: 'Rolle, Befugnisse und Erfolgskriterien verschriftlicht.' },
      { n: '04', title: 'Lieferung', body: 'Iterative Lieferung mit schlankem Reporting.' },
      { n: '05', title: 'Uebergabe',  body: 'Sauberer Hand-over an Linie oder internes Team.' },
    ],
  },

  cases: {
    eyebrow: 'Referenzen',
    heading: ['Drei Mandate.', 'Drei sehr unterschiedliche Lagen.'],
    intro: 'Namen unserer Kunden teilen wir auf Anfrage. Hier exemplarisch, anonymisiert - was wir konkret bewirkt haben.',
    items: [
      {
        sector: 'Versicherungen',
        role: 'Interim - PMO',
        headline: 'Eskaliertes Kernsystem-Programm stabilisiert.',
        body: 'Schadenplattform-Programm 11 Monate hinter Plan, Reporting unbrauchbar, vier Lieferanten im Konflikt. Wir haben Interim-Programmleitung uebernommen, ein schlankes PMO aufgesetzt und auf ein realistisches 18-Monats-Fenster re-geplant.',
        metric: { v: '90 Tage', l: 'bis Stabilisierung' },
      },
      {
        sector: 'Oeffentliche Verwaltung',
        role: 'IT-Architektur',
        headline: 'Architektur-Zielbild fuer ein Buergerportal.',
        body: 'Fachseite und IT diskutierten seit ueber einem Jahr ohne tragfaehige Entscheidung. Wir haben drei Szenarien sauber gerechnet, eine Roadmap inkl. TCO erstellt - einstimmig im Lenkungsausschuss verabschiedet.',
        metric: { v: '8 Wochen', l: 'bis Entscheid' },
      },
      {
        sector: 'Energie',
        role: 'PMO - Projektleitung',
        headline: 'Portfolio-Cockpit aufgebaut und uebergeben.',
        body: 'Vierzehn parallele IT-Vorhaben ohne gemeinsame Methodik. Wir haben ein PMO aufgebaut, das Portfolio-Cockpit etabliert und nach neun Monaten an die interne Leitung uebergeben.',
        metric: { v: '9 Monate', l: 'bis interne Uebergabe' },
      },
    ],
  },

  sectors: {
    eyebrow: 'Branchen',
    heading: 'Breit aufgestellt.',
    items: [
      'Dienstleistungsbereiche',
      'Energie',
      'IT Service Providers',
      'Oeffentliche Verwaltung',
      'Versicherungen',
    ],
  },

  team: {
    eyebrow: 'Team',
    heading: ['Ein Team aus 10+', 'Professionals.'],
    body: 'Wir durften in unserer Laufbahn mehr als 30 Kunden national und international bedienen und viele Mandate zum Erfolg bringen. Unser Rezept: ziel- und loesungsorientiert, klar, strukturiert und pragmatisch.',
    memberInitials: 'SB',
    memberName: 'Stefan Buettler',
    memberTitle: 'Gruender und Geschaeftsfuehrer',
  },

  contact: {
    eyebrow: 'Kontakt',
    heading: 'Sprechen wir.',
    intro: 'Erstgespraech innerhalb von 48 Stunden, ohne Vertriebsschleife. Wir hoeren zu - und sagen ehrlich, ob wir die Richtigen sind.',
    companyName: 'ONEXIS GmbH',
    street: 'Sissacherstrasse 20',
    city: '4460 Gelterkinden',
    phone: '061 556 10 10',
    phoneHref: 'tel:+41615561010',
    email: 'kontakt@onexis.ch',
    emailHref: 'mailto:kontakt@onexis.ch',
    labelFirstName: 'Vorname',
    labelLastName: 'Nachname',
    labelEmail: 'E-Mail',
    labelMessage: 'Mitteilung',
    labelSubmit: 'Senden',
    sending: 'Wird gesendet …',
    errRequired: 'Bitte ausfüllen.',
    errEmail: 'Bitte eine gültige E-Mail-Adresse angeben.',
    successTitle: 'Vielen Dank.',
    successBody: 'Wir melden uns innerhalb von 48 Stunden.',
  },

  footer: {
    tagline: 'Ihr Partner fuer IT-Beratung, Projekt-Management, IT-Architektur & Seminare.',
    addressTitle: 'Adresse',
    company: 'ONEXIS GmbH',
    street: 'Sissacherstrasse 20',
    city: '4460 Gelterkinden',
    phone: '061 556 10 10',
    legalTitle: 'Rechtliches',
    legalLinks: [
      { label: 'Impressum',   href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
      { label: 'AGB',         href: '/agb' },
    ],
    copyright: '© 2026 ONEXIS GmbH',
    slogan: 'Projects in Motion',
  },

};
