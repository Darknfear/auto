import { HomeworkQuestionGroup } from '@constants/enum';

export type TAnswerQuestion = {
  questionId: string;
  answerChoices?: string[];
  answerText?: string;
};

export type TClientResponse = {
  responseText?: string;
  answerQuestion?: TAnswerQuestion[];
};

export type TResultSummary = {
  total: number;
  [HomeworkQuestionGroup.DEPRESSION]: {
    score: number;
    category: any;
  };
  [HomeworkQuestionGroup.ANXIETY]: {
    score: number;
    category: any;
  };
  [HomeworkQuestionGroup.STRESS]: {
    score: number;
    category: any;
  };
};

export type TSeverity = {
  [key: string]: {
    [key: string]: {
      from: number;
      to: number;
    };
  };
};

export type TResult = {
  summary?: TResultSummary;
  severity?: TSeverity;
};

export type THomeworkResultAttachment = {
  id: string;
  url: string;
  fileType: string;
  originalName: string;
};
