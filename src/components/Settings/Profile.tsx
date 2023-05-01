import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface UserData {
  name: string;
  eng_name: string;
  nick: string;
  img: string;
  description: string;
  user_id: string;
  uid: string;
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
    img: '',
    description: '',
    user_id: '',
    uid: '',
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
  const [Uid, setUid] = useState<string>('');
  const [authUserID, setAuthUserID] = useState<string>('');
  const [userExist, setUserExist] = useState<boolean>(false);
  const [all_user_id, setAllUserID] = useState<string[]>([]);

  const auth = getAuth();
  const db = getFirestore();
  const userCollRef = collection(db, "user");

  useEffect(() => {
    // get user id from auth
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);

        if (userData) {
          const q = query(userCollRef, where("uid", "==", user.uid));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            if (doc.data())
              setUserExist(true);
              setAuthUserID(doc.data().user_id);
          });
        }

        // get all user_id
        const usersRef = collection(db, 'user');
        getDocs(usersRef)
          .then(res => {
            const usersData = res.docs.map(
              doc => doc.data().user_id
            );
            setAllUserID(usersData);
          })
          .catch(err => {
            console.log(err);
          }
        )
      }
    });
  }, []);
  
  
  // create user data in firestore
  const createNewData = () => {
    // const userCollRef = collection(db, "user");
    console.log(userData);

    // if user_id not in all_user_id
    if (!all_user_id.includes(userData.user_id)) {
      // add user data to firestore
      setDoc(doc(db, 'user', userData.user_id), { ...userData, uid: Uid }).then(res => {
        console.log(res);
      }
      ).catch(err => {
        console.log(err);
      })
    } else {
      console.log('user_id already exist! do not use this user_id');
    }
  }
 
  const editData = () => {
    console.log('userid:', userData.user_id)
    console.log('authuserid:', authUserID)
    if (userExist && userData.user_id === authUserID) {

      // add user data to firestore
      setDoc(doc(db, 'user', userData.user_id), { ...userData, uid: Uid }).then(res => {
        console.log(res);
      }
      ).catch(err => {
        console.log(err);
      })
    }
  }

  const submit = () => {
    // 檢查uid 是否在user collection中
    if (userExist) {
      // update user data
      console.log('update');
      editData();
    } else {
      // create new user data
      console.log('create');
      createNewData();
    }
  }

  useEffect(() => {

    const getData = async (uid: string) => {
      const q = query(userCollRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.data())
          setUserData(
            {
              name: doc.data().name,
              eng_name: doc.data().eng_name,
              nick: doc.data().nick,
              img: doc.data().img,
              description: doc.data().description,
              user_id: doc.data().user_id,
              uid: doc.data().uid,
              social_link: doc.data().social_link
            }
          );
      });
    }
    getData(Uid);
  }, [userExist])

  console.log(userData);
  
  // console.log(Uid);
  // console.log(userExist);
  return (
    <div>
      <form>
        {/* personal information */}
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">姓名</label>
            <input value={ userData.name } onChange={e => setUserData({...userData, name: e.target.value})} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
          </div>

          {/* eng_name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">英文姓名</label>
            <input value={ userData.eng_name } onChange={e => setUserData({...userData, eng_name: e.target.value})} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="English Name" required />
          </div>

          {/* nick */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">暱稱</label>
            <input value={ userData.nick } onChange={e => setUserData({...userData, nick: e.target.value})} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nick Name" required />
          </div>

          {/* user id */}
          {/* after creating, lock it */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">使用者ID</label>
            <input value={ userData.user_id } onChange={e => setUserData({...userData, user_id: e.target.value})} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"disabled={userExist ? true : false} placeholder="User ID" required />
          </div>
        </div>

        {/* description */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">介紹一下你自己</label>
          <input value={ userData.description } onChange={e => setUserData({...userData, description: e.target.value})} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="intro urself" required />
        </div> 

        {/* img_link */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">更改您的大頭貼</label>
          <input value={ userData.img } onChange={e => setUserData({...userData, img: e.target.value})} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter image link" required />
        </div> 

        {/* website link */}
        <div className="grid gap-6 mb-6 sm:grid-cols-2 md:grid-cols-3">
          {/* FB */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Facebook</label>
            <input value={ userData.social_link.fb } onChange={e => setUserData({ ...userData, social_link: {...userData.social_link, fb: e.target.value} })} type="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Facebook 網址" />
          </div>

          {/* IG */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instagram</label>
            <input value={ userData.social_link.ig } onChange={e => setUserData({ ...userData, social_link: {...userData.social_link, ig: e.target.value} })} type="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Instagram 網址" />
          </div>

          {/* YT */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">YouTube</label>
            <input value={ userData.social_link.yt } onChange={e => setUserData({ ...userData, social_link: {...userData.social_link, yt: e.target.value} })} type="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="YouTube 網址" />
          </div>

          {/* TG */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telegram</label>
            <input value={ userData.social_link.tg } onChange={e => setUserData({ ...userData, social_link: {...userData.social_link, tg: e.target.value} })} type="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Telegram 網址" />
          </div>

          {/* DC */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discord</label>
            <input value={ userData.social_link.dc }onChange={e => setUserData({ ...userData, social_link: {...userData.social_link, dc: e.target.value} })} type="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Discord 網址" />
          </div>

          {/* Twitter */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Twitter</label>
            <input value={ userData.social_link.twitter } onChange={e => setUserData({ ...userData, social_link: {...userData.social_link, twitter: e.target.value} })} type="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Twitter 網址" />
          </div>

          {/* Github */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Github</label>
            <input value={ userData.social_link.github } onChange={e => setUserData({ ...userData, social_link: {...userData.social_link, github: e.target.value} })} type="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Github 網址" />
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
        <button onClick={() => submit()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">更改</button>
      </form>
    </div>
  )
}

export default Profile;