import { getFirestore, collection, getDocs, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface UserData {
  data: DocumentData;
  id: string;
}

const Test = () => {
  const db = getFirestore();
  // console.log(db);
  const [users, setUsers] = useState<UserData[]>([]);
  const [user, setUser] = useState<UserData>();
  const id = useParams().id;

  // get all users when component is mounted
  useEffect(() => {
    getUsers()
  }, []);

  // get all users
  const getUsers = () => {
    const usersRef = collection(db, 'user');
    getDocs(usersRef)
      .then(res => {
        const usersData = res.docs.map(
          doc => ({
            data: doc.data(),
            id: doc.id
          })
        );
        setUsers(usersData);
      })
      .catch(err => {
        console.log(err);
      })
  }

  // get user by id
  const getUserById = (id: string | undefined, users: any[]) => {
    const user_info = users.find(user_data => user_data.id === id)
    if (user_info != undefined) {
      setUser(user_info);
    }
  }

  // get user by id when users state is updated
  useEffect(() => {
    getUserById(id, users);
  }, [users]);

  return (
    <div>
      {
        user && <div>{user.id}</div>
      }
    </div>
  )
}
export default Test;