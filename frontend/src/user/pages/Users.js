import React from 'react';

import UsersList from '../components/UsersList';

function Users() {
  const USERS = [
    {
      id: 'u1',
      name: 'Jake Joseph',
      image:
        'https://pbs.twimg.com/profile_images/1287777054126157824/uMgxYan8_400x400.jpg',
      places: '1',
    },
  ];

  return <UsersList items={USERS} />;
}

export default Users;
