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
import {useEffect} from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const TableComponent = () => {
    const [patients, setPatients] = React.useState([]);
    // const {users} = useSWR('http://localhost:3000/api/table', fetcher)
    // const {
    //     data,
    //     isLoading,
    // } = useSWR(
    //     "http://localhost:3000/api/table",
    //     fetcher,
    //     // { revalidateOnFocus: false, revalidateOnReconnect: false }
    // );

    const { data } = useSWR(`http://localhost:3000/api/table`,
        fetcher
    );

    // const getPatients = async () => {
    //     const users = await prisma.user.findMany();
    //     setPatients(users);
    //     console.log(users)
    // }
    // useEffect(() => {
    //     getPatients().then((p) => console.log(p))
    // }, []);



    return <div
        className='flex flex-row  max-w-6xl mx-auto bg-ct-dark-100 rounded-md h-[20rem]'>

        <TableContainer component={Paper}>
            {/*{data?.length}*/}
            {!data ? <div>'Loading'</div> :
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Имя Фамилия</TableCell>
                            <TableCell align="right">Дата рождения</TableCell>
                            <TableCell align="right">Телефон</TableCell>
                            <TableCell align="right">Почта</TableCell>
                            <TableCell align="right">Дата поступления</TableCell>
                            <TableCell align="right">Предполагаемая дата родов</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.users.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                {/*<TableCell align="right">{row?.birthday}</TableCell>*/}
                                {/*<TableCell align="right">{row?.phone}</TableCell>*/}
                                {/*<TableCell align="right">{row?.email}</TableCell>*/}
                                {/*<TableCell align="right">{row?.dataIn}</TableCell>*/}
                                {/*<TableCell align="right">{row?.dataIn + (45 * 7)}</TableCell>*/}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>}
        </TableContainer>

        <p className=' font-semibold'>
        </p>

    </div>
}
export default TableComponent
