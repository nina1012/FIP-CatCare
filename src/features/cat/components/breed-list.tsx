import { FixedSizeList as List } from 'react-window';

import { SelectItem } from '@/components/ui/form/select';

// using this approach since the BREEDS array is quite large and I experienced some performance issues when rendering each breed all at once which was unefficient
export const BreedList = ({ breeds }: { breeds: string[] }) => (
  <List height={200} itemCount={breeds.length} itemSize={35} width="100%">
    {({ index, style }) => (
      <div style={style}>
        <SelectItem
          key={breeds[index]}
          value={breeds[index]}
          id={`breed-${index}`}
        >
          {breeds[index]}
        </SelectItem>
      </div>
    )}
  </List>
);
