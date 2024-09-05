import { Badge, BadgeProps } from '@/components/ui/common/badge';

interface BadgesProps extends BadgeProps {
  isPendingTreatment: boolean;
}

export const Badges = ({ isPendingTreatment }: BadgesProps) => {
  return (
    <div className="pointer-events-none my-4 flex justify-center gap-4 *:text-[10px]">
      {isPendingTreatment ? (
        <>
          <Badge>Pending Treatment</Badge>
          <Badge>Cat Patient</Badge>
        </>
      ) : (
        <Badge>No treatment</Badge>
      )}
      <Badge>Cat 🐈‍⬛</Badge>
    </div>
  );
};
