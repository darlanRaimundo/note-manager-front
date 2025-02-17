"use client";

import { Box } from "@mui/material";
import ButtonAppBar from "../components/buttonAppbar";
import DataTable from "../components/dataTable";
import { useEffect, useState } from "react";
import { getUserData } from "@/services/users/getUserData";
import { Note } from "@/lib/definitions";
import { getNotes } from "@/services/note/getNotes";

export default function Page() {
  const [userId, setUserId] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);

  const getData = async () => {
    const _userId = await getUserData();
    const _notes = await getNotes(_userId);

    setUserId(_userId);
    setNotes(_notes);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      gap={2}
    >
      <ButtonAppBar />
      {userId && <DataTable data={notes} userId={userId} />}
    </Box>
  );
}
