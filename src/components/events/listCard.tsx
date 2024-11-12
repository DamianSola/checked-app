import React, { useEffect, useState }  from "react"
import ModalAddGuest from "../modals/modalAddGuest"
import axiosInstance from "@/utils/axiosInstance"
import CustomAlert from "../CustomAlert"
import ModalAlert from "../modals/modalAlert.";


interface ListProps {
    _id: string;
    name: string;
    open: boolean;
    guest: [];
    updateList: () => void
    deleteList: (props:string) => void
}

interface ApiError {
    response: {
        data: {
            message: string;
        };
    };
  }
  

interface GuestList {
    _id: string;
    nombre: string;
    dni: number;
    estado: string;
}

interface AlertValues {
    show: boolean;
    message: string;
    types: string
}

interface DeleteGuest {
    guestId: string ;
    open: boolean;
}

 const ListCard = ({_id, name, open, updateList, deleteList}: ListProps) => {

    const [add, setAdd] = useState(false)
    const [show, setShow] = useState(false)
    const [guest, setGuest] = useState<GuestList[]>([])
    const [openDelete, setOpenDelete] = useState(false)
    const [showAlert, setShowAlert] = useState<AlertValues>({
        show: false,
        message: '',
        types: ''
    });
    const [openDeleteGuest,setOpenDeleteGuest] = useState<DeleteGuest>({guestId: '', open:false})
    // const [filterGuest, setFilterGuest] = useState<GuestList[]>([])
    const [search, setSearch] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    // Filtra los invitados basándose en el valor de `search`
    const filteredGuests = guest.filter((guest) =>
        guest.nombre.toLowerCase().includes(search.toLowerCase())
    );

    const getGuest = async () => {
        try{
            const response = await axiosInstance.get(`/guest/${_id}`)
            setGuest(response.data)
            // setFilterGuest(response.data)
        }catch (err: unknown) {
            let message: string;
          if ((err as ApiError).response?.data?.message) {
            message = (err as ApiError).response.data.message;
            setShowAlert({ show: true, message: message, types: "error" });
          } else {
            setShowAlert({ show: true, message: 'No se pudo agregar el evento.', types: "error" });
          }
          }
    }

    const deleteGuest = async (guestId: string) => {
        try{
            const response = await axiosInstance.delete(`/guest/${guestId}`)
            setShowAlert({ show: true, message: response.data?.message, types: 'success' });
        }catch (err: unknown) {
            let message: string;
          if ((err as ApiError).response?.data?.message) {
            message = (err as ApiError).response.data.message;
            setShowAlert({ show: true, message: message, types: "error" });
          } else {
            setShowAlert({ show: true, message: 'No se pudo agregar el evento.', types: "error" });
          }
          }
    }

    const deleteGuestAlert = (id:string) => {
        deleteGuest(id)
        setOpenDeleteGuest({guestId:'', open:false})
        setGuest((prevGuest) => prevGuest.filter(guest => guest._id !== id))
    }

  

    const handleDelete = () => {
        deleteList(_id)
        setOpenDelete(false)
    }
    

    useEffect(() => {
       if( _id) getGuest()

    },[_id])

    if(!_id) {
        return null
    }

    return (
        <div className=" rounded-xl bg-gray-800 p-8 md:text-left md:items-center text-center w-full my-4">
            <ModalAddGuest isOpen={add} onClose={() => setAdd(!add)} listId={_id} listName={name}/>
            {showAlert.show && ( 
                <CustomAlert 
                    message={showAlert.message} type={showAlert.types} 
                    onClose={() => setShowAlert({...showAlert, show: false})} /> 
                )}
            <ModalAlert open={openDelete} onClose={() => setOpenDelete(false)} handleDelete={handleDelete}/>
            <ModalAlert open={openDeleteGuest.open} onClose={() => setOpenDeleteGuest({...openDeleteGuest, open:false})} handleDelete={() => deleteGuestAlert(openDeleteGuest.guestId)}/>

            <div className="md:flex  md:items-center md:justify-between md:space-x-4">

            <div className="flex md:block justify-between mb-2 items-center w-full">
                <p className="text-white text-2xl ">{name} </p><p className="text-gray-300 text-sm"> {guest.length} invitados</p>
                {open ? <p className="text-green-400 text-lg w-fit italic">abierta</p>: <p className="text-red-400 text-lg w-fit italic">cerrada</p>}
            </div>
            <div className="flex justify-between md:justify-center items-center w-full md:space-x-4">
                <button onClick={updateList} 
                className="button-pink p-2 lg:p-4 text-sm rounded-md md:rounded-xl hover:bg-pink-400 font-semibold h-fit">
                  Editar
                </button>
                <button onClick={() => setShow(!show)}
                    className="button-pink p-2 lg:p-4 text-sm rounded-md md:rounded-xl hover:bg-pink-400 font-semibold h-fit">{show ? "Ocultar" : "Ver"}</button>
                <button  onClick={() => setAdd(!add)} 
                    className="button-pink p-2 lg:p-4 text-sm rounded-md md:rounded-xl hover:bg-pink-400 font-semibold h-fit">
                        {add? "Listo" : "Agregar"}
                    </button>
                    <button onClick={() => setOpenDelete(true)}
                className="bg-red-600  md:mx-2 lg:p-2 text-sm rounded-lg text-gray-300 hover:bg-red-400 w-fit font-semibold h-fit">
                    <span className="material-symbols-outlined">
                    delete
                </span>
                </button>
            </div>
            </div>
            {show && <div>
                <div className="py-4">
                    <input type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Buscar invitado"
                        className="rounded-lg p-2 text-gray"/>
                </div>
                <div className="block text-gray-300 min-h-20 text-center items-center">
                {guest.length ? (
    filteredGuests.map((g) => {
        return (
            <li
                className="flex flex-col md:flex-row items-center justify-between p-1 md:p-4 bg-gray-800 rounded-lg mb-2 border border-gray-700"
                key={g._id}
            >
                <div className="flex-1 text-white text-md font-medium">
                    {g.nombre}
                </div>
                <div
                    className={`flex-1 text-center text-md font-semibold ${
                        g.estado === 'pendiente' ? 'text-yellow-500' : 'text-green-500'
                    }`}
                >
                    {g.estado}
                </div>
                <div className="flex-1 text-gray-300 text-md text-center">
                    {g.dni}
                </div>
                <div className="flex-1 text-right">
                    {g.estado === 'pendiente' ? (
                        <button
                            onClick={() => setOpenDeleteGuest({guestId:g._id, open: true})}
                            className="bg-red-600 text-white font-semibold rounded-sm md:rounded-md py-1 px-3 hover:bg-red-700 transition-colors"
                        >
                          <span className="material-symbols-outlined">
                    delete
                </span>
                        </button>
                    ) : (
                        <span></span>
                    )}
                </div>
            </li>
        );
    })
) : (
    <p className="text-white text-center">No hay invitados</p>
)}
                </div>
            </div>}
        </div>
    )
}


export default ListCard;