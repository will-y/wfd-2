import {Container} from "react-bootstrap";

export function NoAccess() {
    return (
        <Container className="text-center mt-4">
            <h1>No Access</h1>
            <p>You don't have access to this application. Please request access.</p>
        </Container>
    );
}
