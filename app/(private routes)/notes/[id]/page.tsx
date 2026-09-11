import React from 'react';
import NoteDetails from './NoteDetails.client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from "@/lib/api/serverApi";
import { Metadata } from 'next';

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);
  const title = note.title || "Note Details";
  const description = note.content || "Note content not available";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `https://08-zustand-six-delta.vercel.app/notes/${id}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
}

export default async function NoteDetail({ params }: NoteDetailsPageProps) {
  const queryClient = new QueryClient();
  const {id} = await params;
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: ()=> fetchNoteById(id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  )
};
