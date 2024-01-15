import axios from "axios"
import { useEffect, useState } from "react"
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import useNoteService from '../Services/useNoteService'
import NotePopup from "../Popups/NotePopup";
export default function NoteList() {

    const [noteData, setNoteData] = useState([])
    const [id, setId] = useState('')
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setId('')
        getAllNotes()
    };
    const getAllNotes = async () => {
        let notes = await useNoteService.getNotes()
        setNoteData(notes)
    }

    useEffect(() => {
        getAllNotes()
    }, [])


    const columns = [
        { field: 'title', headerName: 'Title', width: 150 },
        { field: 'description', headerName: 'Description', width: 250 },
        {
            field: "actions",
            headerName: "Actions",
            // editable: false,
            width: 220,
            renderCell: (cellValues) => {
                // console.log("cellValues", cellValues.row.id)
                return (
                    <>
                        <IconButton aria-label="info" color="secondary" key={1} onClick={(e) => onInfo(e, cellValues.row.organizationId)}>
                            <PreviewIcon />
                        </IconButton>
                        <IconButton aria-label="update" color="primary" key={2} onClick={(e) => onUpdate(e, cellValues.row.id)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="error" key={3} onClick={(e) => onDelete(e, cellValues.row.id)}>
                            <DeleteIcon />
                        </IconButton>

                    </>
                )
            },
        },
    ];
    const onInfo = (e, id) => {
        console.log(e, id)
    }
    const onUpdate = (e, id) => {
        setId(id)
        setOpen(true)


    }
    const onDelete = async (e, id) => {
        console.log(e, id)
       let del= await useNoteService.deleteNote(id);

        getAllNotes()
    }
    return (
        <>
            <div style={{ height: 300, width: '100%' }}>
                <NotePopup open={open} onClose={handleClose} id={id} />
                <div style={{ display: 'flex', alignItems: 'left' }} >
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={onUpdate}
                        sx={{ mt: 3, mb: 2, textAlign: "left" }}>
                        Add Notes
                    </Button>
                </div>
                <DataGrid rows={noteData} columns={columns} />
            </div>
        </>
    )
}