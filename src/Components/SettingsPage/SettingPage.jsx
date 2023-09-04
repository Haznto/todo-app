import React, { useContext } from 'react'
import { SettingContext } from '../Context/Settings/Settings'
import {  Card, Grid, NumberInput, Switch, Text, TextInput } from '@mantine/core'

export default function SettingPage() {

    const { settings, dispatch } = useContext(SettingContext)
    return (
        <Grid style={{ width: '80%', margin: 'auto', minHeight: '80vh' }}>
            <Grid.Col xs={12} sm={8}>
                <Card withBorder p="xs">
                    <Text >Change Settings</Text>

                    <Switch
                        onChange={(e) => dispatch({ type: 'changeShow', payload: e.currentTarget.checked })}
                        checked={settings.showDone}
                        label="Show Completed ToDos"
                        mb="sm"
                        data-testid="show-completed-switch"
                    />

                    <NumberInput
                        mb="sm"
                        onChange={(value) => dispatch({ type: 'changeTasksNum', payload: value })}
                        placeholder={settings.taskPerPage}
                        label="Items Per page"
                        data-testid="items-per-page-input"
                    />

                    <TextInput
                        mb="sm"
                        onChange={(e) => dispatch({ type: 'changeSort', payload: e.target.value })}
                        placeholder={settings.sortBy}
                        label="Sort Keyword"
                        data-testid="sort-keyword-input"
                    />

                    {/* <Button onClick={handleClick}>Show New Settings</Button> */}
                </Card>
            </Grid.Col>
            <Grid.Col xs={12} sm={4}>

                <Card withBorder p="xs">
                    <Card.Section>
                        <Text m="xl" >Updated Settings</Text>
                    </Card.Section>
                    <Text m="sm">{settings.showDone ? 'Show' : 'Hide'} Completed ToDos</Text>
                    <Text m="sm">Items Per page:  {settings.taskPerPage}</Text>
                    <Text m="sm">Sort Keyword: {settings.sortBy}</Text>
                </Card>

            </Grid.Col>
        </Grid>
    )
}
