import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAsync from './useAsync';
import styled from 'styled-components'


const Li_cursor = styled.li`
    cursor: pointer;
`

async function getUsers() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    return response.data;
}


function Users() {

    const [state, refetch] = useAsync(getUsers, [], false)
    const { loading, error, data: users } = state
    const [selectUser, setSelectUser] = useState({ name: 'woojin', email: 'bwj59@naver.com' })

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!users) return <button onClick={refetch}>다시 불러오기</button>;

    const showEmail = (e) => {
        setSelectUser(...users.filter((user) => user.id == e.target.value))
    }

    return (
        <>
            <ul>
                {users.map((user) => (
                    <Li_cursor onClick={showEmail} value={user.id} key={user.id}>{user.username}({user.name})</Li_cursor>
                ))}
            </ul>
            <button onClick={refetch}>다시 불러오기</button>
            <div>
                <h1>{selectUser.name}</h1>
                <div><b>email</b>: {selectUser.email}</div>
            </div>
        </>

    );
}

export default Users;