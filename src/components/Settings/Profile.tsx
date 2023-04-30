import { useState } from "react";
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface UserData {
  name: string;
  eng_name: string;
  nick: string;
  description: string;
  email: string;
  social_link: {
    fb: string;
    ig: string;
    dc: string;
    yt: string;
    tg: string;
    twitter: string;
    github: string;
  }
}
const Profile = () => {
  let user: UserData = {
    name: '',
    eng_name: '',
    nick: '',
    description: '',
    email: '',
    social_link: {
      fb: '',
      ig: '',
      dc: '',
      yt: '',
      tg: '',
      twitter: '',
      github: ''
    }
  }

  const [userData, setUserData] = useState<UserData>(user); 
  const [userID, setUserID] = useState<string>('');
  const [userExist, setUserExist] = useState<boolean>(false);

  const auth = getAuth();
  const db = getFirestore();
  console.log(auth.currentUser?.uid);
  
  // create user data in firestore
  const createNewData = () => {
    // const userCollRef = collection(db, "user");
    console.log(userData);

    // get email from auth
    const email = auth.currentUser?.email;

    // add user data to firestore
    setDoc(doc(db, 'user', userID), {...userData, email: email}).then(res => {
      console.log(res);
    }
    ).catch(err => {
      console.log(err);
    })
  }

  // check user data in firestore
  const checkData = (userID: string) => {
    if (userID)
    setUserExist(false);
    
    const userDocRef = doc(db, 'user', userID);
    getDoc(userDocRef).then(res => {
      if (res.exists()) {
        setUserExist(true);
      } else {
        setUserExist(false);
      }
    }
    ).catch(err => {
      console.log(err);
    }
    )
  }

  // edit user data in firestore
  const editData = () => {

  }

  return (
    <div>
      <form>
        {/* personal information */}
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {/* Name */}
          <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">姓名</label>
              <input onChange={e => setUserData({...userData, name: e.target.value})} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
          </div>

          {/* eng_name */}
          <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">英文姓名</label>
              <input onChange={e => setUserData({...userData, eng_name: e.target.value})} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="English Name" required />
          </div>

          {/* nick */}
          <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">暱稱</label>
              <input onChange={e => setUserData({...userData, nick: e.target.value})} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nick Name" required />
          </div>

          {/* user id */}
          {/* after creating, lock it */}
          <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">使用者ID</label>
              <input onChange={e => setUserID(e.target.value)} type="test" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="User ID" required />
          </div>
        </div>

        {/* description */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">介紹一下你自己</label>
          <input onChange={e => setUserData({...userData, description: e.target.value})} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
        </div> 

        {/* website link */}
        <div className="grid gap-6 mb-6 sm:grid-cols-2 md:grid-cols-3">
          {/* FB */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Facebook</label>
            <input onChange={e => setUserData({ ...userData, social_link: {...userData.social_link, fb: e.target.value} })} type="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Facebook 網址" />
          </div>

          {/* IG */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instagram</label>
            <input onChange={e => setUserData({ ...userData, social_link: {...userData.social_link, ig: e.target.value} })} type="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Instagram 網址" />
          </div>

          {/* YT */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">YouTube</label>
            <input onChange={e => setUserData({ ...userData, social_link: {...userData.social_link, yt: e.target.value} })} type="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="YouTube 網址" />
          </div>

          {/* TG */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telegram</label>
            <input onChange={e => setUserData({ ...userData, social_link: {...userData.social_link, tg: e.target.value} })} type="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Telegram 網址" />
          </div>

          {/* DC */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discord</label>
            <input onChange={e => setUserData({ ...userData, social_link: {...userData.social_link, dc: e.target.value} })} type="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Discord 網址" />
          </div>

          {/* Twitter */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Twitter</label>
            <input onChange={e => setUserData({ ...userData, social_link: {...userData.social_link, twitter: e.target.value} })} type="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Twitter 網址" />
          </div>

          {/* Github */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Github</label>
            <input onChange={e => setUserData({ ...userData, social_link: {...userData.social_link, github: e.target.value} })} type="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Github 網址" />
          </div>
        </div>

        {/* term */}
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
          <input type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
          </div>
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">我同意 <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">靈萌團隊連結樹使用條款</a>。</label>
        </div>

        {/* after creating, changeg "建立" to "更改" */}
        <button onClick={() => createNewData()} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">更改</button>
      </form>

      <input
        type="text"
        value={userData.name}
        onChange={(e) => setUserData({ ...user ,name: e.target.value })}
      />
      <button onClick={() => createNewData()}>add</button>


      <input
        type="text"
        value={userID}
        onChange={(e) => setUserID(e.target.value)}
      />
      <button onClick={() => checkData(userID)}>search</button>
      { userExist ? <div>exist</div> : <div>not exist</div>}
    </div>
  )
}

export default Profile;