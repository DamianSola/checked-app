import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useEvento } from '@/components/eventContext'


interface ScoreProps {
    guests : []
}

interface GuestState  {
    nombre: string,
    dni: string,
    _id: string,
    eventoId: string
}

interface AlertValues {
    show: boolean;
    message: string;
    types: string
}

const GuestScore = ({eventoId}: any) => {

    // const [guest, setGuest] = useState<GuestState[]>([])
    const [count, SetCount] = useState({
        total: 0,
        present: 0,
    })

    const [showAlert, setShowAlert] = useState<AlertValues>({
        show: false,
        message: '',
        types: ''
    });

    const { evento, setEvento } = useEvento();


    const getGuest = async () => {
        try{
            const response = await axiosInstance.get(`/guest/guestEvent/${eventoId}`)
            // console.log(response.data)
            let presentGuest = response.data.filter((g:any) => g.estado === 'admitido')

            SetCount({total: response.data.length, present: presentGuest.length})
        }catch(err :any){
            console.log(err)
            setShowAlert({ show: true, message: err?.response?.data?.message, types: 'error' });
        }
    }


    useEffect(()=>{
        getGuest()
    },[])


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