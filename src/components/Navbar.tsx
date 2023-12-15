/* eslint-disable @next/next/no-img-element */
"use client"

import Link from "next/link"
import { signIn, useSession, signOut } from 'next-auth/react'

function Navbar() {

    const { data: session } = useSession();
    console.log(session);

    return (
        <nav className='bg-slate-900 flex items-center py-3 justify-between px-24 text-white'>
            <Link href="/">
                <h1>
                    Eventual
                </h1>
            </Link>

            <Link href="/mapa">
                <h1>
                    Mapa
                </h1>
            </Link>

            <Link href="/tasks/new">
                <h1>
                    Crear Evento
                </h1>
            </Link>

            {session?.user ? (
                <div className='flex gap-x-2 items-center'>
                    <Link href="/dashboard">
                        Dashboard
                    </Link>
                    <p>{session.user.name} {session.user.email}</p>
                    <img
                        src={session.user.image}
                        alt=""
                        className='w-10 h-10 rounded-full cursor-pointer'
                    />
                    <button onClick={async () => { await signOut({ callbackUrl: "/", }) }} className='bg-red-400 px-3 py-2 rounded'>
                        Cerrar Sesion
                    </button>
                </div>
            ) : (
                <button onClick={() => signIn()} className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
                    Iniciar Sesion
                </button>
            )}


        </nav>
    )
}
export default Navbar