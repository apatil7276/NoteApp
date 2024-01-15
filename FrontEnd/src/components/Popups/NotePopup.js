

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';

import Container from '@mui/material/Container'
import { useState,useEffect } from 'react';
import useNoteService from '../Services/useNoteService'
export default function NotePopup(props) {
    const { onClose, open } = props;
    console.log(props)

    const[noteData,setNoteData]=useState({
        title: '',
        description:''
    })

    const handleClose = () => {
        onClose(true);

    };
    const getNoteById = async (id) => {
        let notes = await useNoteService.getNotesById(id)
            console.log("notes", notes)
            setNoteData({...notes})
    }
    useEffect(() => {
        if(props.id)
        {
            getNoteById(props.id) 
        }
        else{
            getNoteById('') 
        }
       
    },[props.id])
    
    const onSubmit= async(event)=>{
        event.preventDefault();
        if(props.id){
           let data= await useNoteService.updateNote(noteData)
           console.log("data",data)
           setNoteData({
            title:'',
            description:''
           })
           handleClose()
        }
        else{
            let notes = await useNoteService.createNote(noteData);
           
            handleClose()
            setNoteData({
                title:'',
                description:''
               })
        }
        
    }
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setNoteData({...noteData,[name]:value})
    };
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Notes</DialogTitle>

            <Container component="main" maxWidth="xs">
                <Box
                    sx={{

                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }} >
                    <Box component="form" >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoComplete="title"
                            autoFocus
                            value={noteData.title}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="description"
                            label="Description"
                            type="text"
                            id="description"
                            autoComplete="description"
                            value={noteData.description}
                            onChange={handleChange}
                        />
                        { props.id?
                         <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={onSubmit}
                            sx={{ mt: 3, mb: 2 }}>
                            
                            Update
                        </Button>:
                         <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={onSubmit}
                            sx={{ mt: 3, mb: 2 }}>
                            
                            Save
                        </Button>
                        }
                       
                    </Box>
                </Box>
            </Container>
        </Dialog>
    );
}



