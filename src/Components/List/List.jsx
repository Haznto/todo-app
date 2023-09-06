import React, { useContext, useState } from 'react'
import { Card, Text, Badge, Button, Flex, Pagination } from '@mantine/core';
import { SettingContext } from '../Context/Settings/Settings'



export default function List({ list, toggleComplete, deleteItem }) {

    const [currentPage, setCurrentPage] = useState(1)
    const { settings } = useContext(SettingContext)
    console.log(list)
    let toRenderList = settings.showDone ? list : list.filter(task => task.complete === false)
    let startIndex = settings.taskPerPage * (currentPage - 1)
    let endIndex = startIndex + settings.taskPerPage
    let currentPageRender = toRenderList ? toRenderList.slice(startIndex, endIndex) : []
    let PaginationPages = Math.ceil(toRenderList.length / settings.taskPerPage)
    return (
        <div>
            <Pagination onChange={setCurrentPage} m={'20px'} color="indigo" total={PaginationPages} />
            {
                currentPageRender.map(item => (
                    <Card data-testid='task-card' m='10px' p={"50px"} key={item.id} shadow="sm" padding="lg" radius="md" withBorder>
                        <Card.Section>
                            <Flex justify={'space-between'}>
                                <Text>Task: {item.text}</Text>
                                <Text>Assigned to: {item.assignee}</Text>
                                <Text>Difficulty: {item.difficulty}</Text>
                                <Badge data-testid='btn-done' color={item.complete ? 'green' : 'pink'} variant="light" onClick={() => toggleComplete(item.id)}> {item.complete ? 'Done' : 'ToDo'}</Badge>
                                <Button onClick={() => { deleteItem(item.id) }} color='red'>Delete</Button>
                            </Flex>
                        </Card.Section>
                    </Card>

                ))

            }
        </div>
    )
}
