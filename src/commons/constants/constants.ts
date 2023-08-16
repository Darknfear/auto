import { DayOfWeek } from './enum';

export const APP_NAME = 'antsa';

export const EMAIL_EXISTED = 'This email address is already used. Please try another';
export const ACCOUNT_NOT_FOUND = 'Account not found';
export const INVALID_INFO_LOGIN = 'Invalid email or password, please try again';
export const ACCOUNT_NOT_VERIFIED = 'Account is unverified';
export const ONLY_ACTIVE_TO_OWNER = 'Permission denied';
export const INVITE_SENT = 'This email has been invited to your clinic, please check it again';
export const OWNER_CAN_NOT_INVITE = 'This email has been registered';
export const ACCOUNT_DELETED = 'Account has been deleted';
export const ACCOUNT_TYPE_NOT_VALID = 'Account type is not valid';
export const CAN_NOT_INVITE_YOURSELF = `you can't invite yourself`;

export const AVATAR_MAX_SIZE = 5 * 1024 * 1024; // 5 MB
export const VIDEO_MAX_SIZE = 20 * 1024 * 1024; // 20 MB
export const FILE_MESSAGE_MAX_SIZE = 20 * 1024 * 1024; // 20 MB
export const CLIENT_FILE_MAX_SIZE = 20 * 1024 * 1024; // 20 MB

export const OOPS_SOMETHING_WENT_WRONG = 'Oops, something went wrong';
export const CURRENT_PASSWORD_IS_NOT_CORRECT = 'Current password is not correct';

export const DayOfWeekString = {
  0: DayOfWeek.SUN,
  1: DayOfWeek.MON,
  2: DayOfWeek.TUE,
  3: DayOfWeek.WED,
  4: DayOfWeek.THU,
  5: DayOfWeek.FRI,
  6: DayOfWeek.SAT,
};

export const DayOfWeekNumber = {
  [DayOfWeek.SUN]: 0,
  [DayOfWeek.MON]: 1,
  [DayOfWeek.TUE]: 2,
  [DayOfWeek.WED]: 3,
  [DayOfWeek.THU]: 4,
  [DayOfWeek.FRI]: 5,
  [DayOfWeek.SAT]: 6,
};

export const MAX_FILE_SUBMIT_IN_HOMEWORK = 5;

export const DASS_21 = 'DASS-21';
export const DASS_42 = 'DASS-42';

export const QUOTE_TEXT_COLOR = [
  '#C8591B',
  '#E1982B',
  '#D3AA18',
  '#A8C10E',
  '#59B411',
  '#11A960',
  '#199F87',
  '#14A0BE',
  '#514ED4',
  '#9A3DD2',
];

export const QUOTE_BACKGROUND_COLOR = [
  '#FAEEE8',
  '#FCF5EA',
  '#FBF7E8',
  '#F6F9E7',
  '#EEF8E7',
  '#E7F6EF',
  '#E8F5F3',
  '#E7F6F9',
  '#EEEDFB',
  '#F5ECFB',
];

// Calculator by second
export const EXPIRE_TIME = 300;

export const MAX_FILE_ATTACH_IN_CONTACT_HELP = 5;
export const ATTACHMENT_MAX_SIZE = 5 * 1024 * 1024; // 5 MB
