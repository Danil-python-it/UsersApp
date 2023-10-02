import { requestUsers, requestUsersWithError, User, Query } from "./api";
import React, {useState} from "react";
import "./styles.css";


// Примеры вызова функций, в консоли можно увидеть возвращаемые результаты
//requestUsers({ name: "", age: "", limit: 4, offset: 0 }).then(console.log);
//requestUsersWithError({ name: "", age: "", limit: 4, offset: 0 }).catch(
//  console.error
//);

function MainInter(){
    const[name, setName] = useState("");
    const[age, setAge] = useState("");
    const[limit, setLimit] = useState(4);
    const[offset, setOffset] = useState(0);
    const[data, setData] = useState<User[]>([]);
    const[error, setError] = useState(null);
    const[status, setStatus] = useState(true);


    function onCangeName(event: React.ChangeEvent<HTMLInputElement>) {
        setStatus(true)
        setError(null)
        setName(event.target.value)
        requestUsers({ name: name, age: age, limit: limit, offset: offset })
            .then((user) => {setData(user); setStatus(false)})
            .catch((error) => {setError(error); setStatus(false)})
    }
    function onCangeAge(event: React.ChangeEvent<HTMLInputElement>) {
        setStatus(true)
        setError(null)
        setAge(event.target.value)
        requestUsers({ name: name, age: age, limit: limit, offset: offset })
            .then((user) => {setData(user); setStatus(false)})
            .catch((error) => {setError(error); setStatus(false)})
        
    }

    requestUsers({ name: name, age: age, limit: limit, offset: offset })
            .then((user) => {setData(user); setStatus(false)})
            .catch((error) => {setError(error); setStatus(false)})


    return(
        <>
            <div className="MainContainer">
                <div className="ContainerFormOne">
                    <input type="text" placeholder="Name" onChange={onCangeName} value={name}/>
                    <input type="number" placeholder="Age" onChange={onCangeAge} value={age}/>
                </div>

                <div className="ContainerForShow">
                    {status ? (
                            data.length <= 0 && (<h3>Loading...</h3>)
                        ):(
                            data.length <= 0 ? (
                                <h3>Users not found</h3>
                            ):(
                                error != null ? (
                                    <p>Ошибка - {error}</p>
                                ):(
                                    <ul>{data.map((i) => <li key={i.id}><p>{i.name}, {i.age}</p></li>)}</ul>
                                )
                            )
                    )}
                </div>

                <div className="ContainerFromTwo">
                    <div>
                        <h3>Limit</h3>
                        <span>
                            <span className="button" onClick={function(){
                                setLimit(limit-1)
                                }}>{"<"}</span>
                            <p>{limit}</p>
                            <span className="button" onClick={function(){
                                setLimit(limit+1)
                                }}>{">"}</span>
                        </span>
                        
                    </div>
                    
                    <div>
                        <h3>Offset</h3>
                        <span>
                            <span className="button" onClick={function(){
                                setOffset(offset-1)
                                }}>{"<"}</span>
                            <p>{offset}</p>
                            <span className="button" onClick={function(){
                                setOffset(offset+1)
                                }}>{">"}</span>
                        </span>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainInter;