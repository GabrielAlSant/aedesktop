'use client'
import TabelaRuas from "../../../components/TabelaRuas";
import { useEffect, useState } from "react";
import ProtectedRoute from "../../context/protectRoute";



export interface Rua {
  _id: string;
  nome: string;
  cidadeId: string;
  __v: number;
}

export default function Buracos(){
 const [ruas, setRuas] = useState<Rua[]>([]);

     useEffect(() => {
        if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
            console.error('NEXT_PUBLIC_DATABASE_URL is not defined');
            return;
        }
        fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/GETRUAS`)
          .then((res) => res.json())
          .then((json) => setRuas(json))
          .catch(error => console.error('Error fetching data:', error));
      }, []);


    return(
      <ProtectedRoute>
        <div> 
            <TabelaRuas  dados={ruas} />
        </div>
      </ProtectedRoute>
    )
}