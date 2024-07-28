'use client'

import * as React from 'react';

import prisma from "@/prisma/prisma";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import useSWR from "swr";
import Link from "next/link";
import {Button, Modal, Stack, TextField} from "@mui/material";
import dayjs, {Dayjs} from "dayjs";
import Box from "@mui/material/Box";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TableComponent = () => {
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDay, setBirthDay] = useState<Dayjs | null>(dayjs(new Date));
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const toggleModal = () => setModalVisible(!modalVisible);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const {data, mutate} = useSWR(`http://localhost:3000/api/table`,
        fetcher
    );

    const addPatient = () => {
        toggleModal()
        fetch('http://localhost:3000/api/table/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                middleName,
                secondName,
                phone,
                birthDay,
                createdAt: dayjs(new Date()),
                updatedAt: dayjs(new Date()),
            }),
        }).then((res) => mutate({...data})
        );
    }

    console.log(data)

    return <LocalizationProvider
        dateAdapter={AdapterDayjs}
    >
        <Button onClick={toggleModal}>Добавить пациента</Button>
        <Modal
            open={modalVisible}
            onClose={toggleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack direction="row" alignItems="left" className={'mb-4'} spacing={2}>

                    <DatePicker value={birthDay} format={'DD.MM.YYYY'} label="Дата рождения"
                                onChange={(newValue) => setBirthDay(newValue)}
                                className={'mr-3'}/>
                    <TextField
                        value={phone}
                        type={'phone'}
                        className={'mr-3'} id="outlined-basic"
                        onChange={(event) => setPhone(event.target.value)} label="Номер телефона"
                        variant="outlined"/>
                </Stack>

                <Stack direction="row" alignItems="left" spacing={2}>
                <TextField
                    value={firstName}
                    type={'name'}
                    className={'mr-3'} id="outlined-basic"
                    onChange={(event) => setFirstName(event.target.value)} label="Имя"
                    variant="outlined"/>
                <TextField
                    value={secondName}
                    className={'mr-3'} id="outlined-basic"
                    onChange={(event) => setSecondName(event.target.value)} label="Фамилия"
                    variant="outlined"/>
                <TextField
                    value={middleName}
                    className={'mr-3'} id="outlined-basic"
                    onChange={(event) => setMiddleName(event.target.value)} label="Отчество"
                    variant="outlined"/>

                </Stack>
                <Button className={'mt-5'} onClick={addPatient}>Готово</Button>

            </Box>
        </Modal>

        <TableContainer component={Paper}>
            {/*{data?.length}*/}
            {!data ? <div>Loading</div> :
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Имя Фамилия</TableCell>
                            <TableCell align="right">Дата рождения</TableCell>
                            <TableCell align="right">Телефон</TableCell>
                            <TableCell align="right">Дата поступления</TableCell>
                            <TableCell align="right">Действия </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.patients.map((row: any) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.firstName} {row.secondName} {row.middleName}
                                </TableCell>
                                <TableCell align="right">{dayjs(row?.birthDay).format('DD.MM.YYYY')}</TableCell>
                                <TableCell align="right">{row?.phone}</TableCell>
                                <TableCell align="right">{dayjs(row?.createdAt).format('DD.MM.YYYY')}</TableCell>
                                <TableCell align="right"><Link
                                    href={`/table/patient/${row.id}`}> Открыть </Link></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>}
        </TableContainer>

        <p className=' font-semibold'>
        </p>

    </LocalizationProvider>
}
export default TableComponent
