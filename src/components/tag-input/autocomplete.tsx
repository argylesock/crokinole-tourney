import React from "react";
import {
  Command,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";

type AutocompleteProps = {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  autocompleteOptions: string[];
  maxTags?: number;
  onTagAdd?: (tag: string) => void;
  allowDuplicates: boolean;
  children: React.ReactNode;
};

export const Autocomplete: React.FC<AutocompleteProps> = ({
  tags,
  setTags,
  autocompleteOptions,
  maxTags,
  onTagAdd,
  allowDuplicates,
  children,
}) => {
  return (
    <Command className="border">
      {children}
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {autocompleteOptions.map((option) => (
            <CommandItem key={option}>
              <div
                className="w-full"
                onClick={() => {
                  if (maxTags && tags.length >= maxTags) return;
                  if (
                    !allowDuplicates &&
                    tags.some((tag) => tag === option)
                  )
                    return;
                  setTags([...tags, option]);
                  onTagAdd?.(option);
                }}
              >
                {option}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};