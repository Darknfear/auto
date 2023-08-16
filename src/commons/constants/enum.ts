export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

export enum ClinicType {
  SOLO = 'SOLO',
  CLINIC = 'CLINIC',
}

export enum ClinicStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

export enum PaymentStatus {
  TRIAL = 'TRIAL',
  ACTIVE = 'ACTIVE',
  CANCEL = 'CANCEL',
}

// TODO: Change this to SystemRoles
export enum ProfileRole {
  OWNER = 'OWNER',
  SOLO = 'SOLO',
  PRACTITIONER = 'PRACTITIONER',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum ProfileStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'not',
}

export enum ProfileTitle {
  MR = 'Mr',
  MRS = 'Mrs',
  MISS = 'Miss',
  DR = 'Dr',
  PROF = 'Prof',
  A_PROF = 'A. Prof',
}

export enum ClientStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

export enum PractitionerTypeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum HomeWorkTopicName {
  ACTIVE = 'ACTIVITIES',
  INACTIVE = 'QUESTION',
  PENDING = 'TASK',
}

export enum HomeWorkTopicStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

export enum HomeWorkTypesType {
  ACTIVE = 'ACTIVITIES',
  INACTIVE = 'QUESTION',
  PENDING = 'TASK',
}

export enum HomeWorkTypesStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

export enum HomeWorkTopicsStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

export enum HomeWorksType {
  PRIVATE = 'PRIVATE',
  GENERAL = 'GENERAL',
}

export enum HomeWorksEnableRemind {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum HomeWorksStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

export enum HomeWorkQuestionsType {
  MULTI = 'MULTI',
  SINGLE = 'SINGLE',
  TEXT = 'TEXT',
  LINE_TEXT = 'LINE_TEXT',
  LINE_PHONE = 'LINE_PHONE',
}

export enum HomeWorkQuestionsStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

// Homework
export enum HomeworkType {
  ACTIVITY = 'Activity',
  QUESTIONNAIRE = 'Questionnaire',
  WRITTEN_TASK = 'WrittenTask',
  VIDEO = 'Video',
}

export enum QueryPractitionerSortBy {
  EMAIL = 'email',
  NAME = 'name',
}

export enum SortType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum HomeworkStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum HomeworkItemType {
  FORM_HEADER = 'FORM_HEADER',
  QUESTION = 'QUESTION',
  PHOTO = 'PHOTO',
}

export enum HomeworkQuestionType {
  LINEAR_RANGE = 'LINEAR_RANGE',
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTI_CHOICE = 'MULTI_CHOICE',
  SHORT_ANSWER = 'SHORT_ANSWER',
}

export enum FrequencyType {
  CUSTOM = 'CUSTOM',
  ASSIGN_ONE = 'ASSIGN_ONE',
}

export enum RepeatDurationType {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
}

export enum HomeworkAssignStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  ARCHIVED = 'ARCHIVED',
}

export enum HomeworkResultStatus {
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
  SKIPPED = 'SKIPPED',
}

export enum DayOfWeek {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN',
}

export enum TimePeriod {
  AM = 'AM',
  PM = 'PM',
}

export enum SubscriptionStatus {
  TRIALING = 'TRIALING',
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
}

export enum STRIPE_WEBHOOK_EVENT {
  SUBSCRIPTION_CREATED = 'customer.subscription.created',
  SUBSCRIPTION_DELETED = 'customer.subscription.deleted',
  SUBSCRIPTION_TRIAL_END = 'customer.subscription.trial_will_end',
  SUBSCRIPTION_UPDATED = 'customer.subscription.updated',
  INVOICE_CREATED = 'invoice.created',
  INVOICE_DELETED = 'invoice.deleted',
  INVOICE_FINALIZED = 'invoice.finalized',
  INVOICE_PAID = 'invoice.paid',
  INVOICE_PAYMENT_FAILED = 'invoice.payment_failed',
  INVOICE_PAYMENT_SUCCEEDED = 'invoice.payment_succeeded',
  INVOICE_PAYMENT_SENT = 'invoice.sent',
  INVOICE_PAYMENT_UPCOMING = 'invoice.upcoming',
  INVOICE_UPDATED = 'invoice.updated',
  INVOICE_VOIDED = 'invoice.voided',
  PAYMENT_INTENT_CREATED = 'payment_intent.created',
  PAYMENT_INTENT_SUCCEEDED = 'payment_intent.succeeded',
}

export enum HomeworkQuestionGroup {
  DEPRESSION = 'Depression',
  ANXIETY = 'Anxiety',
  STRESS = 'Stress',
}

export enum DASSCategory {
  NORMAL = 'Normal',
  MILD = 'Mild',
  MODERATE = 'Moderate',
  SEVERE = 'Severe',
  EXTREMELY_SEVERE = 'Extremely Severe',
}

export enum MessageStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}

export enum RoomType {
  CLIENT = 'CLIENT',
  OWNER = 'OWNER',
  SOLO = 'SOLO',
  PRACTITIONER = 'PRACTITIONER',
}

export enum MessageFileType {
  MESSAGE = 'MESSAGE',
}

export enum SubscriptionAction {
  CREATE_SUBSCRIPTION = 'CREATE_SUBSCRIPTION',
  UPDATE_PLAN = 'UPDATE_PLAN',
  CANCELLED_SUBSCRIPTION = 'CANCELLED_SUBSCRIPTION',
}

export enum ClientFileStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}

export enum DEVICE_TOKEN_TYPE {
  WEB = 'WEB',
  IOS = 'IOS',
  ANDROID = 'ANDROID',
}

export enum NOTIFICATION_TRIGGER_TYPE {
  NEW_MESSAGE = 'NEW_MESSAGE',
  PRACTITIONER_ACCEPT_INVITE = 'PRACTITIONER_ACCEPT_INVITE',
  CLIENT_ACCEPT_INVITE = 'CLIENT_ACCEPT_INVITE',
  REMIND_DO_HOMEWORK = 'REMIND_DO_HOMEWORK',
  CLIENT_REALLOCATE = 'CLIENT_REALLOCATE',
  HOMEWORK_REMINDER = 'HOMEWORK_REMINDER',
  HOMEWORK_COMPLETED = 'HOMEWORK_COMPLETED',
}

export enum NOTIFICATION_ROLE_TYPE {
  SOLO = 'SOLO',
  PRACTITIONER = 'PRACTITIONER',
  OWNER = 'OWNER',
  CLIENT = 'CLIENT',
}

export enum QueryClientFileSortBy {
  CREATED_AT = 'createdAt',
  NAME = 'name',
}

export enum PsychoeducationType {
  ARTICLE = 'ARTICLE',
  VIDEO = 'VIDEO',
}

export enum FileType {
  FILE = 'FILE',
  FOLDER = 'FOLDER',
}

export enum FileMode {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

export enum QueryFileSortBy {
  CREATED_AT = 'createdAt',
  NAME = 'name',
}

export enum AccessTokenStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ErrorTypeResetTokenStatus {
  EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_USED = 'TOKEN_USED',
}

export enum OtpStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum LoginActivityType {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

export enum PackageType {
  SOLO = 'SOLO',
  CLINIC = 'CLINIC',
}

export enum PlanStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ProcessorType {
  SEND_MAIL_PROCESSOR = 'sendMailProcessor',
}

export enum QueueType {
  SEND_MAIL_CANCEL_SUBSCRIPTION = 'sendMailCancelSubscription',
}

export enum EmailType {
  CANCEL_SUBSCRIPTION_EMAIL_TO_CLINIC_OWNER = 'CANCEL_SUBSCRIPTION_EMAIL_TO_CLINIC_OWNER',
  CANCEL_SUBSCRIPTION_EMAIL_TO_SOLO_PRACTITIONER = 'CANCEL_SUBSCRIPTION_EMAIL_TO_SOLO_PRACTITIONER',
  CANCEL_SUBSCRIPTION_EMAIL_TO_CLIENT = 'CANCEL_SUBSCRIPTION_EMAIL_TO_CLIENT',
  CANCEL_SUBSCRIPTION_EMAIL_TO_PRACTITIONER = 'CANCEL_SUBSCRIPTION_EMAIL_TO_PRACTITIONER',
}
