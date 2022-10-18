export const Colors = {
  BLACK: '#000000',
  PRIMARY_LIGHT: '#639bc9',
  PRIMARY: '#4789bf',
  WHITE: '#ffffff',
  PRIMARY_RED: '#e63946',
  PRIMARY_WHTIE: '#f1faee',
  PRIMARY_RED_DARK_SHADE: '#e63947cb',
  PRIMARY_RED_MEDIUM_SHADE: '#e639477c',
  PRIMARY_RED_MILD_SHADE: '#e639474e',
  PRIMARY_RED_LIGHT_SHADE2: '#edbab6',
  PRIMARY_RED_LIGHT_SHADE: '#e639471e',
  PRIMARY_BLUE: '#457b9d9f',
  PRIMARY_WHITE: '#f1faee',
  GRAY: '#6e6e6e',
  GRAY_LIGHT: '#cfcfcf',
  GRAY_DARK: '#4c4c4c',
  GRAY_LIGHT_OPAQUE: '#cfcfcf9c',
  GRAY_OPAQUE: '#6e6e6ea7',
  GRAY_MILD_OPAQUE: '#adadadbb'
};

export const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const VALID_TIMEZONES = [
  { label: 'Niue', tzCode: 'Pacific/Niue' },
  { label: 'Pago Pago', tzCode: 'Pacific/Pago_Pago' },
  { label: 'Hawaii Time', tzCode: 'Pacific/Honolulu' },
  { label: 'Rarotonga', tzCode: 'Pacific/Rarotonga' },
  { label: 'Tahiti', tzCode: 'Pacific/Tahiti' },
  { label: 'Marquesas', tzCode: 'Pacific/Marquesas' },
  { label: 'Alaska Time', tzCode: 'America/Anchorage' },
  { label: 'Gambier', tzCode: 'Pacific/Gambier' },
  { label: 'Pacific Time', tzCode: 'America/Los_Angeles' },
  { label: 'Pacific Time - Tijuana', tzCode: 'America/Tijuana' },
  { label: 'Pacific Time - Vancouver', tzCode: 'America/Vancouver' },
  { label: 'Pacific Time - Whitehorse', tzCode: 'America/Whitehorse' },
  { label: 'Pitcairn', tzCode: 'Pacific/Pitcairn' },
  { label: 'Mountain Time', tzCode: 'America/Denver' },
  { label: 'Mountain Time - Arizona', tzCode: 'America/Phoenix' },
  { label: 'Mountain Time - Chihuahua, Mazatlan', tzCode: 'America/Mazatlan' },
  { label: 'Mountain Time - Dawson Creek', tzCode: 'America/Dawson_Creek' },
  { label: 'Mountain Time - Edmonton', tzCode: 'America/Edmonton' },
  { label: 'Mountain Time - Hermosillo', tzCode: 'America/Hermosillo' },
  { label: 'Mountain Time - Yellowknife', tzCode: 'America/Yellowknife' },
  { label: 'Belize', tzCode: 'America/Belize' },
  { label: 'Central Time', tzCode: 'America/Chicago' },
  { label: 'Central Time - Mexico City', tzCode: 'America/Mexico_City' },
  { label: 'Central Time - Regina', tzCode: 'America/Regina' },
  { label: 'Central Time - Tegucigalpa', tzCode: 'America/Tegucigalpa' },
  { label: 'Central Time - Winnipeg', tzCode: 'America/Winnipeg' },
  { label: 'Costa Rica', tzCode: 'America/Costa_Rica' },
  { label: 'El Salvador', tzCode: 'America/El_Salvador' },
  { label: 'Galapagos', tzCode: 'Pacific/Galapagos' },
  { label: 'Guatemala', tzCode: 'America/Guatemala' },
  { label: 'Managua', tzCode: 'America/Managua' },
  { label: 'America Cancun', tzCode: 'America/Cancun' },
  { label: 'Bogota', tzCode: 'America/Bogota' },
  { label: 'Easter Island', tzCode: 'Pacific/Easter' },
  { label: 'Eastern Time', tzCode: 'America/New_York' },
  { label: 'Eastern Time - Iqaluit', tzCode: 'America/Iqaluit' },
  { label: 'Eastern Time - Toronto', tzCode: 'America/Toronto' },
  { label: 'Guayaquil', tzCode: 'America/Guayaquil' },
  { label: 'Havana', tzCode: 'America/Havana' },
  { label: 'Jamaica', tzCode: 'America/Jamaica' },
  { label: 'Lima', tzCode: 'America/Lima' },
  { label: 'Nassau', tzCode: 'America/Nassau' },
  { label: 'Panama', tzCode: 'America/Panama' },
  { label: 'Port-au-Prince', tzCode: 'America/Port-au-Prince' },
  { label: 'Rio Branco', tzCode: 'America/Rio_Branco' },
  { label: 'Atlantic Time - Halifax', tzCode: 'America/Halifax' },
  { label: 'Barbados', tzCode: 'America/Barbados' },
  { label: 'Bermuda', tzCode: 'Atlantic/Bermuda' },
  { label: 'Boa Vista', tzCode: 'America/Boa_Vista' },
  { label: 'Caracas', tzCode: 'America/Caracas' },
  { label: 'Curacao', tzCode: 'America/Curacao' },
  { label: 'Grand Turk', tzCode: 'America/Grand_Turk' },
  { label: 'Guyana', tzCode: 'America/Guyana' },
  { label: 'La Paz', tzCode: 'America/La_Paz' },
  { label: 'Manaus', tzCode: 'America/Manaus' },
  { label: 'Martinique', tzCode: 'America/Martinique' },
  { label: 'Port of Spain', tzCode: 'America/Port_of_Spain' },
  { label: 'Porto Velho', tzCode: 'America/Porto_Velho' },
  { label: 'Puerto Rico', tzCode: 'America/Puerto_Rico' },
  { label: 'Santo Domingo', tzCode: 'America/Santo_Domingo' },
  { label: 'Thule', tzCode: 'America/Thule' },
  { label: 'Newfoundland Time - St. Johns', tzCode: 'America/St_Johns' },
  { label: 'Araguaina', tzCode: 'America/Araguaina' },
  { label: 'Asuncion', tzCode: 'America/Asuncion' },
  { label: 'Belem', tzCode: 'America/Belem' },
  { label: 'Buenos Aires', tzCode: 'America/Argentina/Buenos_Aires' },
  { label: 'Campo Grande', tzCode: 'America/Campo_Grande' },
  { label: 'Cayenne', tzCode: 'America/Cayenne' },
  { label: 'Cuiaba', tzCode: 'America/Cuiaba' },
  { label: 'Fortaleza', tzCode: 'America/Fortaleza' },
  { label: 'Godthab', tzCode: 'America/Godthab' },
  { label: 'Maceio', tzCode: 'America/Maceio' },
  { label: 'Miquelon', tzCode: 'America/Miquelon' },
  { label: 'Montevideo', tzCode: 'America/Montevideo' },
  { label: 'Palmer', tzCode: 'Antarctica/Palmer' },
  { label: 'Paramaribo', tzCode: 'America/Paramaribo' },
  { label: 'Punta Arenas', tzCode: 'America/Punta_Arenas' },
  { label: 'Recife', tzCode: 'America/Recife' },
  { label: 'Rothera', tzCode: 'Antarctica/Rothera' },
  { label: 'Salvador', tzCode: 'America/Bahia' },
  { label: 'Santiago', tzCode: 'America/Santiago' },
  { label: 'Stanley', tzCode: 'Atlantic/Stanley' },
  { label: 'Noronha', tzCode: 'America/Noronha' },
  { label: 'Sao Paulo', tzCode: 'America/Sao_Paulo' },
  { label: 'South Georgia', tzCode: 'Atlantic/South_Georgia' },
  { label: 'Azores', tzCode: 'Atlantic/Azores' },
  { label: 'Cape Verde', tzCode: 'Atlantic/Cape_Verde' },
  { label: 'Scoresbysund', tzCode: 'America/Scoresbysund' },
  { label: 'Abidjan', tzCode: 'Africa/Abidjan' },
  { label: 'Accra', tzCode: 'Africa/Accra' },
  { label: 'Bissau', tzCode: 'Africa/Bissau' },
  { label: 'Canary Islands', tzCode: 'Atlantic/Canary' },
  { label: 'Casablanca', tzCode: 'Africa/Casablanca' },
  { label: 'Danmarkshavn', tzCode: 'America/Danmarkshavn' },
  { label: 'Dublin', tzCode: 'Europe/Dublin' },
  { label: 'El Aaiun', tzCode: 'Africa/El_Aaiun' },
  { label: 'Faeroe', tzCode: 'Atlantic/Faroe' },
  { label: 'GMT (no daylight saving)', tzCode: 'Etc/GMT' },
  { label: 'Lisbon', tzCode: 'Europe/Lisbon' },
  { label: 'London', tzCode: 'Europe/London' },
  { label: 'Monrovia', tzCode: 'Africa/Monrovia' },
  { label: 'Reykjavik', tzCode: 'Atlantic/Reykjavik' },
  { label: 'Algiers', tzCode: 'Africa/Algiers' },
  { label: 'Amsterdam', tzCode: 'Europe/Amsterdam' },
  { label: 'Andorra', tzCode: 'Europe/Andorra' },
  { label: 'Berlin', tzCode: 'Europe/Berlin' },
  { label: 'Brussels', tzCode: 'Europe/Brussels' },
  { label: 'Budapest', tzCode: 'Europe/Budapest' },
  { label: 'Central European Time - Belgrade', tzCode: 'Europe/Belgrade' },
  { label: 'Central European Time - Prague', tzCode: 'Europe/Prague' },
  { label: 'Ceuta', tzCode: 'Africa/Ceuta' },
  { label: 'Copenhagen', tzCode: 'Europe/Copenhagen' },
  { label: 'Gibraltar', tzCode: 'Europe/Gibraltar' },
  { label: 'Lagos', tzCode: 'Africa/Lagos' },
  { label: 'Luxembourg', tzCode: 'Europe/Luxembourg' },
  { label: 'Madrid', tzCode: 'Europe/Madrid' },
  { label: 'Malta', tzCode: 'Europe/Malta' },
  { label: 'Monaco', tzCode: 'Europe/Monaco' },
  { label: 'Ndjamena', tzCode: 'Africa/Ndjamena' },
  { label: 'Oslo', tzCode: 'Europe/Oslo' },
  { label: 'Paris', tzCode: 'Europe/Paris' },
  { label: 'Rome', tzCode: 'Europe/Rome' },
  { label: 'Stockholm', tzCode: 'Europe/Stockholm' },
  { label: 'Tirane', tzCode: 'Europe/Tirane' },
  { label: 'Tunis', tzCode: 'Africa/Tunis' },
  { label: 'Vienna', tzCode: 'Europe/Vienna' },
  { label: 'Warsaw', tzCode: 'Europe/Warsaw' },
  { label: 'Zurich', tzCode: 'Europe/Zurich' },
  { label: 'Amman', tzCode: 'Asia/Amman' },
  { label: 'Athens', tzCode: 'Europe/Athens' },
  { label: 'Beirut', tzCode: 'Asia/Beirut' },
  { label: 'Bucharest', tzCode: 'Europe/Bucharest' },
  { label: 'Cairo', tzCode: 'Africa/Cairo' },
  { label: 'Chisinau', tzCode: 'Europe/Chisinau' },
  { label: 'Damascus', tzCode: 'Asia/Damascus' },
  { label: 'Gaza', tzCode: 'Asia/Gaza' },
  { label: 'Helsinki', tzCode: 'Europe/Helsinki' },
  { label: 'Jerusalem', tzCode: 'Asia/Jerusalem' },
  { label: 'Johannesburg', tzCode: 'Africa/Johannesburg' },
  { label: 'Khartoum', tzCode: 'Africa/Khartoum' },
  { label: 'Kiev', tzCode: 'Europe/Kiev' },
  { label: 'Maputo', tzCode: 'Africa/Maputo' },
  { label: 'Moscow-01 - Kaliningrad', tzCode: 'Europe/Kaliningrad' },
  { label: 'Nicosia', tzCode: 'Asia/Nicosia' },
  { label: 'Riga', tzCode: 'Europe/Riga' },
  { label: 'Sofia', tzCode: 'Europe/Sofia' },
  { label: 'Tallinn', tzCode: 'Europe/Tallinn' },
  { label: 'Tripoli', tzCode: 'Africa/Tripoli' },
  { label: 'Vilnius', tzCode: 'Europe/Vilnius' },
  { label: 'Windhoek', tzCode: 'Africa/Windhoek' },
  { label: 'Baghdad', tzCode: 'Asia/Baghdad' },
  { label: 'Istanbul', tzCode: 'Europe/Istanbul' },
  { label: 'Minsk', tzCode: 'Europe/Minsk' },
  { label: 'Moscow+00 - Moscow', tzCode: 'Europe/Moscow' },
  { label: 'Nairobi', tzCode: 'Africa/Nairobi' },
  { label: 'Qatar', tzCode: 'Asia/Qatar' },
  { label: 'Riyadh', tzCode: 'Asia/Riyadh' },
  { label: 'Syowa', tzCode: 'Antarctica/Syowa' },
  { label: 'Tehran', tzCode: 'Asia/Tehran' },
  { label: 'Baku', tzCode: 'Asia/Baku' },
  { label: 'Dubai', tzCode: 'Asia/Dubai' },
  { label: 'Mahe', tzCode: 'Indian/Mahe' },
  { label: 'Mauritius', tzCode: 'Indian/Mauritius' },
  { label: 'Moscow+01 - Samara', tzCode: 'Europe/Samara' },
  { label: 'Reunion', tzCode: 'Indian/Reunion' },
  { label: 'Tbilisi', tzCode: 'Asia/Tbilisi' },
  { label: 'Yerevan', tzCode: 'Asia/Yerevan' },
  { label: 'Kabul', tzCode: 'Asia/Kabul' },
  { label: 'Aqtau', tzCode: 'Asia/Aqtau' },
  { label: 'Aqtobe', tzCode: 'Asia/Aqtobe' },
  { label: 'Ashgabat', tzCode: 'Asia/Ashgabat' },
  { label: 'Dushanbe', tzCode: 'Asia/Dushanbe' },
  { label: 'Karachi', tzCode: 'Asia/Karachi' },
  { label: 'Kerguelen', tzCode: 'Indian/Kerguelen' },
  { label: 'Maldives', tzCode: 'Indian/Maldives' },
  { label: 'Mawson', tzCode: 'Antarctica/Mawson' },
  { label: 'Moscow+02 - Yekaterinburg', tzCode: 'Asia/Yekaterinburg' },
  { label: 'Tashkent', tzCode: 'Asia/Tashkent' },
  { label: 'Colombo', tzCode: 'Asia/Colombo' },
  { label: 'India Standard Time', tzCode: 'Asia/Kolkata' },
  { label: 'Kathmandu', tzCode: 'Asia/Kathmandu' },
  { label: 'Almaty', tzCode: 'Asia/Almaty' },
  { label: 'Bishkek', tzCode: 'Asia/Bishkek' },
  { label: 'Chagos', tzCode: 'Indian/Chagos' },
  { label: 'Dhaka', tzCode: 'Asia/Dhaka' },
  { label: 'Moscow+03 - Omsk', tzCode: 'Asia/Omsk' },
  { label: 'Thimphu', tzCode: 'Asia/Thimphu' },
  { label: 'Vostok', tzCode: 'Antarctica/Vostok' },
  { label: 'Cocos', tzCode: 'Indian/Cocos' },
  { label: 'Rangoon', tzCode: 'Asia/Yangon' },
  { label: 'Bangkok', tzCode: 'Asia/Bangkok' },
  { label: 'Christmas', tzCode: 'Indian/Christmas' },
  { label: 'Davis', tzCode: 'Antarctica/Davis' },
  { label: 'Hanoi', tzCode: 'Asia/Saigon' },
  { label: 'Hovd', tzCode: 'Asia/Hovd' },
  { label: 'Jakarta', tzCode: 'Asia/Jakarta' },
  { label: 'Moscow+04 - Krasnoyarsk', tzCode: 'Asia/Krasnoyarsk' },
  { label: 'Brunei', tzCode: 'Asia/Brunei' },
  { label: 'China Time - Beijing', tzCode: 'Asia/Shanghai' },
  { label: 'Choibalsan', tzCode: 'Asia/Choibalsan' },
  { label: 'Hong Kong', tzCode: 'Asia/Hong_Kong' },
  { label: 'Kuala Lumpur', tzCode: 'Asia/Kuala_Lumpur' },
  { label: 'Macau', tzCode: 'Asia/Macau' },
  { label: 'Makassar', tzCode: 'Asia/Makassar' },
  { label: 'Manila', tzCode: 'Asia/Manila' },
  { label: 'Moscow+05 - Irkutsk', tzCode: 'Asia/Irkutsk' },
  { label: 'Singapore', tzCode: 'Asia/Singapore' },
  { label: 'Taipei', tzCode: 'Asia/Taipei' },
  { label: 'Ulaanbaatar', tzCode: 'Asia/Ulaanbaatar' },
  { label: 'Western Time - Perth', tzCode: 'Australia/Perth' },
  { label: 'Pyongyang', tzCode: 'Asia/Pyongyang' },
  { label: 'Dili', tzCode: 'Asia/Dili' },
  { label: 'Jayapura', tzCode: 'Asia/Jayapura' },
  { label: 'Moscow+06 - Yakutsk', tzCode: 'Asia/Yakutsk' },
  { label: 'Palau', tzCode: 'Pacific/Palau' },
  { label: 'Seoul', tzCode: 'Asia/Seoul' },
  { label: 'Tokyo', tzCode: 'Asia/Tokyo' },
  { label: 'Central Time - Darwin', tzCode: 'Australia/Darwin' },
  { label: 'Dumont D\'Urville', tzCode: 'Antarctica/DumontDUrville' },
  { label: 'Eastern Time - Brisbane', tzCode: 'Australia/Brisbane' },
  { label: 'Guam', tzCode: 'Pacific/Guam' },
  { label: 'Moscow+07 - Vladivostok', tzCode: 'Asia/Vladivostok' },
  { label: 'Port Moresby', tzCode: 'Pacific/Port_Moresby' },
  { label: 'Truk', tzCode: 'Pacific/Chuuk' },
  { label: 'Central Time - Adelaide', tzCode: 'Australia/Adelaide' },
  { label: 'Casey', tzCode: 'Antarctica/Casey' },
  { label: 'Eastern Time - Hobart', tzCode: 'Australia/Hobart' },
  { label: 'Eastern Time - Melbourne, Sydney', tzCode: 'Australia/Sydney' },
  { label: 'Efate', tzCode: 'Pacific/Efate' },
  { label: 'Guadalcanal', tzCode: 'Pacific/Guadalcanal' },
  { label: 'Kosrae', tzCode: 'Pacific/Kosrae' },
  { label: 'Moscow+08 - Magadan', tzCode: 'Asia/Magadan' },
  { label: 'Norfolk', tzCode: 'Pacific/Norfolk' },
  { label: 'Noumea', tzCode: 'Pacific/Noumea' },
  { label: 'Ponape', tzCode: 'Pacific/Pohnpei' },
  { label: 'Funafuti', tzCode: 'Pacific/Funafuti' },
  { label: 'Kwajalein', tzCode: 'Pacific/Kwajalein' },
  { label: 'Majuro', tzCode: 'Pacific/Majuro' },
  { label: 'Moscow+09 - Petropavlovsk-Kamchatskiy', tzCode: 'Asia/Kamchatka' },
  { label: 'Nauru', tzCode: 'Pacific/Nauru' },
  { label: 'Tarawa', tzCode: 'Pacific/Tarawa' },
  { label: 'Wake', tzCode: 'Pacific/Wake' },
  { label: 'Wallis', tzCode: 'Pacific/Wallis' },
  { label: 'Auckland', tzCode: 'Pacific/Auckland' },
  { label: 'Enderbury', tzCode: 'Pacific/Enderbury' },
  { label: 'Fakaofo', tzCode: 'Pacific/Fakaofo' },
  { label: 'Fiji', tzCode: 'Pacific/Fiji' },
  { label: 'Tongatapu', tzCode: 'Pacific/Tongatapu' },
  { label: 'Apia', tzCode: 'Pacific/Apia' },
  { label: 'Kiritimati', tzCode: 'Pacific/Kiritimati' }
]

const DEV_IPADDRESSES = {
  ada: '192.168.1.17',
  home: '192.168.0.141'
}

export const ROOT_URL = `https://scheduleit-api-production.up.railway.app`

export const UI_ROOT_URL = `http://${DEV_IPADDRESSES['home']}:3000`