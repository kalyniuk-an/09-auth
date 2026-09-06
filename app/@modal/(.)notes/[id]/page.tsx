import { fetchNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotePreview from "./NotePreview.client";
interface NotePreviewProps{
  params: Promise<{id: string}>
}

export default async function NotePreviewPage({params}: NotePreviewProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview/>
    </HydrationBoundary>
  )
}