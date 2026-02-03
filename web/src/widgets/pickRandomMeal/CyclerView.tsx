import { sharedOptions, setSharedLandedMeal, cycleTargetRoute } from './state';
import { CommonCyclerView } from '../../components/CommonCyclerView';

export function CyclerView() {
  return (
    <CommonCyclerView
      options={sharedOptions}
      onLand={setSharedLandedMeal}
      targetRoute={cycleTargetRoute}
    />
  );
}
