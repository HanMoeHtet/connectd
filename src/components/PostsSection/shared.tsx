import {
  Favorite,
  SentimentDissatisfied,
  SentimentVerySatisfied,
  ThumbUp,
  Public,
  Lock,
  People,
} from '@material-ui/icons';

import { ReactionType, Privacy } from 'src/types/post';

export const reactionIcons = new Map([
  [ReactionType.LIKE, { Icon: ThumbUp, color: '#0b86ee' }],
  [ReactionType.FAVORITE, { Icon: Favorite, color: '#ef4561' }],
  [ReactionType.SATISFIED, { Icon: SentimentVerySatisfied, color: '#fbcd58' }],
  [
    ReactionType.DISSATISFIED,
    { Icon: SentimentDissatisfied, color: '#f07611' },
  ],
]);

export const privacyIcons = new Map([
  [Privacy.PUBLIC, { Icon: Public }],
  [Privacy.FRIENDS, { Icon: People }],
  [Privacy.ONLY_ME, { Icon: Lock }],
]);
