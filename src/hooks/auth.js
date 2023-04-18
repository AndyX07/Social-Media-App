import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import {auth, db} from "../lib/firebase";
import {useState, useEffect} from "react";
import {HOMEPAGE} from "../lib/routes"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate} from 'react-router-dom';
import { useSignOut } from 'react-firebase-hooks/auth';
import { LOGIN } from '../lib/routes';
import {doc, getDoc} from 'firebase/firestore';

export function useAuth(){
    const [authUser, authLoading, error] = useAuthState(auth);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(()=>{
        async function fetchData(){
            const ref = doc(db, "users", authUser.uid);
            const docSnap = await getDoc(ref);
            console.log(docSnap);
            setUser(docSnap.data());
            setLoading(false);
        }

        if(!authLoading){
            if(authUser){
                fetchData();
            }
            else setLoading(false);
        }
    }, [authLoading]);
    return {user, isLoading, error};
}

export function useLogin(){
    const  [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    async function login({email, password, redirect=HOMEPAGE}){
        setLoading(true);
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate(redirect);
        }
        catch(err){
            alert("Email or password is wrong");
            return false;
        }
        setLoading(false);
        return true;
    }
    return {login, isLoading};
}

export function useLogout(){
    const [signOut, isLoading, error] = useSignOut(auth);
    const navigate = useNavigate();
    async function logOut(){
        if(await signOut()){
            navigate(LOGIN);
        }
    }
    return {logOut, isLoading}
}