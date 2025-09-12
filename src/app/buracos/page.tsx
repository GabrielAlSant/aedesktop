'use client'
import TabelaRuas from "../../../components/TabelaRuas";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";



export interface Rua {
  _id: string;
  nome: string;
  cidadeId: string;
  __v: number;
}

export default function Buracos(){
 const [ruas, setRuas] = useState<Rua[]>([]);
 const [checking, setChecking] = useState(true);

 const { isAuthenticated } = useAuth();
 const router = useRouter();


 useEffect(() => {
  if (!isAuthenticated) {
    router.push("/login");
  }
}, [isAuthenticated, router]);



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
        <div> 
            <TabelaRuas  dados={ruas} />
        </div>
    )
}