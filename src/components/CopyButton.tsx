import React, { useState } from "react";
import "./CopyButton.css";

const CopyButton: React.FC<{ value: string; label?: string }> = ({ value, label }) => {
    const [showPopup, setShowPopup] = useState(false);

    // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(value);

            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div>
            <button onClick={copyToClipboard}>{label || value}</button>
            {showPopup && <div className="popup">Copied!</div>}
        </div>
    );
};

export default CopyButton;
