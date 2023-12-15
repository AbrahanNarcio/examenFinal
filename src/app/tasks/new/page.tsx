"use client"
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react'

function FormPage() {
    const { data: session } = useSession();

    const [newTask, setNewTask] = useState({
        nombre: "",
        lugar: "",
        lat: "",
        lon: "",
        organizador: "",
        imagen: "",
        fecha_inicio: "",
    });

    const router = useRouter();
    const params = useParams();

    const getTask = async () => {
        const res = await fetch(`/api/tasks/${params.id}`);
        const data = await res.json();
        console.log(data);
        setNewTask({
            nombre: data.nombre,
            lugar: data.lugar,
            lat: data.lat,
            lon: data.lon,
            organizador: data.organizador,
            imagen: data.imagen,
            fecha_inicio: data.fecha_inicio,
        })
    }

    const createTask = async () => {
        try {
            const res = await fetch('/api/tasks', {
                method: "POST",
                body: JSON.stringify(newTask),
                headers: {
                    "Content-Type": "application/json"
                },
            })
            if (res.status == 200) {
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateTask = async () => {
        const res = await fetch(`/api/tasks/${params.id}`, {
            method: "PUT",
            body: JSON.stringify(newTask),
            headers: {
                "Content-Type": "application/json",
            }
        });
        // const data = await res.json()
        // console.log(data)
        router.push('/');
        router.refresh();
    }

    const handleDelete = async () => {
        if (window.confirm("¿Seguro que quieres eliminar el evento?")) {
            const res = await fetch(`/api/tasks/${params.id}`, {
                method: "DELETE",
            });
            router.push('/');
            router.refresh();
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!params.id) {
            await createTask();
        } else {
            updateTask();
        }
        //await createTask();
    }

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setNewTask({ ...newTask, [e.target.name]: e.target.value });

    useEffect(() => {
        console.log(params)
        if (params.id) {
            getTask();
        }
    }, [])

    return (
        
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <form onSubmit={handleSubmit}>
                <header className='flex justify-between'>
                    <h1 className="font-bold text-3xl">
                        {
                            !params.id ? "Crear Evento" : "Actualizar Evento"
                        }
                    </h1>

                    <button
                        type="button"
                        className="bg-red-500 px-3 px-1 rounded-md"
                        onClick={handleDelete}
                    >
                        Eliminar Evento
                    </button>
                </header>

                <input type="text" name="nombre" placeholder="Nombre Evento"
                    className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
                    onChange={handleChange}
                    value={newTask.nombre}
                />
                <textarea name="lugar" rows={3} placeholder="Lugar Evento"
                    className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
                    onChange={handleChange}
                    value={newTask.lugar}
                ></textarea>
                <input type="text" name="fecha_inicio" placeholder="Fecha Inicio Evento (aaaa-MM-dd HH:mm:ss)"
                    className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
                    onChange={handleChange}
                    value={newTask.fecha_inicio}
                />
                <input type="hidden" name="lat" placeholder=""
                    className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
                    onChange={handleChange}
                    value={newTask.lat}
                />
                <input type="hidden" name="lon" placeholder=""
                    className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
                    onChange={handleChange}
                    value={newTask.lon}
                />
                <input type="hidden" name="organizador" placeholder=""
                    className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
                    onChange={handleChange}
                    value={newTask.organizador}
                />
                <input type="hidden" name="" placeholder=""
                    className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
                    onChange={handleChange}
                    value={newTask.imagen}
                />
                <button 
                    type="submit"
                    className="bg-green-600 hover::bg-green-700 text-white font-bold px-4 py-2 rounded-lg"
                >
                    Guardar
                </button>
            </form>
        </div>
    )
}

export default FormPage