import React, { useEffect, useState }  from "react"
import ModalAddGuest from "../modals/modalAddGuest"
import axiosInstance from "@/utils/axiosInstance"
import CustomAlert from "../CustomAlert"
import ModalAlert from "../modals/modalAlert.";
// import ModalManyGuest from "../modals/modalManyGuest";


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
      <div className="rounded-2xl bg-gradient-to-r from-gray-800 to-gray-600 shadow-xl p-6 md:p-8 text-center w-full my-6">
      <ModalAddGuest isOpen={add} onClose={() => setAdd(!add)} listId={_id} listName={name} />
        {/* <ModalManyGuest/> */}
      {showAlert.show && (
          <CustomAlert
              message={showAlert.message}
              type={showAlert.types}
              onClose={() => setShowAlert({ ...showAlert, show: false })}
          />
      )}
      <ModalAlert open={openDelete} onClose={() => setOpenDelete(false)} handleDelete={handleDelete} />
      <ModalAlert
          open={openDeleteGuest.open}
          onClose={() => setOpenDeleteGuest({ ...openDeleteGuest, open: false })}
          handleDelete={() => deleteGuestAlert(openDeleteGuest.guestId)}
      />
  
      <div className="md:flex md:items-center md:justify-between md:space-x-4 mb-4">
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
              <p className="text-white text-2xl font-bold">{name}</p>
              <p className="text-gray-300 text-sm">{guest.length} invitados</p>
              <p className={`text-lg w-fit italic ${open ? 'text-green-400' : 'text-red-400'}`}>
                  {open ? 'abierta' : 'cerrada'}
              </p>
          </div>
          <div className="flex justify-between md:justify-center items-center w-full md:space-x-4 space-x-2">
              <button
                  onClick={updateList}
                  className="button-pink p-2 lg:p-4 text-sm rounded-lg hover:bg-pink-400 font-semibold transition ease-in-out duration-300 transform hover:scale-105 w-full"
              >
                  Editar
              </button>
              <button
                  onClick={() => setShow(!show)}
                  className="button-pink p-2 lg:p-4 text-sm rounded-lg hover:bg-pink-400 font-semibold transition ease-in-out duration-300 transform hover:scale-105 w-full"
              >
                  {show ? 'Ocultar' : 'Ver'}
              </button>
              <button
                  onClick={() => setAdd(!add)}
                  className="button-pink p-2 lg:p-4 text-sm rounded-lg hover:bg-pink-400 font-semibold transition ease-in-out duration-300 transform hover:scale-105 w-full"
              >
                  {add ? 'Listo' : 'Agregar'}
              </button>
              <button
                  onClick={() => setOpenDelete(true)}
                  className="bg-red-600 p-2 lg:p-4 text-sm rounded-lg text-gray-300 hover:bg-red-400 font-semibold transition ease-in-out duration-300 transform hover:scale-105 h-fit w-fit"
              >
                  <span className="material-symbols-outlined">delete</span>
              </button>
          </div>
      </div>
  
      {show && (
          <div>
              <div className="py-4">
                  <input
                      type="text"
                      value={search}
                      onChange={handleSearchChange}
                      placeholder="Buscar invitado"
                      className="rounded-lg p-2 text-gray-900 w-full"
                  />
              </div>
              <div className="block text-gray-300 min-h-20 text-center items-center">
                  {guest.length ? (
                      filteredGuests.map((g) => (
                          <li
                              className="flex items-center justify-between p-2 bg-gray-800 rounded-lg mb-2 border border-gray-700"
                              key={g._id}
                          >
                              <div className="text-white text-sm font-medium flex-1 text-left">{g.nombre}</div>
                              <div
                                  className={`text-center text-sm font-semibold flex-1 ${
                                      g.estado === 'pendiente' ? 'text-yellow-500' : 'text-green-500'
                                  }`}
                              >
                                  {g.estado}
                              </div>
                              <div className="text-gray-300 text-sm text-center flex-1">{g.dni}</div>
                              {g.estado === 'pendiente' && (
                                  <div className="text-right">
                                      <button
                                          onClick={() => setOpenDeleteGuest({ guestId: g._id, open: true })}
                                          className="bg-transparent border-red-600 text-white font-semibold rounded-md"
                                      >
                                          <span className="material-symbols-outlined">delete</span>
                                      </button>
                                  </div>
                              )}
                          </li>
                      ))
                  ) : (
                      <p className="text-white text-center">No hay invitados</p>
                  )}
              </div>
          </div>
      )}
  </div>
  
      );
}


export default ListCard;