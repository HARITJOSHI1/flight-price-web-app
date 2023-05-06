// IATA response
export interface IATAResponse {
  meta: Meta;
  data: Daum[];
}

export interface Meta {
  count: number;
  links: Links;
}

export interface Links {
  self: string;
}

export interface Daum {
  type: string;
  subType: string;
  name: string;
  iataCode: string;
  address: Address;
  geoCode: GeoCode;
}

export interface Address {
  countryCode: string;
  stateCode: string;
}

export interface GeoCode {
  latitude: number;
  longitude: number;
}

// Auth credentials to make requset for flight offer
export interface AuthCredentialResponse {
  type: string;
  username: string;
  application_name: string;
  client_id: string;
  token_type: string;
  access_token: string;
  expires_in: number;
  state: string;
  scope: string;
}

// Flight Offer Response
export interface FlightOfferResponse {
  meta: Meta;
  data: Daum[];
  dictionaries: Dictionaries;
}

export interface Meta {
  count: number;
  links: Links;
}

export interface Links {
  self: string;
}

export interface Daum {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  lastTicketingDate: string;
  lastTicketingDateTime: string;
  numberOfBookableSeats: number;
  itineraries: Itinerary[];
  price: Price;
  pricingOptions: PricingOptions;
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
}

export interface Itinerary {
  duration: string;
  segments: Segment[];
}

export interface Segment {
  departure: Departure;
  arrival: Arrival;
  carrierCode: string;
  number: string;
  aircraft: Aircraft;
  operating: Operating;
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}

export interface Departure {
  iataCode: string;
  terminal: string;
  at: string;
}

export interface Arrival {
  iataCode: string;
  at: string;
}

export interface Aircraft {
  code: string;
}

export interface Operating {
  carrierCode: string;
}

export interface Price {
  currency: string;
  total: string;
  base: string;
  fees: Fee[];
  grandTotal: string;
}

export interface Fee {
  amount: string;
  type: string;
}

export interface PricingOptions {
  fareType: string[];
  includedCheckedBagsOnly: boolean;
}

export interface TravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: Price2;
  fareDetailsBySegment: FareDetailsBySegment[];
}

export interface Price2 {
  currency: string;
  total: string;
  base: string;
}

export interface FareDetailsBySegment {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  class: string;
  includedCheckedBags: IncludedCheckedBags;
}

export interface IncludedCheckedBags {
  weight: number;
  weightUnit: string;
}

export interface Dictionaries {
  locations: Locations;
  aircraft: Aircraft2;
  currencies: Currencies;
  carriers: Carriers;
}

export interface Locations {
  [key: string]: string;
}

export interface Bkk {
  cityCode: string;
  countryCode: string;
}

export interface Del {
  cityCode: string;
  countryCode: string;
}

export interface Aircraft2 {
  [key: string]: string;
}

export interface Currencies {
  [key: string]: string;
}

export interface Carriers {
  [key: string]: string;
}
