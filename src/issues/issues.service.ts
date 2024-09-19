import { Injectable } from '@nestjs/common';

@Injectable()
export class IssuesService {
  getAllIssues() {
    return 'getAllIssues todo los Issues Funciona';
  }
  createIssue() {
    return 'Create los Issues Funciona';
  }

  getIssue(id: number) {
    return `Get con id ${id} los Issues Funciona`;
  }

  updateIssue(id: number) {
    return `Update con id ${id} los Issues Funciona`;
  }

  deleteIssue(id: number) {
    return `Delete con id ${id} los Issues Funciona`;
  }
}
