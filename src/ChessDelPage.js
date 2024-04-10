import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

export function ChessDelPage(props) {
    const params = useParams();
    const id = params.chessId;
    const navigate = useNavigate();
    const[chess,setChess] = useState([]);
    const[isPending, setPending] = useState(false);
    useEffect(() => {
        setPending(true);
        (async () => {
            try {
        const res= await fetch(`https://chess.sulla.hu/chess/${id}`)
            const chess = await res.json();
            setChess(chess);
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setPending(false);
        }
    })
    ();
 }, [id]);
 return (
    <div className="p-5 m-auto text-center content bg-lavender">
        {isPending || !chess.id ? (
            <div className="spinner-border"></div>
        ) : (
                        <div className="card p-3">
                            <div className="card-body">
                            <h5 className="card-title">Törlendő elem neve: {chess.name}</h5>
                            <div className="lead">Születési idő: {chess.birth_date}</div>
                                <img alt={chess.name}
                                className="img-fluid rounded"
                                style={{maxHeight: "500px"}}
                                src={chess.image_url ? chess.image_url : 
                                "https://via.placeholder.com/400x800"} 
                                />
                              </div>
                              <form onSubmit={(event) => {
                
            event.persist();
            event.preventDefault();
            fetch(`https://chess.sulla.hu/chess/${id}`, {
                method: "DELETE",
                
                
            })
        
            .then(() =>
            {
                navigate("/");
            })
            .catch(console.log);
            }}>
                              <div>
<NavLink to={"/"}><button className="btn btn-warning">Mégsem</button></NavLink>

<button className="btn btn-danger">Törlés</button></div></form>   
                        </div>
                    
                )}
            </div>
        );
}
    export default ChessDelPage;
