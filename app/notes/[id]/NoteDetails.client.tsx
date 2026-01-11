"use client";

import css from "./NoteDetails.module.css";
import { fetchNotesById } from "@/lib/api";
import { Note } from "@/types/note";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => fetchNotesById(id),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data?.title}</h2>
        </div>
        <p className={css.content}>{data?.content}</p>
        <p className={css.date}>{data?.createdAt}</p>
      </div>
    </div>
  );
}
