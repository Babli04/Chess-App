import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';

export function ChessSinglePage() {
    const params = useParams();
    const id = params.chessId;
    const[chess,setChess] = useState([]);
    const[isPending, setPending] = useState(false);
    useEffect(() => {
        setPending(true);
                axios.get(`https://chess.sulla.hu/chess/${id}`)
                .then((res) => res.data)
                .then((data) => setChess(data))
                .catch(console.log)
                .finally(() => {
                    setPending(false);
                });   
            } 
, [id]);    
 

    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            {isPending || !chess.id ? (
                <div className="spinner-border"></div>
            ) : (
                            <div className="card p-3">
                                <div className="card-body">
                                <h5 className="card-title">Sakkozó neve: {chess.name}</h5>
                                <div className="lead">Születési dátuma: {chess.birth_date}</div>
                                <div className="lead">Nyert világbajnokságok: {chess.world_ch_won}</div>
                                    <img alt={chess.name}
                                    className="img-fluid rounded"
                                    style={{maxHeight: "500px"}}
                                    src={chess.image_url ? chess.image_url : 
                                    "https://via.placeholder.com/400x800"} 
                                    />
                                  </div>
                                  <div><NavLink to={chess.profile_url}  target="_blank">{chess.profile_url}</NavLink></div><br/>
                                  <div><NavLink to="/"><i className="bi bi-backspace"></i></NavLink> &nbsp;&nbsp;&nbsp;
<NavLink key="y" to={"/mod-chess/" + chess.id}><i className="bi bi-pencil"></i></NavLink></div>   
                            </div>
                        
                    )}
                </div>
            );
}
export default ChessSinglePage;
