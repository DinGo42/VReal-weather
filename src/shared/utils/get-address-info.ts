import { getGeocode, getLatLng } from "use-places-autocomplete";

type LocationWithAddress = {
  address: string;
};

type LocationWithLatLong = {
  location: { lat: number; lng: number };
  address?: never;
};

type InfoByAddressProps = LocationWithAddress | LocationWithLatLong;

export const getInfoByAddress = async (props: InfoByAddressProps) => {
  const results = await getGeocode({ ...props });
  const { lat, lng } = await getLatLng(results[0]);
  const city = ["locality", "political"].map(item =>
    results[0].address_components.find(component => {
      return component.types.includes(item);
    }),
  )[0]?.long_name;

  const { short_name: shortName, long_name: longName } = ["country", "political"].map(item =>
    results[0].address_components.find(component => {
      return component.types.includes(item);
    }),
  )[0]!;
  return { city: city || null, coords: { lat, lng }, country: { longName, shortName } };
};
