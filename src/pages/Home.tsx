import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TershiXia from "../assets/tershi.jpg";

const Home = () => {
  return (
    <div className="container mx-auto pt-8 pl-5 pr-5 text-black dark:text-white transition-colors duration-100">

      <div className="flex justify-center p-2">
        <img className="rounded-full ring-2 p-1 ring-gray-300 dark:ring-gray-500 w-36 h-36" src={TershiXia} alt="Extra large avatar"></img>
      </div>
      <div className="text-2xl text-center pb-2">夏特稀(TershiXia)</div>

      <div className="pt-5">
        {/* Facebook */}
        <button type="button" className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button>

        {/* YouTube */}

        {/* Instagram */}

        {/* Twitter */}

        {/* Discord */}
      </div>
    </div>
  )
}

export default Home;
