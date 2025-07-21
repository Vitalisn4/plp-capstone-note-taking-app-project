import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { LinkIcon, Check } from "lucide-react";
import toast from "react-hot-toast";

const ShareModal = ({ isOpen, onClose, shareableLink }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        {/* ... (Modal backdrop styling from ConfirmationModal can be reused here) ... */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white flex items-center"
                >
                  <LinkIcon className="mr-2" />
                  Share this Note
                </Dialog.Title>
                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-2">
                    Anyone with this link can view this note. Be mindful of what
                    you share.
                  </p>
                  <div className="flex items-center space-x-2 p-2 bg-gray-900 rounded-lg">
                    <input
                      type="text"
                      readOnly
                      value={shareableLink}
                      className="bg-transparent text-gray-300 w-full focus:outline-none"
                    />
                    <button
                      onClick={handleCopy}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        copied
                          ? "bg-green-600"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {copied ? <Check size={16} /> : "Copy"}
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600"
                  >
                    Done
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShareModal;
