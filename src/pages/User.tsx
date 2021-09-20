import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
  makeStyles,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import {
  Cake,
  Chat,
  Mail,
  PersonAdd,
  PersonAddDisabled,
  Phone,
  Wc,
} from '@material-ui/icons';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import StyledBadgeLarge from 'src/components/StyledBadgeLarge';
import ActionButton, {
  ActionButtonProps,
} from 'src/components/UserPage/ActionButton';
import Friends from 'src/components/UserPage/Friends';
import MultiActionsButton, {
  MultiActionsButtonProps,
} from 'src/components/UserPage/MultiActionsButton';
import Posts from 'src/components/UserPage/Posts';
import TabPanel from 'src/components/UserPage/TabPanel';
import {
  acceptFriendRequest as _acceptFriendRequest,
  cancelFriendRequest as _cancelFriendRequest,
  createFriendRequest,
  rejectFriendRequest,
  unfriend as _unfriend,
} from 'src/services/friend';
import {
  getUser,
  GetUserResponseData,
  getConversationWithUser as _getConversationWithUser,
} from 'src/services/user';
import { useAppDispatch, useAppSelector } from 'src/store';
import { startConversationWithUser } from 'src/store/conversations';
import { selectIsUserOnline } from 'src/store/online-status';

const useStyles = makeStyles((theme) => ({
  container: {
    width: 512,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      paddingLeft: 10,
      paddingRight: 10,
    },
  },
}));

enum TabType {
  POSTS = 'POSTS',
  FRIENDS = 'FRIENDS',
}

interface UserPageParams {
  userId?: string;
}

const UserPage: React.FC = () => {
  const classes = useStyles();
  const isMdDownScreen = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down('md')
  );

  const { userId } = useParams<UserPageParams>();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [data, setData] = useState<GetUserResponseData>();
  const [openedTab, setOpenedTab] = useState<TabType>(TabType.POSTS);

  const isUserOnline = useAppSelector((state) => {
    return userId ? selectIsUserOnline(userId)(state) : false;
  });

  useEffect(() => {
    (async () => {
      if (!userId) {
        history.push('/');
      } else {
        const response = await getUser(userId);
        const { data } = response.data;
        setData(data);
      }
    })();
  }, [userId, history, dispatch]);

  if (!data) return null;

  const {
    user,
    friendId,
    isAuthUser,
    sentFriendRequestId,
    receivedFriendRequestId,
  } = data;

  const renderFriendActionButton = () => {
    let props: ActionButtonProps = {
      text: '',
      icon: null,
      onClick: () => {},
    };

    if (friendId !== undefined) {
      props.text = 'Unfriend';
      props.icon = <PersonAddDisabled />;
      props.onClick = unfriend;
    } else if (sentFriendRequestId !== undefined) {
      props.text = 'Cancel';
      props.icon = <PersonAddDisabled />;
      props.onClick = cancelFriendRequest;
    } else if (receivedFriendRequestId !== undefined) {
      const props: MultiActionsButtonProps = {
        icon: <PersonAdd />,
        text: 'Respond',
        actions: [
          {
            text: 'Accept',
            onClick: acceptFriendRequest,
            icon: <PersonAdd />,
          },
          {
            text: 'Decline',
            onClick: declineFriendRequest,
            icon: <PersonAddDisabled />,
          },
        ],
      };

      return <MultiActionsButton {...props} />;
    } else {
      props.text = 'Add Friend';
      props.icon = <PersonAdd />;
      props.onClick = sendFriendRequest;
    }

    return <ActionButton {...props} />;
  };

  const sendFriendRequest = async () => {
    const response = await createFriendRequest({ userId: user._id });
    const { friendRequestId } = response.data.data;
    setData({ ...data, sentFriendRequestId: friendRequestId });
  };

  const cancelFriendRequest = async () => {
    if (sentFriendRequestId) {
      await _cancelFriendRequest({ friendRequestId: sentFriendRequestId });
      setData({ ...data, sentFriendRequestId: undefined });
    }
  };

  const acceptFriendRequest = async () => {
    if (receivedFriendRequestId) {
      const response = await _acceptFriendRequest({
        friendRequestId: receivedFriendRequestId,
      });
      const { friendId } = response.data.data;
      setData({ ...data, friendId });
    }
  };

  const declineFriendRequest = async () => {
    if (receivedFriendRequestId) {
      await rejectFriendRequest({ friendRequestId: receivedFriendRequestId });
      setData({ ...data, receivedFriendRequestId: undefined });
    }
  };

  const unfriend = async () => {
    if (friendId) {
      await _unfriend({ friendId });
      setData({ ...data, friendId: undefined });
    }
  };

  const getConversationWithUser = async () => {
    if (isMdDownScreen) {
      const response = await _getConversationWithUser({ userId: user._id });
      const { conversation } = response.data.data;

      history.push(`/c/${conversation._id}`);
    } else {
      dispatch(startConversationWithUser(user._id));
    }
  };

  return (
    <Box className={classes.container} margin="auto" padding="15px 0">
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={6}>
              <StyledBadgeLarge
                overlap="circular"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                variant="dot"
                invisible={!isUserOnline}
              >
                <Avatar src={user.avatar} style={{ width: 120, height: 120 }}>
                  {(user.username[0] || '').toUpperCase()}
                </Avatar>
              </StyledBadgeLarge>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="textPrimary">
                {user.username}
              </Typography>
              <Box height="10px" />
              {user.email && (
                <Box display="flex" alignItems="center">
                  <Mail fontSize="small" />
                  <Box width="8px"></Box>
                  <Typography variant="body2" color="textPrimary">
                    {user.email}
                  </Typography>
                </Box>
              )}
              <Box height="5px" />
              {user.phoneNumber && (
                <Box display="flex" alignItems="center">
                  <Phone fontSize="small" />
                  <Box width="8px"></Box>
                  <Typography variant="body2" color="textPrimary">
                    {user.phoneNumber}
                  </Typography>
                </Box>
              )}
              <Box height="5px" />
              <Box display="flex" alignItems="center">
                <Cake fontSize="small" />
                <Box width="8px"></Box>
                <Typography variant="body2" color="textPrimary">
                  {format(new Date(user.birthday), 'MMM do, yyyy')}
                </Typography>
              </Box>
              <Box height="5px" />
              <Box display="flex" alignItems="center">
                <Wc fontSize="small" />
                <Box width="8px"></Box>
                <Typography variant="body2" color="textPrimary">
                  {Object.values(user.pronouns).join(', ')}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box height="16px" />
          <Box display="flex">
            {!isAuthUser && renderFriendActionButton()}
            <Box width="10px" />
            {friendId && (
              <ActionButton
                text="Message"
                icon={<Chat />}
                onClick={getConversationWithUser}
              />
            )}
          </Box>
        </CardContent>
      </Card>
      <Divider style={{ margin: '15px auto', width: '80px' }} />
      <Tabs
        value={openedTab}
        onChange={(_, newValue) => {
          setOpenedTab(newValue);
        }}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon tabs example"
      >
        <Tab
          style={{ minWidth: 'auto' }}
          label="Posts"
          aria-label={'reactionType'}
          value={TabType.POSTS}
        />
        <Tab
          style={{ minWidth: 'auto' }}
          label="Friends"
          aria-label={'reactionType'}
          value={TabType.FRIENDS}
        />
      </Tabs>
      <Box height="24px" />
      <TabPanel value={openedTab} index={TabType.POSTS}>
        <Posts userId={user._id} />
      </TabPanel>
      <TabPanel value={openedTab} index={TabType.FRIENDS}>
        <Friends userId={user._id} />
      </TabPanel>
    </Box>
  );
};

export default UserPage;
