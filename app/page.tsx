import Header from '@/components/header';

export default function Home() {
    const patients = 16
  return (
    <>
      <Header />
      <section className='bg-ct-sky-200 min-h-screen mt-8'>
          <div
              className='p-16 columns-4 max-w-6xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center'>

              <p className=' font-semibold'>
                  Всего пациентов в базе {patients}
              </p>

          </div>
      </section>
    </>
  );
}
