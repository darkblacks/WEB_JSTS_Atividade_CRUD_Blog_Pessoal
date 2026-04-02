import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      message: 'API Blog Pessoal funcionando.',
      endpoints: {
        listar: 'GET /api/postagens',
        buscarPorId: 'GET /api/postagens/:id',
        criar: 'POST /api/postagens',
        atualizar: 'PUT /api/postagens/:id',
        deletar: 'DELETE /api/postagens/:id',
      },
    };
  }
}
