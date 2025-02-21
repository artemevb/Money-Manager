"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CloseEyes from "@/public/svg/NotEyes.svg";
import Eyes from "@/public/svg/eyes.svg";
import Pen from "@/public/svg/pen.svg";
import arrowBack from "@/public/svg/clients/arrow_back.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userUtils } from "@/src/app/utils/user.utils";
import toast from "react-hot-toast";

const ProfileSettings: React.FC = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loginVisible, setLoginVisible] = useState(false);
    const router = useRouter();
    const queryClient = useQueryClient()
    const {data:userData} = useQuery({
        queryKey: ['user'],
        queryFn: userUtils.getUserAccaunt
    })
    console.log(userData?.data, 'log');
    const [firstName, setFirstName]= useState(userData?.data?.firstName)
    const [lastName, setLastName]= useState(userData?.data?.lastName)
    const [fatherName, setFatherName]= useState(userData?.data?.fatherName)
    const [login, setLogin] = useState({login:'', oldLogin:''})
    const [password, setPassword] = useState({password:'', oldPassword:''})
    useEffect(() => {
        if (userData?.data?.firstName) {
            setFirstName(userData.data.firstName);
            setLastName(userData?.data?.lastName)
            setFatherName(userData?.data?.fatherName)
        }
    }, [userData])
    const editUser = useMutation({
        mutationFn: userUtils.editUserAccaunt,
        onSuccess: () => {
            toast.success('Succes edit user ')
            queryClient.invalidateQueries({queryKey: ['user']})
        },
        onError: (err) => {
            console.log(err);
            toast.error("Something went wrong")
        }
    })

    const handleUserEdit = () => {
        editUser.mutate({
            firstName: firstName,
            lastName:lastName,
            fatherName: fatherName,
            oldLogin: login.oldLogin,
            oldPassword: password.oldPassword,
            newLogin: login.login,
            newPassword:password.password
        })
        console.log(editUser.variables);
        
    }
    
    if(!userData?.data) return 'Loading...'
    return (
        <div className="max-w-md mx-auto px-4 py-[28px]">
            {/* Назад */}
            <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-500 text-sm mb-[21px]">
                <Image src={arrowBack} alt="Назад" width={20} height={20} className="mr-2" />
                Назад
            </button>

            {/* Мой профиль */}
            <h2 className="text-xl font-bold mb-[20px]">Мой профиль</h2>
            <div className="space-y-2">                
                    <label className="flex relative justify-between items-center">
                        <input type="text" defaultValue={firstName?firstName:''} onChange={(e) => setFirstName(e.target.value)} className="text-gray-700 bg-[#F5F2FF] rounded-md p-3 w-full h-full outline-none border"/>                        
                        <button className="text-gray-400 absolute top-3 right-2 hover:text-gray-600">
                            <Image src={Pen} alt="Редактировать" width={20} height={20} />
                        </button>                    
                    </label>
                    <label className="flex relative justify-between items-center">
                        <input type="text" defaultValue={lastName?lastName:''} onChange={(e) => setLastName(e.target.value)} className="text-gray-700 bg-[#F5F2FF] rounded-md p-3 w-full h-full outline-none border"/>                        
                        <button className="text-gray-400 absolute top-3 right-2 hover:text-gray-600">
                            <Image src={Pen} alt="Редактировать" width={20} height={20} />
                        </button>                    
                    </label>
                    <label className="flex relative justify-between items-center">
                        <input type="text" defaultValue={fatherName?fatherName:''} onChange={(e) => setFatherName(e.target.value)} className="text-gray-700 bg-[#F5F2FF] rounded-md p-3 w-full h-full outline-none border"/>                        
                        <button className="text-gray-400 absolute top-3 right-2 hover:text-gray-600">
                            <Image src={Pen} alt="Редактировать" width={20} height={20} />
                        </button>                    
                    </label>
            </div>

            {/* Изменить пароль */}
            <h2 className="text-lg font-semibold mt-10 mb-5">Изменить пароль</h2>
            <div className="space-y-2">            
                    <div className="relative">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Старый пароль"
                            onChange={(e) => setPassword({password: password.password, oldPassword:e.target.value})}
                            className="w-full bg-[#F5F2FF] p-3 rounded-md focus:outline-none"
                        />
                        <button
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute right-3 top-3"
                        >
                            <Image
                                src={passwordVisible ? Eyes : CloseEyes}
                                alt="Показать/Скрыть"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Новый пароль"
                            onChange={(e) => setPassword({password: e.target.value, oldPassword:password.password})}
                            className="w-full bg-[#F5F2FF] p-3 rounded-md focus:outline-none"
                        />
                        <button
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute right-3 top-3"
                        >
                            <Image
                                src={passwordVisible ? Eyes : CloseEyes}
                                alt="Показать/Скрыть"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>
        
            </div>

            {/* Изменить логин */}
            <h2 className="text-lg font-semibold mt-10 mb-5">Изменить логин</h2>
            <div className="space-y-2">
                
                    <div className="relative">
                        <input
                            type={loginVisible ? "text" : "password"}
                            placeholder="Старый логин"
                            onChange={(e) => setLogin({login:login.login, oldLogin:e.target.value})}
                            className="w-full bg-[#F5F2FF] p-3 rounded-md focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setLoginVisible(!loginVisible)}
                            className="absolute right-3 top-3"
                        >
                            <Image
                                src={loginVisible ? Eyes : CloseEyes}
                                alt="Показать/Скрыть"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            type={loginVisible ? "text" : "password"}
                            placeholder="Новый логин"
                            onChange={(e) => setLogin({login:e.target.value, oldLogin:login.oldLogin})}
                            className="w-full bg-[#F5F2FF] p-3 rounded-md focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setLoginVisible(!loginVisible)}
                            className="absolute right-3 top-3"
                        >
                            <Image
                                src={loginVisible ? Eyes : CloseEyes}
                                alt="Показать/Скрыть"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>
            
            </div>

            {/* Кнопка сохранения */}
            <button type="button" onClick={handleUserEdit} className="w-full bg-[#7E49FF] text-white py-3 px-[16px] mt-10 rounded-md text-[16px] font-bold hover:bg-purple-600 transition">
                Сохранить все
            </button>
        </div>
    );
};

export default ProfileSettings;
