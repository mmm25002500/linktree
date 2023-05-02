import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Meredirect = () => {

  const db = getFirestore();
  const userCollRef = collection(db, "user");
  const auth = getAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // get user id from auth
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(userCollRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (doc.data().user_id)
            navigate(`/user/${doc.data().user_id}`);
        });
      }
      else { 
        toast(
          <span className='align-middle'>
            <FontAwesomeIcon icon={['fas', 'triangle-exclamation']} className='text-orange-400 pr-2'/>
            請先登入
          </span>, {
          position: "top-right"
        });
        navigate('/login');
      }
    });
  }, []);

  return (
    <p className="text-center text-2xl dark:text-white text-black">讀取中~~</p>
  )
}

export default Meredirect;