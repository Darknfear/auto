export type TNotificationMetadata = {
  startDate: Date;
  endDate: Date;
  homeworkId: string;
  homeworkAssignId: string;
  isHomeworkDone: boolean;
};

export type TNotificationConfig = {
  newMessage?: boolean;
  pratitionerAcceptInvitation?: boolean;
  clientAcceptInvitation?: boolean;
  clientCompleteTask?: boolean;
  clientRelocated?: boolean;
  homeworkReminder?: boolean;
  relocatedToNewPractitioner?: boolean;
};
