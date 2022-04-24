import React, {useEffect, useState} from 'react';
import {Button, Pagination, Space, Table} from 'antd';
import {userinfo} from "@/request/api";

export default function UserManage() {
    const [arr, setArr] = useState([
        {
            key: 1,
            id:1,
            username: 'test',
            nickname: 'test',
            email: 'test@test.com',
        }
    ])

    // 请求用户列表
    useEffect(()=>{
        userinfo().then(res=>{
            console.log(res)
            if (res.status === 0){
                console.log(res.data)
            }
        })
    })
    const columns = [
        {
            title: '用户id',
            width: 100,
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
        },
        {
            title: '用户名',
            width: 100,
            dataIndex: 'username',
            key: 'username',
            fixed: 'left',
        },
        {
            title: '用户类型',
            width: 100,
            dataIndex: 'nickname',
            key: 'nickname',
            fixed: 'left',
        },
        {
            title: '用户邮箱',
            dataIndex: 'email',
            key: 'email',
            width: 150,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary">编辑</Button>
                    <Button type="danger">删除</Button>
                </Space>
            ),
        },
    ];
    return (
        <div className="user-list">
            <Table columns={columns} dataSource={arr} scroll={{x: 1500, y: 300}}>
                <Pagination defaultCurrent={1} defaultPageSize={3} total={500} />
            </Table>
        </div>
    );
}
