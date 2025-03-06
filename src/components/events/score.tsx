import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

interface GuestScoreProps {
    eventoId: string;
  }

const GuestScore: React.FC<GuestScoreProps> = ({eventoId}) => {

    const [count, SetCount] = useState({
        total: 0,
        present: 0,
    })

    const [error, setError] = useState<string | undefined>()



    const getGuest = async () => {
        try{
            const response = await axiosInstance.get(`/guest/guestEvent/${eventoId}`)
            const presentGuest = response.data.filter((g:{estado:string}) => g.estado === 'admitido')

            SetCount({total: response.data.length, present: presentGuest.length})
        }catch{
            setError('Ups ¡Algo salio mal!')
        }
    }


    useEffect(()=>{
        getGuest()
    },[eventoId])

    if(error) return (
        <div className="rounded-xl bg-gray-800 p-8 text-center m-4 md:w-60">
            <p className="text-ms text-gray-400 ">{error}</p>
        </div>
    )


    return (
        <div className="rounded-2xl bg-gradient-to-r from-gray-800 to-gray-600 shadow-xl p-8 text-center m-4 md:w-60">
        <p className="text-sm text-gray-400">Ingresaron</p>
        <div className="flex p-4 justify-around items-center">
            <p className="text-green-500 text-4xl">{count.present}</p>
            <p className="text-sm text-gray-400">/</p>
            <p className="text-pink-500 text-4xl">{count.total}</p>
        </div>
        <p className="text-sm text-gray-400">Invitados</p>
    </div>
    
    )
}


export default GuestScore