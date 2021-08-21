import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Link,
  CardContent,
  Typography,
  Grid,
  Button,
  Divider,
  Tabs,
  Tab,
} from '@material-ui/core';
import {
  Mail,
  Phone,
  Wc,
  Cake,
  PersonAdd,
  PersonAddDisabled,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PostComponent from 'src/components/PostsSection/Post';
import ShareComponent from 'src/components/PostsSection/Share';
import Main from 'src/layouts/Main';
import { getPost, GetPostSuccessResponse } from 'src/services/post';
import { getUser, GetUserResponseData } from 'src/services/user';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectPost, setPosts } from 'src/store/posts';
import { PostType } from 'src/types/post';
import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';

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
        // const response = await getUser(userId);
        // const { data } = response.data;
        const data = {
          user: {
            _id: '123',
            username: 'Han Moe Htet',
            email: 'hapo23lert@gmail.com',
            phoneNumber: '09755954036',
            birthday: new Date(),
            avatar: undefined,
            pronouns: {
              subjective: 'he',
              objective: 'him',
              possessive: 'his',
            },
            friendCount: 10,
            postCount: 10,
          },
          areUsersFriends: true,
          isAuthUser: false,
        };
        setData(data);
      }
    })();
  }, [userId, history, dispatch]);

  if (!data) return null;

  const { user, areUsersFriends, isAuthUser } = data;

  return (
    // <Main>
    <Box width="512px" margin="auto" padding="15px 0">
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={6}>
              <Avatar src={user.avatar} style={{ width: 120, height: 120 }}>
                {user.username[0].toUpperCase()}
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
                  {format(user.birthday, 'MMM do, yyyy')}
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
          {!isAuthUser && (
            <>
              <Box height="16px" />
              <Button
                style={{
                  textTransform: 'none',
                  display: 'flex',
                  alignItems: 'center',
                }}
                variant="contained"
                color="primary"
              >
                {areUsersFriends ? <PersonAddDisabled /> : <PersonAdd />}
                <Box width="8px"></Box>
                <Typography>
                  {areUsersFriends ? 'Unfriend' : 'Add Friend'}
                </Typography>
              </Button>
            </>
          )}
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
    </Box>
    // </Main>
  );
};

export default UserPage;
