import { Avatar } from '@radix-ui/react-avatar';
import { PawPrint } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { AvatarFallback, AvatarImage } from '@/components/ui/common/avatar';
import { Badge } from '@/components/ui/common/badge';
import { Spinner } from '@/components/ui/common/spinner';
import { useCatData } from '@/features/cat/api/get-cat-data';
import { EditCatDialog } from '@/features/cat/components/edit-cat-dialog';

export const CatDetailsRoute = () => {
  const { catID } = useParams();
  const { catData, isLoadingCatData, catDataError } = useCatData(
    catID as string,
  );

  if (isLoadingCatData) {
    return (
      <div className="container">
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (catDataError) {
    return (
      <div className="container">
        <div className="flex h-96 items-center justify-center">
          <h4>Error has occured while fetching the cat&apos;s data</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* avatar / cat's image */}
      <div className="">
        <Avatar>
          <AvatarImage
            className="mx-auto size-28 rounded-full border-2"
            src={catData?.cat_image_url as string}
          />
          <AvatarFallback className="mx-auto flex size-28 gap-1  text-xs font-semibold">
            {catData?.name} <PawPrint size={12} />
          </AvatarFallback>
        </Avatar>
        <h4 className="text-center text-2xl font-bold">{catData?.name}</h4>
      </div>

      {/* Badges, for now there are hardcoded badges */}
      {/* badges will depend on cat's current status */}
      <div className="pointer-events-none my-4 flex justify-center gap-4 *:text-[10px]">
        <Badge>TRIAL</Badge>
        <Badge>Compliant</Badge>
        <Badge>Pending Treatment</Badge>
      </div>
      {/* here will go cards that will be clickable and by clicking the card, it should open up the dialog for editing the information */}
      <div
        className="my-4 grid grid-rows-[192px,192px,192px]
      gap-4 md:grid-cols-[minmax(0,275.5px),minmax(0,275.5px),minmax(0,275.5px)] md:grid-rows-[192px]"
      >
        <EditCatDialog cat={catData} />
        <EditCatDialog cat={catData} />
        <EditCatDialog cat={catData} />
      </div>
    </div>
  );
};
