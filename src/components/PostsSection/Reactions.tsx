import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  ClickAwayListener,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  SvgIcon,
  Tab,
  Tabs,
} from '@material-ui/core';
import {
  Close,
  Favorite,
  PersonAdd,
  SentimentDissatisfied,
  SentimentVerySatisfied,
  ThumbUp,
} from '@material-ui/icons';
import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import avatarImg from 'src/assets/images/avatar2.png';
import { ModalContext } from 'src/composables/AppModal';
import { fetchReactionsInPost } from 'src/services/post';
import { BasicProfile } from 'src/types/lib';
import { ReactionType, UpdatedFieldsInPost } from 'src/types/post';
import { formatCount } from 'src/utils/helpers';
import { reactionIcons } from './shared';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  reactionType: ReactionType | 'ALL';
  postId: string;
  onUpdate: (postId: string, updatedFieldsInPost: UpdatedFieldsInPost) => void;
  counts: {
    [key in ReactionType]: number;
  };
}

function TabPanel(props: TabPanelProps) {
  const classes = useStyles();

  const { value, index, reactionType, postId, onUpdate, counts } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [reactions, setReactions] = useState<
    { _id: string; userId: string; type: ReactionType; user: BasicProfile }[]
  >([]);
  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    setIsLoading(true);
    const response = await fetchReactionsInPost({
      postId,
      reactionType,
      skip,
      limit,
    });
    const { reactions, post } = response.data.data;
    onUpdate(postId, post);
    setReactions((prev) => [...prev, ...reactions]);
    setSkip((prevSkip) => prevSkip + limit);
    setIsLoading(false);
  }, [limit, onUpdate, postId, skip, reactionType]);

  useEffect(() => {
    if (!isLoading) {
      const observer = new IntersectionObserver(
        async (entries) => {
          const firstEntry = entries[0];
          if (firstEntry.isIntersecting && !isLoading) {
            await loadMore();
          }
        },
        // FIXME: check if network is wifi or not and set the threshold accordingly
        { rootMargin: '200px' }
      );

      if (loadMoreRef.current) {
        observer.observe(loadMoreRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [isLoading, loadMore]);

  const hasMore = () => {
    let reactionCount;
    if (reactionType === 'ALL') {
      reactionCount = Object.values(counts).reduce(
        (prev, curr) => prev + curr,
        0
      );
    } else {
      reactionCount = counts[reactionType];
    }
    return reactions.length < reactionCount;
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <List
          style={{ overflowY: 'auto', height: '300px' }}
          disablePadding
          classes={{ root: classes.root }}
        >
          {reactions.map((reaction) => {
            const value = reactionIcons.get(reaction.type);
            return (
              <ListItem key={reaction._id}>
                <ListItemAvatar>
                  <Badge
                    badgeContent={
                      value && (
                        <value.Icon
                          style={{ fontSize: '1rem', color: value.color }}
                        />
                      )
                    }
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    classes={{
                      badge: classes.badge,
                    }}
                  >
                    <Avatar src={reaction.user.avatar}>
                      {reaction.user.username[0].toUpperCase()}
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText primary={reaction.user.username} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <PersonAdd />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
          {hasMore() && (
            <Box display="flex" justifyContent="center" overflow="hidden">
              <CircularProgress color="primary" ref={loadMoreRef} />
            </Box>
          )}
        </List>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,

    '&::-webkit-scrollbar': {
      display: 'block',
      width: 8,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
    },
  },

  badge: {
    right: 2,
    bottom: 4,
    padding: 0,
  },
}));

interface ReactionsProps {
  postId: string;
  counts: {
    [key in ReactionType]: number;
  };
  onUpdate: (postId: string, updatedFieldsInPost: UpdatedFieldsInPost) => void;
}

const Reactions: React.FC<ReactionsProps> = React.forwardRef(
  ({ postId, onUpdate, counts }) => {
    const { setContent } = useContext(ModalContext);

    const [openedTabIndex, setOpenedTabIndex] = useState(0);
    const [openedTabs, setOpenedTabs] = useState<Set<number>>(new Set([0]));

    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <ClickAwayListener onClickAway={() => setContent(null)}>
          <Card style={{ width: '512px' }}>
            <CardHeader
              style={{ textAlign: 'center', padding: '10px 5px' }}
              title="People who reacted"
              action={
                <IconButton aria-label="close" onClick={() => setContent(null)}>
                  <Close />
                </IconButton>
              }
            />
            <>
              <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Tabs
                  value={openedTabIndex}
                  onChange={(_, newValue) => {
                    setOpenedTabs((prev) => {
                      if (prev.has(newValue)) {
                        return prev;
                      }
                      return new Set([...Array.from(prev), newValue]);
                    });
                    setOpenedTabIndex(newValue);
                  }}
                  variant="fullWidth"
                  indicatorColor="primary"
                  textColor="primary"
                  aria-label="icon tabs example"
                >
                  {['ALL', ...Object.values(ReactionType)].map(
                    (reactionType, index) => {
                      let count;
                      if (reactionType === 'ALL') {
                        count = Object.values(counts).reduce(
                          (acc, curr) => acc + curr,
                          0
                        );
                      } else {
                        count = counts[reactionType as ReactionType];
                      }
                      const Icon = reactionIcons.get(
                        reactionType as ReactionType
                      )?.Icon;
                      return (
                        <Tab
                          style={{ minWidth: 'auto' }}
                          label={
                            !Icon && (
                              <Box display="flex">
                                <span style={{ marginRight: 10 }}>All</span>
                                <span>{formatCount(count)}</span>
                              </Box>
                            )
                          }
                          aria-label={reactionType}
                          icon={
                            Icon && (
                              <Box display="flex" justifyContent="space-around">
                                <Icon style={{ marginRight: 10 }} />
                                <span>{formatCount(count)}</span>
                              </Box>
                            )
                          }
                          value={index}
                        />
                      );
                    }
                  )}
                </Tabs>
              </CardContent>
              <CardContent>
                {['ALL', ...Object.values(ReactionType)].map(
                  (reactionType, index) =>
                    openedTabs.has(index) && (
                      <TabPanel
                        value={openedTabIndex}
                        index={index}
                        key={index}
                        reactionType={reactionType as ReactionType | 'ALL'}
                        postId={postId}
                        counts={counts}
                        onUpdate={onUpdate}
                      />
                    )
                )}
              </CardContent>
            </>
          </Card>
        </ClickAwayListener>
      </Box>
    );
  }
);

export default Reactions;
