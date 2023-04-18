import React, { useState } from 'react'
import { useAuth } from './hooks/auth'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage} from './lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ProfileUpload = () => {
    const { user, isLoading } = useAuth();
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    if(isLoading) return "loading...";
    function handleSubmit(e) {
        setFile(e.target.files[0]);
    }

    async function update() {
        if (!file) {
            alert("No File Selected");
            return;
        }
        
        const fileRef = ref(storage, "profilepicture/" + user.id);
        await uploadBytes(fileRef, file);
        const profileURL = await getDownloadURL(fileRef);
        const docRef = doc(db, "users", user.id);
        await updateDoc(docRef, { avatar: profileURL });
        navigate(0);
    }
  
    return (  
        <div className="upload">
            <input type="file" multiple accept="image/*" onChange={handleSubmit}/>
            <button onClick={update}>Update</button>
        </div>
    )
}

export default ProfileUpload