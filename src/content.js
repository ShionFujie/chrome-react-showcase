import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import "./css/content.css";
import usePort from "./hooks/chrome/usePort";
import useDocumentKeydown from "./hooks/useDocumentKeydown";
import useSwitch from "./hooks/useSwitch";

function Main () {
    const port = usePort('chrome-react-showcase')
    const [modalIsOpen, openModal, closeModal] = useSwitch()
    useEffect(() => {
        Modal.setAppElement('body')
    })
    useDocumentKeydown(({code, ctrlKey, altKey, metaKey}) => {
        if (ctrlKey && altKey && metaKey && code == "KeyM")
            port.postMessage({message: 'Hello, backgroundJs! -- from contentJs'})
    })
    return (
        <div className={'my-extension'}>
            <h1>Hello world - My first Extension</h1>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <p>Hello, SHION!</p>
            </Modal>
        </div>
    )
}

const app = document.createElement('div');
app.id = "my-extension-root";
document.body.appendChild(app);
ReactDOM.render(<Main />, app);