import React, { useState } from "react";
import ReaderSVG from "../../CardUsageSVG/ReaderSVG";
import ChipCardSVG from "../../CardUsageSVG/ChipCardSVG";

const CardUsageMain = () => {
    const [cardRead, setCardRead] = useState(false);
    const [actionStage, setActionStage] = useState(null);

    const handleCardRead = () => {
        setCardRead(true);
        setActionStage("confirmed");
        console.log("Карта прочитана!");
    };

    return (
        <main className="aam_card-usage-main">
            <ReaderSVG cardRead={cardRead} />
            <ChipCardSVG onCardRead={handleCardRead} />
            {cardRead && <p>Карта успешно прочитана!</p>}
        </main>
    );
};

export default CardUsageMain;