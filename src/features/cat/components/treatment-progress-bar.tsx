import clsx from 'clsx';
import { Star } from 'lucide-react';
import React, { useState } from 'react';

import { Progress } from '@/components/ui/common/progress';

type TreatmentProgressBarProps = {
  progress: number;
};

export const TreatmentProgressBar = ({
  progress,
}: TreatmentProgressBarProps) => {
  const [p, setP] = useState<number>(0);
  React.useEffect(() => {
    const timer = setTimeout(() => setP(progress), 300);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="flex items-center gap-4 py-2">
      <Progress value={p} className="w-4/5" />
      <Star
        className={`${clsx('stroke-primary', p === 100 ? 'fill-[#dfb028]' : 'fill-white')}`}
      />
    </div>
  );
};
