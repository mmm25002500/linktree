import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import { DocumentData, and, collection, getDocs, getFirestore, or, query, where } from "firebase/firestore";
import PersonCard from "../components/PersonCard";

interface UserData {
  data: DocumentData;
  id: string;
}

// interface SearchResult {
//   name: string;
//   nick: string;
//   eng_name: string;
//   user_id: string;
//   description: string;
//   img: string;
// }

const Search = () => {
  const [cacheSearch, setCacheSearch] = useState<string | undefined>(useParams().id ? useParams().id : '');
  const [searchResult, setSearchResult] = useState<UserData>({ data: {}, id: ''});

  // const getData()

  const search = async (userID: string) => {
    const db = getFirestore();
    const citiesRef = collection(db, "user");
    
    // Create a query against the collection.
    const q = query(citiesRef,
      // or(
        // and(
        //   where('user_id', '>', userID),
        //   where('user_id', '<=', (userID + '\uf8ff')),
        // ),
        and(
          where('name', '>', userID),
          where('name', '<=', (userID + '\uf8ff')),
        ),
        // and(
        //   where('nick', '>', userID),
        //   where('nick', '<=', (userID + '\uf8ff')),
        // ),
        // and(
        //   where('eng_name', '>', userID),
        //   where('eng_name', '<=', (userID + '\uf8ff')),
        // )
      // )
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      setSearchResult({
        data: {},
        id: ''
      });
    } else {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setSearchResult({
          data: doc.data(),
          id: doc.id
        });
      });
    }
  }
  
  useEffect(() => {
    if (cacheSearch)
      search(cacheSearch);
  }, [cacheSearch]);

  // if found user, change link route to the user of search
  
  return (
    <div className="container mx-auto pt-8 pl-5 pr-5 text-black dark:text-white transition-colors duration-100">
      <Card>
        <input
          type="text"
          id="large-input"
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="搜尋使用者"
          onChange={(e) => setCacheSearch(e.target.value)}
        />
        <div className="pt-5 flex justify-center">
          {
            searchResult.data.uid ? (
              <PersonCard
                img={searchResult.data.img}
                name={searchResult.data.name}
                user_id={searchResult.data.user_id}
                description={searchResult.data.description}
                nick={searchResult.data.nick}
                eng_name={searchResult.data.eng_name}
              />
            ) : (
                <></>
            )
          }
        </div>
      </Card>
    </div>
  )
}

export default Search;