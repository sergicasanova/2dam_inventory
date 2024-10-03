import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as xmljs from 'xml-js';
import { default as statusData } from '../data/inventory_status';
import { UtilsService } from 'src/utils/utils.service';
@Injectable()
export class StatusService {
  constructor(private readonly UtilsService: UtilsService) {}
  getAllStatus(xml: string) {
    if (xml === 'true') {
      const jsonForXml = JSON.stringify({ status: statusData });
      return this.UtilsService.convertJSONtoXML(jsonForXml);
    }
    return statusData;
  }

  createStatus(Status: any) {
    statusData.push({
      id_status: statusData[statusData.length - 1].id_status + 1,
      ...Status,
    });
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
      const jsonForXml = { Status: statusData[i] };
      const jsonString = JSON.stringify(jsonForXml);
      const options = { compact: true, ignoreComment: true, spaces: 4 };
      const result = xmljs.json2xml(jsonString, options);
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
