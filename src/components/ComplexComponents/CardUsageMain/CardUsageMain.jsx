import React, { useState } from 'react';
import ReaderSVG from '../../CardUsageSVG/ReaderSVG';
import ChipCardSVG from '../../CardUsageSVG/ChipCardSVG';

function CardUsageMain() {
  const [cardRead, setCardRead] = useState(false);
  // Убрано объвление неиспользуемого actionStage
  // const [actionStage, setActionStage] = useState(null);

  const handleCardRead = () => {
    setCardRead(true);
    // Убран вызов неиспользуемого setActionStage
    // setActionStage('confirmed');
  };

  return (
    <main className="aam_card-usage-main">
      <ReaderSVG cardRead={cardRead} />
      <ChipCardSVG onCardRead={handleCardRead} />
      {cardRead && <p>Карта успешно прочитана!</p>}
    </main>
  );
}

export default CardUsageMain;
