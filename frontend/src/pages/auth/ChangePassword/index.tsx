export const ChangePassword = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
                <h2 className="text-2xl font-bold text-center text-gray-700">Alterar Senha</h2>
                <p className="text-center text-gray-600">Digite sua nova senha abaixo.</p>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-600">Nova Senha</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="********"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600">Confirmar Nova Senha</label>
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
                        Alterar Senha
                    </button>
                </form>
                <p className="text-center text-gray-600">
                    Lembrou sua senha? <a href="#" className="text-blue-600 hover:underline">Faça login</a>
                </p>
            </div>
        </div>
    )
}