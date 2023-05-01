import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../components/Card";

// images
import example_TershiXia from "../assets/example/example_TershiXia.webp";

const Home = () => {
  
  const navigate = useNavigate();

  return (
    <div className="container mx-auto pt-8 pl-5 pr-5 text-black dark:text-white transition-colors duration-100">
      <Card>
        <h1 className="text-3xl md:text-4xl pb-5 text-teal-600 dark:text-teal-400">LinkTree 連結樹</h1>

        <div className="grid grid-cols-3 gap-4 relative pb-10">
          <div className="md:col-span-2">
            <div className="text-lg md:text-2xl pt-3">
              想要製作好看的連結樹嗎？不管您的喜歡的是
              <button
                onClick={ () => navigate('/simple')}
                className="text-cyan-400 dark:text-cyan-300 underline underline-offset-4"
              >
                簡約風
              </button>
              或是
              <button
                onClick={() => navigate('/cool')}
                className="text-cyan-400 dark:text-cyan-300 underline underline-offset-4"
              >
              酷旋風
              </button>
              ，都可以在這裡找到。
              <br />

              <div className="absolute bottom-0 text-sm sm:text-2xl">
                <button
                  className="text-cyan-400 dark:text-cyan-300 underline underline-offset-4 pr-3"
                  onClick={() => navigate('/setting')}
                >
                  立刻試用？
                </button>
                |
                <button
                  className="text-cyan-400 dark:text-cyan-300 underline underline-offset-4 pl-3"
                  onClick={ () => navigate('/me')}
                >
                  或已有帳戶了？立刻來看看您的作品吧！
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <img src={ example_TershiXia } className=" md:w-80"/>
          </div>
        </div>
      </Card>
  </div>

  )
}

export default Home;
