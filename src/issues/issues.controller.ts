import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { IssuesService } from './issues.service';

@Controller('issues')
export class IssuesController {
  private issueService: IssuesService;

  constructor(issuesService: IssuesService) {
    this.issueService = issuesService;
  }

  @Get()
  getAllIssues() {
    return this.issueService.getAllIssues();
  }

  @Post()
  createIssue() {
    return this.issueService.createIssue();
  }

  @Get()
  getIssue() {
    return this.issueService.getIssue();
  }

  @Put()
  updateIssue() {
    return this.issueService.updateIssue();
  }

  @Delete()
  deleteIssue() {
    return this.issueService.deleteIssue();
  }
}
