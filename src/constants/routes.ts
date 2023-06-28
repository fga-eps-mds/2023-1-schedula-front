import { IconType } from 'react-icons';
import {
  BsSignpost2,
  BsTags,
  BsTelephonePlus,
  BsCardChecklist,
} from 'react-icons/bs';
import { FaUsersCog } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { MdOutlineViewAgenda } from 'react-icons/md';
import { RiCalendarEventLine } from 'react-icons/ri';
import { AiOutlineExport } from 'react-icons/ai';
import { TbBulb } from 'react-icons/tb';

export interface IRoute {
  label: string;
  pathname: string;
  icon?: IconType;
  allowedUsersPath: string[];
}

export const routes: IRoute[] = [
  {
    label: 'Atendimentos',
    pathname: '/chamados',
    icon: MdOutlineViewAgenda,
    allowedUsersPath: ['ADMIN', 'BASIC', 'USER'],
  },
  {
    label: 'Agendamentos',
    pathname: '/agendamentos',
    icon: RiCalendarEventLine,
    allowedUsersPath: ['ADMIN', 'BASIC', 'USER'],
  },
  {
    label: 'Exportar Agendamentos',
    pathname: '/exportar/agendamentos',
    icon: AiOutlineExport,
    allowedUsersPath: ['ADMIN', 'BASIC', 'USER'],
  },
  {
    label: 'Registrar Atendimento',
    pathname: '/chamados/registrar',
    icon: BsTelephonePlus,
    allowedUsersPath: ['ADMIN', 'BASIC'],
  },
  {
    label: 'Categorias de Problema',
    pathname: '/categorias',
    icon: BsTags,
    allowedUsersPath: ['ADMIN', 'BASIC', 'USER'],
  },
  {
    label: 'Cidades',
    pathname: '/cidades',
    icon: BsSignpost2,
    allowedUsersPath: ['ADMIN', 'BASIC', 'USER'],
  },
  {
    label: 'Postos de Trabalho',
    pathname: '/postos-de-trabalho',
    icon: FiMapPin,
    allowedUsersPath: ['ADMIN', 'BASIC', 'USER'],
  },
  {
    label: 'Usuários',
    pathname: '/usuarios',
    icon: FaUsersCog,
    allowedUsersPath: ['ADMIN', 'BASIC', 'USER'],
  },
  {
    label: 'Tutoriais',
    pathname: '/tutoriais',
    icon: TbBulb,
    allowedUsersPath: ['ADMIN', 'BASIC', 'USER'],
  },
  {
    label: 'Homologação',
    pathname: '/homologacao',
    icon: BsCardChecklist,
    allowedUsersPath: ['ADMIN'],
  },
  {
    label: 'Registrar Agendamento',
    pathname: '/agendamento_externo/registrar',
    icon: BsTelephonePlus,
    allowedUsersPath: ['USER'],
  },
];
