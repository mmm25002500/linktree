import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useNavigate } from 'react-router';

const NotFound = () => {
  
  const navigate = useNavigate();

  return (
    <div className="container mx-auto pt-8 pl-5 pr-5 text-black dark:text-white transition-colors duration-100">
      <Card>
        <p className="text-center text-3xl">404 Not Found</p>
        <p className="text-center text-gray-500 dark:text-gray-400 text-xl">找不到頁面</p>
        <button
          onClick={() => navigate('/')}
          className="flex mx-auto mt-2 text-cyan-300 underline underline-offset-4"
        >
          回到首頁
        </button>
      </Card>
    </div>
  )
}

export default NotFound;