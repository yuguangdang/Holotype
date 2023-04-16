import { ProgressBar, MD3Colors } from 'react-native-paper';
import Colors from '../../constants/Colors';

function VoteBar({vote}) {
  return (
    <ProgressBar progress={vote/10} color={Colors.accent400} />
  )
}

export default VoteBar