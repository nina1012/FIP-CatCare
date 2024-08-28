/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FixedSizeList as List } from 'react-window';

import { BREEDS } from '../types/breeds';

type BreedListProps = {
  onSelect: (breed: string) => void;
};

export const BreedList = ({ onSelect }: BreedListProps) => {
  return (
    <List height={200} itemCount={BREEDS.length} itemSize={35} width="100%">
      {({ index, style }) => (
        <div
          style={style}
          className="text-inherit hover:cursor-pointer"
          onClick={() => onSelect(BREEDS[index])}
          key={index}
        >
          {BREEDS[index]}
        </div>
      )}
    </List>
  );
};
