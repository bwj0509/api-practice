import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async'
import styled from 'styled-components'

const Li = styled.li`
    cursor: pointer;
`


async function getUsers() {
    const responese = await axios.get('https://jsonplaceholder.typicode.com/users')
    return responese.data;
}



function Test() {

    const { data: users, error, isLoading, reload } = useAsync({ promiseFn: getUsers })
    const [id, setId] = useState(1);


    if (isLoading) return <>로딩중입니다....</>
    if (error) return <>에러 발생입니다...</>
    if (!users) return <><button onClick={reload}>다시불러오기</button></>

    const showEmail = (e) => {
        setId(e.target.value - 1)
    }

    console.log(id)
    return (
        <>
            <ul>
                {users.map((user) => (
                    <Li onClick={showEmail} value={user.id} key={user.id}>{user.username}({user.name})</Li>
                ))}
            </ul>
            <hr />
            <div>{users[id].username}({users[id].email})</div>
        </>

    );
}

export default Test;