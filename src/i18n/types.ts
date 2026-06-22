export type Locale = "th" | "en";

export type ServiceOption = {
  value: string;
  label: string;
};

export type ServiceCard = {
  title: string;
  description: string;
};

export type BlogPost = {
  tag: string;
  title: string;
  excerpt: string;
};

export type IndustryItem = {
  icon: string;
  label: string;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    services: string;
    why: string;
    knowledge: string;
    about: string;
    contact: string;
    lineCta: string;
    openMenu: string;
  };
  hero: {
    pill: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaLine: string;
    trust: {
      clients: string;
      clientsLabel: string;
      experience: string;
      experienceLabel: string;
      services: string;
      servicesLabel: string;
      ai: string;
      aiLabel: string;
    };
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    more: string;
    items: ServiceCard[];
  };
  why: {
    title: string;
    subtitle: string;
    badges: string[];
  };
  industries: {
    eyebrow: string;
    title: string;
    items: IndustryItem[];
  };
  knowledge: {
    eyebrow: string;
    title: string;
    subtitle: string;
    posts: BlogPost[];
  };
  testimonial: {
    eyebrow: string;
    title: string;
    quote: string;
    who: string;
    whoDetail: string;
  };
  partners: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    benefits: string[];
    maps: string;
    lineCta: string;
    form: {
      success: string;
      requiredError: string;
      submitError: string;
      networkError: string;
      fullName: string;
      fullNamePlaceholder: string;
      contactInfo: string;
      contactInfoPlaceholder: string;
      businessName: string;
      businessNamePlaceholder: string;
      service: string;
      servicePlaceholder: string;
      serviceNotSelected: string;
      serviceOptions: ServiceOption[];
      details: string;
      detailsPlaceholder: string;
      submit: string;
      submitting: string;
      note: string;
    };
  };
  footer: {
    tagline: string;
    servicesTitle: string;
    companyTitle: string;
    contactTitle: string;
    serviceLinks: string[];
    companyLinks: {
      about: string;
      team: string;
      knowledge: string;
      contact: string;
    };
    lineOa: string;
    maps: string;
    copyright: string;
    portal: string;
    privacy: string;
    cookies: string;
  };
  floatLine: string;
  cookie: {
    text: string;
    settings: string;
    accept: string;
  };
};
