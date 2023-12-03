import UserInfoCard from '../../components/user-info-card/user-info-card';
import Button from '../../components/button/button';
import './profile-page.css';

/**
 * ProfilePage component for displaying user details, tags, and questions.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.user - The user object.
 * @param {Array} props.tags - The tags created by the user.
 * @param {Array} props.questions - The questions asked by the user.
 *
 * @returns {JSX.Element} The UserProfile component.
 */
export default function ProfilePage() {
  const { user, tags, questions } = {
    user: {
      username: 'johndoe',
      email: 'johndoe@mail.com',
    },
    tags: [
      {
        name: 'react',
        id: '123',
      },
      {
        name: 'react',
        id: '123',
      },
    ],
    questions: [
      {
        id: '345',
        title: 'How to use React?',
      },
      {
        id: '345',
        title: 'Lorem100 ipsum dolor sit amet consectetur adipisicing elit.',
      },
    ],
  };

  function deleteUser() {}

  function deleteTag(id, index) {}
  function deleteQuestion(id, index) {}

  return (
    <div>
      <h2 className='profile-heading'>User Profile</h2>
      <div className='user-details-container'>
        <div className='section user-general-details'>
          <div className='username'>
            <span className='label'>Username:</span>
            &nbsp; {user?.username}
          </div>
          <div className='email'>
            <span className='label'>Email:</span>
            &nbsp; {user?.email}
          </div>
        </div>

        <div className='section user-tags'>
          <h4>Tags</h4>
          <ul>
            {tags?.map((tag, index) => (
              <UserInfoCard
                key={index}
                info={tag.name}
                id={tag.id}
                index={index}
                handleDelete={deleteTag}
              />
            ))}
          </ul>
        </div>
        <div className='section user-questions'>
          <h4>Questions</h4>
          <ul>
            {questions?.map((question, index) => (
              <UserInfoCard
                key={index}
                info={question.title}
                id={question.id}
                index={index}
                handleDelete={deleteQuestion}
              />
            ))}
          </ul>
        </div>
      </div>

      <div className='button-container'>
        <Button text='Delete User' classes='delete-btn del-user-btn' onClick={deleteUser} />
      </div>
    </div>
  );
}
