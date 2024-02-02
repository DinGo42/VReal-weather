import { ResultItemProps } from "../search";
import { Button } from "@weather/shared";
import { v4 as uuidv4 } from "uuid";

export const SearchingResults = ({ clearSuggestions, data, setLocation }: ResultItemProps) =>
  data.map(({ description }) => (
    <Button
      className="px-4 py-2 text-start hover:bg-tertiary-gray"
      key={uuidv4()}
      onClick={() => {
        setLocation(description, false);
        clearSuggestions();
      }}
    >
      {description}
    </Button>
  ));
