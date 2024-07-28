'use client'
import {Button, Checkbox, FormControlLabel, FormGroup, Input, Stack, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {usePathname} from 'next/navigation';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {FixedSizeList, ListChildComponentProps} from 'react-window';
import Paper from "@mui/material/Paper";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import prisma from "@/prisma/prisma";
import useSWR from "swr";
import axios from "axios";
// const fetcher = (url: string) => fetch(url).then((res) => res.json());
const fetcher = async (url) => await axios.get(url).then((res) => res.data);

const Patient = () => {
    const router = usePathname()
    const userId = router.split('/')[3]
    const { data, mutate } = useSWR(`http://localhost:3000/api/table/patient/?patientId=${userId}`,
        fetcher
    );



    console.log(data)
    // console.log('patient', data?.patient?.visits)


    const [familyHasChanged, setFamilyHasChanged] = useState(false)
    const [phoneHasChanged, setPhoneHasChanged] = useState(false)
    const [familyValue, setFamilyValue] = useState(data?.patient?.secondName)
    const [phoneValue, setPhoneValue] = useState('')
    const [visitDate, setVisitDate] = useState(dayjs(new Date()))
    const [nextVisitDate, setNextVisitDate] = useState(dayjs(new Date()))
    const [pregnancyPeriod, setPregnancyPeriod] = useState(0)
    const [bodyWeight, setBodyWeight] = useState(0)

    const createVisit = () => {

        //  id            String    @id @default(uuid())
        //   firstName     String?
        //   middleName    String?
        //   secondName    String?
        //   phone         String?
        //   notes         String
        //   birthDay      DateTime
        //   createdAt     DateTime  @default(now())
        //   updatedAt     DateTime  @updatedAt


        fetch('http://localhost:3000/api/table/patient/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                patientId: userId,
                pregnancyPeriod,
                bodyWeight,
                familyValue,
                visitDate,
                nextVisitDate
            }),
        }).then((res) =>         mutate({ ...data })
        );
    }

    function renderRow(props: ListChildComponentProps) {
        const {index, style} = props;
        console.log(props)
        return (
            <ListItem style={style} key={props.id} component="div" disablePadding>
                <ListItemText primary={dayjs(props?.visitDate).format('DD.MM.YYYY')}/>
                <ListItemText primary={` Неделя: ${props?.pregnancyPeriod}`}/>
                <ListItemText primary={` Вес: ${props?.bodyWeight}`}/>
            </ListItem>
        );
    }


    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Paper className={'ml-16 mr-16'} elevation={2}>
            <Stack direction="row" spacing={21}>
                <Stack className={'p-6'}>
                    <div>Пациент: {data?.patient?.firstName} {data?.patient?.middleName} {data?.patient?.secondName} </div>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox onChange={(event) => setFamilyHasChanged(event.target.checked)}
                                               checked={familyHasChanged}/>}
                            label="Изменилась фамилия"/>
                        <FormControlLabel
                            className={'mb-3'}
                            control={<Checkbox onChange={(event) => setPhoneHasChanged(event.target.checked)}
                                               checked={phoneHasChanged}/>}
                            label="Изменился номер телефона"/>
                    </FormGroup>

                    {familyHasChanged ?
                        <TextField value={familyValue} className={'mb-3'} id="outlined-basic"
                                   onChange={(event) => setFamilyValue(event.target.value)} label="Новая фамилия"
                                   variant="outlined"/>
                        : null}
                    {phoneHasChanged ?
                        <TextField value={phoneValue} className={'mb-3'} id="outlined-basic"
                                   onChange={(event) => setPhoneValue(event.target.value)} label="Новый номер"
                                   variant="outlined"/>
                        : null}
                    <DatePicker value={visitDate} format={'DD.MM.YYYY'} label="Дата явки"
                                onChange={(newValue) => setVisitDate(newValue)}
                                className={'mb-3'}/>
                    <DatePicker value={nextVisitDate} format={'DD.MM.YYYY'} label="Дата слудующей явки"
                                onChange={(newValue) => setNextVisitDate(newValue)}
                                className={'mb-3'}/>

                    <TextField className={'mb-3'} id="outlined-basic"
                               onChange={(event) => setPregnancyPeriod(event.target.value)} label="Срок Беременности"
                               variant="outlined"/>
                    <TextField className={'mb-3'} id="outlined-basic"
                               onChange={(event) => setBodyWeight(event.target.value)} label="Текущий вес"
                               variant="outlined"/>

                    <Button onClick={createVisit}>Добавить прием</Button>
                </Stack>

                <Box>
                    {data?.visits.map(renderRow)}
                </Box>
            </Stack>
        </Paper>
    </LocalizationProvider>
}

export default Patient;
