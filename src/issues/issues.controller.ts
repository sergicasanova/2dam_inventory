import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
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

  @Get(':id')
  getIssue(@Param('id') id: string) {
    return this.issueService.getIssue(parseInt(id));
  }

  @Put(':id')
  updateIssue(@Param('id') id: string) {
    return this.issueService.updateIssue(parseInt(id));
  }

  @Delete(':id')
  deleteIssue(@Param('id') id: string) {
    return this.issueService.deleteIssue(parseInt(id));
  }
}
