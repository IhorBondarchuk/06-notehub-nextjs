"use client";

import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes, NotesHttpResponse } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import css from "./Notes.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";

export default function NotesClient() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const debouncedSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
      setCurrentPage(1);
    },
    500
  );

  const { data: { notes = [], totalPages = 0 } = {} } = useQuery<
    NotesHttpResponse,
    Error
  >({
    queryKey: ["notes", currentPage, searchText],
    queryFn: () => fetchNotes(searchText, currentPage),
    placeholderData: keepPreviousData,
  });
  return (
    <>
      <div className={css.app}>
        <div className={css.toolbar}>
          <SearchBox search={searchText} onChange={debouncedSearch} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          <button
            className={css.button}
            onClick={() => {
              setIsOpenModal(true);
            }}
          >
            Create note +
          </button>
        </div>
        {notes.length > 0 && <NoteList notes={notes || []} />}
      </div>
      {isOpenModal && (
        <Modal
          onClose={() => {
            setIsOpenModal(false);
          }}
        >
          <NoteForm
            onClose={() => {
              setIsOpenModal(false);
            }}
          />
        </Modal>
      )}
      <Toaster position="bottom-center" reverseOrder={true} />
    </>
  );
}
