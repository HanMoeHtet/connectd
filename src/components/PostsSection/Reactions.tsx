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
import React, { useContext, useEffect, useState } from 'react';
import avatarImg from 'src/assets/images/avatar2.png';
import { ModalContext } from 'src/composables/AppModal';
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
}

function TabPanel(props: TabPanelProps) {
  const classes = useStyles();

  const { value, index, reactionType, postId, onUpdate } = props;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

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
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="300px"
            >
              <CircularProgress color="primary" />
            </Box>
          ) : (
            Array(10)
              .fill({})
              .map((_) => (
                <ListItem>
                  <ListItemAvatar>
                    <Badge
                      badgeContent={<ThumbUp style={{ fontSize: '0.75rem' }} />}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      classes={{
                        badge: classes.badge,
                      }}
                    >
                      <Avatar src={avatarImg} />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText primary="Han Moe Htet" />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <PersonAdd />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
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
    bottom: 2,
    background: 'red',
    padding: 2,
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
