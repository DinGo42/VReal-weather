import { Button } from "@weather/shared";
import { FC, memo } from "react";
import { ClearSuggestions, SetValue } from "use-places-autocomplete";
import { v4 as uuidv4 } from "uuid";

export type ResultItemProps = {
  clearSuggestions: ClearSuggestions;
  data: google.maps.places.AutocompletePrediction[];
  setLocation: SetValue;
  setSelected: (value: string) => void;
};
export const SearchingResults: FC<ResultItemProps> = memo(({ clearSuggestions, data, setLocation, setSelected }) =>
  data.map(({ description, place_id: placeId }) => (
    <Button
      className="px-4 py-2 text-start hover:bg-black-700"
      key={uuidv4()}
      onClick={() => {
        setSelected(placeId);
        setLocation(description, false);
        clearSuggestions();
      }}
    >
      {description}
    </Button>
  )),
);
