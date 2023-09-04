/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import App from '../../App';
import React from 'react';

describe('Todo Component Tests', () => {
  test('renders the initial "To Do List: 0 items pending" header', () => {
    render(<App />);
    const header = screen.getByTestId('todo-h1');
    expect(header).toHaveTextContent('To Do List: 0 items pending');
  });

  test('adds a new task when the form is submitted', async () => {
    render(<App />);
    const taskText = 'Test Task';
    const assigneeText = 'Test User';

    const textInput = screen.getByLabelText('To Do Item');
    const assigneeInput = screen.getByLabelText('Assigned To');
    const addButton = screen.getByText('Add Task');

    fireEvent.change(textInput, { target: { value: taskText } });
    fireEvent.change(assigneeInput, { target: { value: assigneeText } });
    fireEvent.click(addButton);


    await waitFor(() => {
      const taskCard = screen.getByTestId('task-card');
      const taskTextElement = within(taskCard).getByText(`Task: ${taskText}`);
      const assigneeTextElement = within(taskCard).getByText(`Assigned to: ${assigneeText}`);

      expect(taskTextElement).toBeInTheDocument();
      expect(assigneeTextElement).toBeInTheDocument();
    });
  });

  test('marks a task as complete when the "Done" button is clicked', () => {
    render(<App />);
    const taskText = 'Test Task';


    const textInput = screen.getByLabelText('To Do Item');
    const addButton = screen.getByText('Add Task');
    fireEvent.change(textInput, { target: { value: taskText } });
    fireEvent.click(addButton);


    const doneButton = screen.getByTestId('btn-done');
    fireEvent.click(doneButton);


    expect(doneButton).toHaveTextContent('ToDo');
  });

  it('deletes a task when the "Delete" button is clicked', () => {
    render(<App />);
    const taskText = 'Test Task';
    const addButton = screen.getByText('Add Task');
    fireEvent.change(screen.getByLabelText('To Do Item'), { target: { value: taskText } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(screen.queryByText(taskText)).toBeNull();
  });
});

