import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form';

import { v4 as uuid } from 'uuid';
import { Title, Grid, Flex, Button, TextInput, Text, Slider } from '@mantine/core';
import List from '../List/List';
import { ListContext } from '../Context/ListOfData/ListOfData';
import LoginForm from '../LoginForm/LoginForm';
import Auth from '../auth/Auth';
import { LoginContext } from '../Context/LoginContext/LoginContext';
import axios from 'axios';
import SignUp from '../SignupForm/SignupForm';



const Todo = () => {
  // const listContext = React.createContext()
  const [update, setUpdate] = useState([])
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const { data, dispatch } = useContext(ListContext)
  console.log(data.list, "11111111111111111111111")
  const { can } = useContext(LoginContext)
  // const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  async function addItem(item) {
    // item.id = uuid();
    try {
      item.completed = false;
      const res = await axios.post(`https://auth-api-fz5h.onrender.com/todo`, item)

      //  setState([...state, res.data.data]);
      dispatch({ type: 'changeList', payload: item });
    } catch (err) {
      console.log('post', err);
    }
    console.log(item);
    // setList([...list, item]);
  }

  async function deleteItem(id) {
    try {
      await axios.delete(`https://auth-api-fz5h.onrender.com/todo/${id}`)
      const items = data.list.filter(item => item.id !== id);
      // setList(items);
      dispatch({ type: 'replaceList', payload: items });
    } catch (err) {
      console.log('delete error');
    }
  }

  async function toggleComplete(id) {
    if (can('update')) {

      const items = await Promise.all(data.list.map(async (item) => {
        if (item.id === id) {
          item.completed = !item.completed;
          try {
            item.id = id
            const res = await axios.put(`https://auth-api-fz5h.onrender.com/todo/${id}`, item)
            setUpdate(res.data.data)
            console.log(res, "ehaaaaaaaaaaaaaaaaaaaaaaaaaaaabo")
          } catch (err) {
            console.log('update error', err);
          }
        }
        return item;
      }));

      // setList(items);
      dispatch({ type: 'replaceList', payload: items })
    }

  }
  async function getData() {
    try {
      const res = await axios.get('https://auth-api-fz5h.onrender.com/todo')
      console.log(res.data.data);
      dispatch({ type: 'replaceList', payload: res.data.data })
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let incompleteCount = data.list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;

    // localStorage.setItem('list', JSON.stringify(data.list))
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [data.list]);

  return (
    <Flex direction='column' justify='center' align={'center'} mih='80vh'>
      <LoginForm />
      <SignUp />
      {/* <header data-testid="todo-header"> */}
      <Auth capability="read">
        <Title ta={'center'} c={'white'} bg={'#343a40'} w='80%' p={"20px"} m={'auto'} data-testid="todo-h1" order={1}>To Do List: {incomplete} items pending</Title>
        {/* </header > */}
      </Auth>
      <Grid mih={'80vh'} justify='center' w={'80%'} grow gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50} >
        <Grid.Col span={4}>
          <Auth capability="create">
            <form onSubmit={handleSubmit}>

              <h2>Add To Do Item</h2>

              <TextInput
                onChange={handleChange}
                name="text"
                placeholder="Task Details"
                label="To Do Item"
              />

              <TextInput
                onChange={handleChange}
                name="assignee"
                placeholder="For who?"
                label="Assigned To"
              />

              <Text>Difficulty</Text>
              <Slider
                color='indigo'
                onChange={handleChange}
                defaultValue={defaultValues.difficulty}
                step={1}
                min={1}
                max={5}
                name="difficulty"
              />
              <Button color='indigo' type="submit">Add Task</Button>
            </form>
          </Auth>
        </Grid.Col>
        <Grid.Col span={8}>
          {/* <Pagination m={'20px'} color="indigo" total={10} /> */}
          <Auth capability="read">
            <List list={data.list} toggleComplete={toggleComplete} deleteItem={deleteItem} />
          </Auth>
          {/* {
            list.map(item => (
              <div key={item.id}>
                <p>{item.text}</p>
                <p><small>Assigned to: {item.assignee}</small></p>
                <p><small>Difficulty: {item.difficulty}</small></p>
                <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
                <hr />
              </div>
            ))

          } */}
        </Grid.Col>
      </Grid>

    </Flex>
  );
};

export default Todo;
