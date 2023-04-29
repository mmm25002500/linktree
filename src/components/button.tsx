import { IconName } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  text: string;
  color: string;
  link: string;
  icon: IconName;
}

const button = (props: Props) => {

  if (!props.link)
    return <></>
  
  return (
    <div>
      <a href={ props.link } target="_blank">
        <button type="button" className={"w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none dark:focus:ring-blue-800 " + props.color}>
          <FontAwesomeIcon icon={['fab', props.icon]} className="pr-2 text-white" />
          <span className="text-white">
            {props.text}
          </span>
        </button>
      </a>
    </div>
  )
}

export default button;