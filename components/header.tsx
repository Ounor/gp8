import { auth, signOut } from '@/auth';
import Link from 'next/link';

const Header = async () => {
  const session = await auth();
  const user = session?.user;

  const logoutAction = async () => {
    'use server';
    await signOut();
  };

  return (
    <header className='bg-white h-20'>
      <nav className='h-full flex justify-between container items-center'>
        <div>
          <Link href='/' className='text-ct-dark-600 text-2xl font-semibold'>
            ГП8
          </Link>
        </div>
        <ul className='flex items-center space-x-4'>
          <li>
            <Link href='/' className='text-ct-dark-600'>
              Главная
            </Link>
          </li>
          {!user && (
            <>
              <li>
                <Link href='/register' className='text-ct-dark-600'>
                  Регистрация
                </Link>
              </li>
              <li>
                <Link href='/login' className='text-ct-dark-600'>
                  Вход
                </Link>
              </li>
            </>
          )}
          {user && (
              <>
                <li>
                  <Link href='/profile' className='text-ct-dark-600'>
                    Профиль
                  </Link>
                </li>
                <li className='ml-4'>
                  <Link href='/table' className='text-ct-dark-600'>
                    Таблица пациентов
                  </Link>
                </li>
                <form action={logoutAction} className='flex'>
                  <li className='ml-4'>
                    <button>Выход</button>
                  </li>
                </form>
              </>

          )}
        </ul>
      </nav>
    </header>
  )
      ;
};

export default Header;
