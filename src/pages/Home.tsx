import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TershiXia from "../assets/tershi.jpg";
import LinkBtn from "../components/button";

const Home = () => {
  return (
    <div className="container mx-auto pt-8 pl-5 pr-5 text-black dark:text-white transition-colors duration-100">

      <div className="flex justify-center p-2">
        <img className="rounded-full ring-2 p-1 ring-gray-300 dark:ring-gray-500 w-36 h-36" src={TershiXia} alt="Extra large avatar"></img>
      </div>
      <div className="text-2xl text-center pb-2">夏特稀(TershiXia)</div>

      <div className="pt-5">
        {/* Facebook */}
        <LinkBtn
          text="Facebook"
          color="bg-[#1971E6] hover:bg-blue-800 dark:hover:bg-blue-700"
          link="https://fb.com/TershiXia"
          icon="facebook"
        />

        {/* YouTube */}
        <LinkBtn 
        text="YouTube" 
        color="bg-red-700 hover:bg-red-800 dark:hover:bg-red-700" 
        link="https://youtube.com/@TershiXia" 
        icon="youtube"
        />

        {/* Instagram */}
        <LinkBtn 
        text="Instagram" 
        color="bg-[#D50D8C] hover:bg-red-800 dark:hover:bg-red-700" 
        link="https://fb.com/TershiXia" 
        icon="instagram"
        />

        {/* Twitter */}
        <LinkBtn 
        text="Twitter" 
        color="bg-[#1D99E5] hover:bg-blue-800 dark:hover:bg-blue-700" 
        link="https://fb.com/TershiXia" 
        icon="twitter"
        />

        {/* Discord */}
        <LinkBtn 
        text="Discord" 
        color="bg-[#5765F2] hover:bg-blue-800 dark:hover:bg-blue-700" 
        link="https://fb.com/TershiXia" 
        icon="discord"
        />
      </div>
    </div>
  )
}

export default Home;
