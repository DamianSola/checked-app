import React, { useEffect, useState }  from "react"
import ModalAddGuest from "../modals/modalAddGuest"
import axiosInstance from "@/utils/axiosInstance"
import CustomAlert from "../CustomAlert"


interface ListProps {
    _id: string;
    name: string;
    open: boolean;
    guest: [];
    updateList: (props:any) => void
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

 const ListCard = ({_id, name, open, updateList}: ListProps) => {

    const [add, setAdd] = useState(false)
    const [show, setShow] = useState(false)
    const [guest, setGuest] = useState<GuestList[]>([])
    const [showAlert, setShowAlert] = useState<AlertValues>({
        show: false,
        message: '',
        types: ''
    });

    const getGuest = async () => {
        try{
            const response = await axiosInstance.get(`/guest/${_id}`)
            setGuest(response.data)
        }catch(err :any){
            console.log(err)
            setShowAlert({ show: true, message: err?.response?.data?.message, types: 'error' });
        }
    }

    const deleteGuest = async (guestId: string) => {
        try{
            const response = await axiosInstance.delete(`/guest/${guestId}`)
            setShowAlert({ show: true, message: response.data?.message, types: 'success' });
        }catch(error: any){
            console.log(error)
            setShowAlert({ show: true, message: error?.response?.data?.message, types: 'error' });
        }
    }

    const deleteList = async (listId: string) => {

        try{
            let response = await axiosInstance.delete(`/guest/${listId}`)
            setShowAlert({ show: true, message: response.data?.message, types: 'success' });
            console.log(response)
        }catch(error: any){
          setShowAlert({ show: true, message: error?.response?.data?.message, types: 'error' });
        }
    }

    useEffect(() => {
        _id && getGuest()
    },[])

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
            <div className="md:flex  md:items-center md:justify-between md:space-x-4">

            <div className="flex md:block justify-between mb-2 items-center w-full">
                <p className="text-white text-2xl ">{name} <p className="text-gray-300 text-sm"> {guest.length} invitados</p></p>
                {open ? <p className="text-green-400 text-lg w-fit italic">abierta</p>: <p className="text-red-400 text-lg w-fit italic">cerrada</p>}
            </div>
            <div className="flex justify-between md:justify-center w-full md:space-x-4">
                <button onClick={updateList} 
                className="button-pink p-2 lg:p-4 text-sm rounded-xl hover:bg-pink-400 font-semibold h-fit">Editar</button>
                <button onClick={() => setShow(!show)}
                    className="button-pink p-2 lg:p-4 text-sm rounded-xl hover:bg-pink-400 font-semibold h-fit">{show ? "Ocultar" : "Ver"}</button>
                <button  onClick={() => setAdd(!add)} 
                    className="button-pink p-2 lg:p-4 text-sm rounded-xl hover:bg-pink-400 font-semibold h-fit">
                        {add? "Listo" : "Agregar"}
                    </button>
            </div>
                    <button onClick={() => deleteList(_id)}
                className="bg-red-600 m-2 p-2 lg:p-4 text-sm rounded-lg text-gray-300 hover:bg-red-400 w-1/2 font-semibold h-fit">Eliminar lista</button>
            </div>
            {show && <div>
                <FilterName/>
                <div className="text-gray-300 min-h-20 text-center items-center">
                {guest.length ? ( guest.map(g => { 
                    return ( <li className="flex justify-between p-2 items-center space-y-2" key={g._id}> 
                        <p className="text-white text-md">{g.nombre}</p> 
                        <p className={`${g.estado === 'pendiente'? 'text-yellow-500': 'text-green-500'}`}>{g.estado}</p> 
                        <p className="text-gray-300 text-md">{g.dni}</p>
                        {g.estado === 'pendiente' && 
                        <button onClick={() => deleteGuest(g._id)}  
                        className="bg-red-600 text-sm rounded-md p-1">Eliminar de la lista</button> 
                        }
                    </li> ); 
                }) ) : ( <p className="text-white">No hay invitados</p> )}
                </div>
            </div>}
        </div>
    )
}



 const FilterName = () => {
    return (
        <div className="py-4">
            <input type="text" placeholder="Buscar nombre" className="rounded-lg p-2 text-gray"/>
        </div>
    )
}

export default ListCard;