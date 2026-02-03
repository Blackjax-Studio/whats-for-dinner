import { sharedOptions, setSharedLandedRecipe, cycleTargetRoute } from './state';
import { CommonCyclerView } from '../../components/CommonCyclerView';

export function CyclerView() {
  return (
    <CommonCyclerView
      options={sharedOptions}
      onLand={setSharedLandedRecipe}
      targetRoute={cycleTargetRoute}
    />
  );
}
