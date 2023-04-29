import { getFirestore, collection, getDocs, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TershiXia from "../assets/tershi.jpg";
import LinkBtn from "../components/button";
import Card from "../components/Card";

interface UserData {
  data: DocumentData;
  id: string;
}

interface SocialLink {
  fb: string;
  ig: string;
  dc: string;
  yt: string;
  tg: string;
  twitter: string;
  // linkedin: string;
  github: string;
}

const UserPage = () => {

  const db = getFirestore();
  // console.log(db);
  const [users, setUsers] = useState<UserData[]>([]);
  const [user, setUser] = useState<UserData>({ data: {}, id: '' });
  const [social_link, setSocialLink] = useState<SocialLink>({ fb: '', ig: '', dc: '', yt: '', tg: '', twitter: '', github: '' });
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
      setSocialLink(user_info.data.social_link);
    }
  }

  // get user by id when users state is updated
  useEffect(() => {
    getUserById(id, users);
  }, [users]);

  // console.log(user.data.social_link)

  return (
    <div className="container mx-auto pt-8 pl-5 pr-5 text-black dark:text-white transition-colors duration-100">
      <Card>
        <div className="flex justify-center p-2">
          <img className="rounded-full ring-2 p-1 ring-gray-300 dark:ring-gray-500 w-36 h-36" src={TershiXia} alt="Extra large avatar"></img>
        </div>
        <div className="text-2xl text-center">{user.data.name}({ user.data.eng_name})</div>
        <p className="text-base text-center text-gray-500 dark:text-gray-400">{user.data.description}</p>

        {/* Social Links */}
        <div className="pt-5">
          {/* Facebook */}
          <LinkBtn
            text="Facebook"
            color="bg-[#1971E6] hover:bg-blue-800 dark:hover:bg-blue-700"
            link={social_link.fb}
            icon="facebook"
          />

          {/* YouTube */}
          <LinkBtn 
          text="YouTube" 
          color="bg-red-700 hover:bg-red-800 dark:hover:bg-red-700" 
          link={social_link.yt}
          icon="youtube"
          />

          {/* Instagram */}
          <LinkBtn 
          text="Instagram" 
          color="bg-[#D50D8C] hover:bg-red-800 dark:hover:bg-red-700" 
          link={social_link.ig}
          icon="instagram"
          />

          {/* Twitter */}
          <LinkBtn 
          text="Twitter" 
          color="bg-[#1D99E5] hover:bg-blue-800 dark:hover:bg-blue-700" 
          link={social_link.twitter}
          icon="twitter"
          />

          {/* Discord */}
          <LinkBtn 
          text="Discord" 
          color="bg-[#5765F2] hover:bg-blue-800 dark:hover:bg-blue-700" 
          link={social_link.dc}
          icon="discord"
          />

          {/* Github */}
          <LinkBtn 
          text="Github" 
          color="bg-[#1B1D21] hover:bg-blue-800 dark:hover:bg-blue-700" 
          link={social_link.github}
          icon="github"
          />

          {/* Telegram */}
          <LinkBtn 
          text="Telegram" 
          color="bg-[#249FDB] hover:bg-blue-800 dark:hover:bg-blue-700" 
          link={social_link.tg}
          icon="telegram"
          />
        </div>
      </Card>
    
    </div>
  )
}

export default UserPage;