import { IconType, icons } from 'react-icons';
import { BsSignpost2, BsTags, BsTelephonePlus } from 'react-icons/bs';
import { FaUsersCog } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { MdOutlineViewAgenda } from 'react-icons/md';
import { RiCalendarEventLine } from 'react-icons/ri';
import { AiOutlineExport } from 'react-icons/ai';

export interface IRoute {
  label: string;
  pathname: string;
  icon?: IconType;
}

export const routes: IRoute[] = [
  {
    label: 'Chamados',
    pathname: '/chamados',
    icon: MdOutlineViewAgenda,
  },
  {
    label: 'Agendamentos',
    pathname: '/agendamentos',
    icon: RiCalendarEventLine,
  },
  {
    label: 'Exportar Agendamentos',
    pathname: '/exportar/agendamentos',
    icon: AiOutlineExport,
  },
  {
    label: 'Registrar Chamado',
    pathname: '/chamados/registrar',
    icon: BsTelephonePlus,
  },
  {
    label: 'Categorias de Problema',
    pathname: '/categorias',
    icon: BsTags,
  },
  {
    label: 'Cidades',
    pathname: '/cidades',
    icon: BsSignpost2,
  },
  {
    label: 'Postos de Trabalho',
    pathname: '/postos-de-trabalho',
    icon: FiMapPin,
  },
  {
    label: 'Usuários',
    pathname: '/usuarios',
    icon: FaUsersCog,
  },
  {
    label: 'Tutoriais',
    pathname: '/tutoriais',
    icon: FaUsersCog,
  },
];
