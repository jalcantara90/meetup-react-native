import randomString from 'random-string';

export const generateAvatarURL = () => {
  let hash = randomString({ length: 32 })
  return `http://www.gravatar.com/avatar/${hash}.jpg?d=retro`
}