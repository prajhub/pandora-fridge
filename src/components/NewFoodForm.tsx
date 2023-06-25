import {useSession} from "next-auth/react";

import Image from "next/image";
import toast, {Toaster} from 'react-hot-toast'

import {useForm, SubmitHandler} from 'react-hook-form'
import {api} from "~/utils/api";


export function NewFoodForm() {


    const session = useSession()


    if (session.status !== "authenticated") 
        return null;
    

    return <Form/>


}


function Form() {

    interface FoodFormData {
        name: string;
        expiresIn: string;
      }

    const notify = () => toast.success('New food added in the fridge.');

    const form = useForm<FoodFormData>()

    const {register, handleSubmit, formState} = form
    const {errors} = formState


    const createFood = api.food.create.useMutation({
        onSuccess: newFood => {
            console.log(newFood)
            notify()
        }
    })

    const {data: sessionData} = useSession()


    const foodSubmit: SubmitHandler<FoodFormData> = (data) => {

        const formattedData = {
            name: data.name,
            expiresIn: parseInt(data.expiresIn, 10), 
        }


        createFood.mutate(formattedData)
    }


    return (
        <>
            <div className=" max-w-2xl w-full mx-auto">
                <div className="flex items-center  flex-col mt-4 gap-4">
                    <h1 className="text-5xl font-bold">Hey there, {
                        sessionData ?. user.name ? sessionData ?. user.name : "Buddy"
                    }</h1>
                    <div className="flex flex-row gap-2 items-center">
                        <Image src='/sunshine.png' alt="sunshine"
                            width={30}
                            height={30}/>
                        <span className="text-lg font-semibold tracking-wide">Its better to go shopping before this friday</span>

                    </div>

                    <section className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">


                        <form onSubmit={
                                handleSubmit(foodSubmit)
                            }
                            className="space-y-6">
                            <Toaster/>

                            <div>
                                <label htmlFor="name" className="flex items-center gap-3  text-md font-semibold leading-6 text-gray-900">
                                    <Image src='/cabbage.png' alt="sunshine"
                                        width={25}
                                        height={25}/>
                                    Food name
                                </label>
                                <div className="mt-2">
                                    <input id="name" type="text" pattern="[A-Za-z]+" {...register("name", {
                                                            required: "Inser food you want to store.",
                                                            pattern: {
                                                              value: /^[A-Za-z]+$/i,
                                                              message: "Food name should only contain letters."
                                                            }
                                                          })} className="block w-full rounded-md border-0 py-2.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> {
                                    errors.name && (
                                        <span className="text-red-500 mt-2">
                                            {
                                            errors.name.message ?. toString()
                                        } </span>
                                    )
                                } </div>
                            </div>


                            <div>
                                <label htmlFor="expireTime" className="flex items-center gap-3  text-md font-semibold leading-6 text-gray-900">
                                    <Image src='/expiresin.png' alt="sunshine"
                                        width={25}
                                        height={25}/>
                                    Expire in (Sec)
                                </label>
                                <div className="mt-2">
                                    <input id="expiresIn" type="number" placeholder="Eg: 500" {...register("expiresIn", {
                                                            required: "Enter a valid time.",
                                                            pattern: {
                                                              value: /^[0-9]+$/i,
                                                              message: "Only numbers are allowed."
                                                            }
                                        
                                                          })} className="block w-full rounded-md border-0 py-2.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> {
                                    errors.expiresIn && (
                                        <span className="text-red-500">
                                            {
                                            errors.expiresIn.message ?. toString()
                                        } </span>
                                    )
                                } </div>
                            </div>


                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Add to fridge
                            </button>


                        </form>
                    </section>
                    <span className="text-xs text-gray-600 tracking-wide">We dont want more than one peice of the same food in our fridge</span>
                </div>
            </div>
        </>
    )
}
