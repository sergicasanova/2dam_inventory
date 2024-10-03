import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { default as issuesData } from '../data/inventory_issues';

@Injectable()
export class IssuesService {
  getAllIssues() {
    return issuesData;
  }

  createIssue(Issue: any) {
    issuesData.push({
      id_issue: issuesData[issuesData.length - 1].id_issue + 1,
      ...Issue,
    });
    return { message: 'Estado creado satisfactoriamente' };
  }

  getIssue(idIssue: number) {
    let contadorIssues = 0;
    while (
      contadorIssues < issuesData.length &&
      issuesData[contadorIssues].id_issue != idIssue
    ) {
      contadorIssues++;
    }
    if (issuesData[contadorIssues]) return issuesData[contadorIssues];
    else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  updateIssue(IssueUpdated) {
    let contadorIssues = 0;
    while (
      contadorIssues < issuesData.length &&
      issuesData[contadorIssues].id_issue != IssueUpdated.id_issue
    ) {
      contadorIssues++;
    }
    if (issuesData[contadorIssues]) {
      issuesData[contadorIssues] = IssueUpdated;
      return issuesData[contadorIssues];
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
  deleteIssue(id: number) {
    let contadorIssues = 0;
    while (
      contadorIssues < issuesData.length &&
      issuesData[contadorIssues].id_issue != id
    ) {
      contadorIssues++;
    }
    if (issuesData[contadorIssues]) {
      issuesData.splice(contadorIssues, 1);
      return issuesData[contadorIssues];
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
