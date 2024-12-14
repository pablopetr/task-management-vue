import { useStore } from 'vuex';
export default function authMiddleware(
  to,
  from,
  next,
) {
  const store = useStore();

  if (!store.state.auth.user) {
    next({ name: 'login' });
  } else {
    next();
  }
}
