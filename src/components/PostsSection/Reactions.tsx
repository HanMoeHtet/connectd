import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  ClickAwayListener,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
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
import React, { useContext, useState } from 'react';
import avatarImg from 'src/assets/images/avatar2.png';
import { ModalContext } from 'src/composables/AppModal';
import { ReactionType } from 'src/types/post';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,

    '& .MuiOutlinedInput-multiline': {
      padding: 0,
    },

    '& fieldset': {
      border: 'none',
    },

    '& textarea': {
      cursor: 'auto',

      '&::-webkit-scrollbar': {
        display: 'block',
        width: 8,
      },

      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },

  badge: {
    right: 2,
    bottom: 2,
    background: 'red',
    padding: 2,
  },
}));

interface ReactionsProps {}

const Reactions: React.FC<ReactionsProps> = React.forwardRef(({}) => {
  const classes = useStyles();

  const { setContent } = useContext(ModalContext);

  const [value, setValue] = useState(0);

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
          <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Tabs
              value={value}
              onChange={(_, newValue) => setValue(newValue)}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              aria-label="icon tabs example"
            >
              <Tab style={{ minWidth: 'auto' }} label="All" value={0} />
              <Tab
                style={{ minWidth: 'auto' }}
                icon={<ThumbUp />}
                aria-label="liked"
              />
              <Tab
                style={{ minWidth: 'auto' }}
                icon={<Favorite />}
                aria-label="favorited"
              />
              <Tab
                style={{ minWidth: 'auto' }}
                icon={<SentimentVerySatisfied />}
                aria-label="enjoyed"
              />
              <Tab
                style={{ minWidth: 'auto' }}
                icon={<SentimentDissatisfied />}
                aria-label="hated"
              />
            </Tabs>
          </CardContent>
          <CardContent>
            <TabPanel value={value} index={0}>
              <List style={{ overflowY: 'auto', height: '300px' }}>
                {Array(10)
                  .fill({})
                  .map((_) => (
                    <ListItem>
                      <ListItemAvatar>
                        <Badge
                          badgeContent={
                            <ThumbUp style={{ fontSize: '0.75rem' }} />
                          }
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
                  ))}
              </List>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <List style={{ overflowY: 'auto', height: '300px' }}></List>
            </TabPanel>
            <TabPanel value={value} index={2}>
              Love
            </TabPanel>
            <TabPanel value={value} index={3}>
              Satisfied
            </TabPanel>
            <TabPanel value={value} index={4}>
              Dissatisfied
            </TabPanel>
          </CardContent>
        </Card>
      </ClickAwayListener>
    </Box>
  );
});

export default Reactions;
