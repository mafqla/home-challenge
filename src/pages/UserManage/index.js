import React, {useEffect, useState} from 'react';
import {Button, Space, Table, message, Form, Input, Modal} from 'antd';
import {deleteUser, updateUserinfo, userinfo, adduser} from "@/request/api";
import './index.scss'

const EditableCell = ({
                          editing, dataIndex, title, record, index, children, ...restProps
                      }) => {
    const inputNode = <Input/>;
    return (<td {...restProps}>
        {editing ? (<Form.Item
            name={dataIndex}
            style={{
                margin: 0,
            }}
            rules={[{
                message: `Please Input ${title}!`,
            },]}
        >
            {inputNode}
        </Form.Item>) : (children)}
    </td>);
};


const UserManage = () => {
    // 列表数组
    const [arr, setArr] = useState([])
    // 分页
    const [pagination, setPagination] = useState({current: 1, pageSize: 7, total: 0})
    const [editingKey, setEditingKey] = useState('');
    const [form] = Form.useForm();
    // 提取请求的代码
    const getUserList = (current, pageSize) => {
        userinfo({
            page_num: current, page_size: pageSize
        }).then(res => {
            if (res.status === 0) {
                // 更改pagination
                let {page_num, page_size, total} = res.data;
                setPagination({current: page_num, pageSize: page_size, total})
                let newArr = JSON.parse(JSON.stringify(res.data.arr));
                // console.log(newArr)
                // 声明一个空数组
                let myarr = []
                /*
                    1. 要给每个数组项加key，让key=id
                    2. 需要有一套标签结构，赋予一个属性
                */
                // eslint-disable-next-line array-callback-return
                newArr.map(item => {
                    let obj = {
                        key: item.id,
                        id: item.id,
                        username: item.username,
                        nickname: item.nickname,
                        avatar: item.avatar,
                        email: item.email,
                    }
                    myarr.push(obj)
                })
                setArr(myarr)
            }
        })
    }

    // 请求文章列表(mounted)
    useEffect(() => {
        getUserList(pagination.current, pagination.pageSize);
        // eslint-disable-next-line
    }, [])

    // 分页的函数
    const pageChange = (arg) => getUserList(arg.current, arg.pageSize);

    // 删除
    const delFn = (id) => {
        deleteUser({id}).then(res => {
            if (res.status === 0) {
                message.success(res.message)
                // 重新刷页面，要么重新请求这个列表的数据   window.reload   调用getList(1)  增加变量的检测
                getUserList(1, pagination.pageSize);
            } else {
                message.success(res.message)
            }
        })
    }

    // 弹出层组件
    const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
        const [form] = Form.useForm();
        return (
            <Modal
                visible={visible}
                title="添加新用户"
                okText="添加"
                cancelText="取消"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            onCreate(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        modifier: 'public',
                    }}
                >
                    <Form.Item
                        name="username"
                        label="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                        ]}
                    >
                        <Input type="username" />
                    </Form.Item>
                    <Form.Item name="password" label="password"
                    rules={[
                        {
                            required:true,
                            message:'请输入密码'
                        }
                    ]}
                    >
                        <Input type="password" />
                    </Form.Item>
                    <Form.Item name="email" label="email">
                        <Input type="email"/>
                    </Form.Item>
                    <Form.Item name="nickname" label="nickname">
                        <Input type="text"/>
                    </Form.Item>
                </Form>
            </Modal>
        );
    };
    const [visible, setVisible] = useState(false);

    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        // 添加新用户接口调用
        adduser(values).then(res => {
            if (res.status === 0) {
                message.success(res.message);
                // 重新刷页面
                getUserList(1, pagination.pageSize);
            } else {
                message.error(res.message);
            }
        })
        setVisible(false);
    };


    const isEditing = (record) => record.key === editingKey;

    const edit = (text) => {
        form.setFieldsValue({
            username: '', nickname: '', email: '', ...text,
        });
        setEditingKey(text.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...arr];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {...item, ...row});
                setArr(newData);
                setEditingKey('');
                const id = item.id
                const username = item.username
                const nickname = item.nickname
                const email = item.email
                updateUserinfo({id, username, nickname, email})
                    .then(res => {
                        if (res.status === 0) {
                            message.success(res.message);
                        } else {
                            message.error(res.message);
                        }
                    })
            } else {
                newData.push(row);
                setArr(newData);
                setEditingKey('');
            }

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };


    const columns = [{
        title: '用户id', width: 100, dataIndex: 'id', key: 'id', fixed: 'left',
    }, {
        title: '用户名', width: 100, dataIndex: 'username', key: 'username', fixed: 'left', editable: true,
    }, {
        title: '用户头像',
        width: 100,
        dataIndex: 'avatar',
        key: 'avatar',
        fixed: 'left',
        render: (avatar) => (<Space size="middle">
            <img src={avatar} className="avatar" alt=""/>
        </Space>),
    }, {
        title: '用户类型', width: 100, dataIndex: 'nickname', key: 'nickname', fixed: 'left', editable: true,
    }, {
        title: '用户邮箱', dataIndex: 'email', key: 'email', width: 150, editable: true,
    }, {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100, // eslint-disable-next-line jsx-a11y/anchor-is-valid
        render: text => {
            const editable = isEditing(text);
            return editable ? (
                <span>
                        <Space size="middle">
                        <Button type='primary' onClick={() => save(text.key)}
                                style={{
                                    marginRight: 8,
                                }}>保存</Button>
                        <Button type='danger' title="Sure to cancel?" onClick={() => cancel(text.key)}>取消</Button>
                    </Space>
          </span>
            ) : (<Space size="middle">
                    <Button type='primary' disabled={editingKey !== ''} onClick={() => edit(text)}>编辑</Button>
                    <Button type='danger' onClick={() => delFn(text.key)}>删除</Button>
                </Space>

            );
        },
    },];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col, onCell: (record) => ({
                record, dataIndex: col.dataIndex, title: col.title, editing: isEditing(record),
            }),
        };
    });
    return (
        <div className="user-list">
        <div className="add-button">
            <div>
                <Button
                    type="primary"
                    onClick={() => {
                        setVisible(true);
                    }}
                >
                    新增用户
                </Button>
                <CollectionCreateForm
                    visible={visible}
                    onCreate={onCreate}
                    onCancel={() => {
                        setVisible(false);
                    }}
                />
            </div>
        </div>
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                columns={mergedColumns}
                dataSource={arr}
                onChange={pageChange}
                pagination={pagination}
                bordered={true}
                rowClassName="editable-row"
            />
        </Form>
    </div>);
}

export default UserManage