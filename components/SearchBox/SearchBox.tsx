import css from './SearchBox.module.css'

interface SearchBoxProps {
  searchQuery: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ searchQuery, onSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={searchQuery}
      onChange={onSearch}
    />
  )
}