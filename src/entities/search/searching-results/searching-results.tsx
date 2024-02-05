import { Button } from "@weather/shared";
import { FC, memo } from "react";
import { ClearSuggestions, SetValue } from "use-places-autocomplete";
import { v4 as uuidv4 } from "uuid";

export type ResultItemProps = {
  clearSuggestions: ClearSuggestions;
  data: google.maps.places.AutocompletePrediction[];
  setLocation: SetValue;
};

export const SearchingResults: FC<ResultItemProps> = memo(({ clearSuggestions, data, setLocation }) =>
  data.map(({ description }) => (
    <Button
      className="px-4 py-2 text-start hover:bg-black-700"
      key={uuidv4()}
      onClick={() => {
        setLocation(description, false);
        clearSuggestions();
      }}
    >
      {description}
    </Button>
  )),
);
