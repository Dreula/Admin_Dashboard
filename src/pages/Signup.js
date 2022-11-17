import { useState } from "react"
import { Link } from "react-router-dom"
import { useSignup } from '../hook/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordShown, setPasswordShown] = useState(false);
    const {signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    // show or hide password input
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    return(
        <section className="h-full gradient-form bg-white md:h-screen dark:bg-[#484B52]">
            <div className="container py-12 px-6 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                <div className="xl:w-10/12">
                    <div className="block bg-white shadow-2xl rounded-lg">
                    <div className="lg:flex lg:flex-wrap g-0">
                        <div className="lg:w-6/12 px-4 md:px-0">
                        <div className="md:p-12 md:mx-6">
                            <div className="text-left text-2xl font-bold">
                            <span className="text-green-600">Brgy.Manuyo</span>Uno
                            </div>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <span className='mt-4 font-semibold block'>Create new account</span>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            id="email" 
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                            placeholder="manuyouno@email.com" 
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Create Password</label>
                                        <input 
                                            type={passwordShown ? "text" : "password"}
                                            name="password" 
                                            id="password" 
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 reen-500" 
                                            placeholder="••••••••"
                                            required 
                                            />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input 
                                                    id="remember" 
                                                    aria-describedby="remember" 
                                                    type="checkbox"
                                                    onClick={togglePassword} 
                                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                                                    />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="remember" className="text-gray-500">Show Password</label>
                                            </div>
                                        </div>
                                    </div>
                                    <button disabled={isLoading} type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                        Create Account
                                    </button>
                                    {error && <div className="mx-auto text-red-600 bg-red-100 p-2 text-center rounded-md w-60 my-4">{error}</div>}
                                    <p className="text-sm font-light text-gray-500 ">
                                        Already have an account? &nbsp;
                                        <Link to='/login' className="font-medium text-green-600 hover:underline">Login</Link>
                                    </p>
                            </form>
                        </div>
                        </div>

                        <div
                        className="lg:w-6/12 flex items-center bg-green-300 lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                        >
                        <div className="text-gray-700 px-4 py-6 md:p-12 md:mx-6 ">
                            <h4 className="text-3xl font-semibold mb-6">Refuse what you do not need;</h4>
                            <p className="text-meduim text-gray-700">
                            Reduce what you do need;
                             reuse what you consume; 
                             recycle what you cannot refuse, 
                             reduce, or reuse; and rot (compost) the rest."
                            <br/> <br/>
                               - Bea Johson
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default Signup