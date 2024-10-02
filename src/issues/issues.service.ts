// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import * as fs from 'node:fs';
// import * as path from 'path';

// const filePath = path.join(
//   path.resolve(__dirname, '..'),
//   'data/inventory_issues.json',
// );
// const issuesData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// function saveData() {
//   fs.writeFileSync(filePath, JSON.stringify(issuesData));
// }
// @Injectable()
// export class IssuesService {
//   getAllIssues() {
//     return issuesData;
//   }

//   createIssue(Issue: any) {
//     issuesData.push({
//       id_issue: issuesData[issuesData.length - 1].id_issue + 1,
//       ...Issue,
//     });
//     saveData();
//     return { message: 'Estado creado satisfactoriamente' };
//   }

//   getIssue(idIssue: number) {
//     let contadorIssues = 0;
//     while (
//       contadorIssues < issuesData.length &&
//       issuesData[contadorIssues].id_issue != idIssue
//     ) {
//       contadorIssues++;
//     }
//     if (issuesData[contadorIssues]) return issuesData[contadorIssues];
//     else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
//   }

//   updateIssue(IssueUpdated) {
//     let contadorIssues = 0;
//     while (
//       contadorIssues < issuesData.length &&
//       issuesData[contadorIssues].id_issue != IssueUpdated.id_issue
//     ) {
//       contadorIssues++;
//     }
//     if (issuesData[contadorIssues]) {
//       issuesData[contadorIssues] = IssueUpdated;
//       saveData();
//       return issuesData[contadorIssues];
//     } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
//   }
//   deleteIssue(id: number) {
//     let contadorIssues = 0;
//     while (
//       contadorIssues < issuesData.length &&
//       issuesData[contadorIssues].id_issue != id
//     ) {
//       contadorIssues++;
//     }
//     if (issuesData[contadorIssues]) {
//       issuesData.splice(contadorIssues, 1);
//       saveData();
//       return issuesData[contadorIssues];
//     } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
//   }
// }


import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'path';

const filePath = path.join(
  path.resolve(__dirname, '..'),
  'data/inventory_issues.json',
);

let issuesData: { issues: any[] };

try {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  issuesData = JSON.parse(fileContent);
} catch (error) {
  console.error('Error loading issues data:', error);
  issuesData = { issues: [] }; 
}

function saveData() {
  fs.writeFileSync(filePath, JSON.stringify(issuesData, null, 2));
}

@Injectable()
export class IssuesService {
  getAllIssues() {
    return issuesData.issues;
  }

  createIssue(issue: any) {
    console.log('Current issuesData:', issuesData.issues);
    const lastId = issuesData.issues.length > 0 
      ? issuesData.issues[issuesData.issues.length - 1].id_issue 
      : 0;

    const newIssue = {
      id_issue: lastId + 1,
      created_at: new Date().toISOString(), 
      last_updated: new Date().toISOString(),
      ...issue,
    };

    issuesData.issues.push(newIssue);
    saveData();
    return { message: 'Estado creado satisfactoriamente', newIssue };
  }

  getIssue(idIssue: number) {
    const issue = issuesData.issues.find((item) => item.id_issue === idIssue);
    if (issue) return issue;
    else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  updateIssue(issueUpdated: any) {
    const index = issuesData.issues.findIndex((item) => item.id_issue === issueUpdated.id_issue);
    if (index !== -1) {
      issuesData.issues[index] = {
        ...issuesData.issues[index],
        ...issueUpdated,
        last_updated: new Date().toISOString(), 
      };
      saveData();
      return issuesData.issues[index];
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  deleteIssue(id: number) {
    const index = issuesData.issues.findIndex((item) => item.id_issue === id);
    if (index !== -1) {
      const deletedIssue = issuesData.issues.splice(index, 1);
      saveData();
      return deletedIssue[0];
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
