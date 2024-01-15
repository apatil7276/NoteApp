import axios from "axios";

let token = localStorage.getItem("token");
console.log(token)

const getNotes = async () => {
    let response = await axios.get("http://localhost:5000/note/", { headers: { Authorization: token } })
    // console.log(response.data)
    return response.data.map((x)=>{return({id:x._id,title:x.title,description:x.description})});
}
const getNotesById = async (id) => {
    console.log("id",id)
    let response = await axios.get(`http://localhost:5000/note/${id}`, { headers: { Authorization: token } })
    return response.data;
}
const updateNote = async (noteData) => {
    // console.log(noteData)
  
    let response = await axios.put(`http://localhost:5000/note/${noteData._id}`,noteData, { headers: { Authorization: token } })
    console.log("response.data",response)
    return response.data;
}
const createNote = async (noteData) => {
    // console.log(noteData) 
    let response = await axios.post(`http://localhost:5000/note/`,noteData, { headers: { Authorization: token } })
    console.log("response.data",response)
    return response.data;
}
const deleteNote = async (id) => {
    console.log("id",id)
    let response = await axios.delete(`http://localhost:5000/note/${id}`, { headers: { Authorization: token } })
    return response.data;
}
export default {
    createNote:createNote,
    updateNote:updateNote,
    deleteNote:deleteNote,
    getNotes:getNotes,
    getNotesById:getNotesById
}