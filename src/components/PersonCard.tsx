import { useNavigate } from "react-router-dom";
import NoFaceImg from "../assets/noface.png";

interface Props {
  img: string;
  name: string;
  user_id: string;
  description: string;
  nick: string;
  eng_name: string;
}

const PersonCard = (props: Props) => {

  const navigate = useNavigate();
  
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg mt-5"
          src={props.img ? props.img : NoFaceImg}
          alt="No Images"
        />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{ props.name }</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400 pl-5 pr-5 text-center">{ props.description }</span>
          <div className="flex mt-4 space-x-3 md:mt-6">
              <button onClick={ () => navigate(`/user/${props.user_id}`) } className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">查看</button>
              {/* <button onClick={ () => navigate(``)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</button> */}
          </div>
      </div>
    </div>
  )
}

export default PersonCard;