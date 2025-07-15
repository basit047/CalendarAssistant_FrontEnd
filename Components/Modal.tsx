import "./Components/modal.css"

interface ModelProp {
  isOpen: boolean;
  onClose: any;
  title: string | null;
  children: any;
}

const Modal = (prop: ModelProp) => {
  if (!prop.isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4 z-50">
      <div
        id="modal-backdrop"
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        onClick={prop.onClose}
      ></div>

      <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-2xl w-full z-10">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg
                className="h-6 w-6 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="mt-1 sm:mt-0 sm:ml-4 text-left w-full">
              <h1
                id="modal-title"
                className="text-3xl font-extrabold text-blue-600 underline mb-4"
              >
                {prop.title}
              </h1>
              <div className="mt-4 w-full" id="modal-content">
                {prop.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
