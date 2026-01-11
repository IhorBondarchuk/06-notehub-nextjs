import { ChangeEvent } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ search, onChange }: SearchBoxProps) {
  return (
    <input
      type="text"
      className={css.input}
      defaultValue={search}
      placeholder="Search notes"
      onChange={onChange}
    />
  );
}
