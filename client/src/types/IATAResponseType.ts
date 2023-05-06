export interface IATAResponseType {
  data: Data
}

export interface Data {
  type: string
  subType: string
  name: string
  iataCode: string
  address: Address
  geoCode: GeoCode
}

export interface Address {
  countryCode: string
  stateCode: string
}

export interface GeoCode {
  latitude: number
  longitude: number
}
