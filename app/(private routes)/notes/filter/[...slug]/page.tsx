import React from "react";
import Notes from "./Notes.client";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from "@/lib/api/serverApi";
import { Metadata } from "next";


interface NotesPageProps{
  params: Promise<{slug: string[]}>
}

export async function generateMetadata({ params }: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];
  const title = tag ? `Notes tagged with "${tag}"` : "All Notes";
  const description = tag ? `A collection of notes tagged with "${tag}".` : "A collection of all notes.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-six-delta.vercel.app/notes/filter/${tag || 'all'}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];
  const queryClient = new QueryClient();
  const search = '';
  const page = 1;
 
  await queryClient.prefetchQuery({
    queryKey: ["notes", search, page, tag],
    queryFn: () => fetchNotes({ page, search, tag}),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={tag } />
    </HydrationBoundary>
  )
};
