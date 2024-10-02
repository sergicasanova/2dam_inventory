import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'path';
import * as xmljs from 'xml-js';
const filePath = path.join(
  path.resolve(__dirname, '..'),
  'data/inventory_status.json',
);
const statusData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function saveData() {
  fs.writeFileSync(filePath, JSON.stringify(statusData));
}
@Injectable()
export class StatusService {
  getAllStatus(xml: string) {
    if (xml === 'true') {
      const jsonForXml = {Status: statusData};
      const jsonString = JSON.stringify(jsonForXml);
      const options = { compact: true, ignoreComment: true, spaces: 4 };
      const result = xmljs.json2xml(jsonString, options);
      console.log(result);
      return result;
    }
    return statusData;
  }

  createStatus(Status: any) {
    statusData.push({
      id_status: statusData[statusData.length - 1].id_status + 1,
      ...Status,
    });
    saveData();
    return { message: 'Estado creado satisfactoriamente' };
  }

  getStatus(id: number, xml: string) {
    let i = 0;
    while (i < statusData.length && statusData[i].id_status != id) {
      i++;
    }
    if (i >= statusData.length) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    if (xml === 'true') {
      const jsonForXml = {Status: statusData[i]};
      const jsonString = JSON.stringify(jsonForXml);
      const options = { compact: true, ignoreComment: true, spaces: 4 };
      const result = xmljs.json2xml(jsonString, options);
      console.log(result);
      return result;
    } else {
      return statusData[i];
    }
  }

  updateStatus(StatusUpdated) {
    let i = 0;
    while (
      i < statusData.length &&
      statusData[i].id_status != StatusUpdated.id_status
    ) {
      i++;
    }
    if (statusData[i]) {
      statusData[i] = StatusUpdated;
      return statusData[i];
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  deleteStatus(id: number) {
    let i = 0;
    while (i < statusData.length && statusData[i].id_status != id) {
      i++;
    }
    if (statusData[i]) {
      return statusData.splice(i, 1);
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
