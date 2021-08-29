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
} from '@material-ui/core';
import {
  Cake,
  Mail,
  PersonAdd,
  PersonAddDisabled,
  Phone,
  Wc,
} from '@material-ui/icons';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ActionButton, {
  ActionButtonProps,
} from 'src/components/UserPage/ActionButton';
import Friends from 'src/components/UserPage/Friends';
import MultiActionsButton, {
  MultiActionsButtonProps,
} from 'src/components/UserPage/MultiActionsButton';
import Posts from 'src/components/UserPage/Posts';
import TabPanel from 'src/components/UserPage/TabPanel';
import Main from 'src/layouts/Main';
import { createFriendRequest } from 'src/services/friend';
import { getUser, GetUserResponseData } from 'src/services/user';
import { useAppDispatch } from 'src/store';

enum TabType {
  POSTS = 'POSTS',
  FRIENDS = 'FRIENDS',
}

interface UserPageParams {
  userId?: string;
}

const UserPage: React.FC = () => {
  const { userId } = useParams<UserPageParams>();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [data, setData] = useState<GetUserResponseData>();
  const [openedTab, setOpenedTab] = useState<TabType>(TabType.POSTS);

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
    areUsersFriends,
    isAuthUser,
    hasSentFriendRequest,
    hasReceivedFriendRequest,
  } = data;

  const renderActionButton = () => {
    let props: ActionButtonProps = {
      text: '',
      icon: null,
      onClick: () => {},
    };

    if (areUsersFriends) {
      props.text = 'Unfriend';
      props.icon = <PersonAddDisabled />;
      props.onClick = unfriend;
    } else if (hasSentFriendRequest) {
      props.text = 'Cancel';
      props.icon = <PersonAddDisabled />;
      props.onClick = cancelFriendRequest;
    } else if (hasReceivedFriendRequest) {
      const props: MultiActionsButtonProps = {
        icon: <PersonAdd />,
        text: 'Respond',
        actions: [
          {
            text: 'Decline',
            onClick: declineFriendRequest,
            icon: <PersonAddDisabled />,
          },
          {
            text: 'Accept',
            onClick: acceptFriendRequest,
            icon: <PersonAdd />,
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
    await createFriendRequest({ userId: user._id });
  };

  const acceptFriendRequest = async () => {};

  const declineFriendRequest = async () => {};

  const cancelFriendRequest = () => {};

  const unfriend = () => {};

  return (
    <Main>
      <Box width="512px" margin="auto" padding="15px 0">
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={6}>
                <Avatar src={user.avatar} style={{ width: 120, height: 120 }}>
                  {(user.username[0] || '').toUpperCase()}
                </Avatar>
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
            {!isAuthUser && renderActionButton()}
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
    </Main>
  );
};

export default UserPage;
