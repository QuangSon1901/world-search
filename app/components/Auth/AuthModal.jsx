import Login from './Login';
import Register from './Register';

const AuthModal = ({ authActive, close, setAuthActive }) => {
    return (
        <div className="fixed inset-0 z-[999999]">
            <div className="w-full h-full bg-bg-overlay flex items-center justify-center">
                <div className="relative bg-white rounded-lg shadow p-10">
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-medium">
                            {authActive.type === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                        </span>
                        <button className="p-2 hover:bg-bg-second rounded-lg" onClick={close}>
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="py-6">
                        {authActive.type === 'login' ? (
                            <Login setAuthActive={setAuthActive} close={close} />
                        ) : (
                            <Register setAuthActive={setAuthActive} close={close} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
