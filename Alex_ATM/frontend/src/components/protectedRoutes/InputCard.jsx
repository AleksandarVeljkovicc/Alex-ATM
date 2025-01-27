import {Outlet, Navigate} from "react-router-dom";

const InputCard = () => {
    let isSet = localStorage.getItem('encryptedCardData');
    if (isSet == null){
        return <Navigate to='/'/>;
    }else{
        return <Outlet/>
    }
}
export default InputCard;