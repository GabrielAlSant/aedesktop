'use client'
import TabelaRuas from "../../../components/TabelaRuas";
import { useEffect, useState } from "react";

export interface Rua {
  _id: string;
  nome: string;
  cidadeId: string;
  __v: number;
}

export default function Buracos(){
 const [ruas, setRuas] = useState<Rua[]>([]);

     useEffect(() => {
        fetch("https://projeto-vias-git-master-matheus-santos-andrades-projects.vercel.app/GETRUAS")
          .then((res) => res.json())
          .then((json) => setRuas(json));
      }, []);


    return(
        <div> 
            <TabelaRuas  dados={ruas} />
        </div>
    )
}