import {Container} from "react-bootstrap";
import {useEffect} from "react";
import {get, ref} from "firebase/database";
import {auth, database} from "../../../firebase";
import {useNavigate} from "react-router-dom";

export function NoAccess() {
    const navigate = useNavigate();
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            const userRef = ref(database, "/users/" + user.uid);

            get(userRef).then(snapshot => {
                if (snapshot.exists() && (snapshot.val() === "admin" || snapshot.val() === "user")) {
                    navigate('/');
                }
            });
        });
    }, [navigate]);
    return (
        <Container className="text-center mt-4">
            <h1>No Access</h1>
            <p>You don't have access to this application. Please request access.</p>
        </Container>
    );
}
