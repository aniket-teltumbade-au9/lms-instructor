import React, {useState} from 'react'
import fireReact from "../../Utils/firebaseConfig"
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import LinearProgress from '@mui/material/LinearProgress';
import InputLabel from '@mui/material/InputLabel';
import {collection, addDoc} from 'firebase/firestore'
import { CircularProgress } from '@mui/material';

interface Percent {
 video: number,
 image: number
}
interface FormData {
    title: string,
    content: string
}

export default function Product() {
    const [file, setFile] = useState<any>();
    const [cover, setCover] = useState<any>();
    const [formData, setFormData] = useState<FormData>({title: '', content: ''});
    const [percent, setPercent] = useState<Percent>({video: 0, image : 0});
    const [submitting, setSubmitting] = useState(false)

    // Handle file upload event and update state
    function handleChangeVideo(event:  React.ChangeEvent<HTMLInputElement>) {
        if(event.target.files){
            const file1= event.target.files[0]
            const storageRef = ref(fireReact.storage, `/files/${file1?.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file1);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
        
                    // update progress
                    setPercent((prevState)=>({...prevState, video: percent}));
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setFile(url);
                    });
                }
            ); 
        }
    } 
    function handleChangeImage(event:  React.ChangeEvent<HTMLInputElement>) {
        if(event.target.files){
            const file2= event.target.files[0]
            const storageRef = ref(fireReact.storage, `/files/${file2?.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file2);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
        
                    // update progress
                    setPercent((prevState)=>({...prevState, image: percent}));
                    console.log(percent);
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setCover(url);
                    });
                }
            ); 
        }
    }

    async function handleUpload() {
        if(submitting) return
        setSubmitting(true)
        try {
            await addDoc(collection(fireReact.db, 'products'), {...formData, video: file, cover, verified: false})
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          setSubmitting(false)
    }
    function handleInput(event:  React.ChangeEvent<HTMLInputElement>) {
       setFormData((prevState) => ({...prevState, [event.target.name]: event.target.value}))
    }
  return (
    <Container style={{height: 'calc(100vh - 150px)', display: 'flex', alignItems:'center'}} >
        <Grid container justifyContent='center'>
            <Grid item md={7} m={2}>
                <Typography variant='h5'>Add Product</Typography>
            </Grid>
            <Grid container item md={7} style={{height: '400px', overflowY:'scroll'}}>
                <Grid item md={12} m={2}>
                    <FormControl fullWidth >
                        <InputLabel htmlFor='title' shrink={true}>Title</InputLabel>
                        <Input type="text" id='title' onChange={handleInput} name='title'/>
                    </FormControl>
                </Grid>
                <Grid item md={12} m={2}>
                    <FormControl fullWidth disabled={submitting}>
                        {cover && <img src={cover} width='auto' height='100' alt='cover'/>}
                        <InputLabel htmlFor='image' shrink={true}>Cover</InputLabel>
                        <Input type="file" onChange={handleChangeImage} id='image' name='cover' inputProps={{accept: 'image/*'}}/>
                        <LinearProgress 
                            variant="determinate"
                            value={percent.image} 
                            color={percent.image===0 ? 'primary' : percent.image>0 && percent.image<99 ? 'secondary' : 'success'}
                            title={percent.image.toString()}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={12} m={2}>
                    <FormControl fullWidth disabled={submitting}>
                        {file && <video src={file} width='auto' height='100'/>}
                        <InputLabel htmlFor='video' shrink={true}>Video</InputLabel>
                        <Input type="file" id='video' onChange={handleChangeVideo} inputProps={{accept:"video/*"}} fullWidth/>
                        <LinearProgress 
                            variant="determinate"
                            value={percent.video} 
                            color={percent.video===0 ? 'primary' : percent.video>0 && percent.video<99 ? 'secondary' : 'success'}
                            title={percent.toString()}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={12} m={2}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor='content' shrink={true}>Content</InputLabel>
                        <Input type="text" id='content' onChange={handleInput} name='content' multiline minRows={3}/>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item md={7} m={2} justifyContent='center' display='flex'>
                <Button onClick={handleUpload} variant='outlined' disabled={submitting} {...submitting ? {startIcon:<CircularProgress variant='indeterminate'/>} : {}}>
                    Add Product
                </Button>
            </Grid>
        </Grid>
    </Container>
  )
}
