import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form';

import { v4 as uuid } from 'uuid';
import { Title, Grid, Flex, Button, TextInput, Text, Slider } from '@mantine/core';
import List from '../List/List';
import { ListContext } from '../Context/ListOfData/ListOfData';


const Todo = () => {
  // const listContext = React.createContext()
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const { data, dispatch } = useContext(ListContext)
  // const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    // setList([...list, item]);
    dispatch({ type: 'changeList', payload: item });
  }

  function deleteItem(id) {
    const items = data.list.filter(item => item.id !== id);
    // setList(items);
    dispatch({ type: 'replaceList', payload: items });
  }

  function toggleComplete(id) {

    const items = data.list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    // setList(items);
    dispatch({ type: 'replaceList', payload: items })

  }

  useEffect(() => {
    let incompleteCount = data.list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [data.list]);

  return (
    <Flex direction='column' justify='center' align={'center'} mih='80vh'>
      {/* <header data-testid="todo-header"> */}
      <Title ta={'center'} c={'white'} bg={'#343a40'} w='80%' p={"20px"} m={'auto'} data-testid="todo-h1" order={1}>To Do List: {incomplete} items pending</Title>
      {/* </header > */}
      <Grid mih={'80vh'} justify='center' w={'80%'} grow gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50} >
        <Grid.Col span={4}>
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
        </Grid.Col>
        <Grid.Col span={8}>
          {/* <Pagination m={'20px'} color="indigo" total={10} /> */}

          <List list={data.list} toggleComplete={toggleComplete} deleteItem={deleteItem} />
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
