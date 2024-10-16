import { IssueConversationController } from './issues_conversation.controller';
import { IssueConversationService } from './issues_conversation.service';
import { IssueConversationEntity } from './issues_conversation.entity';
import { Repository } from 'typeorm';
import { UtilsService } from 'src/utils/utils.service';

describe('IssueConversationController', () => {
  let issueConversationController: IssueConversationController;
  let issueConversationService: IssueConversationService;
  let issueConversationRepository: Repository<IssueConversationEntity>;
  let utilsService: UtilsService;

  beforeEach(() => {
    issueConversationService = new IssueConversationService(
      utilsService,
      issueConversationRepository,
    );
    issueConversationController = new IssueConversationController(
      issueConversationService,
    );
  });

  describe('createIssueConversation', () => {
    it('should create a new issue conversation', async () => {
      const body = {
        id_issue: 1,
        id_user: 1,
        notes: 'Prueba de conversación',
      };

      const result: IssueConversationEntity = {
        id: 1,
        issue: { id_issue: 1 } as any, // mock Issue
        user: { id_user: 1 } as any, // mock User
        notes: body.notes,
        create_at: new Date(),
      };

      jest
        .spyOn(issueConversationService, 'addIssueConversation')
        .mockResolvedValue(result);

      expect(
        await issueConversationController.createIssueConversation(body),
      ).toBe(result);
    });
  });

  describe('deleteIssueConversation', () => {
    it('should delete an issue conversation', async () => {
      const id = '1';

      jest
        .spyOn(issueConversationService, 'deleteIssueConversation')
        .mockResolvedValue({ message: 'Conversación eliminada' });

      expect(
        await issueConversationController.deleteIssueConversation(id),
      ).toEqual({ message: 'Conversación eliminada' });
    });
  });

  // Añadir la prueba para el método PUT
  describe('updateIssueConversation', () => {
    it('should update an issue conversation', async () => {
      const id = '1';
      const notes = 'Notas actualizadas';

      const result: IssueConversationEntity = {
        id: 1,
        issue: { id_issue: 1 } as any,
        user: { id_user: 1 } as any,
        notes: notes,
        create_at: new Date(),
      };

      jest
        .spyOn(issueConversationService, 'updateIssueConversation')
        .mockResolvedValue(result);

      expect(
        await issueConversationController.updateIssueConversation(id, notes),
      ).toEqual(result);
    });
  });
});
