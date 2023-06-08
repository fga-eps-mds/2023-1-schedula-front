import { Routes, Route } from 'react-router-dom';
import ListaCategoria from '@/pages/categorias';
import { Chamados } from '@/pages/chamados';
import { Cities } from '@/pages/cidades';
import { Login } from '@/pages/login';
import Usuarios from '@/pages/usuarios';
import { Workstation } from '@/pages/workstation';
import { ListaProblemas } from '@/pages/categorias/problemas';
import { RequireAuth } from '@/config/routes/require-auth';
import { DefaultLayout } from '@/components/layout/default-layout';
import { RegistrarChamado } from '@/pages/chamados/registrar';
import { Agendamentos } from '@/pages/agendamentos';
import { ScheduleExport } from '@/pages/exportacao_agendamentos';
import { Tutoriais } from '@/pages/tutoriais';
import { CategoriasTutorial } from '@/pages/categorias_de_tutorial';
import { GerenciarTutoriais } from '@/pages/gerenciar-tutorial';
import { DefaultLayoutOpen } from '@/components/layout-open/default-layout-open';

export function Router() {
  return (
    <Routes>
      {/* ROTAS PRIVADAS */}
      <Route path="/" element={<DefaultLayout />}>
        <Route
          index
          element={
            <RequireAuth>
              <Chamados />
            </RequireAuth>
          }
        />
        <Route
          path="chamados"
          element={
            <RequireAuth>
              <Chamados />
            </RequireAuth>
          }
        />
        <Route
          path="chamados/registrar"
          element={
            <RequireAuth>
              <RegistrarChamado />
            </RequireAuth>
          }
        />

        <Route
          path="agendamentos"
          element={
            <RequireAuth>
              <Agendamentos />
            </RequireAuth>
          }
        />

        <Route
          path="exportar/agendamentos"
          element={
            <RequireAuth>
              <ScheduleExport />
            </RequireAuth>
          }
        />

        <Route
          path="cidades"
          element={
            <RequireAuth>
              <Cities />
            </RequireAuth>
          }
        />
        <Route
          path="usuarios"
          element={
            <RequireAuth>
              <Usuarios />
            </RequireAuth>
          }
        />
        <Route
          path="postos-de-trabalho"
          element={
            <RequireAuth>
              <Workstation />
            </RequireAuth>
          }
        />
        <Route
          path="categorias"
          element={
            <RequireAuth>
              <ListaCategoria />
            </RequireAuth>
          }
        />
        <Route
          path="categorias/:id"
          element={
            <RequireAuth>
              <ListaProblemas />
            </RequireAuth>
          }
        />
        <Route
          path="tutoriais"
          element={
            <RequireAuth>
              <Tutoriais />
            </RequireAuth>
          }
        />
        <Route
          path="tutoriais/categorias_de_tutorial"
          element={
            <RequireAuth>
              <CategoriasTutorial />
            </RequireAuth>
          }
        />
        <Route
          path="tutoriais/gerenciar-tutorial"
          element={
            <RequireAuth>
              <GerenciarTutoriais />
            </RequireAuth>
          }
        />
      </Route>

      {/* ROTAS PUBLICAS */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<DefaultLayoutOpen />}>
        <Route path="/agendamento_externo" element={<p />} />
      </Route>
      <Route path="*" element={<p>404</p>} />
    </Routes>
  );
}
