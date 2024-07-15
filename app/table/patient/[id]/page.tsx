
import Header from '@/components/header';
import prisma from "@/prisma/prisma";
import useSWR from 'swr'
import Table from "@/app/components/table";
import {Button} from "@mui/material";
import { AppRegistry, StyleSheet, Text, View } from 'react-native';



export default function TablePage() {



    return (
        <>
            <Header />
            <section className='bg-ct-sky-200 min-h-screen mt-8'>
                <View>

                </View>
                <div
                    className='flex flex-row max-w-6xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] space-between'>
                    <Button>
                        Добавить прием
                    </Button>
                    <Button>
                        Добавить прием
                    </Button>
                </div>

            </section>
        </>
);
}
