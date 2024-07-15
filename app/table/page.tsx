
import Header from '@/components/header';
import prisma from "@/prisma/prisma";
import useSWR from 'swr'
import Table from "@/app/components/table";



export default function PatientPage() {



    return (
        <>
            <Header />
            <section className='bg-ct-sky-200 min-h-screen mt-8'>
                <Table/>
            </section>
        </>
    );
}
