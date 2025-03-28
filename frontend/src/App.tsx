import {useEffect} from "react";
import {useNavigate} from "react-router";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/app")
    }, []);

  return (
    <>
    </>
  )
}

export default App
