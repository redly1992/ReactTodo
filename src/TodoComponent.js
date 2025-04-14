import React, {useEffect} from 'react';
import {Button, Divider, Flex, Form, Input, List, Space, Spin} from 'antd';
import './index.css';
import {TodosProvider} from "./TodoContext";
import {DeleteOutlined, LoadingOutlined} from '@ant-design/icons';
import {useTodoDeleting, useTodoLoading, useTodoSelector} from "./TodoProvider";
import {useDispatch} from 'react-redux';
import {addTodoToServer, deleteTodoFromServer, fetchTodos} from "./Todoslice";


const Todo = () => {
    const todoItems = useTodoSelector();
    const loading = useTodoLoading();
    const deleting = useTodoDeleting();

    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const onAdd = (values) => {
        dispatch(addTodoToServer({
            id: Date.now(), // Simple unique ID using timestamp
            todo: values.todo,
            userId: 1,
            completed: false,
        })).then(() => {
            dispatch(fetchTodos()); // Refresh list after adding
            form.resetFields(); // Clear input
        });
    }

    const onRemove = (id) => {
        dispatch(deleteTodoFromServer({
            id: id, // Simple unique ID using timestamp
        })).then(() => {
            dispatch(fetchTodos()); // Refresh list after adding
        });
    }

    // Fetch todos on component mount
    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return (
        <TodosProvider>
            <Flex vertical style={{maxWidth: '80%', margin: '0 auto'}}>
                <Form form={form} onFinish={onAdd} style={{width: '100%'}}>
                    <Space direction="vertical" size="large" block={false} style={{width: '100%'}}>
                        <Space.Compact style={{width: '100%'}}>
                            <Form.Item
                                name="todo"
                                rules={[{required: true, message: 'Please enter a todo!'}]}
                                style={{flex: 1}} // Make Form.Item grow to fill space
                            >
                                <Input
                                    placeholder="What you should do today?"
                                    style={{width: '100%'}} // Ensure Input takes full width of Form.Item
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" disabled={loading}>
                                    Add Todo
                                </Button>
                            </Form.Item>
                        </Space.Compact>
                    </Space>
                </Form>

                <Divider orientation="left">Items</Divider>
                {loading ? (
                    <Spin tip="Loading todos..." style={{textAlign: 'center', padding: '20px'}}/>
                ) : (
                    <List
                        size="large"
                        bordered
                        dataSource={todoItems}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Button
                                        type="link"
                                        icon={
                                            deleting[item.id] ? (
                                                <LoadingOutlined/> // Show loading icon while deleting
                                            ) : (
                                                <DeleteOutlined/> // Show delete icon otherwise
                                            )
                                        }
                                        onClick={() => onRemove(item.id)}
                                        danger
                                        disabled={deleting[item.id]} // Disable button during delete
                                    />,
                                ]}
                            >
                                {item.id} -
                                {item.todo}
                            </List.Item>
                        )}
                    />
                )}
            </Flex>
        </TodosProvider>
    );
};

export default Todo;
