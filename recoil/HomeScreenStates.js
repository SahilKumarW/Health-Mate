import {atom} from 'recoil';

export const userInfoState = atom({
  key: 'userInfoState',
  default: { name: '', email: '' },
});

export const isLeftDrawerV = atom({
  key: 'isLeftDrawerV',
  default: false,
});
