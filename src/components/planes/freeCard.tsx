


const FreeCard = () => {
    return(
        <div className="block w-80 h-auto border border-pink-500 rounded-lg text-center mx-auto my-6">
            <div className="p-6">
                <p className="text-pink-500 text-2xl pb-4">Free</p>
                <div className="border border-pink-500"></div>
            </div>
            <div className="text-gray-400 px-6 text-lg space-y-2 text-left">
                <p>1 evento</p>
                <p>1 lista por evento</p>
                <p>100 invitados por lista</p>
                <p>2 colaboradores por evento</p>
            </div>
            <div className="p-6 justify-center items-center">
                <button className="button-pink m-auto p-2 rounded-lg font-semibold">
                    Crear evento
                </button>
            </div>

        </div>
    )
}

export default FreeCard;
