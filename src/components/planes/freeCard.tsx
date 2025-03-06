


const FreeCard = () => {
    return(
        <div className="block w-80 h-auto border border-pink-500 rounded-lg text-left mx-auto my-6">
            <div className="p-4">
                <p className="text-gray-300 text-xl">Free</p>
            </div>
            <div className="px-4 m-auto text-pink-500">
                
                <p className="text-3xl">0 /mes</p>
                <p className="text-ms">Pesos Argentinos</p>
            </div>
            <div className="p-4 justify-center items-center">
                <button className="button-blue m-auto w-full p-2 rounded-lg font-semibold ">
                    Empezar
                </button>
            </div>
            <div className="text-gray-400 px-6 pb-4 text-lg space-y-2 text-left">
                <p>1 evento</p>
                <p>1 lista por evento</p>
                <p>100 invitados por lista</p>
                <p>2 colaboradores por evento</p>
            </div>
        </div>
    )
}

export default FreeCard;
