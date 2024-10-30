import { Test, TestingModule } from '@nestjs/testing';
import { InventariService } from './inventari.service';
import { Inventari } from './inventari.entity';
import { UtilsService } from '../utils/utils.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateInventariDto, UpdateInventariDto } from './inventari.dto';

const oneInventari: Inventari = {
  id_inventory: 1,
  num_serie: 'ABC123',
  brand: 'Marca A',
  model: 'Modelo A',
  GVA_cod_article: 12345,
  GVA_description_cod_articulo: 'Descripción del artículo A',
  status: 'disponible',
  fk_inventary_type: {
    id_type: 1,
    description: 'Tipo A',
    fk_inventari: null,
  },
  fk_classroom: {
    id_classroom: 1,
    description: 'Aula 101',
    fk_inventari: null,
  },
  fk_issue: null,
};

const mockInventariUpdate: UpdateInventariDto = {
  num_serie: 'DEF456',
  brand: 'Marca B',
  model: 'Modelo B',
  GVA_cod_article: 54321,
  GVA_description_cod_articulo: 'Descripción del artículo B',
  status: 'en reparación',
  fk_inventary_type: 2, // Se mantiene como número
  fk_classroom: 2, // Se mantiene como número
  fk_issue: null,
};

describe('InventariService', () => {
  let inventariService: InventariService;

  const MockInventariRepository = {
    find: jest.fn(() => [oneInventari]),
    findOne: jest.fn(() => oneInventari),
    create: jest.fn((inventari: Partial<Inventari>) => ({
      ...oneInventari,
      ...inventari,
    })),
    save: jest.fn((inventari: Partial<Inventari>) => ({
      ...oneInventari,
      ...inventari,
    })),
    update: jest.fn(() => Promise.resolve()),
    findOneBy: jest.fn((criteria) => {
      if (criteria.id_inventory === 1) {
        return Promise.resolve({ ...oneInventari, ...mockInventariUpdate });
      }
      return Promise.resolve(null);
    }),
    delete: jest.fn(() => Promise.resolve({ affected: 1 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventariService,
        UtilsService,
        {
          provide: getRepositoryToken(Inventari),
          useValue: MockInventariRepository,
        },
      ],
    }).compile();

    inventariService = module.get<InventariService>(InventariService);
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should be defined', () => {
    expect(inventariService).toBeDefined();
  });

  describe('createInventari', () => {
    it('should create a new inventory item', async () => {
      const createInventariDto: CreateInventariDto = {
        num_serie: 'ABC123',
        brand: 'Marca A',
        model: 'Modelo A',
        GVA_cod_article: 12345,
        GVA_description_cod_articulo: 'Descripción del artículo A',
        status: 'disponible',
        fk_issue: null,
        id_type: 1,
        id_classroom: 1,
      };

      const result = await inventariService.createInventari(createInventariDto);

      expect(result).toEqual({
        message: 'Inventario creado',
      });

      expect(MockInventariRepository.create).toHaveBeenCalledWith({
        ...createInventariDto,
        fk_inventary_type: { id_type: 1 }, 
        fk_classroom: { id_classroom: 1 }, 
      });
      expect(MockInventariRepository.save).toHaveBeenCalled();
    });
  });

  describe('updateInventari', () => {
    it('should update an inventory item', async () => {
      const result = await inventariService.updateInventari(
        1,
        mockInventariUpdate,
      );

      expect(MockInventariRepository.update).toHaveBeenCalledWith(1, {
        GVA_cod_article: 54321,
        GVA_description_cod_articulo: 'Descripción del artículo B',
        brand: 'Marca B',
        fk_issue: null,
        model: 'Modelo B',
        num_serie: 'DEF456',
        status: 'en reparación',
        fk_inventary_type: { id_type: 2 }, 
        fk_classroom: { id_classroom: 2 }, 
      });

      expect(MockInventariRepository.findOneBy).toHaveBeenCalledWith({
        id_inventory: 1,
      });
      expect(result).toEqual({
        ...oneInventari,
        ...mockInventariUpdate,
        fk_inventary_type: { id_type: 2 }, 
        fk_classroom: { id_classroom: 2 }, 
      });
    });
  });

  describe('getInventariAll', () => {
    it('should return an array of inventaris', async () => {
      const result = await inventariService.getInventariAll('false');
      expect(result).toEqual([oneInventari]);
    });
  });

  describe('getInventari', () => {
    it('should return a specific inventari by ID', async () => {
      const result = await inventariService.getInventari(1, 'false');
      expect(result).toEqual({
        ...oneInventari,
        fk_inventary_type: {
          id_type: 1,
          description: 'Tipo A',
          fk_inventari: null,
        },
        fk_classroom: {
          id_classroom: 1,
          description: 'Aula 101',
          fk_inventari: null,
        },
      });
      expect(MockInventariRepository.findOneBy).toHaveBeenCalledWith({
        id_inventory: 1,
      });
    });
  });

  describe('deleteInventari', () => {
    it('should delete an inventari successfully', async () => {
      const result = await inventariService.deleteInventari(1);
      expect(result).toEqual({ message: 'Inventario eliminado' });
      expect(MockInventariRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
