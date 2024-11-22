// @ts-ignore
import logo from '../assets/images/logo.png'

const Header = () => {
    return (
        <header className="flex items-center p-4  text-white  shadow-md justify-center relative">
            <div className="absolute left-6">
                <img src={logo} alt="Logo" className="h-8 w-auto"/>
            </div>

            <div className="w-1/3 mx-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
            </div>
        </header>
    )
}

export default Header;

