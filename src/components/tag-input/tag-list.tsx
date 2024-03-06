import React from "react";
import { Tag, TagProps } from "./tag";
import { cn } from "@/lib/utils";

export type TagListProps = {
  tags: string[];
  customTagRenderer?: (tag: string) => React.ReactNode;
  direction?: TagProps["direction"];
} & Omit<TagProps, "tagObj">;

export const TagList: React.FC<TagListProps> = ({
  tags,
  customTagRenderer,
  direction,
  ...tagListProps
}) => {
  return (
    <div
      className={cn("rounded-md max-w-[450px]", {
        "flex flex-wrap gap-2": direction === "row",
        "flex flex-col gap-2": direction === "column",
      })}
    >
      {tags.map((tagObj) =>
        customTagRenderer ? (
          customTagRenderer(tagObj)
        ) : (
          <Tag key={tagObj} tagObj={tagObj} {...tagListProps} />
        )
      )}
    </div>
  );
};