import axios from 'axios';
import React, { useState } from 'react';
import useAsync from './useAsync';
import User from './User'
import styled from 'styled-components'

const Li = styled.li`
    cursor: pointer;
`


async function getUsers() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data
}


function Users() {
    const [userId, setUserId] = useState(null)
    const [state, refetch] = useAsync(getUsers, []);

    const { loading, data: users, error } = state

    if (loading) return <div>로딩중...</div>
    if (error) return <div>에러발생</div>
    if (!users) return null;

    return (
        <>
            <ul>
                {users.map((user) => (
                    <Li onClick={() => setUserId(user.id)} key={user.id}>{user.username}({user.name})</Li>
                ))}
            </ul>
            <button onClick={refetch}>다시 불러오기</button>
            {userId && <User id={userId} />}
        </>
    );
}

export default Users;