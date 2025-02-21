import { useLocation } from "react-router-dom";
function useLocationState() {
    const location = useLocation();
    return { state: location.state, location, pathname: location.pathname }
}

export default useLocationState;



