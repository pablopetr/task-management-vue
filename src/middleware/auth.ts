import { useStore } from 'vuex';

export default async function authMiddleware(
  to,
  from,
  next,
) {
  const store = useStore();

  await store.dispatch('auth/fetchUser');

  if (!store.state.auth.user) {
    next({ name: 'login' });
  } else {
    next();
  }
}
