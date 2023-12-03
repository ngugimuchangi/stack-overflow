import UserInfoCard from '../../components/user-info-card/user-info-card';
import Button from '../../components/button/button';
import './profile-page.css';
import { useLoaderData } from 'react-router-dom';
import userService from '../../services/user-service';
import tagsService from '../../services/tags-service';
import questionsService from '../../services/questions-service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { user, tags, questions } = useLoaderData();
  const [userTags, setUserTags] = useState(tags);
  const [userQuestions, setUserQuestions] = useState(questions);

  async function deleteUser(id) {
    await userService.deleteUser();
    navigate('/');
  }

  async function deleteTag(id) {
    await tagsService.deleteTag(id);
    setUserTags(userTags.filter((tag) => tag._id !== id));
  }

  async function deleteQuestion(id) {
    await questionsService.deleteQuestion(id);
    setUserQuestions(userQuestions.filter((question) => question._id !== id));
  }
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
            {userTags?.map((tag) => (
              <UserInfoCard
                key={tag._id}
                info={tag.name}
                id={tag._id}
                handleDelete={async () => await deleteTag(tag._id)}
              />
            ))}
          </ul>
        </div>
        <div className='section user-questions'>
          <h4>Questions</h4>
          <ul>
            {userQuestions?.map((question, index) => (
              <UserInfoCard
                key={index}
                info={question.title}
                id={question._id}
                handleDelete={async () => await deleteQuestion(question._id)}
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
