// react-async 라이브러리 사용법에 대한 설명
import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async'; // 임포트 하고

async function getUsers() { // getUsers로 받아오고자 하는 정보에 대한 함수를 만들어줌
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    );
    return response.data;
}


function React_async_lib_pr() {

    const { data: users, error, isLoading, reload } = useAsync({
        promiseFn: getUsers
    });
    // data, error, isLoading, reload 정보를 가지고 있으며 useAsycn함수의 promiseFn에 사용하고자 하는 함수 입력

    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!users) return <button onClick={reload}>불러오기</button>;
    // reload함수를 통해서 정보를 다시 가져 올 수 있다.

    return (
        <>
            <ul>
                {users.map(user => (
                    <li
                        key={user.id}
                    >
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={reload}>다시 불러오기</button>
        </>
    );
}

export default React_async_lib_pr;