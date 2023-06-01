import {auth, database, provider} from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {get, ref} from "firebase/database";
import {useNavigate} from "react-router-dom";

export function RequireAuth(props) {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);

    const noAccessComponent =
        <>
            <h2>Unauthenticated, Please Log In</h2>
            <Button onClick={signIn}>Sign In With Google</Button>
        </>;

    const [authed, setAuthed] = useState(auth.currentUser !== null);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user === null) {
                setAuthed(false)
            } else {
                const userRef = ref(database, "/users/" + user.uid);

                try {
                    get(userRef).then(snapshot => {
                        if (!snapshot.exists() || (snapshot.val() !== 'user' && snapshot.val() !== 'admin')) {
                            navigate('no-access');
                        } else {
                            setAuthed(true);
                        }
                    }, () => {
                        console.log('in error handler')
                        navigate('no-access');
                    }).catch(() => console.log('in .catch'));
                } catch (e) {
                    console.log('in catch');
                    navigate('no-access')
                }
            }
        });

        setTimeout(() => {
            setShowLogin(true);
        }, 300);
    }, [navigate]);

    function signIn() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(credential);
                console.log(token);
                console.log(user);

            }).catch((error) => {
            // Handle Errors here.
            console.log('Login Error: ', error);
        });
    }

    return !authed ? (showLogin ? noAccessComponent : <></>) : props.children;
}
