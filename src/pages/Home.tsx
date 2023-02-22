import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  return (
    <div className="container mx-auto pt-8 pl-5 pr-5 text-black dark:text-white transition-colors duration-100">
      <h1 className="text-4xl text-center pb-2">夏特稀 LinkTree(LnTr)網</h1>
      <div className="text-center p-4 mb-4 text-xl text-red-800 rounded-lg bg-red-100 dark:bg-gray-900 dark:text-red-400" role="alert">
        <FontAwesomeIcon icon={['fas', 'triangle-exclamation']} className="pr-2"/>
        還沒做好拉w，預計要四月。
      </div>
      <p className="text-3xl text-center">夏特稀好帥，女孩好愛</p>
    </div>
  )
}

export default Home;
