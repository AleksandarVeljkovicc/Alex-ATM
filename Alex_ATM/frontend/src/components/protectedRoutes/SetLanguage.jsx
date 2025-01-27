import {Outlet, Navigate} from "react-router-dom";

const SetLanguage = () => {
    let isSet = localStorage.getItem('selectedLanguage');
    if (isSet == null){
        return <Navigate to='/'/>;
    }else{
        return <Outlet/>
    }
}
export default SetLanguage;