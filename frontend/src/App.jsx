import { useEffect, useState } from "react";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api")
            .then((response) => {
                console.log("response", response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setMessage(data.message);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div>
            <h1>Message from backend</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;
