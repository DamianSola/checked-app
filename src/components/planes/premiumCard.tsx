

const PremiumCard = () => {
    return(
        <div className="block w-80 h-auto border border-pink-500 rounded-lg text-center mx-auto my-6">
            <div className="p-6">
                <p className="text-pink-500 text-2xl pb-4">Premium</p>
                <div className="border border-pink-500"></div>
            </div>
            <div className="text-gray-400 px-6 text-lg space-y-2 text-left">
                <p>5 evento</p>
                <p>3 lista por evento</p>
                <p>1000 invitados por lista</p>
                <p>5 colaboradores por evento</p>
            </div>
            <div className="p-4 m-auto text-pink-500">
                
                <p className="text-3xl">2.499 /mes</p>
                <p className="text-ms">Pesos Aregninos</p>
                <p></p>
            </div>
            <div className="p-6 justify-center items-center">
                <button className="button-pink m-auto p-2 rounded-lg font-semibold">
                    Subscribirse
                </button>
            </div>

        </div>
    )
}

export default PremiumCard;