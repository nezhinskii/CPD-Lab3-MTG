import { React, useRef } from 'react';
import { useDeckContext } from '../../providers/deckProvider';
import renderColorStats from './colorStats';
import renderManaCostStats from './manaCostStats';

function Stats() {
  const { deck } = useDeckContext();
  const colorStatsRef = useRef(null);
  const manaCostStatsRef = useRef(null);

  renderColorStats(deck, colorStatsRef.current);
  renderManaCostStats(deck, manaCostStatsRef.current);

  return (
    <div id="stats">
      <h2>Stats</h2>
      <div className="widgets">
        <div ref={manaCostStatsRef} id="manaStats"></div>
        <div ref={colorStatsRef} id="colorStats"></div>
      </div>
    </div>
  );
}

export default Stats;