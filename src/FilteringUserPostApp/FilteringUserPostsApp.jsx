import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';

const DropdownExample = () => {
  const [users, setUsers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('All Posts');
  const [selectedPost, setSelectedPost] = useState('');
  const [posts, setPosts] = useState([]);

  const toggle = () => setDropdownOpen(prevState => !prevState);


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        setPosts(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  const handleUserSelect = (user) => {
    setSelectedUser(user.name);
    setDropdownOpen(false);

    // Find the posts for the selected user
    const userPosts = posts.filter(post => post.userId === user.id);
    setSelectedPost(userPosts.map(post => post.body));
  };

  return (
    <>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{display:"flex",justifyContent:"center",margin:20}}>
        <DropdownToggle caret>
          {selectedUser}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setSelectedUser('All Posts')}>
            All Posts
          </DropdownItem>
          {users.map(user => (
            <DropdownItem key={user.id} onClick={() => handleUserSelect(user)}>
              {user.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      <div style={{backgroundColor:"bisque"}}>
  {selectedUser === 'All Posts' ?
    (
      <ul>
        {posts.map(post => (
          <li style={{color:"#B3532C"}} key={post.id}>{post.body}</li>
        ))}
      </ul>
    ) : (
     
      <ul> {selectedPost.map(post => (
      <li style={{color:"#B3532C",margin:20}} key={post}>{post} </li>
      ))}
      </ul>
   
    )}
</div>

    </>
  );
};

export default DropdownExample;
