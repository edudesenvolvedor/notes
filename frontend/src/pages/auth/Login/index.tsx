export const Login = () => {
    return (
        <div className="flex min-h-screen justify-end bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg h-screen flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-center text-gray-700">Faça Login</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-600">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="seu@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Senha</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="********"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                    >
                        Entrar
                    </button>
                </form>
                <p className="text-center text-gray-600">
                    Não tem uma conta? <a href="#" className="text-blue-600 hover:underline">Cadastre-se</a>
                </p>
            </div>
        </div>
    );
}