import EventRepository from './EventRepository';
import UserRepository from './UserRepository';
import AuthRepository from './AuthRepository';
import CommentRepository from './CommentRepository';
import GroupRepository from './GroupRepository';
import NotificationRepository from './NotificationRepository';
import PostRepository from './PostRepository';

const repositories = {
    'events': EventRepository,
    'users': UserRepository,
    'auth': AuthRepository,
    'comments': CommentRepository,
    'groups': GroupRepository,
    'notifications': NotificationRepository,
    'posts': PostRepository,

}

export default {
    get: name => repositories[name]
};