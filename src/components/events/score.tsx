import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";


const GuestScore = ({eventoId}: any) => {

    const [count, SetCount] = useState({
        total: 0,
        present: 0,
    })

    const [error, setError] = useState<string | undefined>()



    const getGuest = async () => {
        try{
            const response = await axiosInstance.get(`/guest/guestEvent/${eventoId}`)
            const presentGuest = response.data.filter((g:any) => g.estado === 'admitido')

            SetCount({total: response.data.length, present: presentGuest.length})
        }catch(err :any){
            setError('Ups ¡Algo salio mal!')
           
        }
    }


    useEffect(()=>{
        getGuest()
    },[])

    if(error) return (
        <div className="rounded-xl bg-gray-800 p-8 text-center m-4 md:w-60">
            <p className="text-ms text-gray-400 ">{error}</p>
        </div>
    )


    return (
        <div className="rounded-xl bg-gray-800 p-8 text-center m-4 md:w-60">
            <p className="text-ms text-gray-400 ">Ingresaron</p>
            <div className="flex p-4 justify-around items-center ">
                <p className="text-green-500 text-4xl">{count.present}</p>
                <p className="text-ms text-gray-400">/</p>
                <p className="text-pink-500 text-4xl">{count.total}</p>
            </div>
            <p className="text-ms text-gray-400">Invitados</p>
        </div>
    )
}


export default GuestScore