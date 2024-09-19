import { Injectable } from '@nestjs/common';

@Injectable()
export class IssuesService {
  getAllIssues() {
    return 'getAllIssues todo los Issues Funciona';
  }
  createIssue() {
    return 'Create los Issues Funciona';
  }

  getIssue() {
    return 'Get los Issues Funciona';
  }

  updateIssue() {
    return 'Update los Issues Funciona';
  }

  deleteIssue() {
    return 'Delete los Issues Funciona';
  }
}
