import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TerminalSignature from "../../TerminalSignature/TerminalSignature";
import '../../../styles/components/ComplexComponents/SecretPortal.scss';
import CanvasPill from "../../CanvasPill/CanvasPill";

const SecretPortal = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const goTo = (path) => {
        navigate(path);
        closeModal();
    }

    return (
        <>
            <div className="aam_secret-portal-button" onClick={openModal}>
                <TerminalSignature
                    text={`KNOCK, KNOCK, NEO!\nCHOOSE YOUR PILL!`}
                    hiddenUntilHover={true}
                />
            </div>

            {isModalOpen && (
                <div className="aam_secret-modal-overlay" onClick={closeModal}>
                    <div className="aam_secret-modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Выбери свой путь</h2>
                        <div className="aam_secret-modal--buttons">
                            <button className="aam_red-pill" onClick={() => goTo('/administrator')}>
                                <CanvasPill color="red" pulseSpeed={0.01} phase={0} />
                                <span>Админка</span>
                            </button>
                            <button className="aam_blue-pill" onClick={() => goTo('/log-book-login')}>
                                <CanvasPill color="blue" pulseSpeed={0.01} phase={0.5} />
                                <span>Журнал</span>
                            </button>
                        </div>
                        <button className="aam_close-button" onClick={closeModal}>✖</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default SecretPortal;