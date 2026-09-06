'use client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import css from './page.module.css';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes, type FetchNotesResponse } from '@/lib/api/clientApi';
import Pagination from '@/components/Pagination/Pagination';

import { useDebouncedCallback } from 'use-debounce'
import Link from 'next/link';

interface NotesProps{
  tag?: string;
}

const PER_PAGE = 12;

export default function Notes({tag}: NotesProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
  }, 500);

  const { data, isSuccess, isError, isLoading } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, PER_PAGE, debouncedSearch, tag],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search: debouncedSearch, tag}),
    placeholderData: keepPreviousData
  });

  const totalPages = data?.totalPages ?? 0;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    debouncedSetSearch(event.target.value);
    setPage(1);
  };
  const handlePageChange = (newPage: number) =>setPage(newPage);

  return (
    <div className={css.App}>
      <header className={css.toolbar}>
        <SearchBox searchQuery={search} onSearch={handleSearch} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
        
        <Link className={css.button} href="/notes/action/create">Create note +</Link>
      </header>
    
      {isLoading && <p>Loading, please wait...</p>}
      {isError ? (
          <p>Something went wrong.</p>
        ) : (
          data && data.notes.length > 0 && <NoteList notes={data.notes} />
        )}
    </div>)
}