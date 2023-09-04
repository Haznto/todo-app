import React from 'react';
import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

test('renders and navigates to SettingPage correctly', () => {
    render(
        <App />
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {

        const settingsLink = screen.getByText('Settings');
        userEvent.click(settingsLink);
    });

    expect(screen.getByText('Change Settings')).toBeInTheDocument();
    expect(screen.getByText('Show Completed ToDos')).toBeInTheDocument();
    expect(screen.getByText('Items Per page')).toBeInTheDocument();
    expect(screen.getByText('Sort Keyword')).toBeInTheDocument();
});