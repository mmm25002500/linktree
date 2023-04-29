interface Props {
    children: React.ReactNode;
}

const Card = (props: Props) => { 
    return (
        <div className="w-full p-6 bg-gray-300 border border-gray-200 rounded-lg shadow dark:bg-gray-900/75 dark:border-gray-700 bg-opacity-40">
            {props.children}
        </div>
    )
}

export default Card;