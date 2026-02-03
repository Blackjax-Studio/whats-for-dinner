import { sharedOptions, setSharedLandedRestaurant, cycleTargetRoute } from './state';
import { CommonCyclerView } from '../../components/CommonCyclerView';

export function CyclerView() {
  return (
    <CommonCyclerView
      options={sharedOptions}
      onLand={setSharedLandedRestaurant}
      targetRoute={cycleTargetRoute}
    />
  );
}
