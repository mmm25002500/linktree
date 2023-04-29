import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import TershiXia from "../assets/tershi.jpg";
import LinkBtn from "../components/button";
import Card from "../components/Card";

// images
import example_TershiXia from "../assets/example/example_TershiXia.png";

const Home = () => {
  
  const navigate = useNavigate();

  return (
    <div className="container mx-auto pt-8 pl-5 pr-5 text-black dark:text-white transition-colors duration-100">
      <Card>
        <h1 className="text-4xl pb-5 text-teal-600 dark:text-teal-400">LinkTree 連結樹</h1>

        <div className="grid grid-cols-3 gap-4 relative">
          <div className="col-span-2">
            <p className="text-3xl p-6">
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
              <div className="absolute bottom-0 text-2xl">
                <button
                  className="text-cyan-400 dark:text-cyan-300 underline underline-offset-4 pr-3"
                  onClick={() => navigate('/login')}
                >
                  立刻試用？
                </button>
                |
                <button
                  className="text-cyan-400 dark:text-cyan-300 underline underline-offset-4 pl-3"
                  onClick={() => navigate('/me')}
                >
                  或已有帳戶了？立刻來看看您的作品吧！
                </button>
              </div>
            </p>
          </div>
          <div>
            <img src={ example_TershiXia } className="w-80"/>
          </div>
        </div>
      </Card>
    
  </div>

  )
}

export default Home;
