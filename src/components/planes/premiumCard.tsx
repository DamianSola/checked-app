

const PremiumCard = () => {
    return(
        <div className="block w-80 h-auto border border-pink-500 rounded-lg text-left mx-auto my-6">
            <div className="p-4">
                <p className="text-gray-300 text-xl">Premium</p>
            </div>
            <div className="px-4 m-auto text-pink-500">
                
                <p className="text-3xl">2.499 /mes</p>
                <p className="text-ms">Pesos Argentinos</p>
            </div>
            <div className="p-6 justify-center items-center">
                <button className="button-blue w-full m-auto p-2 rounded-lg font-semibold">
                    Empezar
                </button>
            </div>
            
            <div className="text-gray-400 px-6 pb-4 text-lg space-y-2 text-left">
                <p>5 evento</p>
                <p>3 lista por evento</p>
                <p>1000 invitados por lista</p>
                <p>5 colaboradores por evento</p>
            </div>
          
           

        </div>
    )
}

export default PremiumCard;