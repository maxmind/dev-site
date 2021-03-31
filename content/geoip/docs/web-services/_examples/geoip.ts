export const country = {
  continent: {
    code: 'NA',
    geoname_id: 123456,
    names: {
      de: 'Nordamerika',
      en: 'North America',
      es: 'América del Norte',
      fr: 'Amérique du Nord',
      ja: '北アメリカ',
      'pt-BR': 'América do Norte',
      ru: 'Северная Америка',
      'zh-CN': '北美洲',
    },
  },
  country: {
    geoname_id: 6252001,
    is_in_european_union: true,
    iso_code: 'US',
    names: {
      de: 'USA',
      en: 'United States',
      es: 'Estados Unidos',
      fr: 'États-Unis',
      ja: 'アメリカ合衆国',
      'pt-BR': 'Estados Unidos',
      ru: 'США',
      'zh-CN': '美国',
    },
  },
  maxmind: {
    queries_remaining: 54321,
  },
  registered_country:  {
    geoname_id: 6252001,
    is_in_european_union: true,
    iso_code: 'US',
    names: {
      de: 'USA',
      en: 'United States',
      es: 'Estados Unidos',
      fr: 'États-Unis',
      ja:  'アメリカ合衆国',
      'pt-BR': 'Estados Unidos',
      ru: 'США',
      'zh-CN': '美国',
    },
  },
  represented_country:  {
    geoname_id: 6252001,
    is_in_european_union: true,
    iso_code: 'US',
    names: {
      de: 'USA',
      en: 'United States',
      es: 'Estados Unidos',
      fr: 'États-Unis',
      ja:  'アメリカ合衆国',
      'pt-BR': 'Estados Unidos',
      ru: 'США',
      'zh-CN': '美国',
    },
    type: 'military',
  },
  traits: {
    ip_address: '1.2.3.4',
    network: '1.2.3.0/24',
  },
};

export const city = {
  ...country,
  city:  {
    geoname_id: 54321,
    names:  {
      de: 'Los Angeles',
      en: 'Los Angeles',
      es: 'Los Ángeles',
      fr: 'Los Angeles',
      ja: 'ロサンゼルス市',
      'pt-BR': 'Los Angeles',
      ru: 'Лос-Анджелес',
      'zh-CN': '洛杉矶',
    },
  },
  location:  {
    accuracy_radius: 20,
    latitude: 37.6293,
    longitude: -122.1163,
    metro_code: 807,
    time_zone: 'America/Los_Angeles',
  },
  postal: {
    code: '90001',
  },
  subdivisions:  [
    {
      geoname_id: 5332921,
      iso_code: 'CA',
      names: {
        de: 'Kalifornien',
        en: 'California',
        es: 'California',
        fr: 'Californie',
        ja: 'カリフォルニア',
        ru: 'Калифорния',
        'zh-CN': '加州',
      },
    },
  ],
  traits: {
    ...country.traits,
    autonomous_system_number: 1239,
    autonomous_system_organization: 'Linkem IR WiMax Network',
    domain: 'example.com',
    isp: 'Linkem spa',
    organization: 'Linkem IR WiMax Network',
  },
};

export const insights = {
  ...city,
  city:  {
    confidence: 25,
    ...city.city,
  },
  country: {
    ...city.country,
    confidence: 75,
  },
  location:  {
    ...city.location,
    average_income: 128321,
  },
  postal: {
    ...city.postal,
    confidence: 10,
  },
  subdivisions:  [
    {
      ...city.subdivisions[0],
      confidence: 50,
    },
  ],
  traits: {
    ...city.traits,
    is_anonymous:                   true,
    is_anonymous_vpn:               true,
    is_hosting_provider:            true,
    is_public_proxy:                true,
    is_residential_proxy:           true,
    is_tor_exit_node:               true,
    static_ip_score:                1.5,
    user_count:                     1,
    user_type:                      'traveler',
  },
};

export default insights;
