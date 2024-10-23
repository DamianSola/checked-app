

interface PropsEventCard {
    id: number;
    name: string;
    date: Date;
    place: string;
    createdBy: Object;
    list: Object
}

const EventCard = (props:PropsEventCard) => {
    const {id, date, name, place, createdBy, list} = props;

    return(
        <div className="bg-gray-800 my-6 p-6  rounded-xl ">
            <div className="flex justify-between">
                <h2 className="text-pink-500 text-2xl">{name}</h2>
                <h5 className="text-gray-400 text-xl italic">{date}</h5>
            </div>
            <div className="border border-pink-500"></div>
            <div></div>
            <div className="hidden text-gray-300 flex items-center justify-between mt-4">
                <p>220 Invitados</p>
                <p>2 Colaboradores</p>
                <p>2 Listas</p>
                <button className="button-pink rounded-xl font-semibold p-4">Entrar</button>
            </div>
            <div className="hidden text-gray-300 flex items-center justify-between mt-4">
                <div>
                    <p>220 Invitados</p>
                    <p>2 Colaboradores</p>
                    <p>2 Listas</p>
                </div>
                <button className="button-pink rounded-xl font-semibold p-4">Entrar</button>
            </div>
            <div className="text-gray-300 block md:flex text-center items-center md:justify-between  mt-4">
                <div className="flex justify-between md:w-2/3">
                    <p><strong>220</strong> Invitados</p>
                    <p><strong>2</strong> Colaboradores</p>
                    <p><strong>2</strong> Listas</p>
                </div>
                <button className="button-pink rounded-xl font-semibold p-4 mt-4 md:mt-0">Entrar</button>
            </div>

        </div>
    )
}

export default EventCard;